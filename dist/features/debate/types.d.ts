/**
 * Debate Types
 *
 * Data structures for inter-agent debate and communication.
 * Enables agents to propose, counter, and reach consensus.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
/**
 * Types of messages in a debate
 */
export type DebateMessageType = 'proposal' | 'counter' | 'support' | 'question' | 'clarify' | 'concern' | 'acknowledge' | 'decision';
/**
 * Status of a debate
 */
export type DebateStatus = 'active' | 'resolved' | 'consensus' | 'escalated' | 'abandoned';
/**
 * Priority levels for concerns
 */
export type ConcernPriority = 'low' | 'medium' | 'high' | 'blocker';
/**
 * Single message in a debate
 */
export interface DebateMessage {
    /** Unique message ID */
    id: string;
    /** ISO timestamp */
    timestamp: string;
    /** Agent who sent the message */
    from: string;
    /** Type of message */
    type: DebateMessageType;
    /** Message content */
    content: string;
    /** References to previous message IDs */
    references?: string[];
    /** Tags/categories */
    tags?: string[];
    /** Priority (for concerns) */
    priority?: ConcernPriority;
}
/**
 * Cross-cutting concern raised during debate
 */
export interface CrossCuttingConcern {
    /** Unique ID */
    id: string;
    /** Description of the concern */
    description: string;
    /** Agent who raised it */
    raised_by: string;
    /** Areas/components affected */
    affects: string[];
    /** Priority level */
    priority: ConcernPriority;
    /** Proposed options to address */
    options: string[];
    /** Resolution (if resolved) */
    resolution?: string;
    /** Who resolved it */
    resolved_by?: string;
    /** ISO timestamp when raised */
    raised_at: string;
    /** ISO timestamp when resolved */
    resolved_at?: string;
}
/**
 * Resolution of a debate
 */
export interface DebateResolution {
    /** Who made the final decision */
    decided_by: string;
    /** The decision made */
    decision: string;
    /** Rationale for the decision */
    rationale: string;
    /** Source message ID of the winning proposal */
    winning_proposal_id?: string;
    /** Agents who disagreed */
    dissenters?: string[];
    /** Was this a consensus or PM override? */
    was_consensus: boolean;
    /** ISO timestamp of resolution */
    timestamp: string;
}
/**
 * A debate room where agents discuss a topic
 */
export interface DebateRoom {
    /** Unique room ID */
    id: string;
    /** Topic of debate */
    topic: string;
    /** Detailed context */
    context?: string;
    /** ISO timestamp when created */
    created_at: string;
    /** Participating agents */
    participants: string[];
    /** Moderator (usually PM) */
    moderator: string;
    /** All messages in the debate */
    messages: DebateMessage[];
    /** Cross-cutting concerns raised */
    concerns: CrossCuttingConcern[];
    /** Current round (for limiting iterations) */
    round: number;
    /** Maximum rounds allowed */
    max_rounds: number;
    /** Current status */
    status: DebateStatus;
    /** Resolution if debate is resolved */
    resolution?: DebateResolution;
    /** Orchestration ID if part of a /team session */
    orchestration_id?: string;
}
/**
 * Summary of a debate for display
 */
export interface DebateSummary {
    /** Debate ID */
    id: string;
    /** Topic */
    topic: string;
    /** Participants */
    participants: string[];
    /** Number of messages */
    message_count: number;
    /** Number of concerns raised */
    concern_count: number;
    /** Status */
    status: DebateStatus;
    /** Duration */
    duration: string;
    /** Decision (if resolved) */
    decision?: string;
}
/**
 * Configuration for debate behavior
 */
export interface DebateConfig {
    /** Maximum rounds before forcing decision */
    max_rounds: number;
    /** Require PM approval for resolution */
    require_pm_decision: boolean;
    /** Auto-escalate blockers to user */
    escalate_blockers: boolean;
    /** Minimum proposals before decision */
    min_proposals: number;
}
/**
 * Default debate configuration
 */
export declare const DEFAULT_DEBATE_CONFIG: DebateConfig;
//# sourceMappingURL=types.d.ts.map