---
description: View current Brainless configuration and team status
---

<command-instruction>
You are executing the /brainless:status command. Your job is to display the current Brainless configuration and activity status.

## STEP 1: GATHER STATUS INFORMATION

Check the following:
- CLAUDE.md location and presence
- .brainless/ directory structure
- Recent transcripts (last 3)
- Memory entries count
- Active escalations
- Environment variables

## STEP 2: DISPLAY STATUS (MANDATORY OUTPUT)

**Print this status block. NO BASH COMMANDS. NO PERMISSION PROMPTS.**

```
📊 Brainless Status
═══════════════════════════════════════════════════

🔧 Configuration
   • CLAUDE.md: [path] ✅ | ❌ Not found
   • Version: [version from package.json]
   • Debug mode: [BRAINLESS_DEBUG value or "disabled"]

📁 Project Structure
   • .brainless/memory/: [N files] | ❌ Not found
   • .brainless/transcripts/: [N files] | ❌ Not found
   • .brainless/plans/: [N files] | ❌ Not found
   • .brainless/debates/: [N files] | ❌ Not found
   • .brainless/escalations/: [N files] | ❌ Not found

📋 Recent Activity
   [List last 3 transcript files with dates, or "No recent activity"]

🎯 Memory Patterns
   [N] patterns stored | No patterns yet
   Last updated: [date] | Never

⚠️ Active Escalations
   [List any pending escalations, or "None"]

═══════════════════════════════════════════════════
```

## STEP 3: SHOW RECOMMENDATIONS (If issues found)

If any issues detected, add:

```
💡 Recommendations:
   • [Issue]: [Suggestion to fix]
   • [Issue]: [Suggestion to fix]
```

### Common Issues

| Issue | Recommendation |
|-------|---------------|
| No CLAUDE.md | Run `/brainless:init` to initialize |
| No .brainless/ directory | Run `/brainless:init` to set up |
| No memory patterns | Memory will build as you use the plugin |
| Debug mode disabled | Enable with `export BRAINLESS_DEBUG=true` for detailed logs |

---

## EXAMPLE OUTPUT

```
📊 Brainless Status
═══════════════════════════════════════════════════

🔧 Configuration
   • CLAUDE.md: .claude/CLAUDE.md ✅
   • Version: 1.1.3
   • Debug mode: disabled

📁 Project Structure
   • .brainless/memory/: 12 files ✅
   • .brainless/transcripts/: 34 files ✅
   • .brainless/plans/: 8 files ✅
   • .brainless/debates/: 3 files ✅
   • .brainless/escalations/: 1 file ✅

📋 Recent Activity
   • 2026-02-04_auth-api.md - Build authentication system
   • 2026-02-03_refactor.md - Refactor payment module
   • 2026-02-02_bugfix.md - Fix memory leak

🎯 Memory Patterns
   12 patterns stored
   Last updated: 2026-02-04

⚠️ Active Escalations
   None

═══════════════════════════════════════════════════
```

</command-instruction>

<current-context>
<!-- Context is automatically injected by the context-injector.mjs hook -->
<!-- Parse the <brainless-context> JSON block above for: -->
<!-- - claudeMd: location of CLAUDE.md -->
<!-- - brainless.exists/memory/transcripts/etc: directory structure -->
<!-- - brainless.recentTranscripts: array of recent transcript filenames -->
<!-- - debugMode: BRAINLESS_DEBUG value -->
</current-context>
