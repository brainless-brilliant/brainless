/**
 * Transcript Module
 *
 * Agent Activity Transcript system for tracking, logging, and viewing
 * all agent activities, debates, and decisions.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
export { AgentAction, AgentActivity, DebateMessageType, DebateMessage, DebateResolution, DebateRoom, Decision, ApprovalGate, TranscriptSummary, TranscriptConfig, DEFAULT_TRANSCRIPT_CONFIG } from './types.js';
export { getTranscriptDir, getActivityLogPath, getDebatesDir, getDecisionsPath, ensureTranscriptDirs, generateActivityId, generateDebateId, generateDecisionId, logActivity, getActivities, getRecentActivities, logDecision, getDecisions, createDebateRoom, saveDebateRoom, loadDebateRoom, addDebateMessage, resolveDebate, getTranscriptSummary, formatTranscript, formatTimeline, truncateSummary, clearTranscript } from './logger.js';
/**
 * Quick activity logging helper
 */
export declare function quickLog(agent: string, action: import('./types.js').AgentAction, summary: string, sessionId?: string, workingDir?: string): import('./types.js').AgentActivity;
//# sourceMappingURL=index.d.ts.map