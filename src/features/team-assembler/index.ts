/**
 * Team Assembler Module
 *
 * Provides intelligent agent team composition based on project analysis.
 * Recommends the optimal set of AI agents for a given tech stack.
 */

// Core assembler functions
export {
  assembleTeam,
  quickAssemble,
  formatResourceSheet,
  getTeamForTask,
} from './assembler.js';

// Registry
export {
  AGENT_REGISTRY,
  TECH_TO_AGENT_MAPPINGS,
  getAgentMetadata,
  getAgentsByCapability,
  getAgentsForTechnology,
  getSkillsForTechnology,
} from './registry.js';

// Types
export type {
  AgentMetadata,
  AgentCapability,
  TeamComposition,
  TeamAssemblerConfig,
  TechToAgentMapping,
} from './types.js';
