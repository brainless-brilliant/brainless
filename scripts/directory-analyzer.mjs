#!/usr/bin/env node

/**
 * Directory Analyzer for God-Mode
 * 
 * Cross-platform Node.js script that analyzes project directories
 * to determine their purpose, type, and suggested agents.
 * 
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, readdirSync, statSync, readFileSync } from 'fs';
import { join, basename, extname } from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const IGNORE_DIRS = [
  'node_modules', '.git', 'dist', 'build', '__pycache__', '.venv', 
  'coverage', '.next', '.nuxt', '.cache', '.turbo', 'target',
  '.brainless', '.claude', '.anv'
];

const IGNORE_FILES = [
  '.DS_Store', 'Thumbs.db', '.gitignore', '.npmrc', '.env', '.env.local'
];

// ============================================================================
// TYPES
// ============================================================================

/**
 * @typedef {'src' | 'api' | 'ui' | 'tests' | 'docs' | 'config' | 'scripts' | 'lib' | 'other'} DirectoryType
 */

/**
 * @typedef {Object} DirectoryAnalysis
 * @property {string} path - Relative path from project root
 * @property {string} name - Directory basename
 * @property {DirectoryType} type - Inferred directory type
 * @property {string[]} languages - Detected programming languages
 * @property {number} fileCount - Number of files (not recursive)
 * @property {boolean} hasTests - Whether directory has test files
 * @property {boolean} hasReadme - Whether directory has README
 * @property {string[]} suggestedAgents - Suggested agents for this directory
 * @property {string[]} importantFiles - Key files in this directory
 * @property {number} depth - Depth from project root
 */

// ============================================================================
// DIRECTORY TYPE DETECTION
// ============================================================================

const TYPE_PATTERNS = {
  api: [/^api$/i, /^routes$/i, /^endpoints$/i, /^controllers?$/i, /^handlers?$/i],
  ui: [/^components?$/i, /^views?$/i, /^pages?$/i, /^ui$/i, /^widgets?$/i, /^screens?$/i],
  tests: [/^tests?$/i, /^__tests__$/i, /^spec$/i, /^e2e$/i, /^integration$/i],
  docs: [/^docs?$/i, /^documentation$/i, /^guides?$/i],
  config: [/^config$/i, /^configuration$/i, /^settings?$/i, /^\.github$/i],
  scripts: [/^scripts?$/i, /^bin$/i, /^tools?$/i, /^cli$/i],
  lib: [/^lib$/i, /^libs?$/i, /^vendor$/i, /^packages?$/i],
  src: [/^src$/i, /^source$/i, /^app$/i, /^core$/i],
};

/**
 * Detect directory type from name
 * @param {string} dirName 
 * @returns {DirectoryType}
 */
function detectTypeFromName(dirName) {
  for (const [type, patterns] of Object.entries(TYPE_PATTERNS)) {
    if (patterns.some(p => p.test(dirName))) {
      return type;
    }
  }
  return 'other';
}

/**
 * Detect directory type from contents
 * @param {string} dirPath 
 * @returns {DirectoryType}
 */
function detectTypeFromContents(dirPath) {
  try {
    const files = readdirSync(dirPath);
    
    // Check for test patterns
    const hasTestFiles = files.some(f => 
      /\.(test|spec)\.(ts|js|tsx|jsx|py)$/i.test(f) ||
      f.includes('__tests__')
    );
    if (hasTestFiles) return 'tests';
    
    // Check for UI patterns (React/Vue/Angular)
    const hasUIFiles = files.some(f => 
      /\.(tsx|jsx|vue|svelte)$/i.test(f) ||
      /\.component\.(ts|js)$/i.test(f)
    );
    if (hasUIFiles) return 'ui';
    
    // Check for API patterns
    const hasAPIFiles = files.some(f => 
      /route|controller|handler|endpoint/i.test(f)
    );
    if (hasAPIFiles) return 'api';
    
    // Check for docs
    const hasDocFiles = files.some(f => 
      /\.md$/i.test(f) || /readme/i.test(f)
    );
    if (files.every(f => hasDocFiles || statSync(join(dirPath, f)).isDirectory())) {
      return 'docs';
    }
    
    return 'other';
  } catch {
    return 'other';
  }
}

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

const LANGUAGE_EXTENSIONS = {
  '.ts': 'TypeScript',
  '.tsx': 'TypeScript',
  '.js': 'JavaScript',
  '.jsx': 'JavaScript',
  '.py': 'Python',
  '.rs': 'Rust',
  '.go': 'Go',
  '.java': 'Java',
  '.kt': 'Kotlin',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.cs': 'C#',
  '.cpp': 'C++',
  '.c': 'C',
  '.swift': 'Swift',
  '.vue': 'Vue',
  '.svelte': 'Svelte',
};

/**
 * Detect languages in directory
 * @param {string} dirPath 
 * @returns {string[]}
 */
function detectLanguages(dirPath) {
  const languages = new Set();
  
  try {
    const files = readdirSync(dirPath);
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (LANGUAGE_EXTENSIONS[ext]) {
        languages.add(LANGUAGE_EXTENSIONS[ext]);
      }
    }
  } catch {
    // Ignore errors
  }
  
  return Array.from(languages);
}

