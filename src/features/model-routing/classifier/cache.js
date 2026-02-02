"use strict";
/**
 * LRU Cache for Classification Results
 *
 * Simple, efficient LRU cache with TTL support.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
exports.createCacheKey = createCacheKey;
/**
 * LRU Cache with TTL support
 */
var LRUCache = /** @class */ (function () {
    function LRUCache(maxSize, ttlMs) {
        if (maxSize === void 0) { maxSize = 1000; }
        if (ttlMs === void 0) { ttlMs = 5 * 60 * 1000; }
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttlMs = ttlMs;
    }
    /**
     * Get a cached result if valid
     */
    LRUCache.prototype.get = function (key) {
        var entry = this.cache.get(key);
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
        return __assign(__assign({}, entry.result), { source: 'cache', cached: true });
    };
    /**
     * Set a cache entry
     */
    LRUCache.prototype.set = function (key, result) {
        // Evict oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            var firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.cache.delete(firstKey);
            }
        }
        var now = Date.now();
        this.cache.set(key, {
            result: result,
            timestamp: now,
            expiresAt: now + this.ttlMs,
        });
    };
    /**
     * Clear expired entries
     */
    LRUCache.prototype.prune = function () {
        var now = Date.now();
        var pruned = 0;
        var keysToDelete = [];
        this.cache.forEach(function (entry, key) {
            if (now > entry.expiresAt) {
                keysToDelete.push(key);
            }
        });
        for (var _i = 0, keysToDelete_1 = keysToDelete; _i < keysToDelete_1.length; _i++) {
            var key = keysToDelete_1[_i];
            this.cache.delete(key);
            pruned++;
        }
        return pruned;
    };
    /**
     * Get cache stats
     */
    LRUCache.prototype.stats = function () {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
        };
    };
    /**
     * Clear all entries
     */
    LRUCache.prototype.clear = function () {
        this.cache.clear();
    };
    return LRUCache;
}());
exports.LRUCache = LRUCache;
/**
 * Create a hash key from prompt
 */
function createCacheKey(prompt) {
    // Simple hash for cache key - djb2 algorithm
    var hash = 5381;
    for (var i = 0; i < prompt.length; i++) {
        hash = ((hash << 5) + hash) ^ prompt.charCodeAt(i);
    }
    return "task_".concat(hash.toString(36));
}
