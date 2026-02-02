"use strict";
/**
 * Complexity Signal Extraction
 *
 * Extracts complexity signals from task prompts to inform routing decisions.
 * Signals are categorized into lexical, structural, and context types.
 */
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
exports.extractLexicalSignals = extractLexicalSignals;
exports.extractStructuralSignals = extractStructuralSignals;
exports.extractContextSignals = extractContextSignals;
exports.extractAllSignals = extractAllSignals;
exports.extractTaskCapabilities = extractTaskCapabilities;
exports.extractTaskCapabilitiesAsync = extractTaskCapabilitiesAsync;
var types_js_1 = require("./types.js");
/**
 * Extract lexical signals from task prompt
 * These are fast, regex-based extractions that don't require model calls
 */
function extractLexicalSignals(prompt) {
    var lowerPrompt = prompt.toLowerCase();
    var words = prompt.split(/\s+/).filter(function (w) { return w.length > 0; });
    return {
        wordCount: words.length,
        filePathCount: countFilePaths(prompt),
        codeBlockCount: countCodeBlocks(prompt),
        hasArchitectureKeywords: hasKeywords(lowerPrompt, types_js_1.COMPLEXITY_KEYWORDS.architecture),
        hasDebuggingKeywords: hasKeywords(lowerPrompt, types_js_1.COMPLEXITY_KEYWORDS.debugging),
        hasSimpleKeywords: hasKeywords(lowerPrompt, types_js_1.COMPLEXITY_KEYWORDS.simple),
        hasRiskKeywords: hasKeywords(lowerPrompt, types_js_1.COMPLEXITY_KEYWORDS.risk),
        questionDepth: detectQuestionDepth(lowerPrompt),
        hasImplicitRequirements: detectImplicitRequirements(lowerPrompt),
    };
}
/**
 * Extract structural signals from task prompt
 * These require more sophisticated parsing
 */
function extractStructuralSignals(prompt) {
    var lowerPrompt = prompt.toLowerCase();
    return {
        estimatedSubtasks: estimateSubtasks(prompt),
        crossFileDependencies: detectCrossFileDependencies(prompt),
        hasTestRequirements: detectTestRequirements(lowerPrompt),
        domainSpecificity: detectDomain(lowerPrompt),
        requiresExternalKnowledge: detectExternalKnowledge(lowerPrompt),
        reversibility: assessReversibility(lowerPrompt),
        impactScope: assessImpactScope(prompt),
    };
}
/**
 * Extract context signals from routing context
 */
function extractContextSignals(context) {
    var _a, _b, _c, _d, _e;
    return {
        previousFailures: (_a = context.previousFailures) !== null && _a !== void 0 ? _a : 0,
        conversationTurns: (_b = context.conversationTurns) !== null && _b !== void 0 ? _b : 0,
        planComplexity: (_c = context.planTasks) !== null && _c !== void 0 ? _c : 0,
        remainingTasks: (_d = context.remainingTasks) !== null && _d !== void 0 ? _d : 0,
        agentChainDepth: (_e = context.agentChainDepth) !== null && _e !== void 0 ? _e : 0,
    };
}
/**
 * Extract all complexity signals
 */
function extractAllSignals(prompt, context) {
    return {
        lexical: extractLexicalSignals(prompt),
        structural: extractStructuralSignals(prompt),
        context: extractContextSignals(context),
    };
}
// ============ Helper Functions ============
/**
 * Count file paths in prompt
 */
