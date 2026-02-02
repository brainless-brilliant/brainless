"use strict";
/**
 * Haiku Classifier Types
 *
 * Type definitions for the AI-powered task classification system.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CLASSIFIER_CONFIG = void 0;
/**
 * Default classifier configuration
 */
exports.DEFAULT_CLASSIFIER_CONFIG = {
    enabled: true,
    timeoutMs: 3000,
    maxRetries: 2,
    retryDelayMs: 100,
    cacheTtlMs: 5 * 60 * 1000, // 5 minutes
    maxCacheSize: 1000,
    model: 'claude-3-haiku-20240307',
};
