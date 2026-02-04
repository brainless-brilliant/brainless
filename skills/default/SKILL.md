---
name: default
description: Configure Brainless in local project (.claude/CLAUDE.md)
---

<command-instruction>
You are executing the /default command. Your job is to configure Brainless for the current project.

## STEP 1: CREATE PROJECT DIRECTORY (IMMEDIATE)

Create the .claude directory in the current project:

```bash
mkdir -p .claude
```

Print: `📁 Created .claude/ directory`

## STEP 2: DOWNLOAD CLAUDE.md (MANDATORY)

**CRITICAL: Use curl to download. DO NOT use Write tool.**

```bash
curl -fsSL "https://raw.githubusercontent.com/brainless-brilliant/brainless/main/templates/CLAUDE.brainless.md" -o .claude/CLAUDE.md
```

If curl succeeds, print:
```
✅ Downloaded CLAUDE.md to .claude/CLAUDE.md
```

If curl fails, print:
```
❌ Download failed. Manual download available at:
   https://raw.githubusercontent.com/brainless-brilliant/brainless/main/templates/CLAUDE.brainless.md
```

## STEP 3: CREATE BRAINLESS DIRECTORIES

```bash
mkdir -p .brainless/{memory,transcripts,plans,debates,escalations}
```

Print: `📁 Created .brainless/ project structure`

## STEP 4: VERIFY PLUGIN

Check if plugin is enabled:

```bash
grep -q "brainless" ~/.claude/settings.json && echo "✅ Plugin enabled" || echo "⚠️ Plugin not found in settings"
```

If plugin not found:
```
⚠️ Plugin may not be enabled. Run:
   /install-plugin @brainless-brilliant/brainless
```

## STEP 5: DISPLAY COMPLETION (MANDATORY OUTPUT)

```
═══════════════════════════════════════════════════
✅ Brainless Project Configuration Complete
═══════════════════════════════════════════════════

📁 Configuration:
   • CLAUDE.md: .claude/CLAUDE.md
   • Scope: PROJECT (this project only)
   • Structure: .brainless/ created

🎯 Next Steps:
   1. /brainless:status - Verify configuration
   2. /brainless:team "task" - Test team assembly
   3. export BRAINLESS_DEBUG=true - Enable debug mode

💡 This configuration applies ONLY to this project.
   For global config, use /default-global

═══════════════════════════════════════════════════
```

</command-instruction>
