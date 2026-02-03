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

## Your Instructions

1. **Check if CLAUDE.md exists**:
   ```typescript
   import { existsSync } from 'fs';
   import { join } from 'path';
   
   const claudeMdPath = join(process.cwd(), '.claude', 'CLAUDE.md');
   const exists = existsSync(claudeMdPath);
   ```

2. **Import and Run Merger**:
   ```typescript
   const { performCLAUDEmdMerge } = await import('${CLAUDE_PLUGIN_ROOT}/dist/installer/claude-md-merger.js');
   const { loadClaudeMdContent } = await import('${CLAUDE_PLUGIN_ROOT}/dist/installer/index.js');
   
   const pluginTemplate = loadClaudeMdContent();
   const targetPath = join(process.cwd(), '.claude', 'CLAUDE.md');
   
   // Determine options based on args
   const options = {
     verbose: true,
     userChoice: {{force}} ? 'override' : undefined  // Will prompt if not force
   };
   
   const result = await performCLAUDEmdMerge(pluginTemplate, targetPath, options);
   ```

3. **Display Result**:
   ```
   ✅ Initialization Complete!
   
   Result: ${result.message}
   ${result.backupPath ? `Backup: ${result.backupPath}` : ''}
   
   Your CLAUDE.md now includes:
   - Dynamic team assembly instructions
   - Slash command reference
   - Escalation protocol
   - Memory layer guidance
   - Debug mode instructions
   ```

## Usage Examples

### Normal Init (With Prompt)
```
/brainless:init
```

**What happens:**
- Detects existing CLAUDE.md
- Prompts: "Override / Merge / Skip?"
- User chooses merge option
- AI-powered merge preserves your content
- Backup created automatically

---

### Force Override
```
/brainless:init --force
```

**What happens:**
- Backs up existing CLAUDE.md
- Replaces with fresh Brainless defaults
- No prompts, immediate override
- Use when you want a clean slate

---

### First Time (No Existing File)
```
/brainless:init
```

**What happens:**
- Creates new `.claude/CLAUDE.md`
- Uses Brainless plugin template
- No prompts needed
- Ready to use immediately

---

## What Gets Added

The Brainless plugin template includes:

### 1. Auto Team Assembly
Instructions for automatic specialist selection on every task.

### 2. Manual Control Commands
Reference for all 5 slash commands:
- `/brainless:team`
- `/brainless:status`
- `/brainless:memory`
- `/brainless:escalate`
- `/brainless:config`

### 3. Escalation Protocol
How agents resolve issues internally before user involvement.

### 4. Memory Layer
How continuous learning from past tasks works.

### 5. Debug Mode
Instructions for enabling verbose logging.

---

## Merge vs Override Decision Guide

### Choose **Merge** when:
- ✅ You have custom SOPs in CLAUDE.md
- ✅ You want to preserve your instructions
- ✅ You want plugin features alongside your rules
- ✅ First time adding Brainless to existing project

### Choose **Override** when:
- ✅ You want a clean Brainless-only setup
- ✅ Your current CLAUDE.md is outdated/broken
- ✅ You're okay losing custom instructions (backup exists)
- ✅ Fresh start on a new project

### Choose **Skip** when:
- ✅ You want to manually merge later
- ✅ You need to review the template first
- ✅ You're not sure which option to pick
- ✅ Testing/exploring the plugin

---

## Troubleshooting

### "Merge confidence too low"
The AI merger returned <70% confidence. This means:
- Your CLAUDE.md is complex
- Conflicts detected
- Manual merge recommended

**Solution**: Use `--force` to override, or manually copy sections from `templates/CLAUDE.brainless.md`.

---

### "Backup failed"
File permissions issue.

**Solution**: Check write permissions on `.claude/` directory.

---

### "Template not found"
Plugin installation incomplete.

**Solution**: Re-run `/plugin add` or check plugin directory exists.

---

## After Init

Verify initialization worked:

```
/brainless:config
```

Should show:
- ✅ Plugin loaded
- ✅ Commands available
- ✅ CLAUDE.md updated

Then test team assembly:
```
"Build a simple REST API"
```

Should see team assembly display before work begins.

---

## Re-Init After Updates

When Brainless plugin updates:

1. **Check release notes** for new features
2. **Run re-init**:
   ```
   /brainless:init
   ```
3. **Choose merge** to preserve your custom rules
4. **AI merges** new plugin features with your existing content

This keeps your CLAUDE.md up-to-date with latest features while preserving your customizations.

---

## Notes

- Init is **idempotent** - safe to run multiple times
- Always creates **backup** before changes
- Merge uses **Anthropic AI** (Sonnet <10KB, Opus >10KB)
- Falls back to **simple creation** if merge fails
- Works with **all 4 CLAUDE.md locations**:
  - `.claude/CLAUDE.md` (recommended)
  - `CLAUDE.md` (project root)
  - `~/.claude/CLAUDE.md` (user-level)
  - `~/CLAUDE.md` (home)
