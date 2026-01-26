/**
 * Orchestration State Machine
 *
 * Manages orchestration state transitions, gate handling, and persistence.
 *
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import {
  OrchestrationState,
  OrchestrationPhase,
  OrchestrationDecision,
  OrchestrationGate,
  OrchestrationSummary,
  OrchestrationConfig,
  PHASE_TRANSITIONS,
  PHASE_AGENTS,
  DEFAULT_ORCHESTRATION_CONFIG,
  GateStatus
} from './types.js';
import { logActivity, logDecision } from '../transcript/index.js';

/**
 * Get orchestration state directory
 */
export function getOrchestrationDir(workingDir?: string): string {
  const baseDir = workingDir || process.cwd();
  return join(baseDir, '.anv', 'orchestration');
}

/**
 * Get path to orchestration state file
 */
export function getStatePath(orchestrationId: string, workingDir?: string): string {
  return join(getOrchestrationDir(workingDir), `${orchestrationId}.json`);
}

/**
 * Get current active orchestration file path
 */
export function getActiveOrchestrationPath(workingDir?: string): string {
  return join(getOrchestrationDir(workingDir), 'active.json');
}

/**
 * Ensure orchestration directory exists
 */
export function ensureOrchestrationDir(workingDir?: string): void {
  const dir = getOrchestrationDir(workingDir);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

/**
 * Generate orchestration ID
 */
export function generateOrchestrationId(): string {
  return `orch_${Date.now()}_${randomUUID().slice(0, 8)}`;
}

/**
 * Generate gate ID
 */
export function generateGateId(): string {
  return `gate_${Date.now()}_${randomUUID().slice(0, 8)}`;
}

/**
 * Generate decision ID
 */
export function generateDecisionId(): string {
  return `dec_${Date.now()}_${randomUUID().slice(0, 8)}`;
}

/**
 * Create a new orchestration
 */
export function createOrchestration(
  task: string,
  sessionId: string,
  workingDir?: string,
  config: Partial<OrchestrationConfig> = {}
): OrchestrationState {
  ensureOrchestrationDir(workingDir);
  
  const now = new Date().toISOString();
  const id = generateOrchestrationId();
  
  const state: OrchestrationState = {
    id,
    session_id: sessionId,
    phase: 'initialized',
    task,
    pm_agent: 'brainless:pm',
    participants: ['brainless:pm'],
    decisions: [],
    gates: [],
    started_at: now,
    updated_at: now
  };
  
  saveOrchestration(state, workingDir);
  setActiveOrchestration(id, workingDir);
  
  // Log activity
  logActivity({
    session_id: sessionId,
    agent: 'brainless:pm',
    action: 'spawned',
    input_summary: `Starting orchestration: ${task.slice(0, 100)}`,
    orchestration_id: id
  }, workingDir);
  
  return state;
}

/**
 * Save orchestration state
 */
export function saveOrchestration(state: OrchestrationState, workingDir?: string): void {
  ensureOrchestrationDir(workingDir);
  const path = getStatePath(state.id, workingDir);
  state.updated_at = new Date().toISOString();
  writeFileSync(path, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * Load orchestration state
 */
export function loadOrchestration(orchestrationId: string, workingDir?: string): OrchestrationState | null {
  const path = getStatePath(orchestrationId, workingDir);
  
  if (!existsSync(path)) {
    return null;
  }
  
  try {
    const content = readFileSync(path, 'utf-8');
    return JSON.parse(content) as OrchestrationState;
  } catch {
    return null;
  }
}

/**
 * Set active orchestration
 */
export function setActiveOrchestration(orchestrationId: string, workingDir?: string): void {
  ensureOrchestrationDir(workingDir);
  const path = getActiveOrchestrationPath(workingDir);
  writeFileSync(path, JSON.stringify({ active_id: orchestrationId }), 'utf-8');
}

/**
 * Get active orchestration
 */
export function getActiveOrchestration(workingDir?: string): OrchestrationState | null {
  const path = getActiveOrchestrationPath(workingDir);
  
  if (!existsSync(path)) {
    return null;
  }
  
  try {
    const content = readFileSync(path, 'utf-8');
    const { active_id } = JSON.parse(content);
    return loadOrchestration(active_id, workingDir);
  } catch {
    return null;
  }
}

/**
 * Clear active orchestration
 */
export function clearActiveOrchestration(workingDir?: string): void {
  const path = getActiveOrchestrationPath(workingDir);
  if (existsSync(path)) {
    writeFileSync(path, JSON.stringify({ active_id: null }), 'utf-8');
  }
}

/**
 * Check if phase transition is valid
 */
export function canTransition(from: OrchestrationPhase, to: OrchestrationPhase): boolean {
  const allowed = PHASE_TRANSITIONS[from];
  return allowed.includes(to);
}

/**
 * Get next expected phase
 */
export function getNextPhase(current: OrchestrationPhase): OrchestrationPhase | null {
  const transitions = PHASE_TRANSITIONS[current];
  // First transition is typically the "happy path"
  return transitions.length > 0 ? transitions[0] : null;
}

/**
 * Transition to next phase
 */
export function transitionPhase(
  orchestrationId: string,
  targetPhase: OrchestrationPhase,
  workingDir?: string
): OrchestrationState | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  if (!canTransition(state.phase, targetPhase)) {
    console.warn(`[AVK] Invalid transition: ${state.phase} -> ${targetPhase}`);
    return null;
  }
  
  const previousPhase = state.phase;
  state.phase = targetPhase;
  
  // Add agents for new phase to participants
  const phaseAgents = PHASE_AGENTS[targetPhase] || [];
  for (const agent of phaseAgents) {
    const fullAgent = agent.startsWith('brainless:') ? agent : `brainless:${agent}`;
    if (!state.participants.includes(fullAgent)) {
      state.participants.push(fullAgent);
    }
  }
  
  // Mark completed if applicable
  if (targetPhase === 'completed') {
    state.completed_at = new Date().toISOString();
    clearActiveOrchestration(workingDir);
  }
  
  saveOrchestration(state, workingDir);
  
  // Log transition
  logActivity({
    session_id: state.session_id,
    agent: state.pm_agent,
    action: 'gate_passed',
    input_summary: `Phase transition: ${previousPhase} → ${targetPhase}`,
    orchestration_id: state.id
  }, workingDir);
  
  return state;
}

/**
 * Create an approval gate
 */
export function createGate(
  orchestrationId: string,
  targetPhase: OrchestrationPhase,
  proposalSummary: string,
  requiresApprovalFrom: 'pm' | 'user' | 'architect' | 'critic' = 'pm',
  artifactPath?: string,
  workingDir?: string
): OrchestrationGate | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  const gate: OrchestrationGate = {
    id: generateGateId(),
    target_phase: targetPhase,
    requires_approval_from: requiresApprovalFrom,
    proposal_summary: proposalSummary,
    artifact_path: artifactPath,
    status: 'pending',
    revision_count: 0,
    created_at: new Date().toISOString()
  };
  
  state.gates.push(gate);
  state.current_gate = gate;
  saveOrchestration(state, workingDir);
  
  // Log gate creation
  logActivity({
    session_id: state.session_id,
    agent: state.pm_agent,
    action: 'gate_pending',
    input_summary: `Approval required for ${targetPhase}: ${proposalSummary.slice(0, 100)}`,
    orchestration_id: state.id,
    metadata: { gate_id: gate.id }
  }, workingDir);
  
  return gate;
}

/**
 * Approve a gate
 */
export function approveGate(
  orchestrationId: string,
  gateId: string,
  approvedBy: string = 'pm',
  workingDir?: string
): OrchestrationState | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  const gate = state.gates.find(g => g.id === gateId);
  if (!gate) {
    return null;
  }
  
  gate.status = 'approved';
  gate.resolved_at = new Date().toISOString();
  
  // Clear current gate if it matches
  if (state.current_gate?.id === gateId) {
    state.current_gate = undefined;
  }
  
  saveOrchestration(state, workingDir);
  
  // Log approval
  logActivity({
    session_id: state.session_id,
    agent: `brainless:${approvedBy}`,
    action: 'approved',
    input_summary: `Approved gate for ${gate.target_phase}`,
    orchestration_id: state.id,
    metadata: { gate_id: gateId }
  }, workingDir);
  
  // Auto-transition to target phase
  return transitionPhase(orchestrationId, gate.target_phase, workingDir);
}

