/**
 * Transcript Types
 *
 * Data structures for the Agent Activity Transcript system.
 * Captures who did what, when, and enables full audit trails.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
/**
 * Actions an agent can take
 */
export type AgentAction = 'spawned' | 'completed' | 'failed' | 'delegated' | 'proposed' | 'approved' | 'rejected' | 'debated' | 'decided' | 'gate_pending' | 'gate_passed';
/**
 * Single agent activity record
 */
export interface AgentActivity {
    /** Unique activity ID */
    id: string;
    /** ISO timestamp */
    timestamp: string;
    /** Claude session ID */
    session_id: string;
    /** Agent identifier (e.g., brainless:architect) */
    agent: string;
    /** What action occurred */
    action: AgentAction;
    /** Summary of input/task given to agent */
    input_summary: string;
    /** Summary of output/result (if completed) */
    output_summary?: string;
    /** Duration in milliseconds */
    duration_ms?: number;
    /** Parent activity ID if spawned by another agent */
    parent_activity_id?: string;
    /** Orchestration ID if part of a /team session */
    orchestration_id?: string;
    /** Additional metadata */
    metadata?: Record<string, unknown>;
}
/**
 * Types of messages in a debate
 */
export type DebateMessageType = 'proposal' | 'counter' | 'support' | 'question' | 'clarify' | 'decision';
/**
 * Single message in a debate room
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
    /** References to previous message IDs being responded to */
    references?: string[];
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
    /** Agents who disagreed */
    dissenters?: string[];
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
    /** ISO timestamp when created */
    created_at: string;
    /** Participating agents */
    participants: string[];
    /** Moderator (usually PM) */
    moderator: string;
    /** All messages in the debate */
    messages: DebateMessage[];
    /** Current status */
    status: 'active' | 'resolved' | 'escalated' | 'abandoned';
    /** Resolution if debate is resolved */
    resolution?: DebateResolution;
    /** Orchestration ID if part of a /team session */
    orchestration_id?: string;
}
/**
 * PM Decision record
 */
export interface Decision {
    /** Unique decision ID */
    id: string;
    /** ISO timestamp */
    timestamp: string;
    /** Orchestration phase when decision was made */
    phase: string;
    /** Topic/question being decided */
    topic: string;
    /** Available options considered */
    options: string[];
    /** The chosen option */
    chosen: string;
    /** Rationale for the decision */
    rationale: string;
    /** Who made the decision */
    made_by: string;
    /** Debate room ID if decision came from a debate */
    debate_id?: string;
}
/**
 * Approval gate status
 */
export interface ApprovalGate {
    /** Unique gate ID */
    id: string;
    /** Phase this gate belongs to */
    phase: string;
    /** Who needs to approve (pm, user, or specific agent) */
    requires_approval_from: 'pm' | 'user' | string;
    /** What is being proposed for approval */
    proposal: string;
    /** Summary of the artifact to approve */
    artifact_summary?: string;
    /** Current status */
    status: 'pending' | 'approved' | 'rejected';
    /** Feedback if rejected */
    feedback?: string;
    /** ISO timestamp when status changed */
    resolved_at?: string;
}
/**
 * Transcript summary for quick viewing
 */
export interface TranscriptSummary {
    /** Session ID */
    session_id: string;
    /** Total activities logged */
    total_activities: number;
    /** Unique agents involved */
    agents_involved: string[];
    /** Number of decisions made */
    decisions_made: number;
    /** Number of debates held */
    debates_held: number;
    /** Start time */
    started_at: string;
    /** End time (if session completed) */
    ended_at?: string;
    /** Total duration in milliseconds */
    total_duration_ms?: number;
    /** Final status */
    status: 'active' | 'completed' | 'failed';
}
/**
 * Configuration for transcript logging
 */
export interface TranscriptConfig {
    /** Whether logging is enabled */
    enabled: boolean;
    /** Maximum length for summaries (truncate if longer) */
    max_summary_length: number;
    /** Directory to store transcripts */
    transcript_dir: string;
    /** Whether to log to console as well */
    console_logging: boolean;
    /** Log level for console */
    log_level: 'verbose' | 'normal' | 'minimal';
}
/**
 * Default transcript configuration
 */
export declare const DEFAULT_TRANSCRIPT_CONFIG: TranscriptConfig;
//# sourceMappingURL=types.d.ts.map