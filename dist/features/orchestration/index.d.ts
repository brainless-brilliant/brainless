/**
 * Orchestration Module
 *
 * PM-orchestrated team execution with phases, gates, and decisions.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
export { OrchestrationPhase, GateStatus, PHASE_TRANSITIONS, PHASE_AGENTS, OrchestrationState, OrchestrationDecision, OrchestrationGate, AnalysisResult, DesignResult, PlanResult, PlanTask, ExecutionProgress, ExecutionIssue, VerificationResult, OrchestrationSummary, OrchestrationConfig, DEFAULT_ORCHESTRATION_CONFIG } from './types.js';
export { getOrchestrationDir, getStatePath, getActiveOrchestrationPath, ensureOrchestrationDir, generateOrchestrationId, generateGateId, generateDecisionId, createOrchestration, saveOrchestration, loadOrchestration, setActiveOrchestration, getActiveOrchestration, clearActiveOrchestration, canTransition, getNextPhase, transitionPhase, createGate, approveGate, rejectGate, recordDecision, failOrchestration, getOrchestrationSummary, formatOrchestrationStatus } from './state-machine.js';
//# sourceMappingURL=index.d.ts.map