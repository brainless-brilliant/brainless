/**
 * Debate Module
 *
 * Inter-agent debate and communication for autonomous team operation.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
export { DebateMessageType, DebateStatus, ConcernPriority, DebateMessage, CrossCuttingConcern, DebateResolution, DebateRoom, DebateSummary, DebateConfig, DEFAULT_DEBATE_CONFIG } from './types.js';
export { getDebatesDir, ensureDebatesDir, generateDebateId, generateMessageId, generateConcernId, createDebate, saveDebate, loadDebate, listDebates, getDebateSummary, addMessage, addProposal, addCounter, raiseConcern, resolveConcern, getActiveConcerns, getBlockers, advanceRound, resolveDebate, formatDebate } from './room.js';
//# sourceMappingURL=index.d.ts.map