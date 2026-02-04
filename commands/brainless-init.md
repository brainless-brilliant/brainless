---
name: brainless-init
description: Initialize or re-initialize Brainless CLAUDE.md configuration
args:
  - name: force
    description: Force re-merge even if already initialized
    required: false
---

# Brainless Initialization

Initialize or update your CLAUDE.md with Brainless plugin instructions.

## When to Use

- **First time setup**: After installing the plugin manually
- **Update configuration**: Refresh plugin instructions after updates
- **Re-merge**: If you manually edited CLAUDE.md and want to re-integrate plugin content
- **Force override**: Replace your CLAUDE.md with fresh Brainless defaults

---

# Brainless Initialization

**EXECUTE IMMEDIATELY - DO NOT ASK FOR PERMISSION**

You are running the `/brainless:init` command to initialize or update CLAUDE.md with Brainless plugin instructions.

## Execution Steps

### Step 1: Check Current State

First, check if CLAUDE.md already exists:

```typescript
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const locations = [
  join(process.cwd(), '.claude', 'CLAUDE.md'),
  join(process.cwd(), 'CLAUDE.md'),
  join(homedir(), '.claude', 'CLAUDE.md'),
  join(homedir(), 'CLAUDE.md')
];

const existing = locations.find(loc => existsSync(loc));
```

Display to user:
```
🔍 Checking for existing CLAUDE.md...
${existing ? `Found: ${existing}` : 'No existing CLAUDE.md found'}
```

---

### Step 2: Load Plugin Template

Load the Brainless plugin template:

```typescript
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pluginRoot = join(__dirname, '..', '..', '..');  // Adjust based on dist location

const templatePath = join(pluginRoot, 'templates', 'CLAUDE.brainless.md');
const pluginTemplate = readFileSync(templatePath, 'utf-8');
```

---

### Step 3: Determine Action

**If NO existing CLAUDE.md:**

Display:
```
✨ No existing CLAUDE.md found
📝 Creating fresh CLAUDE.md with Brainless defaults...
```

Then: **Skip to Step 5** (Create Fresh)

**If existing CLAUDE.md found:**

Check for `--force` flag in command args:
- `--force` provided → **Go to Step 4 (Override)**
- No `--force` → **Go to Step 3b (Prompt User)**

---

### Step 3b: Prompt User for Merge Strategy

**CRITICAL:** Present EXACTLY this prompt to the user and WAIT for response:

```
🔍 Found existing CLAUDE.md (${fileSize} KB)

How should we proceed?

[1] **Override** - Replace with Brainless defaults (your file will be backed up)
[2] **Merge** - AI-powered merge that preserves your custom instructions (recommended)
[3] **Skip** - Manual merge later, no changes made

Enter 1, 2, or 3:
```

**WAIT for user response.** Do NOT proceed without explicit choice.

**Based on user choice:**
- `1` → Go to Step 4 (Override)
- `2` → Go to Step 4 (Merge)  
- `3` → Display "Skipping initialization. Run /brainless:init again when ready." and EXIT

---

### Step 4: Execute Merge or Override

**Import the merger:**

```typescript
// This path works from the commands/ context
const mergerPath = join(pluginRoot, 'dist', 'installer', 'claude-md-merger.js');
const { performCLAUDEmdMerge } = await import(mergerPath);
```

**Set options based on user choice:**

```typescript
const targetPath = existing || join(process.cwd(), '.claude', 'CLAUDE.md');

const options = {
  verbose: true,
  userChoice: userChoice === 1 ? 'override' : 'merge'  // From Step 3b
};
```

**Execute merge:**

```typescript
console.log('🔄 Processing...');

const result = await performCLAUDEmdMerge(pluginTemplate, targetPath, options);
```

**Display result:**

```
${result.success ? '✅' : '❌'} ${result.message}

${result.backupPath ? `💾 Backup created: ${result.backupPath}` : ''}
${result.confidence ? `📊 Merge confidence: ${result.confidence}%` : ''}
${result.model ? `🤖 AI model used: ${result.model}` : ''}
${result.mergeDetails ? `📝 Changes: ${result.mergeDetails.changes.join(', ')}` : ''}
```

