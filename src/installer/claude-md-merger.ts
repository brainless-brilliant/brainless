/**
 * CLAUDE.md Merger Module
 * 
 * Smart merging of user's existing CLAUDE.md with Brainless plugin defaults.
 * Preserves user SOPs while adding plugin functionality.
 */

import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import Anthropic from '@anthropic-ai/sdk';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

export interface CLAUDEmdLocation {
  path: string;
  exists: boolean;
  size: number;
  priority: number; // Lower = higher priority
}

export interface MergeResult {
  success: boolean;
  merged: string;
  model: 'sonnet' | 'opus';
  confidence: number;
  changes: string[];
  error?: string;
}

export interface MergeOptions {
  userChoice?: 'override' | 'merge' | 'skip';
  backupPath?: string;
  verbose?: boolean;
}

/**
 * Detect existing CLAUDE.md files in all possible locations
 */
export function detectExistingCLAUDEmd(cwd: string = process.cwd()): CLAUDEmdLocation[] {
  const locations: CLAUDEmdLocation[] = [
    // Priority 1: Project-specific .claude/CLAUDE.md
    { path: join(cwd, '.claude', 'CLAUDE.md'), exists: false, size: 0, priority: 1 },
    
    // Priority 2: Project root CLAUDE.md
    { path: join(cwd, 'CLAUDE.md'), exists: false, size: 0, priority: 2 },
    
    // Priority 3: User-level ~/.claude/CLAUDE.md
    { path: join(homedir(), '.claude', 'CLAUDE.md'), exists: false, size: 0, priority: 3 },
    
    // Priority 4: User home ~/CLAUDE.md
    { path: join(homedir(), 'CLAUDE.md'), exists: false, size: 0, priority: 4 },
  ];

  for (const location of locations) {
    if (existsSync(location.path)) {
      location.exists = true;
      try {
        const stats = readFileSync(location.path, 'utf-8');
        location.size = Buffer.byteLength(stats, 'utf-8');
      } catch {
        location.size = 0;
      }
    }
  }

  return locations;
}

/**
 * Find the highest priority existing CLAUDE.md
 */
export function findPrimaryLocation(locations: CLAUDEmdLocation[]): CLAUDEmdLocation | null {
  const existing = locations.filter(l => l.exists);
  if (existing.length === 0) return null;
  
  // Sort by priority (lower number = higher priority)
  existing.sort((a, b) => a.priority - b.priority);
  return existing[0];
}

/**
 * Prompt user for merge choice
 */
export async function promptUserForChoice(
  location: CLAUDEmdLocation,
  verbose: boolean = false
): Promise<'override' | 'merge' | 'skip'> {
  const rl = readline.createInterface({ input, output });
  
  const sizeKB = (location.size / 1024).toFixed(1);
  
  console.log('\n' + '='.repeat(70));
  console.log(`🔍 Found existing CLAUDE.md (${sizeKB} KB)`);
  console.log(`   Location: ${location.path}`);
  console.log('='.repeat(70));
  console.log('\nYour CLAUDE.md contains custom instructions.');
  console.log('How should we proceed?\n');
  console.log('[1] Override - Use Brainless defaults (your file backed up)');
  console.log('[2] Merge - AI-powered merge (preserves your SOPs + adds Brainless)');
  console.log('[3] Skip - I\'ll merge manually later\n');
  
  let choice: string;
  while (true) {
    choice = await rl.question('Choice (1/2/3): ');
    if (['1', '2', '3'].includes(choice.trim())) {
      break;
    }
    console.log('Invalid choice. Please enter 1, 2, or 3.');
  }
  
  rl.close();
  
  const mapping = {
    '1': 'override' as const,
    '2': 'merge' as const,
    '3': 'skip' as const,
  };
  
  return mapping[choice.trim() as '1' | '2' | '3'];
}

/**
 * Create backup of existing file
 */
export function backupExistingFile(filePath: string): string {
  const backupPath = `${filePath}.backup`;
  let counter = 1;
  let finalBackupPath = backupPath;
  
  // Find unique backup filename
  while (existsSync(finalBackupPath)) {
    finalBackupPath = `${backupPath}.${counter}`;
    counter++;
  }
  
  copyFileSync(filePath, finalBackupPath);
  return finalBackupPath;
}

/**
 * AI-powered merge using Anthropic API
 */
