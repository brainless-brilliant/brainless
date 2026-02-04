/**
 * Transcript Logger
 *
 * Handles logging, reading, and managing agent activity transcripts.
 * Stores activities in JSONL format for efficient append operations.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
import { AgentActivity, DebateRoom, DebateMessage, DebateMessageType, Decision, TranscriptSummary, TranscriptConfig } from './types.js';
/**
 * Get the transcript directory path
 */
export declare function getTranscriptDir(workingDir?: string): string;
/**
 * Get the path to the main activity log file
 */
export declare function getActivityLogPath(workingDir?: string): string;
/**
 * Get the path to debates directory
 */
export declare function getDebatesDir(workingDir?: string): string;
/**
 * Get the path to decisions log
 */
export declare function getDecisionsPath(workingDir?: string): string;
/**
 * Ensure transcript directories exist
 */
export declare function ensureTranscriptDirs(workingDir?: string): void;
/**
 * Generate a unique activity ID
 */
export declare function generateActivityId(): string;
/**
 * Generate a unique debate ID
 */
export declare function generateDebateId(): string;
/**
 * Generate a unique decision ID
 */
export declare function generateDecisionId(): string;
/**
 * Truncate a string to max length with ellipsis
 */
export declare function truncateSummary(text: string, maxLength?: number): string;
/**
 * Log an agent activity
 */
export declare function logActivity(activity: Omit<AgentActivity, 'id' | 'timestamp'>, workingDir?: string, config?: Partial<TranscriptConfig>): AgentActivity;
/**
 * Read all activities for a session
 */
export declare function getActivities(sessionId?: string, workingDir?: string): AgentActivity[];
/**
 * Get recent activities (last N)
 */
export declare function getRecentActivities(count?: number, workingDir?: string): AgentActivity[];
/**
 * Log a decision
 */
export declare function logDecision(decision: Omit<Decision, 'id' | 'timestamp'>, workingDir?: string): Decision;
/**
 * Get all decisions
 */
export declare function getDecisions(workingDir?: string): Decision[];
/**
 * Create a new debate room
 */
export declare function createDebateRoom(topic: string, participants: string[], moderator: string, orchestrationId?: string, workingDir?: string): DebateRoom;
/**
 * Save debate room to file
 */
export declare function saveDebateRoom(room: DebateRoom, workingDir?: string): void;
/**
 * Load a debate room
 */
export declare function loadDebateRoom(debateId: string, workingDir?: string): DebateRoom | null;
/**
 * Add a message to a debate room
 */
export declare function addDebateMessage(debateId: string, from: string, type: DebateMessageType, content: string, references?: string[], workingDir?: string): DebateMessage | null;
/**
 * Resolve a debate with a decision
 */
export declare function resolveDebate(debateId: string, decidedBy: string, decision: string, rationale: string, dissenters?: string[], workingDir?: string): DebateRoom | null;
/**
 * Generate transcript summary
 */
export declare function getTranscriptSummary(sessionId?: string, workingDir?: string): TranscriptSummary;
/**
 * Format transcript as human-readable text
 */
export declare function formatTranscript(sessionId?: string, workingDir?: string): string;
/**
 * Format timeline view
 */
export declare function formatTimeline(sessionId?: string, workingDir?: string): string;
/**
 * Clear all transcript data
 */
export declare function clearTranscript(workingDir?: string): void;
//# sourceMappingURL=logger.d.ts.map