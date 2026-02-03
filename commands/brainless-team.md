---
name: brainless-team
description: Manually trigger Brainless team assembly for a specific task
args:
  - name: task
    description: Task description for team assembly
    required: true
---

# Brainless Team Assembly

You are manually triggering team assembly via the `/brainless:team` command.

## Task

**User Request**: {{task}}

## Your Instructions

1. **Call Team Assembly**:
   ```typescript
   const { assembleTeamForTask } = await import('${CLAUDE_PLUGIN_ROOT}/dist/agents/team-assembly.js');
   const teamPrompt = await assembleTeamForTask("{{task}}");
   ```

2. **Display Team Information**:
   - Show the formatted team introduction
   - List specialists with their personas
   - Display confidence score and sources
   - Show team rationale

3. **Wait for User Confirmation**:
   Before proceeding with delegation, ask:
   "Ready to proceed with this team? I'll delegate work to them now."

4. **Delegate Work**:
   Once confirmed, use the standard delegation flow:
   - Coordinator orchestrates
   - Specialists execute
   - Verify completion

## Example Output

```
🎯 Building your dream team (or at least a functional one)

👥 Team of 3 assembled:
   🏗️ **Vikram** (Principal Architect): "CAP theorem in my sleep"
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"

💡 Rationale: Security audit + architecture design needed
📊 Confidence: 85% | Sources: haiku + memory

✨ Your team is ready! Coordinator will now orchestrate their work.
```

## Notes

- This bypasses automatic team assembly
- Useful for reviewing team selection before work begins
- User can request different specialists if needed
