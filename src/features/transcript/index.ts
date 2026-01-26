/**
 * Transcript Module
 *
 * Agent Activity Transcript system for tracking, logging, and viewing
 * all agent activities, debates, and decisions.
 *
 * © Brainless Technologies Pvt. Ltd.
 */

// Export types
export {
  AgentAction,
  AgentActivity,
  DebateMessageType,
  DebateMessage,
  DebateResolution,
  DebateRoom,
  Decision,
  ApprovalGate,
  TranscriptSummary,
  TranscriptConfig,
  DEFAULT_TRANSCRIPT_CONFIG
} from './types.js';

// Export logger functions
export {
  // Path utilities
  getTranscriptDir,
  getActivityLogPath,
  getDebatesDir,
  getDecisionsPath,
  ensureTranscriptDirs,
  
  // ID generators
  generateActivityId,
  generateDebateId,
  generateDecisionId,
  
  // Activity logging
  logActivity,
  getActivities,
  getRecentActivities,
  
  // Decision logging
  logDecision,
  getDecisions,
  
  // Debate management
  createDebateRoom,
  saveDebateRoom,
  loadDebateRoom,
  addDebateMessage,
  resolveDebate,
  
  // Summary and formatting
  getTranscriptSummary,
  formatTranscript,
  formatTimeline,
  
  // Utilities
  truncateSummary,
  clearTranscript
} from './logger.js';

/**
 * Quick activity logging helper
 */
export function quickLog(
  agent: string,
  action: import('./types.js').AgentAction,
  summary: string,
  sessionId: string = 'cli-session',
  workingDir?: string
): import('./types.js').AgentActivity {
  const { logActivity } = require('./logger.js');
  return logActivity({
    session_id: sessionId,
    agent,
    action,
    input_summary: summary
  }, workingDir);
}
