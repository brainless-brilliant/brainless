/**
 * LRU Cache for Classification Results
 *
 * Simple, efficient LRU cache with TTL support.
 */
/**
 * LRU Cache with TTL support
 */
export class LRUCache {
    cache;
    maxSize;
    ttlMs;
    constructor(maxSize = 1000, ttlMs = 5 * 60 * 1000) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttlMs = ttlMs;
    }
    /**
     * Get a cached result if valid
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        // Check TTL
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }
        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, entry);
        return {
            ...entry.result,
            source: 'cache',
            cached: true,
        };
    }
    /**
     * Set a cache entry
     */
    set(key, result) {
        // Evict oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }
        const now = Date.now();
        this.cache.set(key, {
            result,
            timestamp: now,
            expiresAt: now + this.ttlMs,
        });
    }
    /**
     * Clear expired entries
     */
    prune() {
        const now = Date.now();
        let pruned = 0;
        const keysToDelete = [];
        this.cache.forEach((entry, key) => {
            if (now > entry.expiresAt) {
                keysToDelete.push(key);
            }
        });
        for (const key of keysToDelete) {
            this.cache.delete(key);
            pruned++;
        }
        return pruned;
    }
    /**
     * Get cache stats
     */
    stats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
        };
    }
    /**
     * Clear all entries
     */
    clear() {
        this.cache.clear();
    }
}
/**
 * Create a hash key from prompt
 */
export function createCacheKey(prompt) {
    // Simple hash for cache key - djb2 algorithm
    let hash = 5381;
    for (let i = 0; i < prompt.length; i++) {
        hash = ((hash << 5) + hash) ^ prompt.charCodeAt(i);
    }
    return `task_${hash.toString(36)}`;
}
//# sourceMappingURL=cache.js.map