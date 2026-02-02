/**
 * Orchestration Types
 *
 * Types for PM-orchestrated team execution with phases, gates, and decisions.
 * Enables human-team-like autonomous operation with full transparency.
 *
 * © Brainless Technologies Pvt. Ltd.
 */

/**
 * Orchestration phases for task execution
 */
export type OrchestrationPhase =
  | 'initialized'      // Task received, not started
  | 'analyzing'        // Analyst examining requirements
  | 'designing'        // Architect planning solution
  | 'reviewing_design' // PM/Critic reviewing design
  | 'planning'         // Planner creating work plan
  | 'reviewing_plan'   // PM/Critic reviewing plan
  | 'executing'        // Executor implementing
  | 'verifying'        // Reviewer checking quality
  | 'completed'        // Task finished successfully
  | 'failed'           // Task encountered unrecoverable error
  | 'paused';          // Waiting for user input

/**
 * Status of an approval gate
 */
export type GateStatus = 'pending' | 'approved' | 'rejected' | 'skipped';

/**
 * Phase transition rules
 */
export const PHASE_TRANSITIONS: Record<OrchestrationPhase, OrchestrationPhase[]> = {
  initialized: ['analyzing'],
  analyzing: ['designing', 'failed'],
  designing: ['reviewing_design', 'failed'],
  reviewing_design: ['planning', 'designing', 'failed'],  // Can go back to designing if rejected
  planning: ['reviewing_plan', 'failed'],
  reviewing_plan: ['executing', 'planning', 'failed'],    // Can go back to planning if rejected
  executing: ['verifying', 'failed', 'paused'],
  verifying: ['completed', 'executing', 'failed'],        // Can go back to fix issues
  completed: [],
  failed: [],
  paused: ['executing', 'analyzing', 'designing', 'planning']  // Can resume to various phases
};

/**
 * Agents typically involved in each phase
 */
export const PHASE_AGENTS: Record<OrchestrationPhase, string[]> = {
  initialized: ['pm'],
  analyzing: ['analyst', 'pm'],
  designing: ['architect', 'pm'],
  reviewing_design: ['critic', 'security-reviewer', 'pm'],
  planning: ['planner', 'pm'],
  reviewing_plan: ['critic', 'pm'],
  executing: ['executor', 'pm'],
  verifying: ['code-reviewer', 'qa-tester', 'pm'],
  completed: ['pm'],
  failed: ['pm'],
  paused: ['pm']
};

/**
 * Main orchestration state
 */
export interface OrchestrationState {
  /** Unique orchestration ID */
  id: string;
  
  /** Claude session ID */
  session_id: string;
  
  /** Current phase */
  phase: OrchestrationPhase;
  
  /** Original user task/request */
  task: string;
  
  /** PM agent identifier (usually 'brainless:pm') */
  pm_agent: string;
  
  /** All agents that have participated */
  participants: string[];
  
  /** All decisions made during orchestration */
  decisions: OrchestrationDecision[];
  
  /** All gates encountered */
  gates: OrchestrationGate[];
  
  /** Current pending gate (if any) */
  current_gate?: OrchestrationGate;
  
  /** Analysis results (from analyzing phase) */
  analysis?: AnalysisResult;
  
  /** Design document (from designing phase) */
  design?: DesignResult;
  
  /** Work plan (from planning phase) */
  plan?: PlanResult;
  
  /** Execution progress */
  execution?: ExecutionProgress;
  
  /** Verification results */
  verification?: VerificationResult;
  
  /** ISO timestamp when started */
  started_at: string;
  
  /** ISO timestamp when last updated */
  updated_at: string;
  
  /** ISO timestamp when completed */
  completed_at?: string;
  
  /** Failure reason if failed */
  failure_reason?: string;
}

/**
 * Decision made during orchestration
 */
export interface OrchestrationDecision {
  /** Unique decision ID */
  id: string;
  
  /** ISO timestamp */
  timestamp: string;
  
  /** Phase when decision was made */
  phase: OrchestrationPhase;
  
  /** Topic/question being decided */
  topic: string;
  
  /** Options that were considered */
  options: string[];
  
  /** The option that was chosen */
  chosen: string;
  
  /** Rationale for the decision */
  rationale: string;
  
  /** Who made the decision (usually pm) */
  made_by: string;
  
  /** Debate ID if decision came from a debate */
  debate_id?: string;
  
  /** Agents who proposed alternatives */
  proposals_by?: string[];
  
  /** Was this a consensus or PM override? */
  consensus: boolean;
}

/**
 * Approval gate at phase transitions
 */
export interface OrchestrationGate {
  /** Unique gate ID */
  id: string;
  
  /** Phase this gate guards entry to */
  target_phase: OrchestrationPhase;
  
  /** Who must approve */
  requires_approval_from: 'pm' | 'user' | 'architect' | 'critic';
  
