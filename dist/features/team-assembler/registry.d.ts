/**
 * Agent Registry
 *
 * Defines all available agents and their capabilities,
 * plus mappings from technologies to relevant agents.
 */
import type { AgentMetadata, TechToAgentMapping } from './types.js';
/**
 * Registry of all available agents with their metadata
 */
export declare const AGENT_REGISTRY: AgentMetadata[];
/**
 * Mappings from technologies to relevant agents and skills
 */
export declare const TECH_TO_AGENT_MAPPINGS: TechToAgentMapping[];
/**
 * Get agent metadata by name
 */
export declare function getAgentMetadata(name: string): AgentMetadata | undefined;
/**
 * Get all agents with a specific capability
 */
export declare function getAgentsByCapability(capability: string): AgentMetadata[];
/**
 * Get agents that specialize in a technology
 */
export declare function getAgentsForTechnology(tech: string): string[];
/**
 * Get skills relevant to a technology
 */
export declare function getSkillsForTechnology(tech: string): string[];
//# sourceMappingURL=registry.d.ts.map