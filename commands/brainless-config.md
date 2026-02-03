---
name: brainless-config
description: Show Brainless configuration and debug information
---

# Brainless Configuration & Debug Info

Display comprehensive configuration and debugging information for the Brainless plugin.

## Your Instructions

1. **Show Plugin Info**:
   ```
   ╔══════════════════════════════════════════════════════════╗
   ║         Brainless AI Workforce - Configuration          ║
   ╚══════════════════════════════════════════════════════════╝
   
   📦 Plugin Version: <version from package.json>
   📂 Root: ${CLAUDE_PLUGIN_ROOT}
   ```

2. **Show Environment**:
   ```
   🌍 Environment Variables:
   - BRAINLESS_DEBUG: ${BRAINLESS_DEBUG || 'not set'}
   - ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY ? 'set (' + ANTHROPIC_API_KEY.slice(0,7) + '...)' : 'not set'}
   - NODE_ENV: ${NODE_ENV || 'not set'}
   ```

3. **Show Classifier Status**:
   ```
   🤖 Haiku Classifier:
   - Status: <online/offline/fallback>
   - Model: claude-3-5-haiku-20241022
   - Cache: <enabled/disabled>
   - Requests today: <count if available>
   - Fallback mode: keyword-based
   ```

4. **Show Memory Configuration**:
   ```
   🧠 Memory Layer:
   - Storage: ~/.brainless/memory/
   - Entries: <count>
   - Capture filter: Executor/specialist only
   - Auto-capture: <enabled/disabled>
   ```

5. **Show Agent Registry**:
   ```
   👥 Agent Registry: 29 specialists
   
   By Domain:
   - Architecture: 3 (Vikram, Priya, Rohan)
   - Security: 2 (Elena, Sam)
   - Implementation: 3 (Jordan, Alex, Taylor)
   - QA: 3 (Maya, Oliver, Sophia)
   - Build: 2 (Marcus, Katie)
   - Frontend: 4 (Zoe, Liam, Aiden, Mia)
   - Documentation: 2 (Olivia, Ethan)
   - Research: 3 (Aria, Lucas, Isla)
   - Data: 3 (Noah, Emma, Leo)
   - Planning: 2 (Amelia, Ryan)
   - Business: 2 (Chloe, Mason)
   ```

6. **Show Feature Flags**:
   ```
   🚩 Features:
   - Dynamic team assembly: ✅ Active
   - Memory integration: ✅ Active
   - Escalation protocol: ✅ Active
   - AI classification: <✅ Active / ⚠️ Fallback mode>
   - Slash commands: ✅ Active
   ```

7. **Show File Locations**:
   ```
   📁 Important Files:
   - Plugin: ${CLAUDE_PLUGIN_ROOT}/
   - Commands: ${CLAUDE_PLUGIN_ROOT}/commands/
   - Memory: ~/.brainless/memory/
   - Config: ~/.claude/CLAUDE.md
   - Logs: ~/.brainless/logs/
   ```

8. **Show Debug Commands**:
   ```
   🔧 Debug Commands:
   - Enable debug: export BRAINLESS_DEBUG=true
   - Test team assembly: /brainless:team "test task"
   - Search memory: /brainless:memory
   - View status: /brainless:status
   ```

9. **Run Diagnostics**:
   ```
   🏥 System Diagnostics:
   
   ✅ Plugin loaded correctly
   ✅ Commands directory accessible
   ${ANTHROPIC_API_KEY ? '✅' : '⚠️'} Anthropic API key ${ANTHROPIC_API_KEY ? 'configured' : 'not set (fallback mode)'}
   ✅ Memory directory writable
   ✅ Agent registry loaded (29 specialists)
   <Check for common issues>
   ```

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
   Requests today: 47
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
