/**
 * God-Mode Hook Handler
 *
 * Main entry point for god-mode, wiring together:
 * - Directory analysis
 * - CLAUDE.md generation
 * - Team building
 * - Memory integration
 * - Ralph loop orchestration
 *
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, readFileSync, appendFileSync } from 'fs';
import { join, resolve } from 'path';
import { spawn } from 'child_process';
import {
  initGodMode,
  readGodModeState,
  writeGodModeState,
  transitionPhase,
  addDirectory,
  markDirectoryAnalyzed,
  markClaudeGenerated,
  startRalphLoop,
  completeRalphLoop,
  trackMemorySession,
  incrementAgentCount,
  getGodModeSummary,
  areAllLoopsComplete,
  type GodModeState,
  type DirectoryState,
} from './state.js';
import {
  generateDirectoryClaude,
  writeDirectoryClaude,
  type DirectoryAnalysis,
} from './claude-generator.js';
import { buildTeam, type TeamConfig } from '../../features/team-builder/index.js';
import { memory } from '../../features/memory/index.js';

// ============================================================================
// CONSTANTS
// ============================================================================

const ANALYZER_SCRIPT = 'scripts/directory-analyzer.mjs';

// ============================================================================
// DIRECTORY ANALYSIS
// ============================================================================

interface AnalyzerResult {
  directories: DirectoryAnalysis[];
  projectRoot: string;
  analyzedAt: string;
}

/**
 * Run directory analyzer script
 */
export async function analyzeDirectories(
  projectRoot: string,
  maxDepth: number = 4
): Promise<AnalyzerResult | null> {
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT || projectRoot;
  const scriptPath = join(pluginRoot, ANALYZER_SCRIPT);

  if (!existsSync(scriptPath)) {
    console.error(`Directory analyzer not found at ${scriptPath}`);
    return null;
  }

  return new Promise((resolve) => {
    const child = spawn('node', [scriptPath], {
      cwd: projectRoot,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`Analyzer exited with code ${code}: ${stderr}`);
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        console.error(`Failed to parse analyzer output: ${e}`);
        resolve(null);
      }
    });

    // Send config to stdin
    child.stdin.write(JSON.stringify({ directory: projectRoot, maxDepth }));
    child.stdin.end();
  });
}

// ============================================================================
// PHASE 1: DEEP INIT
// ============================================================================

/**
 * Execute Phase 1: Deep initialization
 * - Analyze directories
 * - Build teams per directory
 * - Generate CLAUDE.md files
 */
export async function executeDeepInit(
  projectRoot: string,
  state: GodModeState
): Promise<GodModeState | null> {
  // Step 1: Analyze directories
  const analysis = await analyzeDirectories(projectRoot);
  if (!analysis) {
    console.error('Failed to analyze directories');
    return null;
  }

  // Step 2: Add directories to state
  for (const dir of analysis.directories) {
    const dirState: DirectoryState = {
      path: dir.path,
      type: dir.type,
      analyzed: false,
      claudeGenerated: false,
      teamAssigned: [],
    };
    addDirectory(projectRoot, dirState);
  }

  // Step 3: For each directory, build team and generate CLAUDE.md
  for (const dir of analysis.directories) {
    // Get memory insights for this directory
    let memoryInsights: any[] = [];
    try {
      memoryInsights = memory.search(dir.path, 3);
    } catch {
      // Memory not available
    }

    // Build team using classifier
    const mockClassification = {
      tier: 'medium' as const,
      confidence: 0.8,
      source: 'keyword' as const,
      latencyMs: 0,
      cached: false,
      capabilities: {
        needsArchitecture: dir.type === 'src' || dir.type === 'api',
        needsSecurity: dir.type === 'api',
        needsTesting: dir.type === 'tests',
        needsSearch: false,
        needsDelegation: true,
        needsToolGuidance: false,
      },
      recommendedAgents: dir.suggestedAgents,
      teamRationale: `Selected based on directory type: ${dir.type}`,
    };

    const team = await buildTeam(state.task, mockClassification, false);
    
    // Mark directory analyzed
    markDirectoryAnalyzed(projectRoot, dir.path, team.agents);

    // Generate CLAUDE.md
    const claudeContent = generateDirectoryClaude(
      dir.path,
      dir,
      team,
      memoryInsights
    );

    // Write CLAUDE.md
    const written = writeDirectoryClaude(projectRoot, dir.path, claudeContent);
    if (written) {
      markClaudeGenerated(projectRoot, dir.path);
    }
  }

  // Transition to decomposition phase
  return transitionPhase(projectRoot, 'decomposition');
}

// ============================================================================
// GITIGNORE HANDLING
// ============================================================================

/**
 * Add .brainless to gitignore if not present
 */
export function ensureGitignore(projectRoot: string): boolean {
  const gitignorePath = join(projectRoot, '.gitignore');

  try {
    if (existsSync(gitignorePath)) {
      const content = readFileSync(gitignorePath, 'utf-8');
      if (content.includes('.brainless')) {
        return true; // Already present
      }
      // Append
      appendFileSync(gitignorePath, '\n# Brainless AI context\n.brainless\n');
    } else {
      // Create new
      const newContent = '# Brainless AI context\n.brainless\n';
      appendFileSync(gitignorePath, newContent);
    }
    return true;
  } catch (error) {
    console.error('Failed to update .gitignore:', error);
    return false;
  }
}

// ============================================================================
// MAIN ENTRY POINTS
// ============================================================================

/**
 * Start god-mode execution
 */
export async function startGodMode(
  projectRoot: string,
  task: string,
  options: { maxDepth?: number } = {}
): Promise<{ success: boolean; state?: GodModeState; error?: string }> {
  // Check if already running
  const existingState = readGodModeState(projectRoot);
  if (existingState?.active) {
    return {
      success: false,
      error: 'God-mode is already active. Use /brainless:cancel to stop it first.',
    };
  }

  // Initialize state
  const state = initGodMode(projectRoot, task);

  // Ensure .brainless is in gitignore
  ensureGitignore(projectRoot);

  // Execute Phase 1
  const updatedState = await executeDeepInit(projectRoot, state);
  if (!updatedState) {
    transitionPhase(projectRoot, 'failed');
    return {
      success: false,
      error: 'Failed to execute deep initialization phase',
    };
  }

  return {
    success: true,
    state: updatedState,
  };
}

/**
 * Get god-mode status for HUD
 */
export function getGodModeStatus(projectRoot: string): string {
  return getGodModeSummary(projectRoot);
}

/**
 * Cancel god-mode execution
 */
export function cancelGodMode(projectRoot: string): boolean {
  const state = readGodModeState(projectRoot);
  if (!state) return false;

  state.active = false;
  state.phase = 'failed';
  state.completedAt = new Date().toISOString();

  return writeGodModeState(projectRoot, state);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  readGodModeState,
  writeGodModeState,
  transitionPhase,
  areAllLoopsComplete,
  type GodModeState,
};
