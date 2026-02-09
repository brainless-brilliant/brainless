/**
 * God-Mode State Management
 *
 * Tracks multi-phase execution across directories with full integration
 * of memory, debates, escalation, and team-builder features.
 *
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

// ============================================================================
// TYPES
// ============================================================================

export type GodModePhase =
  | 'deep_init'      // Phase 1: Analyze directories, generate .brainless/
  | 'decomposition'  // Phase 2: Break task into subtasks per directory
  | 'execution'      // Phase 3: Parallel ralph loops
  | 'consolidation'  // Phase 4: Merge results, architect verification
  | 'complete'
  | 'failed';

export interface DirectoryState {
  /** Directory path relative to project root */
  path: string;
  /** Directory type (inferred) */
  type: 'src' | 'api' | 'ui' | 'tests' | 'docs' | 'config' | 'scripts' | 'lib' | 'other';
  /** Whether directory has been analyzed */
  analyzed: boolean;
  /** Whether .brainless/CLAUDE.md has been generated */
  claudeGenerated: boolean;
  /** Agents assigned to this directory */
  teamAssigned: string[];
  /** Subtask assigned (if any) */
  subtask?: string;
}

export interface RalphLoopState {
  /** Directory this loop is running in */
  directory: string;
  /** Current iteration */
  iteration: number;
  /** Maximum iterations */
  maxIterations: number;
  /** Loop status */
  status: 'pending' | 'running' | 'blocked' | 'complete' | 'failed';
  /** Escalation ID if blocked */
  escalationId?: string;
  /** Debate ID if agents disagreed */
  debateId?: string;
  /** Files modified by this loop */
  filesModified: string[];
  /** Errors encountered */
  errors: string[];
}

export interface GodModeState {
  /** Whether god-mode is active */
  active: boolean;
  /** Current phase */
  phase: GodModePhase;
  /** Original user task */
  task: string;
  /** Session ID */
  sessionId: string;
  
  // Phase 1: Deep Init
  directories: DirectoryState[];
  directoriesAnalyzed: number;
  directoriesTotal: number;
  
  // Phase 3: Execution
  ralphLoops: RalphLoopState[];
  
  // Integration tracking
  memorySessions: string[];
  activeDebates: string[];
  activeEscalations: string[];
  
  // Metrics
  startedAt: string;
  completedAt: string | null;
  totalAgentsSpawned: number;
  phaseDurations: Record<string, number>;
}

export interface GodModeConfig {
  /** Maximum parallel ralph loops */
  maxParallelLoops: number;
  /** Maximum iterations per loop */
  maxIterationsPerLoop: number;
  /** Whether to create .brainless directories */
  createBrainlessDirectories: boolean;
  /** Whether to add to gitignore */
  addToGitignore: boolean;
  /** Minimum directory depth to analyze */
  minDepth: number;
  /** Maximum directory depth to analyze */
  maxDepth: number;
}

export const DEFAULT_GODMODE_CONFIG: GodModeConfig = {
  maxParallelLoops: 5,
  maxIterationsPerLoop: 10,
  createBrainlessDirectories: true,
  addToGitignore: true,
  minDepth: 1,
  maxDepth: 4,
};

// ============================================================================
// STATE FILE OPERATIONS
// ============================================================================

const STATE_FILE = 'godmode-state.json';

function getStateFilePath(directory: string): string {
  const brainlessDir = join(directory, '.brainless');
  return join(brainlessDir, STATE_FILE);
}

function ensureBrainlessDir(directory: string): void {
  const brainlessDir = join(directory, '.brainless');
  if (!existsSync(brainlessDir)) {
    mkdirSync(brainlessDir, { recursive: true });
  }
}

/**
 * Read god-mode state from disk
 */
