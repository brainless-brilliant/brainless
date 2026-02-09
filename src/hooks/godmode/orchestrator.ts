/**
 * God Mode Orchestrator
 *
 * Wires all Brainless features together for God Mode execution:
 * - BackgroundManager: Context-isolated session spawning
 * - Memory: Context recovery for subagents
 * - Debate: Conflict resolution between agents
 * - Escalation: Blocker handling with routing
 * - Team Builder: Directory-specific team assembly
 *
 * © Brainless Technologies Pvt. Ltd.
 */

import { memory } from '../../features/memory/index.js';
import { createDebate, addProposal, resolveDebate } from '../../features/debate/room.js';
import { escalationStore, EscalationRouter } from '../../features/escalation/index.js';
import { assembleTeamForTask } from '../../agents/team-assembly.js';
import { getBackgroundManager, type LaunchInput, type BackgroundTask } from '../../features/background-agent/index.js';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

/**
 * Directory context for God Mode execution
 */
export interface DirectoryContext {
  path: string;
  claudeMdPath?: string;
  claudeMdContent?: string;
  progressPath?: string;
  progressContent?: string;
  memoryContext?: string[];
  assignedTeam?: string[];
  subtask?: string;
}

/**
 * Configuration for God Mode orchestration
 */
export interface GodModeConfig {
  /** Working directory for the project */
  workingDir: string;
  /** Main task description */
  taskDescription: string;
  /** Directories to execute in */
  directories: DirectoryContext[];
  /** Parent session ID */
  parentSessionId: string;
  /** Whether to run in parallel */
  parallel?: boolean;
  /** Memory search depth */
  memorySearchDepth?: number;
}

/**
 * Result of God Mode execution
 */
export interface GodModeResult {
  success: boolean;
  tasks: BackgroundTask[];
  debates?: string[];
  escalations?: string[];
  errors?: string[];
}

/**
 * Build memory context for a subagent
 */
export function buildMemoryContext(task: string, directory: string, depth: number = 5): string[] {
  const observations = memory.search(`${task} ${directory}`, depth);
  return observations.map((obs: any) => {
    const date = new Date(obs.created_at_epoch).toISOString().split('T')[0];
    return `[${date}] ${obs.content}`;
  });
}

/**
 * Load .brainless/CLAUDE.md for a directory
 */
export function loadClaudeMd(directory: string): string | undefined {
  const claudePath = join(directory, '.brainless', 'CLAUDE.md');
  if (existsSync(claudePath)) {
    return readFileSync(claudePath, 'utf-8');
  }
  return undefined;
}

/**
 * Load .brainless/progress.txt for loop continuity
 */
export function loadProgress(directory: string): string | undefined {
  const progressPath = join(directory, '.brainless', 'progress.txt');
  if (existsSync(progressPath)) {
    return readFileSync(progressPath, 'utf-8');
  }
  return undefined;
}

/**
 * Build context-enriched prompt for a subagent
 */
export function buildSubagentPrompt(
  subtask: string,
  directory: DirectoryContext,
  memoryContext: string[]
): string {
  const sections: string[] = [];

  // Memory context (most relevant past work)
  if (memoryContext.length > 0) {
    sections.push(`## Previous Relevant Work\n${memoryContext.join('\n')}`);
  }

  // Directory conventions
  if (directory.claudeMdContent) {
    sections.push(`## Directory Conventions (.brainless/CLAUDE.md)\n${directory.claudeMdContent}`);
  }

  // Loop progress (for continuity)
  if (directory.progressContent) {
    sections.push(`## Previous Progress\n${directory.progressContent}`);
  }

  // Team assignment
  if (directory.assignedTeam && directory.assignedTeam.length > 0) {
    sections.push(`## Your Team\nDelegation available to: ${directory.assignedTeam.join(', ')}`);
  }

  // Main task
  sections.push(`## Your Task\n${subtask}`);
  sections.push(`## Working Directory\n${directory.path}`);

  return sections.join('\n\n---\n\n');
}

/**
 * Orchestrate God Mode execution
 */