/**
 * Reject a gate
 */
export function rejectGate(
  orchestrationId: string,
  gateId: string,
  feedback: string,
  rejectedBy: string = 'pm',
  workingDir?: string
): OrchestrationState | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  const gate = state.gates.find(g => g.id === gateId);
  if (!gate) {
    return null;
  }
  
  gate.status = 'rejected';
  gate.feedback = feedback;
  gate.revision_count++;
  gate.resolved_at = new Date().toISOString();
  
  // Clear current gate
  if (state.current_gate?.id === gateId) {
    state.current_gate = undefined;
  }
  
  saveOrchestration(state, workingDir);
  
  // Log rejection
  logActivity({
    session_id: state.session_id,
    agent: `brainless:${rejectedBy}`,
    action: 'rejected',
    input_summary: `Rejected: ${feedback.slice(0, 100)}`,
    orchestration_id: state.id,
    metadata: { gate_id: gateId, revision_count: gate.revision_count }
  }, workingDir);
  
  return state;
}

/**
 * Record a decision
 */
export function recordDecision(
  orchestrationId: string,
  topic: string,
  options: string[],
  chosen: string,
  rationale: string,
  madeBy: string = 'pm',
  debateId?: string,
  workingDir?: string
): OrchestrationDecision | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  const decision: OrchestrationDecision = {
    id: generateDecisionId(),
    timestamp: new Date().toISOString(),
    phase: state.phase,
    topic,
    options,
    chosen,
    rationale,
    made_by: madeBy,
    debate_id: debateId,
    consensus: !debateId  // If no debate, it's assumed consensus/PM decision
  };
  
  state.decisions.push(decision);
  saveOrchestration(state, workingDir);
  
  // Log to transcript
  logDecision({
    phase: state.phase,
    topic,
    options,
    chosen,
    rationale,
    made_by: madeBy,
    debate_id: debateId
  }, workingDir);
  
  return decision;
}

