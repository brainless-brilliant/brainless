/**
 * Team Assembler Types
 *
 * Type definitions for agent selection and team provisioning.
 */

import type { ProjectScanResult, AgentRecommendation } from '../project-scanner/types.js';

/**
 * Agent metadata for team assembly
 */
export interface AgentMetadata {
  /** Unique agent identifier */
  name: string;

  /** Human-readable display name */
  displayName: string;

  /** Brief description of agent's role */
  description: string;

  /** Agent's primary capabilities */
  capabilities: AgentCapability[];

  /** Technologies this agent specializes in */
  specializations: string[];

  /** Default model tier (haiku, sonnet, opus) */
  defaultTier: 'haiku' | 'sonnet' | 'opus';

  /** Tags for matching */
  tags: string[];
}

/**
 * Agent capabilities
 */
export type AgentCapability =
  | 'planning'
  | 'coding'
  | 'reviewing'
  | 'testing'
  | 'debugging'
  | 'security'
  | 'design'
  | 'documentation'
  | 'analysis'
  | 'research'
  | 'optimization';

/**
 * Team composition result
 */
export interface TeamComposition {
  /** The project scan that triggered this composition */
  scanResult: ProjectScanResult;

  /** Core agents always included */
  coreAgents: AgentRecommendation[];

  /** Tech-specific agents based on detected stack */
  techAgents: AgentRecommendation[];

  /** All recommended agents combined */
  allAgents: AgentRecommendation[];

  /** Skills to inject as context */
  skillsToInject: string[];

  /** Human-readable summary */
  summary: string;

  /** Timestamp */
  assembledAt: Date;
}

/**
 * Configuration for team assembly
 */
export interface TeamAssemblerConfig {
  /** Maximum number of agents to recommend */
  maxAgents?: number;

  /** Minimum relevance score (0-1) */
  minRelevance?: number;

  /** Always include core agents */
  includeCoreAgents?: boolean;

  /** Additional agent metadata */
  customAgents?: AgentMetadata[];
}

/**
 * Mapping from technology to agents
 */
export interface TechToAgentMapping {
  /** Technology name (from scanner) */
  technology: string;

  /** Agents that specialize in this technology */
  agents: string[];

  /** Skills relevant to this technology */
  skills: string[];

  /** Base relevance score for this mapping */
  relevance: number;
}
