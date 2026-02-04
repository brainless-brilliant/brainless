/**
 * OMC HUD Type Definitions
 *
 * Type definitions for the HUD state, configuration, and rendering.
 */
export const DEFAULT_HUD_CONFIG = {
    preset: 'focused',
    elements: {
        omcLabel: true,
        rateLimits: true, // Show rate limits by default
        ralph: true,
        autopilot: true,
        prdStory: true,
        activeSkills: true,
        contextBar: true,
        agents: true,
        agentsFormat: 'multiline', // Multi-line for rich agent visualization
        agentsMaxLines: 5, // Show up to 5 agent detail lines
        backgroundTasks: true,
        todos: true,
        lastSkill: true,
        permissionStatus: false, // Disabled: heuristic-based, causes false positives
        thinking: true,
        sessionHealth: true,
        useBars: false, // Disabled by default for backwards compatibility
    },
    thresholds: {
        contextWarning: 70,
        contextCompactSuggestion: 80,
        contextCritical: 85,
        ralphWarning: 7,
    },
};
export const PRESET_CONFIGS = {
    minimal: {
        omcLabel: true,
        rateLimits: true,
        ralph: true,
        autopilot: true,
        prdStory: false,
        activeSkills: true,
        lastSkill: true,
        contextBar: false,
        agents: true,
        agentsFormat: 'count', // Just count for minimal mode
        agentsMaxLines: 0,
        backgroundTasks: false,
        todos: true,
        permissionStatus: false,
        thinking: false,
        sessionHealth: false,
        useBars: false,
    },
    analytics: {
        omcLabel: false,
        rateLimits: false,
        ralph: false,
        autopilot: false,
        prdStory: false,
        activeSkills: false,
        lastSkill: false,
        contextBar: false,
        agents: true,
        agentsFormat: 'codes',
        agentsMaxLines: 0,
        backgroundTasks: false,
        todos: true,
        permissionStatus: false,
        thinking: false,
        sessionHealth: false,
        useBars: false,
    },
    focused: {
        omcLabel: true,
        rateLimits: true,
        ralph: true,
        autopilot: true,
        prdStory: true,
        activeSkills: true,
        lastSkill: true,
        contextBar: true,
        agents: true,
        agentsFormat: 'multiline', // Multi-line for rich visualization
        agentsMaxLines: 3, // Show up to 3 agents
        backgroundTasks: true,
        todos: true,
        permissionStatus: false, // Disabled: heuristic unreliable
        thinking: true,
        sessionHealth: true,
        useBars: true,
    },
    full: {
        omcLabel: true,
        rateLimits: true,
        ralph: true,
        autopilot: true,
        prdStory: true,
        activeSkills: true,
        lastSkill: true,
        contextBar: true,
        agents: true,
        agentsFormat: 'multiline', // Multi-line with more details
        agentsMaxLines: 10, // Show many agents in full mode
        backgroundTasks: true,
        todos: true,
        permissionStatus: false, // Disabled: heuristic unreliable
        thinking: true,
        sessionHealth: true,
        useBars: true,
    },
    opencode: {
        omcLabel: true,
        rateLimits: false,
        ralph: true,
        autopilot: true,
        prdStory: false,
        activeSkills: true,
        lastSkill: true,
        contextBar: true,
        agents: true,
        agentsFormat: 'codes',
        agentsMaxLines: 0,
        backgroundTasks: false,
        todos: true,
        permissionStatus: false, // Disabled: heuristic unreliable
        thinking: true,
        sessionHealth: true,
        useBars: false,
    },
    dense: {
        omcLabel: true,
        rateLimits: true,
        ralph: true,
        autopilot: true,
        prdStory: true,
        activeSkills: true,
        lastSkill: true,
        contextBar: true,
        agents: true,
        agentsFormat: 'multiline',
        agentsMaxLines: 5,
        backgroundTasks: true,
        todos: true,
        permissionStatus: false, // Disabled: heuristic unreliable
        thinking: true,
        sessionHealth: true,
        useBars: true,
    },
};
//# sourceMappingURL=types.js.map