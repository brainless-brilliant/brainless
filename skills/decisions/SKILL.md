---
name: decisions
description: View all decisions made during orchestration
---

# /decisions - Decision Log Viewer

View all decisions made by PM and agents during orchestration.

## What This Shows

A table of all decisions with:
- Phase where decision was made
- Topic/question decided
- Options considered
- Chosen option
- Rationale
- Who decided (PM or consensus)

## Usage

```
/decisions          # Show all decisions
/decisions recent   # Show last 10 decisions
/decisions debates  # Show only decisions from debates
```

## Output Format

```markdown
# Decision Log

| # | Phase | Topic | Decision | By | Rationale |
|---|-------|-------|----------|----|-----------| 
| 1 | designing | Auth method | JWT tokens | PM | Better for stateless microservices API |
| 2 | designing | Token storage | HttpOnly cookies | PM | Mitigates XSS attacks, balances security with usability |
| 3 | designing | DB choice | PostgreSQL | Architect | Team familiarity, ACID compliance needed |
| 4 | planning | Test strategy | TDD approach | PM | Ensures quality, matches team workflow |
| 5 | executing | Error handling | Custom exceptions | Executor | Better debugging, cleaner code |

## Decisions from Debates

### Debate: "JWT vs Session tokens"
- **Participants:** Architect, Security-Reviewer
- **Decision:** JWT with short expiry + refresh tokens
- **Rationale:** Balances scalability needs with security concerns
- **Consensus:** No (PM override)
- **Dissenters:** Security-Reviewer
```

## Implementation

Read decisions from two sources:

1. **Orchestration decisions:** `.brainless/orchestration/orch_*.json` → `decisions` array
2. **Debate resolutions:** `.brainless/debates/*.json` → `resolution` object

```typescript
import { getDecisions } from '@brainless/workforce';

const decisions = getDecisions();
// Returns array of Decision objects with phase, topic, chosen, rationale, made_by
```

## Decision Details

Each decision includes:

| Field | Description |
|-------|-------------|
| `id` | Unique decision ID |
| `timestamp` | When decision was made |
| `phase` | Orchestration phase (designing, planning, etc.) |
| `topic` | What was being decided |
| `options` | All options considered |
| `chosen` | The selected option |
| `rationale` | Why this option was chosen |
| `made_by` | Who made the decision (pm, architect, etc.) |
| `debate_id` | If decision came from a debate |
| `consensus` | Whether agents agreed or PM overrode |

---

© Brainless Technologies Pvt. Ltd.
