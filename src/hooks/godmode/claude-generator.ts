/**
 * God-Mode CLAUDE.md Generator
 *
 * Generates directory-specific CLAUDE.md files with:
 * - AI-inferred directory purpose
 * - Assigned agents based on directory type
 * - Memory insights from past work
 * - Testing commands
 *
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import type { TeamConfig } from '../../features/team-builder/index.js';
import type { Observation } from '../../features/memory/store.js';

// ============================================================================
// TYPES
// ============================================================================

export interface DirectoryAnalysis {
  path: string;
  name: string;
  type: 'src' | 'api' | 'ui' | 'tests' | 'docs' | 'config' | 'scripts' | 'lib' | 'other';
  languages: string[];
  fileCount: number;
  hasTests: boolean;
  hasReadme: boolean;
  suggestedAgents: string[];
  importantFiles: string[];
  depth: number;
}

export interface GeneratorConfig {
  /** Include memory insights */
  includeMemory: boolean;
  /** Include testing commands */
  includeTesting: boolean;
  /** Include agent assignments */
  includeAgents: boolean;
}

export const DEFAULT_GENERATOR_CONFIG: GeneratorConfig = {
  includeMemory: true,
  includeTesting: true,
  includeAgents: true,
};

// ============================================================================
// PURPOSE TEMPLATES
// ============================================================================

const PURPOSE_TEMPLATES: Record<string, string> = {
  api: 'Contains API endpoints, route handlers, and controllers for the application\'s HTTP interface.',
  ui: 'Contains UI components, views, and pages for the application\'s frontend.',
  tests: 'Contains test files including unit tests, integration tests, and test utilities.',
  docs: 'Contains documentation including guides, API references, and development notes.',
  config: 'Contains configuration files and environment-specific settings.',
  scripts: 'Contains utility scripts, build tools, and automation helpers.',
  lib: 'Contains shared libraries, utilities, and reusable modules.',
  src: 'Contains core source code and application logic.',
  other: 'Contains project files and resources.',
};

// ============================================================================
// TESTING COMMAND TEMPLATES
// ============================================================================

const TEST_COMMANDS: Record<string, Record<string, string>> = {
  TypeScript: {
    test: 'npm test -- --testPathPattern=',
    lint: 'npm run lint -- ',
    typecheck: 'npx tsc --noEmit',
  },
  JavaScript: {
    test: 'npm test -- --testPathPattern=',
    lint: 'npm run lint -- ',
  },
  Python: {
    test: 'pytest ',
    lint: 'ruff check ',
    typecheck: 'mypy ',
  },
  Rust: {
    test: 'cargo test -p ',
    build: 'cargo build -p ',
    lint: 'cargo clippy -p ',
  },
  Go: {
    test: 'go test ./',
    lint: 'golint ./',
  },
};

// ============================================================================
// CLAUDE.md GENERATION
// ============================================================================

/**
 * Generate CLAUDE.md content for a directory
 */
export function generateDirectoryClaude(
  dirPath: string,
  analysis: DirectoryAnalysis,
  team: TeamConfig | null,
  memoryInsights: Observation[],
  config: Partial<GeneratorConfig> = {}
): string {
  const cfg = { ...DEFAULT_GENERATOR_CONFIG, ...config };
  const lines: string[] = [];

  // Header
  lines.push(`# ${analysis.name}`);
  lines.push('');

  // Purpose
  lines.push('## Purpose');
  lines.push('');
  lines.push(PURPOSE_TEMPLATES[analysis.type] || PURPOSE_TEMPLATES.other);
  if (analysis.languages.length > 0) {
    lines.push(`Primary languages: ${analysis.languages.join(', ')}.`);
  }
  lines.push('');

  // Key Files
  if (analysis.importantFiles.length > 0) {
    lines.push('## Key Files');
    lines.push('');
    for (const file of analysis.importantFiles) {
      lines.push(`- \`${file}\``);
    }
    lines.push('');
  }

  // Agents (if enabled)
  if (cfg.includeAgents && team && team.agents.length > 0) {
    lines.push('## Assigned Agents');
    lines.push('');
    lines.push('| Agent | Purpose |');
    lines.push('|-------|---------|');
    for (const agent of team.agents) {
      const purpose = getAgentPurpose(agent);
      lines.push(`| \`${agent}\` | ${purpose} |`);
    }
    lines.push('');
    if (team.rationale) {
      lines.push(`*${team.rationale}*`);
      lines.push('');
    }
  }

  // Testing Commands (if enabled)
  if (cfg.includeTesting) {
    const testCommands = getTestingCommands(analysis);
    if (Object.keys(testCommands).length > 0) {
      lines.push('## Testing Commands');
      lines.push('');
      lines.push('```bash');
      for (const [name, cmd] of Object.entries(testCommands)) {
        lines.push(`# ${name}`);
        lines.push(cmd);
        lines.push('');
      }
      lines.push('```');
      lines.push('');
    }
  }

  // Memory Insights (if enabled)
  if (cfg.includeMemory && memoryInsights.length > 0) {
    lines.push('## Past Work');
    lines.push('');
    lines.push('Previous work in this directory:');
    lines.push('');
    for (const obs of memoryInsights.slice(0, 3)) {
      const date = new Date(obs.created_at_epoch).toLocaleDateString();
      lines.push(`- **${obs.title || 'Work'}** (${date})`);
      if (obs.facts && obs.facts.length > 0) {
        for (const fact of obs.facts.slice(0, 2)) {
          lines.push(`  - ${fact}`);
        }
      }
    }
    lines.push('');
  }

  // AI Instructions
  lines.push('## For AI Agents');
  lines.push('');
  lines.push('### Working In This Directory');
  lines.push('');
  lines.push(getWorkingInstructions(analysis));
  lines.push('');

  // Footer
  lines.push('---');
  lines.push(`*Generated by god-mode at ${new Date().toISOString()}*`);

  return lines.join('\n');
}

