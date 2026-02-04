---
name: brainless-status
description: View current Brainless team, configuration, and system status
---

---

# Brainless Status

**DISPLAY IMMEDIATELY - NO BASH WRAPPERS**

Show current Brainless system status.

## Display Format

Present this information directly to the user:

```
╔════════════════════════════════════════════════════╗
║        Brainless AI Workforce - Status            ║
╚════════════════════════════════════════════════════╝

🎯 Active Team: [None currently | X specialists]
[If active team, list them with personas]

⚙️ Configuration:
   Debug mode: ${process.env.BRAINLESS_DEBUG ? 'ON' : 'OFF'}
   Memory enabled: YES
   Classifier: Haiku (${ANTHROPIC_API_KEY ? 'online' : 'fallback mode'})

📊 Memory Statistics:
   Entries: [count from memory layer]
   Last capture: [timestamp or 'Never']
   Success rate: [if available]

📜 Recent Activity:
   [Last 3-5 tasks if available, or 'No recent activity']

👥 Available Specialists: 29 agents
   
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

───────────────────────────────────────────────────

💡 Tip: Use /brainless:team "task" to manually assemble a team
```

**Notes:**
- Query actual system state where possible
- Use placeholders [like this] for dynamic data
- Display directly as formatted text, NOT as bash/codeugging team selection
