/**
 * Model Routing Types
 *
 * Type definitions for the intelligent model routing system that routes
 * sub-agent tasks to appropriate models (Opus/Sonnet/Haiku) based on
 * task complexity.
 */
/**
 * Model tier mapping to actual Claude models
 */
export const TIER_MODELS = {
    LOW: 'claude-haiku-4-5-20251001',
    MEDIUM: 'claude-sonnet-4-5-20250929',
    HIGH: 'claude-opus-4-5-20251101',
};
/**
 * Model tier to simple model type mapping
 */
export const TIER_TO_MODEL_TYPE = {
    LOW: 'haiku',
    MEDIUM: 'sonnet',
    HIGH: 'opus',
};
/**
 * Default routing configuration
 *
 * ALL agents are adaptive except orchestrators.
 * Agent overrides are only for orchestrator-brainless (fixed to Opus).
 */
export const DEFAULT_ROUTING_CONFIG = {
    enabled: true,
    defaultTier: 'MEDIUM',
    escalationEnabled: false, // Deprecated: orchestrator routes proactively
    maxEscalations: 0,
    tierModels: TIER_MODELS,
    agentOverrides: {
        // Only orchestrators are fixed - they need Opus to analyze and delegate
        'coordinator': { tier: 'HIGH', reason: 'Orchestrator requires Opus to analyze and delegate' },
    },
    escalationKeywords: [
        'critical', 'production', 'urgent', 'security', 'breaking',
        'architecture', 'refactor', 'redesign', 'root cause',
    ],
    simplificationKeywords: [
        'find', 'list', 'show', 'where', 'search', 'locate', 'grep',
    ],
};
/**
 * Agent categories and their default complexity tiers
 */
export const AGENT_CATEGORY_TIERS = {
    exploration: 'LOW',
    utility: 'LOW',
    specialist: 'MEDIUM',
    orchestration: 'MEDIUM',
    advisor: 'HIGH',
    planner: 'HIGH',
    reviewer: 'HIGH',
};
/**
 * Keywords for complexity detection
 */
export const COMPLEXITY_KEYWORDS = {
    architecture: [
        'architecture', 'refactor', 'redesign', 'restructure', 'reorganize',
        'decouple', 'modularize', 'abstract', 'pattern', 'design',
    ],
    debugging: [
        'debug', 'diagnose', 'root cause', 'investigate', 'trace', 'analyze',
        'why is', 'figure out', 'understand why', 'not working',
    ],
    simple: [
        'find', 'search', 'locate', 'list', 'show', 'where is', 'what is',
        'get', 'fetch', 'display', 'print',
    ],
    risk: [
        'critical', 'production', 'urgent', 'security', 'breaking', 'dangerous',
        'irreversible', 'data loss', 'migration', 'deploy',
    ],
};
export const TIER_PROMPT_STRATEGIES = {
    HIGH: 'full',
    MEDIUM: 'balanced',
    LOW: 'concise',
};
//# sourceMappingURL=types.js.map