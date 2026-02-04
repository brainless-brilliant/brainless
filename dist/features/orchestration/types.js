/**
 * Orchestration Types
 *
 * Types for PM-orchestrated team execution with phases, gates, and decisions.
 * Enables human-team-like autonomous operation with full transparency.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
/**
 * Phase transition rules
 */
export const PHASE_TRANSITIONS = {
    initialized: ['analyzing'],
    analyzing: ['designing', 'failed'],
    designing: ['reviewing_design', 'failed'],
    reviewing_design: ['planning', 'designing', 'failed'], // Can go back to designing if rejected
    planning: ['reviewing_plan', 'failed'],
    reviewing_plan: ['executing', 'planning', 'failed'], // Can go back to planning if rejected
    executing: ['verifying', 'failed', 'paused'],
    verifying: ['completed', 'executing', 'failed'], // Can go back to fix issues
    completed: [],
    failed: [],
    paused: ['executing', 'analyzing', 'designing', 'planning'] // Can resume to various phases
};
/**
 * Agents typically involved in each phase
 */
export const PHASE_AGENTS = {
    initialized: ['pm'],
    analyzing: ['analyst', 'pm'],
    designing: ['architect', 'pm'],
    reviewing_design: ['critic', 'security-reviewer', 'pm'],
    planning: ['planner', 'pm'],
    reviewing_plan: ['critic', 'pm'],
    executing: ['executor', 'pm'],
    verifying: ['code-reviewer', 'qa-tester', 'pm'],
    completed: ['pm'],
    failed: ['pm'],
    paused: ['pm']
};
/**
 * Default orchestration configuration
 */
export const DEFAULT_ORCHESTRATION_CONFIG = {
    require_pm_approval: true,
    require_user_approval: false, // PM handles most approvals
    max_revisions: 3,
    enable_debates: true,
    max_debate_rounds: 3,
    auto_approve_low_risk: false
};
//# sourceMappingURL=types.js.map