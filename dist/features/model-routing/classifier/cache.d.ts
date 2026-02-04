/**
 * LRU Cache for Classification Results
 *
 * Simple, efficient LRU cache with TTL support.
 */
import type { ClassificationResult } from './types.js';
/**
 * LRU Cache with TTL support
 */
export declare class LRUCache {
    private cache;
    private readonly maxSize;
    private readonly ttlMs;
    constructor(maxSize?: number, ttlMs?: number);
    /**
     * Get a cached result if valid
     */
    get(key: string): ClassificationResult | null;
    /**
     * Set a cache entry
     */
    set(key: string, result: ClassificationResult): void;
    /**
     * Clear expired entries
     */
    prune(): number;
    /**
     * Get cache stats
     */
    stats(): {
        size: number;
        maxSize: number;
    };
    /**
     * Clear all entries
     */
    clear(): void;
}
/**
 * Create a hash key from prompt
 */
export declare function createCacheKey(prompt: string): string;
//# sourceMappingURL=cache.d.ts.map