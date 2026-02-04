---
name: brainless-config
description: Show Brainless configuration and debug information
---

---

# Brainless Configuration & Debug Info

**DISPLAY IMMEDIATELY - NO BASH WRAPPERS**

Show comprehensive Brainless configuration and diagnostics.

## Display Format

Present this information directly to the user:

```
╔══════════════════════════════════════════════════════════╗
║         Brainless AI Workforce - Configuration          ║
╚══════════════════════════════════════════════════════════╝

📦 Plugin Version: [from package.json]
📂 Root: ${CLAUDE_PLUGIN_ROOT}

🌍 Environment:
   BRAINLESS_DEBUG: ${process.env.BRAINLESS_DEBUG || 'not set'}
   ANTHROPIC_API_KEY: ${process.env.ANTHROPIC_API_KEY ? 'set (sk-ant-...)' : 'not set'}
   NODE_ENV: ${process.env.NODE_ENV || 'not set'}

🤖 Haiku Classifier:
   Status: [online | fallback mode]
   Model: claude-3-5-haiku-20241022
   Cache: [enabled | disabled]
   Fallback: keyword-based

🧠 Memory Layer:
   Storage: ~/.brain less/memory/
   Entries: [count or 'Unknown']
   Capture filter: Executor/specialist only
   Auto-capture: enabled

👥 Agent Registry: 29 specialists

   By Domain:
   - Architecture (3): Vikram, Priya, Rohan  
   - Security (2): Elena, Sam
   - Implementation (3): Jordan, Alex, Taylor
   - QA (3): Maya, Oliver, Sophia
   - Build (2): Marcus, Katie
   - Frontend (4): Zoe, Liam, Aiden, Mia
   - Documentation (2): Olivia, Ethan
   - Research (3): Aria, Lucas, Isla
   - Data (3): Noah, Emma, Leo
   - Planning (2): Amelia, Ryan
   - Business (2): Chloe, Mason

🚩 Features:
   ✅ Dynamic team assembly
   ✅ Memory integration
   ✅ Escalation protocol
   [✅ | ⚠️ Fallback] AI classification
   ✅ Slash commands

📁 Important Files:
   Plugin: ${CLAUDE_PLUGIN_ROOT}/
   Commands: ${CLAUDE_PLUGIN_ROOT}/commands/
   Memory: ~/.brainless/memory/
   Config: ~/.claude/CLAUDE.md

🏥 System Diagnostics:

   ✅ Plugin loaded correctly
   ✅ Commands directory accessible
   ${process.env.ANTHROPIC_API_KEY ? '✅' : '⚠️'} Anthropic API key ${process.env.ANTHROPIC_API_KEY ? 'configured' : 'not set (fallback mode)'}
   ✅ Memory directory writable
   ✅ Agent registry loaded (29 specialists)
   [✅ | ⚠️] No issues detected

🔧 Debug Commands:
   Enable debug: export BRAINLESS_DEBUG=true
   Test team: /brainless:team "test task"
   Search memory: /brainless:memory
   View status: /brainless:status

───────────────────────────────────────────────────────────

💡 Tip: Use /brainless:status for runtime information
```

---

## Important

- **DO NOT** wrap in `Bash(cat << 'EOF' ...)`  
- **DO** display formatted text directly
- **DO** query actual system state where available
- **DO** use placeholders [like this] for dynamic data you can't access

## Example Output

```
╔══════════════════════════════════════════════════════════╗
║         Brainless AI Workforce - Configuration          ║
╚══════════════════════════════════════════════════════════╝

📦 Plugin Version: 1.0.0
📂 Root: ~/.claude/plugins/brainless/

🌍 Environment:
   BRAINLESS_DEBUG: true
   ANTHROPIC_API_KEY: set (sk-ant-...)
   NODE_ENV: production

🤖 Haiku Classifier:
   Status: ✅ online
   Model: claude-3-5-haiku-20241022
   Cache: enabled
   Fallback: keyword-based (unused)

🧠 Memory Layer:
   Storage: ~/.brainless/memory/
   Entries: 47 tasks
   Capture filter: Executor/specialist only
   Auto-capture: enabled

👥 Agent Registry: 29 specialists

   Architecture (3): Vikram, Priya, Rohan
   Security (2): Elena, Sam
   Implementation (3): Jordan, Alex, Taylor
   QA (3): Maya, Oliver, Sophia
   Build (2): Marcus, Katie
   Frontend (4): Zoe, Liam, Aiden, Mia
   Documentation (2): Olivia, Ethan
   Research (3): Aria, Lucas, Isla
   Data (3): Noah, Emma, Leo
   Planning (2): Amelia, Ryan
   Business (2): Chloe, Mason

🚩 Features:
   ✅ Dynamic team assembly
   ✅ Memory integration
   ✅ Escalation protocol
   ✅ AI classification
   ✅ Slash commands

📁 Files:
   Plugin: ~/.claude/plugins/brainless/
   Commands: ~/.claude/plugins/brainless/commands/
   Memory: ~/.brainless/memory/
   Config: ~/.claude/CLAUDE.md

🏥 Diagnostics:
   ✅ Plugin loaded correctly
   ✅ Commands directory accessible
   ✅ Anthropic API key configured
   ✅ Memory directory writable
   ✅ Agent registry loaded (29 specialists)
   ✅ No issues detected

🔧 Debug Mode: ON
   Verbose logging enabled
   Team assembly details visible
   Memory search results shown
   Escalation routing traced

───────────────────────────────────────────────────────────

💡 Tip: Run /brainless:status for runtime information
```

## Notes

- No arguments required
- Shows complete system configuration
- Useful for troubleshooting
- Includes diagnostic checks
