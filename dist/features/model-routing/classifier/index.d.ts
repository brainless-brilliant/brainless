/**
 * Haiku Task Classifier
 *
 * Production-grade AI-powered task classification with caching,
 * retry logic, and keyword fallback.
 */
import type { TaskCapabilities } from '../../../agents/modules/types.js';
import type { ClassificationResult, ClassifierConfig, ClassifierMetrics } from './types.js';
/**
 * Task Classifier using Claude Haiku
 */
export declare class TaskClassifier {
    private config;
    private cache;
    private metrics;
    private pruneInterval;
    constructor(config?: Partial<ClassifierConfig>);
    /**
     * Classify a task and return capabilities
     */
    classify(taskPrompt: string, keywordFallback: () => TaskCapabilities): Promise<ClassificationResult>;
    /**
     * Call Haiku for classification with retry logic
     */
    private classifyWithHaiku;
    /**
     * Call Haiku API with timeout
     */
    private callHaikuWithTimeout;
    /**
     * Make the actual Haiku API request
     */
    private makeHaikuRequest;
    /**
     * Create a keyword-based result
     */
    private createKeywordResult;
    /**
     * Update running average latency
     */
    private updateAverageLatency;
    /**
     * Sleep helper
     */
    private sleep;
    /**
     * Get current metrics
     */
    getMetrics(): ClassifierMetrics;
    /**
     * Get cache stats
     */
    getCacheStats(): {
        size: number;
        maxSize: number;
        hitRate: number;
    };
    /**
     * Cleanup resources
     */
    destroy(): void;
}
/**
 * Get or create the global classifier instance
 */
export declare function getClassifier(config?: Partial<ClassifierConfig>): TaskClassifier;
/**
 * Reset the global classifier (for testing)
 */
export declare function resetClassifier(): void;
/**
 * Convenience function to classify a task
 */
export declare function classifyTask(taskPrompt: string, keywordFallback: () => TaskCapabilities, config?: Partial<ClassifierConfig>): Promise<ClassificationResult>;
//# sourceMappingURL=index.d.ts.map