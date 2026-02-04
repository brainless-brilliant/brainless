---
name: timeline
description: Visual timeline of agent activities and decisions
---

<command-instruction>
You are executing the /timeline command. Display a visual timeline of agent activities.

## STEP 1: CHECK FOR ACTIVITY DATA

Look for activity data in `.brainless/transcripts/`:

```bash
ls -la .brainless/transcripts/ 2>/dev/null
```

If no data found:
```
📭 No Timeline Data

No agent activity has been recorded yet.
Use /team "task" to start an orchestrated session.
```
Exit if no data.

## STEP 2: PARSE ACTIVITIES

Read activity records and group by:
- Timestamp
- Agent chains (who spawned whom)
- Debates (group related proposals/counters)
- Gates (waiting → passed)

## STEP 3: DISPLAY TIMELINE (MANDATORY OUTPUT)

Format as a visual tree:

```
📊 Agent Activity Timeline
═══════════════════════════════════════════════════
Session: [session-id]
═══════════════════════════════════════════════════

10:30 ──┬── [PM] 🚀 Task received
        │   └── "Build user authentication system"
        │
10:31 ──┼── [PM → Analyst] 🚀 Spawn analysis
        │
10:33 ──┼── [Analyst → PM] ✅ Analysis complete
        │   └── Found: 5 requirements, 2 risks
        │
10:33 ──┼── [PM → Architect] 🚀 Spawn design
        │
10:35 ──┼── 💬 DEBATE: "JWT vs Session tokens"
        │   ├── [Architect] 💡 Proposal: JWT for stateless API
        │   ├── [Security] ↩️ Counter: Session tokens safer
        │   ├── [Security] ⚠️ Concern: Token storage affects frontend
        │   └── [PM] ⚖️ Decision: JWT with HttpOnly cookies
        │
10:36 ──┼── [Architect → PM] ✅ Design complete
        │
10:37 ──┼── [PM] ⏳ Gate: Awaiting design approval
        │
10:38 ──┼── [PM] 🚪 Gate passed: Design approved
        │
10:38 ──┼── [PM → Planner] 🚀 Spawn planning
        │
10:40 ──┼── [Planner → PM] ✅ Plan complete
        │   └── 6 tasks, estimated 2 hours
        │
10:40 ──┼── [PM → SM] ➡️ Handoff to Scrum Master
        │
10:41 ──┼── [SM → Executor] 🚀 Sprint started
        │   ├── Progress: ██░░░░░░░░ 20%
        │   └── Current: Implementing login endpoint
        │
...

═══════════════════════════════════════════════════
```

## TIMELINE ICONS

| Icon | Meaning                    |
|------|----------------------------|
| 🚀   | Agent spawned              |
| ✅   | Completed successfully     |
| ❌   | Failed/Error               |
| 💡   | Proposal made              |
| ↩️   | Counter-argument           |
| ⚠️   | Cross-cutting concern      |
| ⚖️   | Decision made              |
| ⏳   | Waiting (gate pending)     |
| 🚪   | Gate passed                |
| 💬   | Debate started             |
| ➡️   | Delegation/Handoff         |

## STEP 4: HANDLE VARIANTS

### `/timeline full`
Show complete timeline without truncation.

### `/timeline session`
Show current session only (most recent).

### `/timeline debates`
Show only debate sections.

</command-instruction>

<current-context>
<activity-files>
!`ls -t .brainless/transcripts/*.md 2>/dev/null | head -3 || echo "none"`
</activity-files>
</current-context>
