"use strict";
/**
 * Haiku Task Classifier
 *
 * Production-grade AI-powered task classification with caching,
 * retry logic, and keyword fallback.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskClassifier = void 0;
exports.getClassifier = getClassifier;
exports.resetClassifier = resetClassifier;
exports.classifyTask = classifyTask;
var types_js_1 = require("./types.js");
var prompt_js_1 = require("./prompt.js");
var cache_js_1 = require("./cache.js");
/**
 * Global classifier instance
 */
var classifierInstance = null;
/**
 * Task Classifier using Claude Haiku
 */
var TaskClassifier = /** @class */ (function () {
    function TaskClassifier(config) {
        if (config === void 0) { config = {}; }
        var _this = this;
        this.pruneInterval = null;
        this.config = __assign(__assign({}, types_js_1.DEFAULT_CLASSIFIER_CONFIG), config);
        this.cache = new cache_js_1.LRUCache(this.config.maxCacheSize, this.config.cacheTtlMs);
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
        this.pruneInterval = setInterval(function () { return _this.cache.prune(); }, 60000);
    }
    /**
     * Classify a task and return capabilities
     */
    TaskClassifier.prototype.classify = function (taskPrompt, keywordFallback) {
        return __awaiter(this, void 0, void 0, function () {
            var startTime, cacheKey, cached, result, error_1, fallbackResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        this.metrics.totalCalls++;
                        cacheKey = (0, cache_js_1.createCacheKey)(taskPrompt);
                        cached = this.cache.get(cacheKey);
                        if (cached) {
                            this.metrics.cacheHits++;
                            return [2 /*return*/, cached];
                        }
                        // If Haiku is disabled, use keywords directly
                        if (!this.config.enabled) {
                            return [2 /*return*/, this.createKeywordResult(keywordFallback(), startTime)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.classifyWithHaiku(taskPrompt, startTime)];
                    case 2:
                        result = _a.sent();
                        this.cache.set(cacheKey, result);
                        return [2 /*return*/, result];
                    case 3:
                        error_1 = _a.sent();
                        // Fall back to keywords on any failure
                        this.metrics.keywordFallbacks++;
                        fallbackResult = this.createKeywordResult(keywordFallback(), startTime, error_1 instanceof Error ? error_1.message : 'Unknown error');
                        return [2 /*return*/, fallbackResult];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Call Haiku for classification with retry logic
     */
    TaskClassifier.prototype.classifyWithHaiku = function (taskPrompt, startTime) {
        return __awaiter(this, void 0, void 0, function () {
            var lastError, attempt, result, error_2, delay;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastError = null;
                        attempt = 0;
                        _a.label = 1;
                    case 1:
                        if (!(attempt <= this.config.maxRetries)) return [3 /*break*/, 8];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 7]);
                        this.metrics.haikuCalls++;
                        return [4 /*yield*/, this.callHaikuWithTimeout(taskPrompt)];
                    case 3:
                        result = _a.sent();
                        this.metrics.haikuSuccesses++;
                        this.updateAverageLatency(Date.now() - startTime);
                        return [2 /*return*/, {
                                capabilities: result.capabilities,
                                source: 'haiku',
                                confidence: result.confidence,
                                latencyMs: Date.now() - startTime,
                                cached: false,
                            }];
                    case 4:
                        error_2 = _a.sent();
                        lastError = error_2 instanceof Error ? error_2 : new Error(String(error_2));
                        this.metrics.haikuFailures++;
                        if (!(attempt < this.config.maxRetries)) return [3 /*break*/, 6];
                        delay = this.config.retryDelayMs * Math.pow(2, attempt);
                        return [4 /*yield*/, this.sleep(delay)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 7];
                    case 7:
                        attempt++;
                        return [3 /*break*/, 1];
                    case 8: throw lastError !== null && lastError !== void 0 ? lastError : new Error('Classification failed');
                }
            });
        });
    };
    /**
     * Call Haiku API with timeout
     */
    TaskClassifier.prototype.callHaikuWithTimeout = function (taskPrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var controller, timeoutId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controller = new AbortController();
                        timeoutId = setTimeout(function () { return controller.abort(); }, this.config.timeoutMs);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, this.makeHaikuRequest(taskPrompt, controller.signal)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 3:
                        clearTimeout(timeoutId);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Make the actual Haiku API request
     */
    TaskClassifier.prototype.makeHaikuRequest = function (taskPrompt, signal) {
        return __awaiter(this, void 0, void 0, function () {
            var apiKey, response, errorText, data, content, parsed;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        apiKey = (_a = this.config.apiKey) !== null && _a !== void 0 ? _a : process.env.ANTHROPIC_API_KEY;
                        if (!apiKey) {
                            throw new Error('No Anthropic API key configured');
                        }
                        return [4 /*yield*/, fetch('https://api.anthropic.com/v1/messages', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-api-key': apiKey,
                                    'anthropic-version': '2023-06-01',
                                },
                                body: JSON.stringify({
                                    model: this.config.model,
                                    max_tokens: 256,
                                    system: prompt_js_1.CLASSIFICATION_SYSTEM_PROMPT,
                                    messages: [
                                        {
                                            role: 'user',
                                            content: (0, prompt_js_1.createClassificationPrompt)(taskPrompt),
                                        },
                                    ],
                                }),
                                signal: signal,
                            })];
                    case 1:
                        response = _e.sent();
                        if (!!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.text()];
                    case 2:
                        errorText = _e.sent();
                        throw new Error("Haiku API error: ".concat(response.status, " - ").concat(errorText));
                    case 3: return [4 /*yield*/, response.json()];
                    case 4:
                        data = _e.sent();
                        content = (_c = (_b = data.content) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.text;
                        if (!content) {
                            throw new Error('Empty response from Haiku');
                        }
                        parsed = (0, prompt_js_1.parseClassificationResponse)(content);
                        if (!parsed.success || !parsed.result) {
                            throw new Error((_d = parsed.error) !== null && _d !== void 0 ? _d : 'Failed to parse classification');
                        }
                        return [2 /*return*/, {
                                capabilities: {
                                    needsDelegation: parsed.result.needsDelegation,
                                    needsSearch: parsed.result.needsSearch,
                                    needsArchitecture: parsed.result.needsArchitecture,
                                    needsSecurity: parsed.result.needsSecurity,
                                    needsTesting: parsed.result.needsTesting,
                                    needsToolGuidance: parsed.result.needsToolGuidance,
                                },
                                confidence: parsed.result.confidence,
                            }];
                }
            });
        });
    };
    /**
     * Create a keyword-based result
     */
    TaskClassifier.prototype.createKeywordResult = function (capabilities, startTime, fallbackReason) {
        return {
            capabilities: capabilities,
            source: 'keyword',
            latencyMs: Date.now() - startTime,
            cached: false,
            fallbackReason: fallbackReason,
        };
    };
    /**
     * Update running average latency
     */
    TaskClassifier.prototype.updateAverageLatency = function (latency) {
        var total = this.metrics.haikuSuccesses;
        if (total === 1) {
            this.metrics.averageLatencyMs = latency;
        }
        else {
            this.metrics.averageLatencyMs =
                (this.metrics.averageLatencyMs * (total - 1) + latency) / total;
        }
    };
    /**
     * Sleep helper
     */
    TaskClassifier.prototype.sleep = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    /**
     * Get current metrics
     */
    TaskClassifier.prototype.getMetrics = function () {
        return __assign({}, this.metrics);
    };
    /**
     * Get cache stats
     */
    TaskClassifier.prototype.getCacheStats = function () {
        var stats = this.cache.stats();
        var hitRate = this.metrics.totalCalls > 0
            ? this.metrics.cacheHits / this.metrics.totalCalls
            : 0;
        return __assign(__assign({}, stats), { hitRate: hitRate });
    };
    /**
     * Cleanup resources
     */
    TaskClassifier.prototype.destroy = function () {
        if (this.pruneInterval) {
            clearInterval(this.pruneInterval);
            this.pruneInterval = null;
        }
        this.cache.clear();
    };
    return TaskClassifier;
}());
exports.TaskClassifier = TaskClassifier;
/**
 * Get or create the global classifier instance
 */
function getClassifier(config) {
    if (!classifierInstance) {
        classifierInstance = new TaskClassifier(config);
    }
    return classifierInstance;
}
/**
 * Reset the global classifier (for testing)
 */
function resetClassifier() {
    if (classifierInstance) {
        classifierInstance.destroy();
        classifierInstance = null;
    }
}
/**
 * Convenience function to classify a task
 */
function classifyTask(taskPrompt, keywordFallback, config) {
    return __awaiter(this, void 0, void 0, function () {
        var classifier;
        return __generator(this, function (_a) {
            classifier = getClassifier(config);
            return [2 /*return*/, classifier.classify(taskPrompt, keywordFallback)];
        });
    });
}