  /** What is being proposed */
  proposal_summary: string;
  
  /** Path to detailed artifact (e.g., plan document) */
  artifact_path?: string;
  
  /** Current status */
  status: GateStatus;
  
  /** Feedback if rejected */
  feedback?: string;
  
  /** Number of revision attempts */
  revision_count: number;
  
  /** ISO timestamp when created */
  created_at: string;
  
  /** ISO timestamp when resolved */
  resolved_at?: string;
}

/**
 * Analysis phase output
 */
export interface AnalysisResult {
  /** Key requirements identified */
  requirements: string[];
  
  /** Risks and concerns */
  risks: string[];
  
  /** Dependencies on other systems */
  dependencies: string[];
  
  /** Open questions for user */
  questions: string[];
  
  /** Complexity assessment */
  complexity: 'low' | 'medium' | 'high' | 'very_high';
  
  /** Estimated effort */
  estimated_effort?: string;
  
  /** Analyzing agent */
  analyzed_by: string;
}

/**
 * Design phase output
 */
export interface DesignResult {
  /** Architecture approach */
  approach: string;
  
  /** Key components */
  components: string[];
  
  /** Technology choices with rationale */
  tech_choices: Array<{
    category: string;
    choice: string;
    rationale: string;
    alternatives?: string[];
  }>;
  
  /** Interfaces/APIs defined */
  interfaces: string[];
  
  /** Design document path */
  document_path?: string;
  
  /** Designing agent */
  designed_by: string;
}

/**
 * Plan phase output
 */
export interface PlanResult {
  /** Ordered list of tasks */
  tasks: PlanTask[];
  
  /** Total estimated time */
  estimated_time: string;
  
  /** Plan document path */
  document_path?: string;
  
  /** Planning agent */
  planned_by: string;
}

/**
 * Single task in the plan
 */
export interface PlanTask {
  /** Task identifier */
  id: string;
  
  /** Task description */
  description: string;
  
  /** Agent to execute (if specified) */
  assigned_to?: string;
  
  /** Dependencies on other task IDs */
  depends_on: string[];
  
  /** Status */
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'failed';
  
  /** Output/result when completed */
  output?: string;
}

/**
 * Execution phase progress
 */
export interface ExecutionProgress {
  /** Total tasks in plan */
  total_tasks: number;
  
  /** Completed tasks */
  completed_tasks: number;
  
  /** Currently executing task */
  current_task?: string;
  
  /** Issues encountered */
  issues: ExecutionIssue[];
}

/**
 * Issue during execution
 */
export interface ExecutionIssue {
  /** Issue description */
  description: string;
  
  /** Severity */
  severity: 'info' | 'warning' | 'error' | 'blocker';
  
  /** Task that raised the issue */
  task_id?: string;
  
  /** Resolution (if resolved) */
  resolution?: string;
  
  /** Agent who raised it */
  raised_by: string;
}

/**
 * Verification phase output
 */
export interface VerificationResult {
  /** Overall pass/fail */
  passed: boolean;
  
  /** Tests run */
  tests_run: number;
  
  /** Tests passed */
  tests_passed: number;
  
  /** Issues found */
  issues: string[];
  
  /** Recommendations */
  recommendations: string[];
  
  /** Verifying agent */
  verified_by: string;
}

/**
 * Summary of an orchestration for display
 */
export interface OrchestrationSummary {
  /** Orchestration ID */
  id: string;
  
  /** Task (truncated) */
  task: string;
  
  /** Current phase */
  phase: OrchestrationPhase;
  
  /** Phase number (e.g., 3/7) */
  phase_progress: string;
  
  /** Agents involved */
  agents: string[];
  
  /** Decisions made */
  decision_count: number;
  
  /** Duration so far */
  duration: string;
  
  /** Status indicator */
  status: 'running' | 'waiting' | 'completed' | 'failed';
}

/**
 * Configuration for orchestration behavior
 */
export interface OrchestrationConfig {
  /** Require PM approval at each gate */
  require_pm_approval: boolean;
  
  /** Require user approval at critical gates */
  require_user_approval: boolean;
  
  /** Maximum revision attempts before escalation */
  max_revisions: number;
  
  /** Enable debates between agents */
  enable_debates: boolean;
  
  /** Maximum debate rounds */
  max_debate_rounds: number;
  
  /** Auto-approve low-risk gates */
  auto_approve_low_risk: boolean;
}

/**
 * Default orchestration configuration
 */
export const DEFAULT_ORCHESTRATION_CONFIG: OrchestrationConfig = {
  require_pm_approval: true,
  require_user_approval: false,  // PM handles most approvals
  max_revisions: 3,
  enable_debates: true,
  max_debate_rounds: 3,
  auto_approve_low_risk: false
};
