---
name: brainless-status
description: View current Brainless team, configuration, and system status
---

# Brainless Status

Display the current state of the Brainless AI Workforce system.

## Your Instructions

1. **Show Current Team** (if active):
   ```
   🎯 Active Team:
   - Specialist 1 name (role)
   - Specialist 2 name (role)
   - ...
   
   📊 Team assembled: <timestamp>
   💡 Original task: <task description>
   ```

2. **Show Configuration**:
   ```
   ⚙️ Configuration:
   - Debug mode: ${BRAINLESS_DEBUG ? 'ON' : 'OFF'}
   - Memory enabled: <check if memory accessible>
   - Classifier: <haiku available or keyword fallback>
   - Model routing: Active
   ```

3. **Show Memory Stats**:
   ```
   🧠 Memory Layer:
   - Entries: <count from memory>
   - Last capture: <timestamp>
   - Storage: ~/.brainless/memory/
   ```

4. **Show Recent Activity**:
   ```
   📜 Recent Activity:
   - Last team assembly: <time>
   - Last escalation: <time or 'none'>
   - Tasks completed today: <count>
   ```

5. **Show Agent Registry**:
   ```
   👥 Available Specialists (29):
   
   Architecture:
   - Vikram (Principal Architect)
   - Priya (Senior Architect)
   - Rohan (Junior Architect)
   
   Security:
   - Elena (Security Lead)
   - Sam (Security Analyst)
   
   ... (show all categories)
   ```

## Example Output

```
╔══════════════════════════════════════════════════════════╗
║         Brainless AI Workforce - System Status          ║
╚══════════════════════════════════════════════════════════╝

🎯 Active Team: 3 specialists
   🏗️ Vikram (Principal Architect)
   🔒 Elena (Security Lead)
   ⚙️ Alex (Senior Engineer)

📊 Team assembled: 2 minutes ago
💡 Original task: "Build OAuth2 authentication with security audit"

⚙️ Configuration:
   Debug mode: OFF
   Memory enabled: YES
   Classifier: Haiku (online)
   Model routing: Active

🧠 Memory Layer:
   Entries: 47 tasks
   Last capture: 3 minutes ago
   Storage: ~/.brainless/memory/

📜 Recent Activity:
   Last team assembly: 2 minutes ago
   Last escalation: none
   Tasks completed today: 5

👥 Available: 29 specialists across 8 domains
```

## Notes

- No arguments required
- Shows current state snapshot
- Useful for debugging team selection
