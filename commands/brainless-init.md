---
name: brainless-init
description: Initialize or re-initialize Brainless CLAUDE.md configuration
args:
  - name: force
    description: Force re-merge even if already initialized
    required: false
---

# /brainless:init - Initialize CLAUDE.md

Initialize or update your CLAUDE.md with Brainless plugin instructions.

## When to Use

- **First time setup**: After installing the plugin
- **After updates**: Refresh plugin instructions when Brainless is updated
- **Re-merge**: If you edited CLAUDE.md and want to re-integrate plugin content
- **Force override**: Use `--force` to replace CLAUDE.md with fresh defaults

## How It Works

When you run `/brainless:init`, the system will:

1. **Check for existing CLAUDE.md** in these locations (priority order):
   - `.claude/CLAUDE.md` (project-local)
   - `CLAUDE.md` (project root)
   - `~/.claude/CLAUDE.md` (global)
   - `~/CLAUDE.md` (home)

2. **Determine merge strategy**:
   - **No existing file**: Creates fresh CLAUDE.md with Brainless defaults
   - **Existing file found**: Prompts you to choose:
     - **Override**: Replace with Brainless defaults (creates backup)
     - **Merge**: AI-powered intelligent merge (preserves your content)
     - **Skip**: Leave as-is

3. **Execute the selected action**:
   - Override: Backs up existing file, writes fresh template
   - Merge: Uses Claude to intelligently combine your content + Brainless instructions
   - Skip: No changes made

## Merge Strategy Details

### Override Mode
- Creates backup: `CLAUDE.md.backup.TIMESTAMP`
- Writes fresh Brainless template
- Fastest option, but loses customizations

### Merge Mode (Recommended)
- AI-powered merge using Anthropic API
- Preserves your custom instructions
- Adds Brainless plugin sections
- Uses Sonnet for <10KB files, Opus for larger files
- Falls back to Override if merge fails

### Skip Mode
- No changes made
- Use if you want to manually integrate

## Force Mode

Run with `--force` to auto-select Override without prompting:

```
/brainless:init --force
```

Use this for:
- Fresh installations
- Resetting to defaults
- Automated scripts

## Examples

```
/brainless:init
→ Interactive prompt for merge strategy

/brainless:init --force
→ Auto-override with Brainless defaults

/brainless:init
→ After plugin update to get latest features
```

## After Initialization

Once complete, your CLAUDE.md will include:
- ✅ Brainless agent registry (29 specialists)
- ✅ PM orchestration protocol
- ✅ Team assembly instructions
- ✅ Memory system integration
- ✅ Escalation protocol
- ✅ All slash commands documentation

---

**Tip**: Always run `/brainless:init` after updating the plugin to get the latest features!
