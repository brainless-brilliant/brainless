#!/usr/bin/env node

/**
 * Brainless Context Injector Hook (Node.js)
 * Gathers project context for slash commands without bash permissions
 * Cross-platform: Windows, macOS, Linux
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

// Read all stdin
async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

// Safely read JSON file
function readJsonFile(path) {
  try {
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch {
    return null;
  }
}

// Count files matching pattern in directory
function countFiles(dir, extension = '.md') {
  try {
    if (!existsSync(dir)) return 0;
    return readdirSync(dir).filter(f => f.endsWith(extension)).length;
  } catch {
    return 0;
  }
}

// List files in directory (with limit)
function listFiles(dir, limit = 10, extension = null) {
  try {
    if (!existsSync(dir)) return [];
    let files = readdirSync(dir);
    if (extension) {
      files = files.filter(f => f.endsWith(extension));
    }
    // Sort by modification time (newest first)
    files = files
      .map(f => ({ name: f, mtime: statSync(join(dir, f)).mtime }))
      .sort((a, b) => b.mtime - a.mtime)
      .slice(0, limit)
      .map(f => f.name);
    return files;
  } catch {
    return [];
  }
}

// Get package.json version
function getPackageVersion(dir) {
  const pkg = readJsonFile(join(dir, 'package.json'));
  return pkg?.version || 'unknown';
}

// Find CLAUDE.md location
function findClaudeMd(dir) {
  const locations = [
    { path: join(dir, '.claude', 'CLAUDE.md'), name: '.claude/CLAUDE.md' },
    { path: join(dir, 'CLAUDE.md'), name: 'CLAUDE.md' },
    { path: join(homedir(), '.claude', 'CLAUDE.md'), name: '~/.claude/CLAUDE.md' }
  ];
  
  for (const loc of locations) {
    if (existsSync(loc.path)) {
      return loc.name;
    }
  }
  return 'not found';
}

// Check if directory exists
function dirExists(path) {
  try {
    return existsSync(path) && statSync(path).isDirectory();
  } catch {
    return false;
  }
}

// Gather brainless directory structure
function getBrainlessStructure(dir) {
  const brainlessDir = join(dir, '.brainless');
  if (!dirExists(brainlessDir)) {
    return { exists: false };
  }
  
  return {
    exists: true,
    memory: countFiles(join(brainlessDir, 'memory'), '.md'),
    transcripts: countFiles(join(brainlessDir, 'transcripts'), '.md'),
    plans: countFiles(join(brainlessDir, 'plans'), '.md'),
    debates: countFiles(join(brainlessDir, 'debates'), '.md'),
    escalations: countFiles(join(brainlessDir, 'escalations'), '.md'),
    recentTranscripts: listFiles(join(brainlessDir, 'transcripts'), 3, '.md')
  };
}

// Count pending escalations
function countPendingEscalations(dir) {
  const escalationsDir = join(dir, '.brainless', 'escalations');
  if (!dirExists(escalationsDir)) return 0;
  
  try {
    const files = readdirSync(escalationsDir).filter(f => f.endsWith('.md'));
    let pending = 0;
    for (const file of files) {
      const content = readFileSync(join(escalationsDir, file), 'utf-8');
      if (content.includes('Status: pending')) pending++;
    }
    return pending;
  } catch {
    return 0;
  }
}

// Detect project stack for provision command
function detectProjectStack(dir) {
  const stack = {
    languages: [],
    frameworks: [],
    hasTests: false,
    hasDocker: false,
    hasGithubActions: false
  };

  // Check package.json
  const pkg = readJsonFile(join(dir, 'package.json'));
  if (pkg) {
    stack.languages.push('Node.js');
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps.react || deps['react-dom']) stack.frameworks.push('React');
    if (deps.next) stack.frameworks.push('Next.js');
    if (deps.vue) stack.frameworks.push('Vue');
    if (deps.express) stack.frameworks.push('Express');
    if (deps.prisma || deps['@prisma/client']) stack.frameworks.push('Prisma');
    if (deps.vitest || deps.jest) stack.hasTests = true;
  }

  // Check for TypeScript
  if (existsSync(join(dir, 'tsconfig.json'))) {
    stack.languages.push('TypeScript');
  }

  // Check for Python
  if (existsSync(join(dir, 'requirements.txt')) || existsSync(join(dir, 'pyproject.toml'))) {
    stack.languages.push('Python');
  }

  // Check for Docker
  if (existsSync(join(dir, 'Dockerfile')) || existsSync(join(dir, 'docker-compose.yml'))) {
    stack.hasDocker = true;
  }

  // Check for GitHub Actions
  if (dirExists(join(dir, '.github', 'workflows'))) {
    stack.hasGithubActions = true;
  }

  return stack;
}

// Check for activity log
function hasActivityLog(dir) {
  return existsSync(join(dir, '.brainless', 'transcripts', 'activity.jsonl'));
}

// Main
async function main() {
  try {
    const input = await readStdin();
    if (!input.trim()) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    let data = {};
    try { data = JSON.parse(input); } catch {}
    
    const directory = data.directory || process.cwd();
    const prompt = data.prompt || '';
    
    // Detect which command is being invoked
    const isInit = /\/brainless:init\b/.test(prompt);
    const isConfig = /\/brainless:config\b/.test(prompt);
    const isStatus = /\/brainless:status\b/.test(prompt);
    const isMemory = /\/brainless:memory\b/.test(prompt);
    const isTeam = /\/brainless:team\b|\/team\b/.test(prompt);
    const isEscalate = /\/brainless:escalate\b/.test(prompt);
    const isTranscript = /\/transcript\b/.test(prompt);
    const isProvision = /\/provision\b/.test(prompt);
    
    // Only inject context for brainless commands
    if (!isInit && !isConfig && !isStatus && !isMemory && !isTeam && !isEscalate && !isTranscript && !isProvision) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }

    // Gather context
    const context = {
      claudeMd: findClaudeMd(directory),
      brainless: getBrainlessStructure(directory),
      debugMode: process.env.BRAINLESS_DEBUG || 'disabled',
      apiKeySet: !!process.env.ANTHROPIC_API_KEY,
      version: getPackageVersion(join(process.env.CLAUDE_PLUGIN_ROOT || directory)),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      sessionId: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
    };

    // Add command-specific context
    if (isEscalate) {
      context.pendingEscalations = countPendingEscalations(directory);
    }
    
    if (isTranscript) {
      context.hasActivityLog = hasActivityLog(directory);
    }
    
    if (isProvision) {
      context.stack = detectProjectStack(directory);
    }
    
    if (isMemory) {
      context.memoryFiles = listFiles(join(directory, '.brainless', 'memory'), 10, '.md');
    }

    // Build context message
    const contextMessage = `<brainless-context>
${JSON.stringify(context, null, 2)}
</brainless-context>

---
`;

    console.log(JSON.stringify({ continue: true, message: contextMessage }));
  } catch (error) {
    // On any error, allow continuation without context
    console.log(JSON.stringify({ continue: true }));
  }
}

main();
