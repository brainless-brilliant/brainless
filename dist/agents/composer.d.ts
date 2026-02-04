/**
 * Prompt Composer
 *
 * Composes agent prompts dynamically based on task capabilities.
 * Integrates with the model routing system to provide task-optimized prompts.
 */
import type { TaskCapabilities, ComposedPrompt } from './modules/types.js';
/**
 * Compose a prompt for a given task
 */
export declare function composePromptForTask(taskPrompt: string, capabilities: TaskCapabilities, agentType?: string): ComposedPrompt;
/**
 * Quick compose for simple search tasks
 */
export declare function composeSearchPrompt(): ComposedPrompt;
/**
 * Quick compose for delegation tasks
 */
export declare function composeDelegationPrompt(): ComposedPrompt;
/**
 * Quick compose for architecture tasks
 */
export declare function composeArchitecturePrompt(): ComposedPrompt;
export type { TaskCapabilities, ComposedPrompt } from './modules/types.js';
export { selectModules, composePromptFromModules, getDefaultCapabilities, ALL_MODULES, } from './modules/index.js';
//# sourceMappingURL=composer.d.ts.map