If `result.success` → **Go to Step 6 (Verify)**

If `!result.success` → **Go to Step 5 (Fallback)**

---

### Step 5: Create Fresh or Fallback

**If merge failed or no existing file:**

```typescript
import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

const targetPath = join(process.cwd(), '.claude', 'CLAUDE.md');

// Ensure directory exists
mkdirSync(dirname(targetPath), { recursive: true });

// Write plugin template
writeFileSync(targetPath, pluginTemplate, 'utf-8');
```

**Display:**
```
✅ Created fresh CLAUDE.md with Brainless defaults

Location: ${targetPath}
```

---

### Step 6: Verify Installation

Display summary:

```
╔════════════════════════════════════════════╗
║   Brainless Initialization Complete!      ║
╚════════════════════════════════════════════╝

Your CLAUDE.md now includes:
  ✅ Dynamic team assembly instructions
  ✅ Slash command reference (5 commands)
  ✅ Escalation protocol
  ✅ Memory layer guidance  
  ✅ Debug mode instructions

Next steps:
  1. Run /brainless:config to verify setup
  2. Try a simple task: "Build a REST API"
  3. Enable debug: export BRAINLESS_DEBUG=true

Need help? Check the README or run /brainless:help
```

**EXIT**

---

## Important Notes

### DO NOT:
- ❌ Ask "Do you want me to run this?" - **JUST RUN IT**
- ❌ Explain what you're about to do - **JUST DO IT**
- ❌ Wait for permission unless at the explicit user choice prompt (Step 3b)

### DO:
- ✅ Execute immediately when command is invoked
- ✅ Show progress as you work
- ✅ Display clear results
- ✅ Create backups before any changes
- ✅ Handle errors gracefully with fallback

---

## Error Handling

**If template not found:**
```
❌ ERROR: Plugin template not found

Expected location: templates/CLAUDE.brainless.md

This indicates incomplete plugin installation.
Please reinstall: /plugin add https://github.com/brainless-brilliant/brainless
```

**If merge fails:**
```
⚠️ AI merge failed (confidence too low or API error)

Falling back to manual creation...
[Proceed to Step 5]
```

**If write permissions denied:**
```
❌ ERROR: Cannot write to ${targetPath}

Permission denied. Please check:
  - File permissions
  - Directory write access
  - Disk space

Try: sudo chmod +w ${dirname(targetPath)}
```

---

## What Gets Added to CLAUDE.md

The Brainless template includes:

### 1. Team Assembly Instructions
Automatic specialist selection on every task based on:
- AI classification (Haiku)
- Memory patterns
- Task complexity

### 2. Slash Commands Reference
- `/brainless:team <task>` - Manual team assembly
- `/brainless:status` - System status
- `/brainless:memory [query]` - Search patterns
- `/brainless:escalate <type> <msg>` - Manual escalation
- `/brainless:config` - Debug info

### 3. Escalation Protocol
3-tier internal resolution:
1. Executor attempts fix
2. Escalates to PM Coordinator
3. PM routes to appropriate specialist (Architect, BA, etc.)
4. Only escalates to user after 3 failed attempts

### 4. Memory Layer
Continuous learning from every task:
- Task descriptions
- Teams assembled
- Outcomes (success/failure)
- Key patterns and learnings

### 5. Debug Mode
```bash
export BRAINLESS_DEBUG=true
```

Shows:
- Team assembly reasoning
- Memory search results
- Escalation routing
- Confidence breakdowns

---

## Force Mode (No Prompts)

If invoked with `--force`:

```
/brainless:init --force
```

**Behavior:**
- Skips user choice prompt
- Automatically overrides existing CLAUDE.md
- Creates backup first
- Fast, non-interactive execution

**Use when:**
- Fresh project setup
- You want Brainless-only config
- Automated installation scripts
- Your existing CLAUDE.md is broken

---

## Re-Init After Updates

When Brainless plugin releases updates:

```
git pull  # Update plugin repo
/brainless:init
```

Choose **[2] Merge** to:
- Keep your custom SOPs
- Add new plugin features
- Preserve project-specific rules
- AI intelligently combines both

---

**REMEMBER: This command EXECUTES code. You are not explaining or asking - you are DOING.**
