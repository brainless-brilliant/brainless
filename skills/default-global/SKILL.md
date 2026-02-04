---
name: default-global
description: Configure Brainless globally in ~/.claude/CLAUDE.md
---

<command-instruction>
You are executing the /default-global command. Your job is to configure Brainless globally for all Claude Code sessions.

## STEP 1: BACKUP EXISTING (If present)

If ~/.claude/CLAUDE.md exists, create backup:

```bash
test -f ~/.claude/CLAUDE.md && cp ~/.claude/CLAUDE.md ~/.claude/CLAUDE.md.backup.$(date +%Y%m%d-%H%M%S)
```

Print: `📦 Backed up existing CLAUDE.md` (if backup was created)

## STEP 2: DOWNLOAD CLAUDE.md (MANDATORY)

**CRITICAL: Use curl to download. DO NOT use Write tool.**

```bash
curl -fsSL "https://raw.githubusercontent.com/brainless-brilliant/brainless/main/templates/CLAUDE.brainless.md" -o ~/.claude/CLAUDE.md
```

If curl succeeds, print:
```
✅ Downloaded CLAUDE.md to ~/.claude/CLAUDE.md
```

If curl fails, print:
```
❌ Download failed. Manual download available at:
   https://raw.githubusercontent.com/brainless-brilliant/brainless/main/templates/CLAUDE.brainless.md
```

## STEP 3: CLEAN UP LEGACY HOOKS

Check for and remove legacy hook scripts:

```bash
rm -f ~/.claude/hooks/keyword-detector.sh
rm -f ~/.claude/hooks/stop-continuation.sh
rm -f ~/.claude/hooks/persistent-mode.sh
rm -f ~/.claude/hooks/session-start.sh
```

Check settings.json for manual hook entries:

```bash
grep -q '"hooks"' ~/.claude/settings.json && echo "⚠️ Found legacy hooks in settings.json"
```

If legacy hooks found:
```
⚠️ Found legacy hooks in ~/.claude/settings.json
   These are now provided by the plugin automatically.
   Consider removing the "hooks" section to prevent duplicates.
```

## STEP 4: VERIFY PLUGIN

Check if plugin is enabled:

```bash
grep -q "brainless" ~/.claude/settings.json && echo "✅ Plugin enabled" || echo "⚠️ Plugin not found"
```

If plugin not found:
```
⚠️ Plugin may not be enabled. Run:
   /install-plugin @brainless-brilliant/brainless
```

## STEP 5: DISPLAY COMPLETION (MANDATORY OUTPUT)

```
═══════════════════════════════════════════════════
✅ Brainless Global Configuration Complete
═══════════════════════════════════════════════════

📁 Configuration:
   • CLAUDE.md: ~/.claude/CLAUDE.md
   • Scope: GLOBAL (all projects)
   • Hooks: Provided by plugin

🧹 Cleanup:
   • Legacy hooks: Removed (if present)

🎯 Next Steps:
   1. Open any project and run /brainless:status
   2. Brainless is now active in ALL sessions

💡 Project-specific config takes precedence.
   Use /default in a project for project-scoped settings.

═══════════════════════════════════════════════════
```

</command-instruction>
