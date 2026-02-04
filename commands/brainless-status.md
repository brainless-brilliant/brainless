---
name: brainless-status
description: View current Brainless system status
---

# /brainless:status - System Status

Show current Brainless system status, configuration, and activity.

## What It Shows

### Active Team
- Currently active specialists (if any)
- Their roles and assignments
- Orchestration phase

### Configuration
- Debug mode status (`BRAINLESS_DEBUG` env var)
- Memory system status
- Haiku classifier status
- API key configuration

### Memory Statistics
- Number of memory entries
- Last memory capture timestamp
- Success rate (if available)

### Recent Activity
- Last 3-5 completed tasks
- Outcomes and learnings
- Agent combinations used

### Available Specialists
Lists all 29 registered agents by domain:
- Architecture (3 agents)
- Security (2 agents)
- Implementation (3 agents)
- QA (3 agents)
- Build (2 agents)
- Frontend (4 agents)
- Documentation (2 agents)
- Research (3 agents)
- Data (3 agents)
- Planning (2 agents)
- Business (2 agents)

## Output Format

```
╔════════════════════════════════════════════════════╗
║        Brainless AI Workforce - Status            ║
╚════════════════════════════════════════════════════╝

🎯 Active Team: None currently

⚙️ Configuration:
   Debug mode: OFF
   Memory enabled: YES
   Classifier: Haiku (online)

📊 Memory Statistics:
   Entries: 47
   Last capture: 2 hours ago
   Success rate: 92%

📜 Recent Activity:
   ✅ REST API implementation (Jordan, Elena, Maya)
   ✅ Landing page design (Zoe, Vikram)
   ✅ Database optimization (Noah, Rohan)

👥 Available Specialists: 29 agents
   
   Architecture (3): Vikram, Priya, Rohan
   Security (2): Elena, Sam
   Implementation (3): Jordan, Alex, Taylor
   ...

───────────────────────────────────────────────────

💡 Tip: Use /brainless:team "task" to manually assemble a team
```

## When to Use

- **Health check**: Verify Brainless is configured correctly
- **Debug issues**: Check if classifier is online, memory is working
- **See activity**: Review recent task history
- **List agents**: See all available specialists

---

**Tip**: Run this after installation to verify everything is set up correctly!
