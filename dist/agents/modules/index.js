/**
 * Prompt Modules Index
 *
 * Exports all prompt modules and provides utilities for module management.
 */
// Modules
export { coreIdentityModule } from './core.js';
export { delegationRulesModule } from './delegation.js';
export { searchGuidanceModule } from './search.js';
export { architectureGuidanceModule } from './architecture.js';
export { securityRulesModule } from './security.js';
export { memoryAccessModule } from './memory-access.js';
export { testingGuidanceModule } from './testing.js';
export { toolUsageModule } from './tools.js';
export { completionRulesModule } from './completion.js';
import { coreIdentityModule } from './core.js';
import { delegationRulesModule } from './delegation.js';
import { searchGuidanceModule } from './search.js';
import { architectureGuidanceModule } from './architecture.js';
import { securityRulesModule } from './security.js';
import { memoryAccessModule } from './memory-access.js';
import { testingGuidanceModule } from './testing.js';
import { toolUsageModule } from './tools.js';
import { completionRulesModule } from './completion.js';
/**
 * All available prompt modules
 */
export const ALL_MODULES = [
    coreIdentityModule,
    delegationRulesModule,
    searchGuidanceModule,
    architectureGuidanceModule,
    securityRulesModule,
    memoryAccessModule,
    testingGuidanceModule,
    toolUsageModule,
    completionRulesModule,
];
/**
 * Get modules map by ID
 */
export const MODULES_BY_ID = {
    'core-identity': coreIdentityModule,
    'delegation-rules': delegationRulesModule,
    'search-guidance': searchGuidanceModule,
    'architecture-guidance': architectureGuidanceModule,
    'security-rules': securityRulesModule,
    'memory-access': memoryAccessModule,
    'testing-guidance': testingGuidanceModule,
    'tool-usage': toolUsageModule,
    'completion-rules': completionRulesModule,
};
/**
 * Select modules based on task capabilities
 */
export function selectModules(capabilities) {
    return ALL_MODULES.filter((module) => module.alwaysInclude || module.shouldInclude(capabilities));
}
/**
 * Compose a prompt from selected modules
 */
export function composePromptFromModules(capabilities, agentContext) {
    const selectedModules = selectModules(capabilities);
    const parts = [];
    const includedModules = [];
    let totalTokens = 0;
    for (const module of selectedModules) {
        parts.push(module.content);
        includedModules.push(module.id);
        totalTokens += module.estimatedTokens;
    }
    // Add agent-specific context if provided
    if (agentContext) {
        parts.push(`\n**Agent Context:**\n${agentContext}`);
        totalTokens += Math.ceil(agentContext.length / 4); // Rough token estimate
    }
    return {
        prompt: parts.join('\n\n---\n\n'),
        includedModules,
        estimatedTokens: totalTokens,
    };
}
/**
 * Get default capabilities (all false)
 */
export function getDefaultCapabilities() {
    return {
        needsDelegation: false,
        needsSearch: false,
        needsArchitecture: false,
        needsSecurity: false,
        needsTesting: false,
        needsToolGuidance: false,
    };
}
//# sourceMappingURL=index.js.map