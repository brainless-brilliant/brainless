/**
 * Orchestration Module
 *
 * PM-orchestrated team execution with phases, gates, and decisions.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
// Export types
export { PHASE_TRANSITIONS, PHASE_AGENTS, DEFAULT_ORCHESTRATION_CONFIG } from './types.js';
// Export state machine functions
export { 
// Path utilities
getOrchestrationDir, getStatePath, getActiveOrchestrationPath, ensureOrchestrationDir, 
// ID generators
generateOrchestrationId, generateGateId, generateDecisionId, 
// State management
createOrchestration, saveOrchestration, loadOrchestration, setActiveOrchestration, getActiveOrchestration, clearActiveOrchestration, 
// Phase transitions
canTransition, getNextPhase, transitionPhase, 
// Gates
createGate, approveGate, rejectGate, 
// Decisions
recordDecision, 
// Failure handling
failOrchestration, 
// Display
getOrchestrationSummary, formatOrchestrationStatus } from './state-machine.js';
//# sourceMappingURL=index.js.map