/**
 * Get agent purpose description
 */
function getAgentPurpose(agent: string): string {
  const purposes: Record<string, string> = {
    'executor': 'Code implementation and modifications',
    'executor-low': 'Simple code tasks',
    'executor-high': 'Complex implementation work',
    'designer': 'UI/UX design and styling',
    'designer-low': 'Simple styling changes',
    'designer-high': 'Complex UI architecture',
    'architect': 'Architecture design and review',
    'architect-medium': 'Moderate analysis tasks',
    'architect-low': 'Quick technical questions',
    'security-reviewer': 'Security audit and vulnerabilities',
    'qa-tester': 'Testing and verification',
    'tdd-guide': 'Test-driven development guidance',
    'build-fixer': 'Build and compilation issues',
    'build-fixer-low': 'Simple type fixes',
    'code-reviewer': 'Code quality review',
    'writer': 'Documentation writing',
    'explore': 'Codebase navigation',
    'researcher': 'External research',
  };

  return purposes[agent] || 'General tasks';
}

/**
 * Get testing commands for directory
 */
function getTestingCommands(analysis: DirectoryAnalysis): Record<string, string> {
  const commands: Record<string, string> = {};
  const lang = analysis.languages[0];

  if (!lang || !TEST_COMMANDS[lang]) return commands;

  const langCommands = TEST_COMMANDS[lang];

  if (langCommands.test) {
    commands['Run tests'] = `${langCommands.test}${analysis.path}`;
  }
  if (langCommands.lint) {
    commands['Lint'] = `${langCommands.lint}${analysis.path}`;
  }
  if (langCommands.typecheck) {
    commands['Type check'] = langCommands.typecheck;
  }

  return commands;
}

/**
 * Get working instructions for directory type
 */
function getWorkingInstructions(analysis: DirectoryAnalysis): string {
  const instructions: Record<string, string> = {
    api: '- Follow RESTful conventions\n- Validate inputs\n- Handle errors consistently\n- Add authentication where needed',
    ui: '- Follow component patterns\n- Use consistent styling\n- Ensure accessibility\n- Add prop types/interfaces',
    tests: '- Follow existing test patterns\n- Use descriptive test names\n- Mock external dependencies\n- Aim for high coverage',
    docs: '- Keep documentation up-to-date\n- Use clear language\n- Include code examples\n- Link related documents',
    config: '- Document all settings\n- Use environment variables for secrets\n- Maintain backwards compatibility',
    scripts: '- Add usage documentation\n- Handle errors gracefully\n- Make scripts idempotent',
    lib: '- Maintain backwards compatibility\n- Document public APIs\n- Add comprehensive tests',
    src: '- Follow project conventions\n- Write clean, readable code\n- Add tests for new functionality',
    other: '- Follow existing patterns\n- Document changes\n- Consider impact on other parts',
  };

  return instructions[analysis.type] || instructions.other;
}

// ============================================================================
// FILE OPERATIONS
// ============================================================================

/**
 * Write CLAUDE.md to directory's .brainless folder
 */
export function writeDirectoryClaude(
  projectRoot: string,
  dirPath: string,
  content: string
): boolean {
  try {
    const fullPath = join(projectRoot, dirPath, '.brainless');
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }

    const claudePath = join(fullPath, 'CLAUDE.md');
    writeFileSync(claudePath, content, 'utf-8');

    return true;
  } catch (error) {
    console.error(`Failed to write CLAUDE.md to ${dirPath}:`, error);
    return false;
  }
}

/**
 * Read existing CLAUDE.md from directory
 */
export function readDirectoryClaude(
  projectRoot: string,
  dirPath: string
): string | null {
  try {
    const claudePath = join(projectRoot, dirPath, '.brainless', 'CLAUDE.md');
    if (existsSync(claudePath)) {
      return readFileSync(claudePath, 'utf-8');
    }
    return null;
  } catch {
    return null;
  }
}
