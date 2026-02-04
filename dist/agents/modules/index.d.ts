/**
 * Prompt Modules Index
 *
 * Exports all prompt modules and provides utilities for module management.
 */
export type { PromptModuleId, TaskCapabilities, PromptModule, ComposedPrompt, } from './types.js';
export { coreIdentityModule } from './core.js';
export { delegationRulesModule } from './delegation.js';
export { searchGuidanceModule } from './search.js';
export { architectureGuidanceModule } from './architecture.js';
export { securityRulesModule } from './security.js';
export { memoryAccessModule } from './memory-access.js';
export { testingGuidanceModule } from './testing.js';
export { toolUsageModule } from './tools.js';
export { completionRulesModule } from './completion.js';
import type { PromptModule, TaskCapabilities, ComposedPrompt, PromptModuleId } from './types.js';
/**
 * All available prompt modules
 */
export declare const ALL_MODULES: PromptModule[];
/**
 * Get modules map by ID
 */
export declare const MODULES_BY_ID: Record<PromptModuleId, PromptModule>;
/**
 * Select modules based on task capabilities
 */
export declare function selectModules(capabilities: TaskCapabilities): PromptModule[];
/**
 * Compose a prompt from selected modules
 */
export declare function composePromptFromModules(capabilities: TaskCapabilities, agentContext?: string): ComposedPrompt;
/**
 * Get default capabilities (all false)
 */
export declare function getDefaultCapabilities(): TaskCapabilities;
//# sourceMappingURL=index.d.ts.map