export function readGodModeState(directory: string): GodModeState | null {
  const stateFile = getStateFilePath(directory);

  if (!existsSync(stateFile)) {
    return null;
  }

  try {
    const content = readFileSync(stateFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

/**
 * Write god-mode state to disk
 */
export function writeGodModeState(directory: string, state: GodModeState): boolean {
  try {
    ensureBrainlessDir(directory);
    const stateFile = getStateFilePath(directory);
    writeFileSync(stateFile, JSON.stringify(state, null, 2));
    return true;
  } catch {
    return false;
  }
}

/**
 * Clear god-mode state
 */
export function clearGodModeState(directory: string): boolean {
  const stateFile = getStateFilePath(directory);

  if (!existsSync(stateFile)) {
    return true;
  }

  try {
    unlinkSync(stateFile);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if god-mode is active
 */
export function isGodModeActive(directory: string): boolean {
  const state = readGodModeState(directory);
  return state !== null && state.active === true;
}

// ============================================================================
// STATE INITIALIZATION
// ============================================================================

/**
 * Initialize a new god-mode session
 */
export function initGodMode(
  directory: string,
  task: string,
  config: Partial<GodModeConfig> = {}
): GodModeState {
  const mergedConfig = { ...DEFAULT_GODMODE_CONFIG, ...config };
  const now = new Date().toISOString();
  const sessionId = `gm_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const state: GodModeState = {
    active: true,
    phase: 'deep_init',
    task,
    sessionId,
    
    directories: [],
    directoriesAnalyzed: 0,
    directoriesTotal: 0,
    
    ralphLoops: [],
    
    memorySessions: [],
    activeDebates: [],
    activeEscalations: [],
    
    startedAt: now,
    completedAt: null,
    totalAgentsSpawned: 0,
    phaseDurations: {},
  };

  ensureBrainlessDir(directory);
  writeGodModeState(directory, state);

  return state;
}

// ============================================================================
// PHASE TRANSITIONS
// ============================================================================

/**
 * Transition to a new phase
 */
export function transitionPhase(
  directory: string,
  newPhase: GodModePhase
): GodModeState | null {
  const state = readGodModeState(directory);

  if (!state || !state.active) {
    return null;
  }

  const now = new Date().toISOString();
  const oldPhase = state.phase;

  // Record duration for old phase
  const phaseStartKey = `${oldPhase}_start_ms`;
  if (state.phaseDurations[phaseStartKey] !== undefined) {
    const duration = Date.now() - state.phaseDurations[phaseStartKey];
    state.phaseDurations[oldPhase] = duration;
  }

  // Transition to new phase
  state.phase = newPhase;
  state.phaseDurations[`${newPhase}_start_ms`] = Date.now();

  if (newPhase === 'complete' || newPhase === 'failed') {
    state.completedAt = now;
    state.active = false;
  }

  writeGodModeState(directory, state);
  return state;
}

// ============================================================================
// DIRECTORY MANAGEMENT
// ============================================================================

/**
 * Add a directory to track
 */
export function addDirectory(
  workingDir: string,
  dirState: DirectoryState
): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  // Check if already exists
  const existing = state.directories.find(d => d.path === dirState.path);
  if (existing) {
    // Update existing
    Object.assign(existing, dirState);
  } else {
    state.directories.push(dirState);
    state.directoriesTotal = state.directories.length;
  }

  return writeGodModeState(workingDir, state);
}

/**
 * Mark directory as analyzed
 */
export function markDirectoryAnalyzed(
  workingDir: string,
  dirPath: string,
  team: string[]
): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  const dir = state.directories.find(d => d.path === dirPath);
  if (dir) {
    dir.analyzed = true;
    dir.teamAssigned = team;
    state.directoriesAnalyzed++;
  }

  return writeGodModeState(workingDir, state);
}

/**
 * Mark directory CLAUDE.md as generated
 */
export function markClaudeGenerated(
  workingDir: string,
  dirPath: string
): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  const dir = state.directories.find(d => d.path === dirPath);
  if (dir) {
    dir.claudeGenerated = true;
  }

  return writeGodModeState(workingDir, state);
}

// ============================================================================
// RALPH LOOP MANAGEMENT
// ============================================================================

/**
 * Start a ralph loop for a directory
 */
export function startRalphLoop(
  workingDir: string,
  directory: string,
  maxIterations: number = 10
): RalphLoopState | null {
  const state = readGodModeState(workingDir);
  if (!state) return null;

  const loop: RalphLoopState = {
    directory,
    iteration: 1,
    maxIterations,
    status: 'running',
    filesModified: [],
    errors: [],
  };

  state.ralphLoops.push(loop);
  writeGodModeState(workingDir, state);
  
  return loop;
}

/**
 * Update ralph loop iteration
 */
export function updateRalphLoop(
  workingDir: string,
  directory: string,
  updates: Partial<RalphLoopState>
): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  const loop = state.ralphLoops.find(l => l.directory === directory);
  if (loop) {
    Object.assign(loop, updates);
  }

  return writeGodModeState(workingDir, state);
}

/**
 * Mark ralph loop as complete
 */
export function completeRalphLoop(
  workingDir: string,
  directory: string,
  filesModified: string[] = []
): boolean {
  return updateRalphLoop(workingDir, directory, {
    status: 'complete',
    filesModified,
  });
}

/**
 * Mark ralph loop as blocked (escalation needed)
 */
export function blockRalphLoop(
  workingDir: string,
  directory: string,
  escalationId: string
): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  const updated = updateRalphLoop(workingDir, directory, {
    status: 'blocked',
    escalationId,
  });

  if (updated) {
    state.activeEscalations.push(escalationId);
    return writeGodModeState(workingDir, state);
  }

  return false;
}

// ============================================================================
// INTEGRATION TRACKING
// ============================================================================

/**
 * Track a debate
 */
export function trackDebate(workingDir: string, debateId: string): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  if (!state.activeDebates.includes(debateId)) {
    state.activeDebates.push(debateId);
  }

  return writeGodModeState(workingDir, state);
}

/**
 * Track memory session
 */
export function trackMemorySession(workingDir: string, sessionId: string): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  if (!state.memorySessions.includes(sessionId)) {
    state.memorySessions.push(sessionId);
  }

  return writeGodModeState(workingDir, state);
}

/**
 * Increment agent spawn counter
 */
export function incrementAgentCount(workingDir: string, count: number = 1): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  state.totalAgentsSpawned += count;
  return writeGodModeState(workingDir, state);
}

// ============================================================================
// STATUS HELPERS
// ============================================================================

/**
 * Get summary of current god-mode state
 */
export function getGodModeSummary(workingDir: string): string {
  const state = readGodModeState(workingDir);
  if (!state) return 'God-mode not active';

  const activeLoops = state.ralphLoops.filter(l => l.status === 'running').length;
  const completedLoops = state.ralphLoops.filter(l => l.status === 'complete').length;
  const blockedLoops = state.ralphLoops.filter(l => l.status === 'blocked').length;

  return `[GOD-MODE] Phase: ${state.phase} | Dirs: ${state.directoriesAnalyzed}/${state.directoriesTotal} | Ralph: ${activeLoops} running, ${completedLoops} done, ${blockedLoops} blocked | Agents: ${state.totalAgentsSpawned}`;
}

/**
 * Check if all ralph loops are complete
 */
export function areAllLoopsComplete(workingDir: string): boolean {
  const state = readGodModeState(workingDir);
  if (!state) return false;

  return state.ralphLoops.length > 0 &&
    state.ralphLoops.every(l => l.status === 'complete' || l.status === 'failed');
}
