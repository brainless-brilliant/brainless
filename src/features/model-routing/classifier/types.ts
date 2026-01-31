/**
 * Haiku Classifier Types
 *
 * Type definitions for the AI-powered task classification system.
 */

import type { TaskCapabilities } from '../../../agents/modules/types.js';

/**
 * Classification result from Haiku
 */
export interface ClassificationResult {
  /** The classified capabilities */
  capabilities: TaskCapabilities;
  /** Source of classification */
  source: 'haiku' | 'keyword' | 'cache';
  /** Confidence if from Haiku (0-1) */
  confidence?: number;
  /** Latency in ms */
  latencyMs: number;
  /** Whether this was a cache hit */
  cached: boolean;
  /** Error message if classification failed and fell back */
  fallbackReason?: string;
}

/**
 * Raw Haiku response before validation
 */
export interface HaikuRawResponse {
  needsDelegation: boolean;
  needsSearch: boolean;
  needsArchitecture: boolean;
  needsSecurity: boolean;
  needsTesting: boolean;
  needsToolGuidance: boolean;
  confidence?: number;
}

/**
 * Classifier configuration
 */
export interface ClassifierConfig {
  /** Enable Haiku classification (default: true) */
  enabled: boolean;
  /** Timeout for Haiku call in ms (default: 3000) */
  timeoutMs: number;
  /** Number of retries on failure (default: 2) */
  maxRetries: number;
  /** Base retry delay in ms (default: 100) */
  retryDelayMs: number;
  /** Cache TTL in ms (default: 300000 = 5 min) */
  cacheTtlMs: number;
  /** Max cache entries (default: 1000) */
  maxCacheSize: number;
  /** API key for Anthropic (uses env if not provided) */
  apiKey?: string;
  /** Model to use (default: claude-3-haiku-20240307) */
  model: string;
}

/**
 * Default classifier configuration
 */
export const DEFAULT_CLASSIFIER_CONFIG: ClassifierConfig = {
  enabled: true,
  timeoutMs: 3000,
  maxRetries: 2,
  retryDelayMs: 100,
  cacheTtlMs: 5 * 60 * 1000, // 5 minutes
  maxCacheSize: 1000,
  model: 'claude-3-haiku-20240307',
};

/**
 * Cache entry with TTL tracking
 */
export interface CacheEntry {
  result: ClassificationResult;
  timestamp: number;
  expiresAt: number;
}

/**
 * Classifier metrics for observability
 */
export interface ClassifierMetrics {
  totalCalls: number;
  cacheHits: number;
  haikuCalls: number;
  haikuSuccesses: number;
  haikuFailures: number;
  keywordFallbacks: number;
  averageLatencyMs: number;
}
