/**
 * Debate Room Management
 *
 * Handles creating, managing, and resolving inter-agent debates.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
import { DebateRoom, DebateMessage, DebateMessageType, DebateSummary, CrossCuttingConcern, ConcernPriority, DebateConfig } from './types.js';
/**
 * Get debates directory path
 */
export declare function getDebatesDir(workingDir?: string): string;
/**
 * Ensure debates directory exists
 */
export declare function ensureDebatesDir(workingDir?: string): void;
/**
 * Generate debate ID
 */
export declare function generateDebateId(): string;
/**
 * Generate message ID
 */
export declare function generateMessageId(): string;
/**
 * Generate concern ID
 */
export declare function generateConcernId(): string;
/**
 * Create a new debate room
 */
export declare function createDebate(topic: string, participants: string[], moderator?: string, context?: string, orchestrationId?: string, workingDir?: string, config?: Partial<DebateConfig>): DebateRoom;
/**
 * Save debate room to file
 */
export declare function saveDebate(room: DebateRoom, workingDir?: string): void;
/**
 * Load a debate room
 */
export declare function loadDebate(debateId: string, workingDir?: string): DebateRoom | null;
/**
 * List all debates
 */
export declare function listDebates(workingDir?: string): DebateSummary[];
/**
 * Get debate summary
 */
export declare function getDebateSummary(room: DebateRoom): DebateSummary;
/**
 * Add a message to a debate
 */
export declare function addMessage(debateId: string, from: string, type: DebateMessageType, content: string, references?: string[], tags?: string[], priority?: ConcernPriority, workingDir?: string): DebateMessage | null;
/**
 * Add a proposal to the debate
 */
export declare function addProposal(debateId: string, from: string, proposal: string, workingDir?: string): DebateMessage | null;
/**
 * Add a counter-argument
 */
export declare function addCounter(debateId: string, from: string, counter: string, referencedProposalId?: string, workingDir?: string): DebateMessage | null;
/**
 * Raise a cross-cutting concern
 */
export declare function raiseConcern(debateId: string, from: string, description: string, affects: string[], priority?: ConcernPriority, options?: string[], workingDir?: string): CrossCuttingConcern | null;
/**
 * Resolve a concern
 */
export declare function resolveConcern(debateId: string, concernId: string, resolution: string, resolvedBy: string, workingDir?: string): CrossCuttingConcern | null;
/**
 * Advance debate to next round
 */
export declare function advanceRound(debateId: string, workingDir?: string): DebateRoom | null;
/**
 * Resolve a debate with a decision
 */
export declare function resolveDebate(debateId: string, decision: string, rationale: string, decidedBy?: string, wasConsensus?: boolean, winningProposalId?: string, dissenters?: string[], workingDir?: string): DebateRoom | null;
/**
 * Format debate as readable text
 */
export declare function formatDebate(debateId: string, workingDir?: string): string;
/**
 * Get active concerns (unresolved)
 */
export declare function getActiveConcerns(debateId: string, workingDir?: string): CrossCuttingConcern[];
/**
 * Get unresolved blockers
 */
export declare function getBlockers(debateId: string, workingDir?: string): CrossCuttingConcern[];
//# sourceMappingURL=room.d.ts.map