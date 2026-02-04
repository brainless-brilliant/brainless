/**
 * Haiku Classifier Types
 *
 * Type definitions for the AI-powered task classification system.
 */
/**
 * Default classifier configuration
 */
export const DEFAULT_CLASSIFIER_CONFIG = {
    enabled: true,
    timeoutMs: 3000,
    maxRetries: 2,
    retryDelayMs: 100,
    cacheTtlMs: 5 * 60 * 1000, // 5 minutes
    maxCacheSize: 1000,
    model: 'claude-3-haiku-20240307',
};
//# sourceMappingURL=types.js.map