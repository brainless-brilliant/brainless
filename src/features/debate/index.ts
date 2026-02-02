/**
 * Debate Module
 *
 * Inter-agent debate and communication for autonomous team operation.
 *
 * © Brainless Technologies Pvt. Ltd.
 */

// Export types
export {
  DebateMessageType,
  DebateStatus,
  ConcernPriority,
  DebateMessage,
  CrossCuttingConcern,
  DebateResolution,
  DebateRoom,
  DebateSummary,
  DebateConfig,
  DEFAULT_DEBATE_CONFIG
} from './types.js';

// Export room management functions
export {
  // Path utilities
  getDebatesDir,
  ensureDebatesDir,
  
  // ID generators
  generateDebateId,
  generateMessageId,
  generateConcernId,
  
  // Debate lifecycle
  createDebate,
  saveDebate,
  loadDebate,
  listDebates,
  getDebateSummary,
  
  // Messages
  addMessage,
  addProposal,
  addCounter,
  
  // Concerns
  raiseConcern,
  resolveConcern,
  getActiveConcerns,
  getBlockers,
  
  // Rounds and resolution
  advanceRound,
  resolveDebate,
  
  // Display
  formatDebate
} from './room.js';