export async function orchestrateGodMode(config: GodModeConfig): Promise<GodModeResult> {
  const result: GodModeResult = {
    success: true,
    tasks: [],
    debates: [],
    escalations: [],
    errors: [],
  };

  const backgroundManager = getBackgroundManager();
  const memoryDepth = config.memorySearchDepth ?? 5;

  // Phase 1: Enrich directory contexts
  for (const dir of config.directories) {
    // Load CLAUDE.md conventions
    dir.claudeMdContent = loadClaudeMd(dir.path);

    // Load progress for loop continuity
    dir.progressContent = loadProgress(dir.path);

    // Build memory context
    dir.memoryContext = buildMemoryContext(
      config.taskDescription,
      dir.path,
      memoryDepth
    );

    // Assemble team for this directory's subtask
    if (dir.subtask) {
      try {
        const team = await assembleTeamForTask(dir.subtask, undefined, false);
        dir.assignedTeam = team.agents;
      } catch (err) {
        dir.assignedTeam = ['brainless:engineer'];
      }
    }
  }

  // Phase 2: Launch subagents
  const launchPromises = config.directories.map(async (dir) => {
    if (!dir.subtask) return;

    // Build enriched prompt
    const prompt = buildSubagentPrompt(
      dir.subtask,
      dir,
      dir.memoryContext || []
    );

    // Select primary agent from team
    const agent = dir.assignedTeam?.[0] || 'brainless:engineer';

    // Launch via BackgroundManager
    const launchInput: LaunchInput = {
      description: `[God Mode] ${dir.subtask?.slice(0, 50)}...`,
      prompt,
      agent,
      parentSessionId: config.parentSessionId,
    };

    try {
      const task = await backgroundManager.launch(launchInput);
      result.tasks.push(task);
    } catch (err) {
      result.errors!.push(`Failed to launch task for ${dir.path}: ${err}`);
    }
  });

  // Execute in parallel or sequential
  if (config.parallel !== false) {
    await Promise.all(launchPromises);
  } else {
    for (const promise of launchPromises) {
      await promise;
    }
  }

  result.success = result.errors!.length === 0;
  return result;
}

/**
 * Handle conflict between subagents via debate
 */
export function createConflictDebate(
  topic: string,
  agents: string[],
  context: string,
  workingDir?: string
): string {
  const debate = createDebate(
    topic,
    agents,
    'brainless:pm',
    context,
    undefined,
    workingDir
  );
  return debate.id;
}

/**
 * Create escalation for a blocked subagent
 */
export function createBlockerEscalation(
  fromAgent: string,
  blockerDescription: string,
  blockerType: 'blocker' | 'question' | 'design-decision' | 'security-concern' = 'blocker'
): string {
  // First route to find the target
  const routingRequest = {
    from: fromAgent,
    to: 'auto' as const,
    type: blockerType,
    message: blockerDescription,
    timestamp: Date.now(),
  };
  const target = EscalationRouter.route(routingRequest);

  // Create the actual request with the resolved target
  const thread = escalationStore.createThread({
    from: fromAgent,
    to: target,
    type: blockerType,
    message: blockerDescription,
    timestamp: Date.now(),
  });
  
  return thread.id;
}

/**
 * Get summary of all God Mode activity
 */
export function getGodModeSummary(parentSessionId: string): string {
  const backgroundManager = getBackgroundManager();
  const tasks = backgroundManager.getTasksByParentSession(parentSessionId);

  if (tasks.length === 0) {
    return 'No God Mode tasks running.';
  }

  const running = tasks.filter(t => t.status === 'running').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const errors = tasks.filter(t => t.status === 'error').length;

  const lines: string[] = [
    `## God Mode Status`,
    `Running: ${running} | Completed: ${completed} | Errors: ${errors}`,
    '',
  ];

  for (const task of tasks) {
    const status = task.status === 'running' ? '🔄' :
                   task.status === 'completed' ? '✅' :
                   task.status === 'error' ? '❌' : '⏳';
    lines.push(`${status} ${task.description}`);
    if (task.error) {
      lines.push(`   Error: ${task.error}`);
    }
  }

  return lines.join('\n');
}
