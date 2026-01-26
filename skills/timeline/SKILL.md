---
name: timeline
description: Visual timeline of agent activities and decisions
---

# /timeline - Agent Activity Timeline

View a visual timeline of all agent activities in the current session.

## What This Shows

A chronological tree view showing:
- Agent spawns and completions
- Proposals and debates
- Decisions with rationale
- Cross-cutting concerns surfaced

## Usage

```
/timeline           # Show recent activity timeline
/timeline full      # Show complete timeline
/timeline session   # Show current session only
```

## How to Generate

Read the activity log from `.brainless/transcripts/activity.jsonl` and format as a timeline:

```
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
...
```

## Action Icons

| Icon | Meaning |
|------|---------|
| 🚀 | Agent spawned |
| ✅ | Completed successfully |
| ❌ | Failed/Error |
| 💡 | Proposal made |
| ↩️ | Counter-argument |
| ⚠️ | Cross-cutting concern |
| ⚖️ | Decision made |
| ⏳ | Waiting (gate pending) |
| 🚪 | Gate passed |
| 💬 | Debate started |

## Implementation

To generate the timeline:

1. Read `.brainless/transcripts/activity.jsonl`
2. Parse each JSON line as an activity
3. Group related activities (debates, gates)
4. Format with tree connectors (├── │ └──)
5. Add icons based on action type

```typescript
import { formatTimeline } from '@anveeksha/workforce';

// Generate timeline for current session
const timeline = formatTimeline();
console.log(timeline);
```

---

© Brainless Technologies Pvt. Ltd.
