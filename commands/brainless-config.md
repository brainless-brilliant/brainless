---
name: brainless-config
description: Display comprehensive configuration and debug info
---

# /brainless:config - Configuration & Debug Info

Show comprehensive Brainless configuration, diagnostics, and system health.

## What It Shows

### Plugin Information
- Plugin version (from `package.json`)
- Plugin root directory path
- Installation verification

### Environment Variables
- `BRAINLESS_DEBUG`: Debug mode status
- `ANTHROPIC_API_KEY`: API key configuration (masked)
- `NODE_ENV`: Environment setting

### Haiku Classifier
- Status: Online / Fallback mode
- Model: `claude-3-5-haiku-20241022`
- Cache status: Enabled / Disabled
- Fallback: Keyword-based matching

### Memory Layer
- Storage location: `~/.brainless/memory/`
- Entry count
- Capture filter: Executor/specialist only
- Auto-capture status: Enabled

### Agent Registry
Complete list of 29 specialists organized by domain:
- Architecture (3)
- Security (2)
- Implementation (3)
- QA (3)
- Build (2)
- Frontend (4)
- Documentation (2)
- Research (3)
- Data (3)
- Planning (2)
- Business (2)

### Feature Flags
- ✅ Dynamic team assembly
- ✅ Memory integration
- ✅ Escalation protocol
- ✅/⚠️ AI classification (online or fallback)
- ✅ Slash commands

### Important Files
- Plugin root
- Commands directory
- Memory storage
- Global CLAUDE.md location

### System Diagnostics
- Plugin loaded correctly
- Commands directory accessible
- API key status
- Memory directory writable
- Agent registry loaded
- Overall health status

## Debug Commands

Includes helper commands for troubleshooting:

```
# Enable debug mode
export BRAINLESS_DEBUG=true

# Test team assembly
/brainless:team "test task"

# Search memory
/brainless:memory

# View runtime status
/brainless:status
```

## Output Format

```
╔══════════════════════════════════════════════════════════╗
║         Brainless AI Workforce - Configuration          ║
╚══════════════════════════════════════════════════════════╝

📦 Plugin Version: 1.1.0
📂 Root: /path/to/plugin

🌍 Environment:
   BRAINLESS_DEBUG: not set
   ANTHROPIC_API_KEY: set (sk-ant-...hidden)
   NODE_ENV: not set

🤖 Haiku Classifier:
   Status: online
   Model: claude-3-5-haiku-20241022
   Cache: enabled
   Fallback: keyword-based

🧠 Memory Layer:
   Storage: ~/.brainless/memory/
   Entries: 47
   Capture filter: Executor/specialist only
   Auto-capture: enabled

👥 Agent Registry: 29 specialists

   By Domain:
   - Architecture (3): Vikram, Priya, Rohan  
   - Security (2): Elena, Sam
   - Implementation (3): Jordan, Alex, Taylor
   ...

🚩 Features:
   ✅ Dynamic team assembly
   ✅ Memory integration
   ✅ Escalation protocol
   ✅ AI classification
   ✅ Slash commands

📁 Important Files:
   Plugin: /plugin/root/
   Commands: /plugin/root/commands/
   Memory: ~/.brainless/memory/
   Config: ~/.claude/CLAUDE.md

🏥 System Diagnostics:
   ✅ Plugin loaded correctly
   ✅ Commands directory accessible
   ✅ Anthropic API key configured
   ✅ Memory directory writable
   ✅ Agent registry loaded (29 specialists)
   ✅ No issues detected

───────────────────────────────────────────────────────────

💡 Tip: Use /brainless:status for runtime information
```

## When to Use

- **Verify installation**: Check if plugin is configured correctly
- **Debug issues**: Diagnose what's not working
- **Check API status**: Verify classifier is online
- **List all agents**: See complete registry
- **Troubleshooting**: Comprehensive system health check

---

**Tip**: Run this immediately after installation to verify setup!
