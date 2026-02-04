/**
 * Orchestration State Machine
 *
 * Manages orchestration state transitions, gate handling, and persistence.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
import { OrchestrationState, OrchestrationPhase, OrchestrationDecision, OrchestrationGate, OrchestrationSummary, OrchestrationConfig } from './types.js';
/**
 * Get orchestration state directory
 */
export declare function getOrchestrationDir(workingDir?: string): string;
/**
 * Get path to orchestration state file
 */
export declare function getStatePath(orchestrationId: string, workingDir?: string): string;
/**
 * Get current active orchestration file path
 */
export declare function getActiveOrchestrationPath(workingDir?: string): string;
/**
 * Ensure orchestration directory exists
 */
export declare function ensureOrchestrationDir(workingDir?: string): void;
/**
 * Generate orchestration ID
 */
export declare function generateOrchestrationId(): string;
/**
 * Generate gate ID
 */
export declare function generateGateId(): string;
/**
 * Generate decision ID
 */
export declare function generateDecisionId(): string;
/**
 * Create a new orchestration
 */
export declare function createOrchestration(task: string, sessionId: string, workingDir?: string, config?: Partial<OrchestrationConfig>): OrchestrationState;
/**
 * Save orchestration state
 */
export declare function saveOrchestration(state: OrchestrationState, workingDir?: string): void;
/**
 * Load orchestration state
 */
export declare function loadOrchestration(orchestrationId: string, workingDir?: string): OrchestrationState | null;
/**
 * Set active orchestration
 */
export declare function setActiveOrchestration(orchestrationId: string, workingDir?: string): void;
/**
 * Get active orchestration
 */
export declare function getActiveOrchestration(workingDir?: string): OrchestrationState | null;
/**
 * Clear active orchestration
 */
export declare function clearActiveOrchestration(workingDir?: string): void;
/**
 * Check if phase transition is valid
 */
export declare function canTransition(from: OrchestrationPhase, to: OrchestrationPhase): boolean;
/**
 * Get next expected phase
 */
export declare function getNextPhase(current: OrchestrationPhase): OrchestrationPhase | null;
/**
 * Transition to next phase
 */
export declare function transitionPhase(orchestrationId: string, targetPhase: OrchestrationPhase, workingDir?: string): OrchestrationState | null;
/**
 * Create an approval gate
 */
export declare function createGate(orchestrationId: string, targetPhase: OrchestrationPhase, proposalSummary: string, requiresApprovalFrom?: 'pm' | 'user' | 'architect' | 'critic', artifactPath?: string, workingDir?: string): OrchestrationGate | null;
/**
 * Approve a gate
 */
export declare function approveGate(orchestrationId: string, gateId: string, approvedBy?: string, workingDir?: string): OrchestrationState | null;
/**
 * Reject a gate
 */
export declare function rejectGate(orchestrationId: string, gateId: string, feedback: string, rejectedBy?: string, workingDir?: string): OrchestrationState | null;
/**
 * Record a decision
 */
export declare function recordDecision(orchestrationId: string, topic: string, options: string[], chosen: string, rationale: string, madeBy?: string, debateId?: string, workingDir?: string): OrchestrationDecision | null;
/**
 * Fail orchestration
 */
export declare function failOrchestration(orchestrationId: string, reason: string, workingDir?: string): OrchestrationState | null;
/**
 * Get orchestration summary for display
 */
export declare function getOrchestrationSummary(orchestrationId: string, workingDir?: string): OrchestrationSummary | null;
/**
 * Format orchestration status for display
 */
export declare function formatOrchestrationStatus(orchestrationId: string, workingDir?: string): string;
//# sourceMappingURL=state-machine.d.ts.map