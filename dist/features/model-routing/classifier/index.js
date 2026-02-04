/**
 * Haiku Task Classifier
 *
 * Production-grade AI-powered task classification with caching,
 * retry logic, and keyword fallback.
 */
import { DEFAULT_CLASSIFIER_CONFIG } from './types.js';
import { CLASSIFICATION_SYSTEM_PROMPT, createClassificationPrompt, parseClassificationResponse, } from './prompt.js';
import { LRUCache, createCacheKey } from './cache.js';
/**
 * Global classifier instance
 */
let classifierInstance = null;
/**
 * Task Classifier using Claude Haiku
 */
export class TaskClassifier {
    config;
    cache;
    metrics;
    pruneInterval = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CLASSIFIER_CONFIG, ...config };
        this.cache = new LRUCache(this.config.maxCacheSize, this.config.cacheTtlMs);
        this.metrics = {
            totalCalls: 0,
            cacheHits: 0,
            haikuCalls: 0,
            haikuSuccesses: 0,
            haikuFailures: 0,
            keywordFallbacks: 0,
            averageLatencyMs: 0,
        };
        // Start periodic cache pruning
        this.pruneInterval = setInterval(() => this.cache.prune(), 60000);
    }
    /**
     * Classify a task and return capabilities
     */
    async classify(taskPrompt, keywordFallback) {
        const startTime = Date.now();
        this.metrics.totalCalls++;
        // Check cache first
        const cacheKey = createCacheKey(taskPrompt);
        const cached = this.cache.get(cacheKey);
        if (cached) {
            this.metrics.cacheHits++;
            return cached;
        }
        // If Haiku is disabled, use keywords directly
        if (!this.config.enabled) {
            return this.createKeywordResult(keywordFallback(), startTime);
        }
        // Try Haiku classification with retry
        try {
            const result = await this.classifyWithHaiku(taskPrompt, startTime);
            this.cache.set(cacheKey, result);
            return result;
        }
        catch (error) {
            // Fall back to keywords on any failure
            this.metrics.keywordFallbacks++;
            const fallbackResult = this.createKeywordResult(keywordFallback(), startTime, error instanceof Error ? error.message : 'Unknown error');
            return fallbackResult;
        }
    }
    /**
     * Call Haiku for classification with retry logic
     */
    async classifyWithHaiku(taskPrompt, startTime) {
        let lastError = null;
        for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
            try {
                this.metrics.haikuCalls++;
                const result = await this.callHaikuWithTimeout(taskPrompt);
                this.metrics.haikuSuccesses++;
                this.updateAverageLatency(Date.now() - startTime);
                return {
                    capabilities: result.capabilities,
                    source: 'haiku',
                    confidence: result.confidence,
                    latencyMs: Date.now() - startTime,
                    cached: false,
                    recommendedAgents: result.recommendedAgents,
                    teamRationale: result.teamRationale,
                };
            }
            catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));
                this.metrics.haikuFailures++;
                // Wait before retry (exponential backoff)
                if (attempt < this.config.maxRetries) {
                    const delay = this.config.retryDelayMs * Math.pow(2, attempt);
                    await this.sleep(delay);
                }
            }
        }
        throw lastError ?? new Error('Classification failed');
    }
    /**
     * Call Haiku API with timeout
     */
    async callHaikuWithTimeout(taskPrompt) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeoutMs);
        try {
            const response = await this.makeHaikuRequest(taskPrompt, controller.signal);
            return response;
        }
        finally {
            clearTimeout(timeoutId);
        }
    }
    /**
     * Make the actual Haiku API request
     */
    async makeHaikuRequest(taskPrompt, signal) {
        const apiKey = this.config.apiKey ?? process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            throw new Error('No Anthropic API key configured');
        }
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: this.config.model,
                max_tokens: 256,
                system: CLASSIFICATION_SYSTEM_PROMPT,
                messages: [
                    {
                        role: 'user',
                        content: createClassificationPrompt(taskPrompt),
                    },
                ],
            }),
            signal,
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Haiku API error: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        const content = data.content?.[0]?.text;
        if (!content) {
            throw new Error('Empty response from Haiku');
        }
        const parsed = parseClassificationResponse(content);
        if (!parsed.success || !parsed.result) {
            throw new Error(parsed.error ?? 'Failed to parse classification');
        }
        return {
            capabilities: {
                needsDelegation: parsed.result.needsDelegation,
                needsSearch: parsed.result.needsSearch,
                needsArchitecture: parsed.result.needsArchitecture,
                needsSecurity: parsed.result.needsSecurity,
                needsTesting: parsed.result.needsTesting,
                needsToolGuidance: parsed.result.needsToolGuidance,
            },
            confidence: parsed.result.confidence,
            recommendedAgents: parsed.result.recommendedAgents,
            teamRationale: parsed.result.teamRationale,
        };
    }
    /**
     * Create a keyword-based result
     */
    createKeywordResult(capabilities, startTime, fallbackReason) {
        return {
            capabilities,
            source: 'keyword',
            latencyMs: Date.now() - startTime,
            cached: false,
            fallbackReason,
        };
    }
    /**
     * Update running average latency
     */
    updateAverageLatency(latency) {
        const total = this.metrics.haikuSuccesses;
        if (total === 1) {
            this.metrics.averageLatencyMs = latency;
        }
        else {
            this.metrics.averageLatencyMs =
                (this.metrics.averageLatencyMs * (total - 1) + latency) / total;
        }
    }
    /**
     * Sleep helper
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Get current metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }
    /**
     * Get cache stats
     */
    getCacheStats() {
        const stats = this.cache.stats();
        const hitRate = this.metrics.totalCalls > 0
            ? this.metrics.cacheHits / this.metrics.totalCalls
            : 0;
        return { ...stats, hitRate };
    }
    /**
     * Cleanup resources
     */
    destroy() {
        if (this.pruneInterval) {
            clearInterval(this.pruneInterval);
            this.pruneInterval = null;
        }
        this.cache.clear();
    }
}
/**
 * Get or create the global classifier instance
 */
export function getClassifier(config) {
    if (!classifierInstance) {
        classifierInstance = new TaskClassifier(config);
    }
    return classifierInstance;
}
/**
 * Reset the global classifier (for testing)
 */
export function resetClassifier() {
    if (classifierInstance) {
        classifierInstance.destroy();
        classifierInstance = null;
    }
}
/**
 * Convenience function to classify a task
 */
export async function classifyTask(taskPrompt, keywordFallback, config) {
    const classifier = getClassifier(config);
    return classifier.classify(taskPrompt, keywordFallback);
}
//# sourceMappingURL=index.js.map