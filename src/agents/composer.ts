/**
 * Prompt Composer
 *
 * Composes agent prompts dynamically based on task capabilities.
 * Integrates with the model routing system to provide task-optimized prompts.
 */

import type { TaskCapabilities, ComposedPrompt } from './modules/types.js';
import { composePromptFromModules, getDefaultCapabilities } from './modules/index.js';

/**
 * Compose a prompt for a given task
 */
export function composePromptForTask(
  taskPrompt: string,
  capabilities: TaskCapabilities,
  agentType?: string
): ComposedPrompt {
  // Get agent-specific context if needed
  const agentContext = getAgentContext(agentType);
  
  // Compose from modules based on capabilities
  return composePromptFromModules(capabilities, agentContext);
}

/**
 * Get minimal agent-specific context
 */
function getAgentContext(agentType?: string): string | undefined {
  if (!agentType) return undefined;

  const agentContexts: Record<string, string> = {
    coordinator: 'You are the orchestrator. Analyze, plan, and delegate.',
    executor: 'You are the executor. Complete tasks directly. NEVER delegate.',
    explore: 'You are the explorer. Find files and information quickly.',
    architect: 'You are the architect. Design and refactor with care.',
    researcher: 'You are the researcher. Investigate deeply.',
  };

  return agentContexts[agentType];
}

/**
 * Quick compose for simple search tasks
 */
export function composeSearchPrompt(): ComposedPrompt {
  return composePromptFromModules({
    ...getDefaultCapabilities(),
    needsSearch: true,
  });
}

/**
 * Quick compose for delegation tasks
 */
export function composeDelegationPrompt(): ComposedPrompt {
  return composePromptFromModules({
    ...getDefaultCapabilities(),
    needsDelegation: true,
  });
}

/**
 * Quick compose for architecture tasks
 */
export function composeArchitecturePrompt(): ComposedPrompt {
  return composePromptFromModules({
    ...getDefaultCapabilities(),
    needsArchitecture: true,
  });
}

// Re-export types and functions from modules
export type { TaskCapabilities, ComposedPrompt } from './modules/types.js';
export {
  selectModules,
  composePromptFromModules,
  getDefaultCapabilities,
  ALL_MODULES,
} from './modules/index.js';
