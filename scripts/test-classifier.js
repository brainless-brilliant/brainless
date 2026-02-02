#!/usr/bin/env npx tsx
"use strict";
/**
 * Classifier Comparison Test
 *
 * Shows the ACTUAL prompts that get built based on classification.
 * This is the real test - what prompt does Claude receive?
 *
 * Run with: ANTHROPIC_API_KEY=your_key npx tsx scripts/test-classifier.ts
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
var signals_js_1 = require("../src/features/model-routing/signals.js");
var index_js_1 = require("../src/features/model-routing/classifier/index.js");
var index_js_2 = require("../src/agents/modules/index.js");
var fs_1 = require("fs");
// Test cases
var TEST_CASES = [
    {
        name: 'Simple search',
        prompt: 'Find where the login function is defined',
    },
    {
        name: 'Complex refactor',
        prompt: 'Refactor the authentication module to use OAuth2 instead of basic auth, update all dependent services',
    },
    {
        name: 'Add tests',
        prompt: 'Add unit tests for the payment service',
    },
    {
        name: 'Security fix',
        prompt: 'Fix the XSS vulnerability in the user input sanitization',
    },
    {
        name: 'Multi-file edit',
        prompt: 'Rename the UserService class to AccountService across all files in src/',
    },
    {
        name: 'Simple question',
        prompt: 'What does the handleSubmit function do?',
    },
    {
        name: 'Architecture design',
        prompt: 'Design a new caching layer for the API to reduce database load',
    },
    {
        name: 'Bug investigation',
        prompt: 'Debug why the login is failing intermittently in production',
    },
];
function runTest() {
    return __awaiter(this, void 0, void 0, function () {
        var allCaps, fullPrompt, fullPromptTokens, results, _loop_1, _i, TEST_CASES_1, testCase, report, outputPath;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('🧪 Classifier Prompt Composition Test\n');
                    console.log('This test shows the ACTUAL prompts that get built.\n');
                    console.log("Running ".concat(TEST_CASES.length, " test cases...\n"));
                    (0, index_js_1.resetClassifier)();
                    allCaps = {
                        needsDelegation: true,
                        needsSearch: true,
                        needsArchitecture: true,
                        needsSecurity: true,
                        needsTesting: true,
                        needsToolGuidance: true,
                    };
                    fullPrompt = (0, index_js_2.composePromptFromModules)(allCaps);
                    fullPromptTokens = fullPrompt.estimatedTokens;
                    console.log("\uD83D\uDCCA Baseline: Full prompt with ALL modules = ~".concat(fullPromptTokens, " tokens\n"));
                    results = [];
                    _loop_1 = function (testCase) {
                        var signals, keywordCaps, keywordComposed, haikuResult, haikuComposed, result;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    console.log("Testing: ".concat(testCase.name, "..."));
                                    signals = (0, signals_js_1.extractAllSignals)(testCase.prompt, { taskPrompt: testCase.prompt });
                                    keywordCaps = (0, signals_js_1.extractTaskCapabilities)(signals);
                                    keywordComposed = (0, index_js_2.composePromptFromModules)(keywordCaps);
                                    return [4 /*yield*/, (0, index_js_1.classifyTask)(testCase.prompt, function () { return keywordCaps; })];
                                case 1:
                                    haikuResult = _c.sent();
                                    haikuComposed = (0, index_js_2.composePromptFromModules)(haikuResult.capabilities);
                                    result = {
                                        name: testCase.name,
                                        taskPrompt: testCase.prompt,
                                        keywordCaps: keywordCaps,
                                        haikuCaps: haikuResult.capabilities,
                                        source: haikuResult.source,
                                        confidence: (_a = haikuResult.confidence) !== null && _a !== void 0 ? _a : null,
                                        keywordModules: keywordComposed.includedModules,
                                        keywordPrompt: keywordComposed.prompt,
                                        keywordTokens: keywordComposed.estimatedTokens,
                                        haikuModules: haikuComposed.includedModules,
                                        haikuPrompt: haikuComposed.prompt,
                                        haikuTokens: haikuComposed.estimatedTokens,
                                        fullPromptTokens: fullPromptTokens,
                                        tokenSavingsKeyword: fullPromptTokens - keywordComposed.estimatedTokens,
                                        tokenSavingsHaiku: fullPromptTokens - haikuComposed.estimatedTokens,
                                    };
                                    results.push(result);
                                    console.log("  \u2192 ".concat(haikuResult.source, ": ").concat(haikuComposed.includedModules.length, " modules, ~").concat(haikuComposed.estimatedTokens, " tokens"));
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, TEST_CASES_1 = TEST_CASES;
                    _b.label = 1;
                case 1:
                    if (!(_i < TEST_CASES_1.length)) return [3 /*break*/, 4];
                    testCase = TEST_CASES_1[_i];
                    return [5 /*yield**/, _loop_1(testCase)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    report = generateReport(results, fullPromptTokens);
                    outputPath = 'classifier.test.result.md';
                    (0, fs_1.writeFileSync)(outputPath, report);
                    console.log("\n\u2705 Results written to ".concat(outputPath));
                    return [2 /*return*/];
            }
        });
    });
}
function generateReport(results, fullPromptTokens) {
    var _a, _b, _c, _d, _e, _f;
    var md = "# Classifier Prompt Composition Test Results\n\nGenerated: ".concat(new Date().toISOString(), "\n\n## The Core Question\n> \"What prompt does the agent ACTUALLY receive?\"\n\nThis test shows the real prompts built by the modular composition system.\n\n---\n\n## Token Budget Baseline\n\n| Configuration | Tokens |\n|--------------|--------|\n| **Full Prompt (all modules)** | ~").concat(fullPromptTokens, " |\n| Available Modules | ").concat(index_js_2.ALL_MODULES.map(function (m) { return m.id; }).join(', '), " |\n\n---\n\n## Results by Task\n\n");
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        md += "### ".concat(result.name, "\n\n**Task:** `").concat(result.taskPrompt, "`\n\n#### Classification Comparison\n\n| Method | Source | Modules Selected | Tokens | Savings |\n|--------|--------|------------------|--------|---------|\n| Keyword | instant | ").concat(result.keywordModules.length, " | ~").concat(result.keywordTokens, " | ").concat(result.tokenSavingsKeyword, " (").concat(((result.tokenSavingsKeyword / fullPromptTokens) * 100).toFixed(0), "%) |\n| Haiku | ").concat(result.source).concat(result.confidence ? " (".concat((result.confidence * 100).toFixed(0), "%)") : '', " | ").concat(result.haikuModules.length, " | ~").concat(result.haikuTokens, " | ").concat(result.tokenSavingsHaiku, " (").concat(((result.tokenSavingsHaiku / fullPromptTokens) * 100).toFixed(0), "%) |\n\n#### Capabilities Detected\n\n| Capability | Keyword | Haiku |\n|------------|---------|-------|\n| needsDelegation | ").concat(result.keywordCaps.needsDelegation ? '✅' : '❌', " | ").concat(((_a = result.haikuCaps) === null || _a === void 0 ? void 0 : _a.needsDelegation) ? '✅' : '❌', " |\n| needsSearch | ").concat(result.keywordCaps.needsSearch ? '✅' : '❌', " | ").concat(((_b = result.haikuCaps) === null || _b === void 0 ? void 0 : _b.needsSearch) ? '✅' : '❌', " |\n| needsArchitecture | ").concat(result.keywordCaps.needsArchitecture ? '✅' : '❌', " | ").concat(((_c = result.haikuCaps) === null || _c === void 0 ? void 0 : _c.needsArchitecture) ? '✅' : '❌', " |\n| needsSecurity | ").concat(result.keywordCaps.needsSecurity ? '✅' : '❌', " | ").concat(((_d = result.haikuCaps) === null || _d === void 0 ? void 0 : _d.needsSecurity) ? '✅' : '❌', " |\n| needsTesting | ").concat(result.keywordCaps.needsTesting ? '✅' : '❌', " | ").concat(((_e = result.haikuCaps) === null || _e === void 0 ? void 0 : _e.needsTesting) ? '✅' : '❌', " |\n| needsToolGuidance | ").concat(result.keywordCaps.needsToolGuidance ? '✅' : '❌', " | ").concat(((_f = result.haikuCaps) === null || _f === void 0 ? void 0 : _f.needsToolGuidance) ? '✅' : '❌', " |\n\n#### Modules Included\n\n**Keyword:** ").concat(result.keywordModules.join(', '), "\n\n**Haiku:** ").concat(result.haikuModules.join(', '), "\n\n<details>\n<summary>\uD83D\uDCC4 View Actual Haiku-Composed Prompt (~").concat(result.haikuTokens, " tokens)</summary>\n\n```\n").concat(result.haikuPrompt, "\n```\n\n</details>\n\n---\n\n");
    }
    // Summary table
    md += "## Summary: Token Savings\n\n| Task | Keyword Tokens | Haiku Tokens | Difference | Better? |\n|------|---------------|--------------|------------|---------|\n";
    for (var _g = 0, results_2 = results; _g < results_2.length; _g++) {
        var result = results_2[_g];
        var diff = result.keywordTokens - result.haikuTokens;
        var better = diff === 0 ? 'Same' : (diff > 0 ? 'Haiku' : 'Keyword');
        md += "| ".concat(result.name, " | ").concat(result.keywordTokens, " | ").concat(result.haikuTokens, " | ").concat(Math.abs(diff), " | ").concat(better, " |\n");
    }
    // Overall stats
    var avgKeywordTokens = results.reduce(function (sum, r) { return sum + r.keywordTokens; }, 0) / results.length;
    var avgHaikuTokens = results.reduce(function (sum, r) { return sum + r.haikuTokens; }, 0) / results.length;
    md += "\n## Overall Statistics\n\n| Metric | Value |\n|--------|-------|\n| Avg Keyword Tokens | ".concat(avgKeywordTokens.toFixed(0), " |\n| Avg Haiku Tokens | ").concat(avgHaikuTokens.toFixed(0), " |\n| Avg Savings vs Full | ").concat(((1 - avgHaikuTokens / fullPromptTokens) * 100).toFixed(0), "% |\n| Full Prompt Baseline | ").concat(fullPromptTokens, " |\n");
    return md;
}
runTest().catch(console.error);
