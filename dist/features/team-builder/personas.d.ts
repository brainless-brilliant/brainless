/**
 * Agent Personas & Human-Friendly Names
 *
 * Gives each agent a personality, nickname, and witty introduction.
 */
export interface AgentPersona {
    /** Technical agent ID */
    id: string;
    /** Human-friendly name */
    name: string;
    /** Job title */
    title: string;
    /** Personality trait */
    personality: string;
    /** Witty intro for transcript */
    intro: string;
    /** Emoji */
    emoji: string;
}
export declare const AGENT_PERSONAS: Record<string, AgentPersona>;
/**
 * Get persona for an agent
 */
export declare function getPersona(agentId: string): AgentPersona | null;
/**
 * Generate team introduction for transcript
 */
export declare function formatTeamIntro(agentIds: string[]): string;
/**
 * Generate sarcastic/witty runtime messages
 */
export declare function getWittyMessage(event: 'team-assembly' | 'memory-search' | 'fallback' | 'haiku-success' | 'api-error'): string;
//# sourceMappingURL=personas.d.ts.map