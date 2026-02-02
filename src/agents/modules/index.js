"use strict";
/**
 * Prompt Modules Index
 *
 * Exports all prompt modules and provides utilities for module management.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULES_BY_ID = exports.ALL_MODULES = exports.completionRulesModule = exports.toolUsageModule = exports.testingGuidanceModule = exports.securityRulesModule = exports.architectureGuidanceModule = exports.searchGuidanceModule = exports.delegationRulesModule = exports.coreIdentityModule = void 0;
exports.selectModules = selectModules;
exports.composePromptFromModules = composePromptFromModules;
exports.getDefaultCapabilities = getDefaultCapabilities;
// Modules
var core_js_1 = require("./core.js");
Object.defineProperty(exports, "coreIdentityModule", { enumerable: true, get: function () { return core_js_1.coreIdentityModule; } });
var delegation_js_1 = require("./delegation.js");
Object.defineProperty(exports, "delegationRulesModule", { enumerable: true, get: function () { return delegation_js_1.delegationRulesModule; } });
var search_js_1 = require("./search.js");
Object.defineProperty(exports, "searchGuidanceModule", { enumerable: true, get: function () { return search_js_1.searchGuidanceModule; } });
var architecture_js_1 = require("./architecture.js");
Object.defineProperty(exports, "architectureGuidanceModule", { enumerable: true, get: function () { return architecture_js_1.architectureGuidanceModule; } });
var security_js_1 = require("./security.js");
Object.defineProperty(exports, "securityRulesModule", { enumerable: true, get: function () { return security_js_1.securityRulesModule; } });
var testing_js_1 = require("./testing.js");
Object.defineProperty(exports, "testingGuidanceModule", { enumerable: true, get: function () { return testing_js_1.testingGuidanceModule; } });
var tools_js_1 = require("./tools.js");
Object.defineProperty(exports, "toolUsageModule", { enumerable: true, get: function () { return tools_js_1.toolUsageModule; } });
var completion_js_1 = require("./completion.js");
Object.defineProperty(exports, "completionRulesModule", { enumerable: true, get: function () { return completion_js_1.completionRulesModule; } });
var core_js_2 = require("./core.js");
var delegation_js_2 = require("./delegation.js");
var search_js_2 = require("./search.js");
var architecture_js_2 = require("./architecture.js");
var security_js_2 = require("./security.js");
var testing_js_2 = require("./testing.js");
var tools_js_2 = require("./tools.js");
var completion_js_2 = require("./completion.js");
/**
 * All available prompt modules
 */
exports.ALL_MODULES = [
    core_js_2.coreIdentityModule,
    delegation_js_2.delegationRulesModule,
    search_js_2.searchGuidanceModule,
    architecture_js_2.architectureGuidanceModule,
    security_js_2.securityRulesModule,
    testing_js_2.testingGuidanceModule,
    tools_js_2.toolUsageModule,
    completion_js_2.completionRulesModule,
];
/**
 * Get modules map by ID
 */
exports.MODULES_BY_ID = {
    'core-identity': core_js_2.coreIdentityModule,
    'delegation-rules': delegation_js_2.delegationRulesModule,
    'search-guidance': search_js_2.searchGuidanceModule,
    'architecture-guidance': architecture_js_2.architectureGuidanceModule,
    'security-rules': security_js_2.securityRulesModule,
    'testing-guidance': testing_js_2.testingGuidanceModule,
    'tool-usage': tools_js_2.toolUsageModule,
    'completion-rules': completion_js_2.completionRulesModule,
};
/**
 * Select modules based on task capabilities
 */
function selectModules(capabilities) {
    return exports.ALL_MODULES.filter(function (module) { return module.alwaysInclude || module.shouldInclude(capabilities); });
}
/**
 * Compose a prompt from selected modules
 */
function composePromptFromModules(capabilities, agentContext) {
    var selectedModules = selectModules(capabilities);
    var parts = [];
    var includedModules = [];
    var totalTokens = 0;
    for (var _i = 0, selectedModules_1 = selectedModules; _i < selectedModules_1.length; _i++) {
        var module_1 = selectedModules_1[_i];
        parts.push(module_1.content);
        includedModules.push(module_1.id);
        totalTokens += module_1.estimatedTokens;
    }
    // Add agent-specific context if provided
    if (agentContext) {
        parts.push("\n**Agent Context:**\n".concat(agentContext));
        totalTokens += Math.ceil(agentContext.length / 4); // Rough token estimate
    }
    return {
        prompt: parts.join('\n\n---\n\n'),
        includedModules: includedModules,
        estimatedTokens: totalTokens,
    };
}
/**
 * Get default capabilities (all false)
 */
function getDefaultCapabilities() {
    return {
        needsDelegation: false,
        needsSearch: false,
        needsArchitecture: false,
        needsSecurity: false,
        needsTesting: false,
        needsToolGuidance: false,
    };
}
