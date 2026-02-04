---
name: brainless-team
description: Manually trigger Brainless team assembly for a specific task
args:
  - name: task
    description: Task description for team assembly
    required: true
---

---

# Brainless Team Assembly

**EXECUTE IMMEDIATELY - DISPLAY OUTPUT DIRECTLY**

You are manually triggering team assembly for: **{{task}}**

## Execution

**Step 1:** Call the team assembly function

```typescript
const { assembleTeamForTask } = await import('${CLAUDE_PLUGIN_ROOT}/dist/agents/team-assembly.js');
const teamPrompt = await assembleTeamForTask("{{task}}");
```

**Step 2:** Display the team (use the actual teamPrompt output, this is just an example format):

```
🎯 Building your dream team for this task...

👥 Team of 3 assembled:
   🏗️ **Vikram** (Principal Architect): "CAP theorem in my sleep"
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"  
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"

💡 Rationale: [From team assembly logic]
📊 Confidence: [X]% | Sources: [haiku/memory/fallback]

──────────────────────────────────────
```

**Step 3:** Ask for confirmation

Display:
```
Ready to proceed with this team?

If yes, I'll delegate the work to them now.
If no, let me know what adjustments you'd like.
```

**WAIT for user response.**

**Step 4:** If confirmed, proceed with delegation

Use standard coordinator delegation flow.

---

## Important

- **DO NOT** wrap output in `Bash(cat << 'EOF' ...)` 
- **DO** display the formatted text directly
- **DO** actually call the team assembly function
- **DO** wait for user confirmation before delegating