function countFilePaths(prompt) {
    // Match common file path patterns
    var patterns = [
        /(?:^|\s)[.\/~]?(?:[\w-]+\/)+[\w.-]+\.\w+/gm, // Unix-style paths
        /`[^`]+\.\w+`/g, // Backtick-quoted files
        /['"][^'"]+\.\w+['"]/g, // Quoted files
    ];
    var count = 0;
    for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
        var pattern = patterns_1[_i];
        var matches = prompt.match(pattern);
        if (matches)
            count += matches.length;
    }
    return Math.min(count, 20); // Cap at reasonable max
}
/**
 * Count code blocks in prompt
 */
function countCodeBlocks(prompt) {
    var fencedBlocks = (prompt.match(/```[\s\S]*?```/g) || []).length;
    var indentedBlocks = (prompt.match(/(?:^|\n)(?:\s{4}|\t)[^\n]+(?:\n(?:\s{4}|\t)[^\n]+)*/g) || []).length;
    return fencedBlocks + Math.floor(indentedBlocks / 2);
}
/**
 * Check if prompt contains any of the keywords
 */
function hasKeywords(prompt, keywords) {
    return keywords.some(function (kw) { return prompt.includes(kw); });
}
/**
 * Detect question depth
 * 'why' questions require deeper reasoning than 'what' or 'where'
 */
function detectQuestionDepth(prompt) {
    if (/\bwhy\b.*\?|\bwhy\s+(is|are|does|do|did|would|should|can)/i.test(prompt)) {
        return 'why';
    }
    if (/\bhow\b.*\?|\bhow\s+(do|does|can|should|would|to)/i.test(prompt)) {
        return 'how';
    }
    if (/\bwhat\b.*\?|\bwhat\s+(is|are|does|do)/i.test(prompt)) {
        return 'what';
    }
    if (/\bwhere\b.*\?|\bwhere\s+(is|are|does|do|can)/i.test(prompt)) {
        return 'where';
    }
    return 'none';
}
/**
 * Detect implicit requirements (vague statements without clear deliverables)
 */
function detectImplicitRequirements(prompt) {
    var vaguePatterns = [
        /\bmake it better\b/,
        /\bimprove\b(?!.*(?:by|to|so that))/,
        /\bfix\b(?!.*(?:the|this|that|in|at))/,
        /\boptimize\b(?!.*(?:by|for|to))/,
        /\bclean up\b/,
        /\brefactor\b(?!.*(?:to|by|into))/,
    ];
    return vaguePatterns.some(function (p) { return p.test(prompt); });
}
/**
 * Estimate number of subtasks
 */
function estimateSubtasks(prompt) {
    var count = 1;
    // Count explicit list items
    var bulletPoints = (prompt.match(/^[\s]*[-*•]\s/gm) || []).length;
    var numberedItems = (prompt.match(/^[\s]*\d+[.)]\s/gm) || []).length;
    count += bulletPoints + numberedItems;
    // Count 'and' conjunctions that might indicate multiple tasks
    var andCount = (prompt.match(/\band\b/gi) || []).length;
    count += Math.floor(andCount / 2);
    // Count 'then' indicators
    var thenCount = (prompt.match(/\bthen\b/gi) || []).length;
    count += thenCount;
    return Math.min(count, 10);
}
/**
 * Detect if task involves changes across multiple files
 */
function detectCrossFileDependencies(prompt) {
    var fileCount = countFilePaths(prompt);
    if (fileCount >= 2)
        return true;
    var crossFileIndicators = [
        /multiple files/i,
        /across.*files/i,
        /several.*files/i,
        /all.*files/i,
        /throughout.*codebase/i,
        /entire.*project/i,
        /whole.*system/i,
    ];
    return crossFileIndicators.some(function (p) { return p.test(prompt); });
}
/**
 * Detect test requirements
 */
function detectTestRequirements(prompt) {
    var testIndicators = [
        /\btest/i,
        /\bspec\b/i,
        /make sure.*work/i,
        /verify/i,
        /ensure.*pass/i,
        /\bTDD\b/,
        /unit test/i,
        /integration test/i,
    ];
    return testIndicators.some(function (p) { return p.test(prompt); });
}
/**
 * Detect domain specificity
 */
function detectDomain(prompt) {
    var domains = {
        frontend: [
            /\b(react|vue|angular|svelte|css|html|jsx|tsx|component|ui|ux|styling|tailwind|sass|scss)\b/i,
            /\b(button|modal|form|input|layout|responsive|animation)\b/i,
        ],
        backend: [
            /\b(api|endpoint|database|query|sql|graphql|rest|server|auth|middleware)\b/i,
            /\b(node|express|fastify|nest|django|flask|rails)\b/i,
        ],
        infrastructure: [
            /\b(docker|kubernetes|k8s|terraform|aws|gcp|azure|ci|cd|deploy|container)\b/i,
            /\b(nginx|load.?balancer|scaling|monitoring|logging)\b/i,
        ],
        security: [
            /\b(security|auth|oauth|jwt|encryption|vulnerability|xss|csrf|injection)\b/i,
            /\b(password|credential|secret|token|permission)\b/i,
        ],
    };
    for (var _i = 0, _a = Object.entries(domains); _i < _a.length; _i++) {
        var _b = _a[_i], domain = _b[0], patterns = _b[1];
        if (patterns.some(function (p) { return p.test(prompt); })) {
            return domain;
        }
    }
    return 'generic';
}
/**
 * Detect if external knowledge is required
 */
function detectExternalKnowledge(prompt) {
    var externalIndicators = [
        /\bdocs?\b/i,
        /\bdocumentation\b/i,
        /\bofficial\b/i,
        /\blibrary\b/i,
        /\bpackage\b/i,
        /\bframework\b/i,
        /\bhow does.*work\b/i,
        /\bbest practice/i,
    ];
    return externalIndicators.some(function (p) { return p.test(prompt); });
}
/**
 * Assess reversibility of changes
 */
function assessReversibility(prompt) {
    var difficultIndicators = [
        /\bmigrat/i,
        /\bproduction\b/i,
        /\bdata.*loss/i,
        /\bdelete.*all/i,
        /\bdrop.*table/i,
        /\birreversible/i,
        /\bpermanent/i,
    ];
    var moderateIndicators = [
        /\brefactor/i,
        /\brestructure/i,
        /\brename.*across/i,
        /\bmove.*files/i,
        /\bchange.*schema/i,
    ];
    if (difficultIndicators.some(function (p) { return p.test(prompt); }))
        return 'difficult';
    if (moderateIndicators.some(function (p) { return p.test(prompt); }))
        return 'moderate';
    return 'easy';
}
/**
 * Assess impact scope of changes
 */
function assessImpactScope(prompt) {
    var systemWideIndicators = [
        /\bentire\b/i,
        /\ball\s+(?:files|components|modules)/i,
        /\bwhole\s+(?:project|codebase|system)/i,
        /\bsystem.?wide/i,
        /\bglobal/i,
        /\beverywhere/i,
        /\bthroughout/i,
    ];
    var moduleIndicators = [
        /\bmodule/i,
        /\bpackage/i,
        /\bservice/i,
        /\bfeature/i,
        /\bcomponent/i,
        /\blayer/i,
    ];
    if (systemWideIndicators.some(function (p) { return p.test(prompt); }))
        return 'system-wide';
    // Check for multiple files (indicates module-level at least)
    if (countFilePaths(prompt) >= 3)
        return 'module';
    if (moduleIndicators.some(function (p) { return p.test(prompt); }))
        return 'module';
    return 'local';
}
/**
 * Extract task capabilities from complexity signals
 * Used for modular prompt composition
 */
function extractTaskCapabilities(signals) {
    var lexical = signals.lexical, structural = signals.structural, context = signals.context;
    return {
        // Needs delegation if complex multi-step with cross-file or high subtask count
        needsDelegation: structural.estimatedSubtasks > 3 ||
            (structural.crossFileDependencies && structural.estimatedSubtasks > 1) ||
            context.planComplexity > 5,
        // Needs search guidance for simple lookups
        needsSearch: lexical.hasSimpleKeywords &&
            !lexical.hasArchitectureKeywords &&
            !lexical.hasDebuggingKeywords,
        // Needs architecture for refactoring/design
        needsArchitecture: lexical.hasArchitectureKeywords ||
            structural.impactScope === 'system-wide' ||
            structural.reversibility === 'difficult',
        // Needs security for security domain
        needsSecurity: structural.domainSpecificity === 'security',
        // Needs testing guidance for test-related tasks
        needsTesting: structural.hasTestRequirements,
        // Needs tool guidance for multi-file operations
        needsToolGuidance: lexical.filePathCount > 2 ||
            structural.crossFileDependencies,
    };
}
/**
 * Extract task capabilities using Haiku classification with keyword fallback
 * This is the async version that provides more accurate classification
 */
function extractTaskCapabilitiesAsync(signals, taskPrompt) {
    return __awaiter(this, void 0, void 0, function () {
        var classifyTask, keywordFallback, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require('./classifier/index.js'); })];
                case 1:
                    classifyTask = (_a.sent()).classifyTask;
                    keywordFallback = function () { return extractTaskCapabilities(signals); };
                    return [4 /*yield*/, classifyTask(taskPrompt, keywordFallback)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, {
                            capabilities: result.capabilities,
                            source: result.source,
                            confidence: result.confidence,
                            latencyMs: result.latencyMs,
                        }];
            }
        });
    });
}
