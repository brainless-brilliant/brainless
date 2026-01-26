---
name: transcript
description: View agent activity transcript and audit trail
---

# /transcript - Agent Activity Transcript

View a complete log of all agent activities in the current session.

## What This Shows

When you invoke this command, read the transcript file at `.brainless/transcripts/activity.jsonl` and display:

1. **Activity Table** - Chronological list of all agent actions
2. **Summary** - Total activities, agents involved, decisions made
3. **Timeline** (optional) - Visual tree view of activities

## Usage

```
/transcript           # Show recent activities
/transcript full      # Show all activities
/transcript timeline  # Show timeline view
/transcript summary   # Show summary only
```

## Output Format

### Table View (Default)
```markdown
# Agent Activity Transcript

Generated: 2026-01-25T10:30:00Z
Total Activities: 12

| Time | Agent | Action | Summary |
|------|-------|--------|---------|
| 10:30 | pm | spawned | Orchestrating task: Build auth system |
| 10:31 | analyst | spawned | Analyzing requirements |
| 10:32 | analyst | completed | Found 5 requirements, 2 risks |
| 10:33 | architect | spawned | Designing system architecture |
| 10:35 | architect | proposed | Microservices with JWT auth |
| 10:35 | security-reviewer | counter | Suggest session tokens instead |
| 10:36 | pm | decided | Using JWT - better for stateless API |
| 10:37 | planner | spawned | Creating implementation plan |
```

### Timeline View (`/transcript timeline`)
```
10:30 ├── [pm] 🚀 spawned
      │   └── Orchestrating task: Build auth system
      │
10:31 ├── [analyst] 🚀 spawned
      │   └── Analyzing requirements
      │
10:32 ├── [analyst] ✅ completed
      │   └── Found 5 requirements, 2 risks
```

### Summary View (`/transcript summary`)
```markdown
## Transcript Summary

- **Session ID:** abc123
- **Total Activities:** 12
- **Agents Involved:** pm, analyst, architect, planner, executor
- **Decisions Made:** 3
- **Debates Held:** 1
- **Duration:** 15 minutes
- **Status:** Active
```

## How to Read

1. Look for the transcript directory: `.brainless/transcripts/`
2. Read `activity.jsonl` - each line is a JSON activity record
3. Parse and format as table/timeline
4. Also check `decisions.jsonl` for decision records

## Action Icons

| Icon | Action | Meaning |
|------|--------|---------|
| 🚀 | spawned | Agent was started |
| ✅ | completed | Agent finished successfully |
| ❌ | failed | Agent encountered error |
| ➡️ | delegated | Agent spawned another agent |
| 💡 | proposed | Agent made a proposal |
| 👍 | approved | PM approved a decision |
| 👎 | rejected | PM rejected, needs revision |
| 💬 | debated | Agents discussed a topic | 
| ⚖️ | decided | PM made a decision |
| ⏳ | gate_pending | Waiting for approval |
| 🚪 | gate_passed | Approval passed |

---

© Brainless Technologies Pvt. Ltd.