/**
 * Fail orchestration
 */
export function failOrchestration(
  orchestrationId: string,
  reason: string,
  workingDir?: string
): OrchestrationState | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  state.phase = 'failed';
  state.failure_reason = reason;
  state.completed_at = new Date().toISOString();
  
  saveOrchestration(state, workingDir);
  clearActiveOrchestration(workingDir);
  
  // Log failure
  logActivity({
    session_id: state.session_id,
    agent: state.pm_agent,
    action: 'failed',
    input_summary: `Orchestration failed: ${reason.slice(0, 150)}`,
    orchestration_id: state.id
  }, workingDir);
  
  return state;
}

/**
 * Get orchestration summary for display
 */
export function getOrchestrationSummary(orchestrationId: string, workingDir?: string): OrchestrationSummary | null {
  const state = loadOrchestration(orchestrationId, workingDir);
  
  if (!state) {
    return null;
  }
  
  const phaseOrder: OrchestrationPhase[] = [
    'initialized', 'analyzing', 'designing', 'reviewing_design',
    'planning', 'reviewing_plan', 'executing', 'verifying', 'completed'
  ];
  
  const currentIndex = phaseOrder.indexOf(state.phase);
  const totalPhases = phaseOrder.length - 1; // Exclude 'completed' from count
  
  const durationMs = new Date().getTime() - new Date(state.started_at).getTime();
  const minutes = Math.floor(durationMs / 60000);
  const duration = minutes < 1 ? 'Just started' : `${minutes} min`;
  
  let status: 'running' | 'waiting' | 'completed' | 'failed' = 'running';
  if (state.phase === 'completed') status = 'completed';
  else if (state.phase === 'failed') status = 'failed';
  else if (state.current_gate) status = 'waiting';
  
  return {
    id: state.id,
    task: state.task.length > 80 ? state.task.slice(0, 80) + '...' : state.task,
    phase: state.phase,
    phase_progress: `${Math.min(currentIndex + 1, totalPhases)}/${totalPhases}`,
    agents: state.participants.map(a => a.replace('brainless:', '')),
    decision_count: state.decisions.length,
    duration,
    status
  };
}

/**
 * Format orchestration status for display
 */
export function formatOrchestrationStatus(orchestrationId: string, workingDir?: string): string {
  const summary = getOrchestrationSummary(orchestrationId, workingDir);
  
  if (!summary) {
    return 'No active orchestration.';
  }
  
  const statusIcon = {
    running: '🔄',
    waiting: '⏳',
    completed: '✅',
    failed: '❌'
  }[summary.status];
  
  return `## Orchestration Status

${statusIcon} **${summary.phase.replace('_', ' ').toUpperCase()}** (${summary.phase_progress})

- **Task:** ${summary.task}
- **Duration:** ${summary.duration}
- **Decisions:** ${summary.decision_count}
- **Agents:** ${summary.agents.join(', ')}
${summary.status === 'waiting' ? '\n⚠️ Waiting for approval' : ''}`;
}