export async function mergeCLAUDEmd(
  userContent: string,
  pluginContent: string,
  verbose: boolean = false
): Promise<MergeResult> {
  const userSize = Buffer.byteLength(userContent, 'utf-8');
  
  // Auto-select model based on size
  const useOpus = userSize > 10000; // 10KB threshold
  const model = useOpus 
    ? 'claude-opus-4-20250514' 
    : 'claude-sonnet-4-20250514';
  
  if (verbose) {
    console.log(`\n📊 File size: ${(userSize / 1024).toFixed(1)} KB`);
    console.log(`🤖 Using model: ${useOpus ? 'Opus' : 'Sonnet'}`);
    if (useOpus) {
      console.log('⏱️  Large file detected, merge may take ~30 seconds...\n');
    }
  }
  
  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      merged: userContent,
      model: useOpus ? 'opus' : 'sonnet',
      confidence: 0,
      changes: [],
      error: 'ANTHROPIC_API_KEY not set. Cannot perform AI merge.'
    };
  }
  
  try {
    const anthropic = new Anthropic({ apiKey });
    
    const prompt = `You are merging two CLAUDE.md files for a coding project.

**User's Existing CLAUDE.md:**
\`\`\`markdown
${userContent}
\`\`\`

**Brainless Plugin Default CLAUDE.md:**
\`\`\`markdown
${pluginContent}
\`\`\`

**Task:**
1. Preserve ALL user instructions, SOPs, and custom rules (100% preservation required)
2. Add Brainless plugin system integration sections
3. Add team assembly activation instructions
4. On conflicts: user content takes precedence over plugin content
5. Keep formatting clean, organized, and readable
6. Merge intelligently - don't just append, integrate logically

**Output Format:**
First, provide the merged content in a markdown code block:

\`\`\`markdown
<your merged CLAUDE.md content here>
\`\`\`

Then on new lines after the code block:
CONFIDENCE: <0-100 integer>
CHANGES: <comma-separated list of major additions>

**Important:**
- User content is sacred - never remove or modify it
- Plugin content should integrate seamlessly
- Confidence should reflect merge quality (aim for 80+)`;

    const response = await anthropic.messages.create({
      model,
      max_tokens: 8000,
      temperature: 0,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });
    
    // Parse response
    const text = response.content[0].type === 'text' 
      ? response.content[0].text 
      : '';
    
    if (verbose) {
      console.log(`\n✅ Merge complete (${response.usage?.input_tokens || 0} in, ${response.usage?.output_tokens || 0} out)\n`);
    }
    
    // Extract merged content
    const codeBlockMatch = text.match(/```markdown\n([\s\S]*?)\n```/);
    const merged = codeBlockMatch ? codeBlockMatch[1] : userContent;
    
    // Extract confidence
    const confidenceMatch = text.match(/CONFIDENCE:\s*(\d+)/);
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 50;
    
    // Extract changes
    const changesMatch = text.match(/CHANGES:\s*(.+)/);
    const changes = changesMatch 
      ? changesMatch[1].split(',').map((c: string) => c.trim())
      : ['Plugin integration', 'Team assembly setup'];
    
    // Validate merge quality
    if (confidence < 70) {
      return {
        success: false,
        merged: userContent,
        model: useOpus ? 'opus' : 'sonnet',
        confidence,
        changes,
        error: `Merge confidence too low: ${confidence}%. Manual merge recommended.`
      };
    }
    
    return {
      success: true,
      merged,
      model: useOpus ? 'opus' : 'sonnet',
      confidence,
      changes
    };
    
  } catch (error) {
    return {
      success: false,
      merged: userContent,
      model: useOpus ? 'opus' : 'sonnet',
      confidence: 0,
      changes: [],
      error: error instanceof Error ? error.message : 'Unknown error during merge'
    };
  }
}

/**
 * Main merge workflow
 */
export async function performCLAUDEmdMerge(
  pluginContent: string,
  targetPath: string,
  options: MergeOptions = {}
): Promise<{ success: boolean; message: string; backupPath?: string }> {
  const verbose = options.verbose || false;
  const log = (msg: string) => verbose && console.log(msg);
  
  // Detect existing files
  const locations = detectExistingCLAUDEmd();
  const primary = findPrimaryLocation(locations);
  
  if (!primary) {
    // No existing file, just write plugin default
    writeFileSync(targetPath, pluginContent);
    log('✅ Created new CLAUDE.md with Brainless defaults');
    return { success: true, message: 'Created new CLAUDE.md' };
  }
  
  // Get user choice
  const choice = options.userChoice || await promptUserForChoice(primary, verbose);
  
  if (choice === 'skip') {
    log('⏭️  Skipped CLAUDE.md merge. You can merge manually later.');
    return { success: true, message: 'Skipped (user choice)' };
  }
  
  // Create backup
  const backupPath = options.backupPath || backupExistingFile(primary.path);
  log(`💾 Backup created: ${backupPath}`);
  
  if (choice === 'override') {
    writeFileSync(targetPath, pluginContent);
    log(`✅ Overridden with Brainless defaults`);
    return { 
      success: true, 
      message: 'Overridden with plugin defaults',
      backupPath 
    };
  }
  
  // Choice is 'merge'
  const userContent = readFileSync(primary.path, 'utf-8');
  const mergeResult = await mergeCLAUDEmd(userContent, pluginContent, verbose);
  
  if (!mergeResult.success) {
    console.error(`\n❌ Merge failed: ${mergeResult.error}`);
    console.error('\nFalling back to manual merge:');
    console.error(`1. Your file backed up to: ${backupPath}`);
    console.error(`2. Review and merge manually`);
    return { 
      success: false, 
      message: mergeResult.error || 'Merge failed',
      backupPath 
    };
  }
  
  // Write merged content
  writeFileSync(targetPath, mergeResult.merged);
  
  console.log('\n✨ Merge successful!');
  console.log(`📊 Confidence: ${mergeResult.confidence}%`);
  console.log(`🤖 Model: ${mergeResult.model}`);
  console.log(`📝 Changes: ${mergeResult.changes.join(', ')}`);
  console.log(`💾 Backup: ${backupPath}\n`);
  
  return { 
    success: true, 
    message: `Merged successfully (${mergeResult.confidence}%)`,
    backupPath 
  };
}