// ============================================================================
// AGENT SUGGESTIONS
// ============================================================================

const TYPE_AGENTS = {
  api: ['executor', 'security-reviewer', 'architect-medium'],
  ui: ['designer', 'executor', 'qa-tester'],
  tests: ['qa-tester', 'executor-low', 'tdd-guide'],
  docs: ['writer', 'explore'],
  config: ['executor-low', 'architect-low'],
  scripts: ['executor', 'build-fixer'],
  lib: ['executor', 'architect-medium', 'code-reviewer'],
  src: ['executor', 'architect-medium'],
  other: ['executor', 'explore'],
};

/**
 * Get suggested agents for directory type
 * @param {DirectoryType} type 
 * @param {string[]} languages
 * @returns {string[]}
 */
function getSuggestedAgents(type, languages) {
  const agents = [...(TYPE_AGENTS[type] || TYPE_AGENTS.other)];
  
  // Add language-specific agents
  if (languages.includes('TypeScript') || languages.includes('JavaScript')) {
    if (!agents.includes('build-fixer')) {
      agents.push('build-fixer-low');
    }
  }
  
  return agents;
}

// ============================================================================
// MAIN ANALYSIS
// ============================================================================

/**
 * Analyze a single directory
 * @param {string} dirPath - Absolute path
 * @param {string} relativePath - Relative path from project root
 * @param {number} depth - Depth from root
 * @returns {DirectoryAnalysis}
 */
function analyzeDirectory(dirPath, relativePath, depth) {
  const name = basename(dirPath);
  
  // Detect type
  let type = detectTypeFromName(name);
  if (type === 'other') {
    type = detectTypeFromContents(dirPath);
  }
  
  // Get files
  let files = [];
  let hasTests = false;
  let hasReadme = false;
  const importantFiles = [];
  
  try {
    files = readdirSync(dirPath).filter(f => {
      if (IGNORE_FILES.includes(f)) return false;
      try {
        return statSync(join(dirPath, f)).isFile();
      } catch {
        return false;
      }
    });
    
    hasTests = files.some(f => /\.(test|spec)\./i.test(f));
    hasReadme = files.some(f => /^readme/i.test(f));
    
    // Find important files
    const importantPatterns = [/^index\./i, /^main\./i, /^app\./i, /readme/i, /package\.json/];
    files.forEach(f => {
      if (importantPatterns.some(p => p.test(f))) {
        importantFiles.push(f);
      }
    });
  } catch {
    // Ignore errors
  }
  
  // Detect languages
  const languages = detectLanguages(dirPath);
  
  // Get suggested agents
  const suggestedAgents = getSuggestedAgents(type, languages);
  
  return {
    path: relativePath,
    name,
    type,
    languages,
    fileCount: files.length,
    hasTests,
    hasReadme,
    suggestedAgents,
    importantFiles,
    depth,
  };
}

/**
 * Recursively analyze directories
 * @param {string} rootPath - Project root
 * @param {string} currentPath - Current directory
 * @param {number} depth - Current depth
 * @param {number} maxDepth - Maximum depth
 * @returns {DirectoryAnalysis[]}
 */
function analyzeRecursively(rootPath, currentPath, depth, maxDepth) {
  const results = [];
  
  if (depth > maxDepth) return results;
  
  try {
    const entries = readdirSync(currentPath);
    
    for (const entry of entries) {
      if (IGNORE_DIRS.includes(entry)) continue;
      
      const fullPath = join(currentPath, entry);
      
      try {
        const stat = statSync(fullPath);
        if (!stat.isDirectory()) continue;
        
        const relativePath = fullPath.replace(rootPath + '/', '').replace(rootPath + '\\', '');
        
        // Analyze this directory
        results.push(analyzeDirectory(fullPath, relativePath, depth));
        
        // Recurse into subdirectories
        results.push(...analyzeRecursively(rootPath, fullPath, depth + 1, maxDepth));
      } catch {
        // Skip inaccessible directories
      }
    }
  } catch {
    // Ignore errors
  }
  
  return results;
}

/**
 * Main analysis function
 * @param {string} projectRoot 
 * @param {number} maxDepth 
 * @returns {{ directories: DirectoryAnalysis[], projectRoot: string, analyzedAt: string }}
 */
function analyze(projectRoot, maxDepth = 4) {
  const directories = analyzeRecursively(projectRoot, projectRoot, 1, maxDepth);
  
  // Sort by depth, then path
  directories.sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.path.localeCompare(b.path);
  });
  
  return {
    directories,
    projectRoot,
    analyzedAt: new Date().toISOString(),
  };
}

// ============================================================================
// CLI ENTRY
// ============================================================================

async function main() {
  // Read stdin for configuration
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  
  let config = {};
  const input = Buffer.concat(chunks).toString('utf-8').trim();
  
  if (input) {
    try {
      config = JSON.parse(input);
    } catch {
      // Use defaults
    }
  }
  
  const projectRoot = config.directory || process.cwd();
  const maxDepth = config.maxDepth || 4;
  
  const result = analyze(projectRoot, maxDepth);
  
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
