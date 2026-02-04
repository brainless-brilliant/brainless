---
description: Show debug information and plugin settings
---

<command-instruction>
You are executing the /brainless:config command. Your job is to display detailed debug and configuration information.

## STEP 1: GATHER CONFIGURATION DATA

Collect information from:
- Package.json (version, dependencies)
- Environment variables (BRAINLESS_DEBUG, ANTHROPIC_API_KEY presence)
- CLAUDE.md location and content summary
- Plugin installation status
- Agent definitions
- Skill/command availability

## STEP 2: DISPLAY CONFIGURATION (MANDATORY OUTPUT)

**Print this config block. NO BASH COMMANDS. NO PERMISSION PROMPTS.**

```
🔧 Brainless Configuration
═══════════════════════════════════════════════════

📦 Plugin Info
   • Name: @brainless-brilliant/brainless
   • Version: [version]
   • Install location: [path]

🔑 Environment
   • BRAINLESS_DEBUG: [true/false/not set]
   • ANTHROPIC_API_KEY: [set/not set] (value hidden)
   • NODE_ENV: [value]

📁 File Locations
   • CLAUDE.md: [path or "not found"]
   • .brainless/: [path or "not found"]
   • Plugin root: [path]

👥 Agents Loaded
   • Total: [N] agents
   • Categories: [list of agent categories]
   • Sample: [first 5 agent names]

⚡ Commands Available
   • brainless:init
   • brainless:team
   • brainless:status
   • brainless:memory
   • brainless:escalate
   • brainless:config
   • team
   • help
   • transcript
   • timeline
   • decisions

🛠️ Skills Loaded
   • Total: [N] skills
   • List: [skill names]

🪝 Hooks Active
   • [List of active hooks]

═══════════════════════════════════════════════════

📊 Debug Info
───────────────────────────────────────────────────
```

## STEP 3: SHOW DEBUG DATA (If BRAINLESS_DEBUG=true)

If debug mode is enabled, add:

```
🐛 Debug Mode: ENABLED

📝 Recent Logs
   [Last 10 log entries if available]

🔄 Last Team Assembly
   Task: [last task]
   Team: [agents selected]
   Confidence: [score]
   Source: [haiku/memory/fallback]

💾 Memory State
   Patterns: [count]
   Last write: [timestamp]

🎯 Classifier Cache
   Entries: [count]
   Hit rate: [percentage]
```

## STEP 4: SHOW RECOMMENDATIONS

```
💡 Configuration Tips
───────────────────────────────────────────────────

[Conditional recommendations based on config state]
```

### Recommendation Logic

| Condition | Recommendation |
|-----------|---------------|
| BRAINLESS_DEBUG not set | Enable with `export BRAINLESS_DEBUG=true` for detailed logging |
| No CLAUDE.md | Run `/brainless:init` to set up configuration |
| No .brainless/ | Run `/brainless:init` to create project structure |
| Old version | Consider updating with `/plugin update` |
| ANTHROPIC_API_KEY not set | Set API key for AI-powered merging: `export ANTHROPIC_API_KEY=...` |

---

## EXAMPLE OUTPUT

```
🔧 Brainless Configuration
═══════════════════════════════════════════════════

📦 Plugin Info
   • Name: @brainless-brilliant/brainless
   • Version: 1.1.3
   • Install location: /Users/dev/.claude/plugins/brainless

🔑 Environment
   • BRAINLESS_DEBUG: true
   • ANTHROPIC_API_KEY: set (value hidden)
   • NODE_ENV: development

📁 File Locations
   • CLAUDE.md: .claude/CLAUDE.md
   • .brainless/: .brainless/
   • Plugin root: /Users/dev/.claude/plugins/brainless

👥 Agents Loaded
   • Total: 32 agents
   • Categories: architect, security, executor, qa, frontend, docs, research, data, planning
   • Sample: Vikram, Elena, Jordan, Maya, Zoe

⚡ Commands Available
   • brainless:init
   • brainless:team
   • brainless:status
   • brainless:memory
   • brainless:escalate
   • brainless:config
   • team
   • help
   • transcript
   • timeline
   • decisions

🛠️ Skills Loaded
   • Total: 8 skills
   • List: team, help, default, default-global, transcript, timeline, decisions, provision

🪝 Hooks Active
   • UserPromptSubmit
   • SessionStart
   • PreToolUse
   • PostToolUse
   • Stop

═══════════════════════════════════════════════════

🐛 Debug Mode: ENABLED

🔄 Last Team Assembly
   Task: "Build payment integration"
   Team: Elena, Jordan, Maya
   Confidence: 91%
   Source: haiku

💾 Memory State
   Patterns: 15
   Last write: 2026-02-04T10:30:00Z

═══════════════════════════════════════════════════

💡 Configuration Tips
───────────────────────────────────────────────────
   ✅ All configurations look good!
   
   • Debug mode is enabled - you'll see detailed logs
   • Memory is active with 15 patterns
   • All agents and skills loaded correctly
```

</command-instruction>

<current-context>
<version>
!`node -p "require('./package.json').version" 2>/dev/null || echo "unknown"`
</version>
<debug-mode>
!`echo "${BRAINLESS_DEBUG:-not set}"`
</debug-mode>
<api-key-set>
!`test -n "$ANTHROPIC_API_KEY" && echo "set" || echo "not set"`
</api-key-set>
<claude-md>
!`test -f .claude/CLAUDE.md && echo ".claude/CLAUDE.md" || (test -f CLAUDE.md && echo "CLAUDE.md" || echo "not found")`
</claude-md>
<brainless-dir>
!`test -d .brainless && echo ".brainless/" || echo "not found"`
</brainless-dir>
<agent-count>
!`ls agents/*.yaml 2>/dev/null | wc -l || echo "0"`
</agent-count>
<skill-count>
!`ls -d skills/*/ 2>/dev/null | wc -l || echo "0"`
</skill-count>
</current-context>
