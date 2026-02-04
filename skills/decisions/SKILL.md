---
name: decisions
description: View all decisions made during orchestration
---

<command-instruction>
You are executing the /decisions command. Display all decisions made during orchestration.

## STEP 1: CHECK FOR DECISION DATA

Look for decision records in:
- `.brainless/decisions/` - Decision JSON files
- `.brainless/debates/` - Debate resolution records

```bash
ls -la .brainless/decisions/*.json .brainless/debates/*.md 2>/dev/null
```

If no data found:
```
📭 No Decisions Recorded

No orchestration decisions have been made yet.
Use /team "task" to start an orchestrated session.
```
Exit if no data.

## STEP 2: PARSE DECISIONS

Read decision records with fields:
- `id`: Unique decision ID
- `timestamp`: When decided
- `phase`: Orchestration phase (designing, planning, etc.)
- `topic`: What was decided
- `options`: Options considered
- `chosen`: Selected option
- `rationale`: Reasoning
- `made_by`: Who decided (pm, architect, consensus)
- `debate_id`: If from a debate
- `consensus`: Whether agents agreed

## STEP 3: DISPLAY DECISIONS (MANDATORY OUTPUT)

```
⚖️ Decision Log
═══════════════════════════════════════════════════
Session: [session-id]
Total Decisions: [count]
═══════════════════════════════════════════════════

| #  | Phase     | Topic              | Decision         | By        | Rationale                            |
|----|-----------|--------------------|--------------------|-----------|--------------------------------------|
| 1  | designing | Auth method        | JWT tokens         | PM        | Better for stateless microservices   |
| 2  | designing | Token storage      | HttpOnly cookies   | PM        | Mitigates XSS, balances security     |
| 3  | designing | Database           | PostgreSQL         | Architect | Team familiarity, ACID compliance    |
| 4  | planning  | Test strategy      | TDD approach       | PM        | Ensures quality, matches workflow    |
| 5  | executing | Error handling     | Custom exceptions  | Executor  | Better debugging, cleaner code       |

═══════════════════════════════════════════════════

💬 Decisions from Debates
───────────────────────────────────────────────────

### Debate #1: "JWT vs Session tokens"

**Participants:** Architect, Security-Reviewer
**Decision:** JWT with short expiry + refresh tokens
**Rationale:** Balances scalability with security
**Consensus:** No (PM override)
**Dissenters:** Security-Reviewer

───────────────────────────────────────────────────

### Debate #2: "REST vs GraphQL"

**Participants:** Architect, Frontend Lead
**Decision:** REST API
**Rationale:** Simpler caching, team experience
**Consensus:** Yes

═══════════════════════════════════════════════════
```

## STEP 4: HANDLE VARIANTS

### `/decisions recent`
Show only last 10 decisions.

### `/decisions debates`
Show only decisions that came from debates.

### `/decisions phase <phase>`
Filter by orchestration phase (designing, planning, executing, etc.)

## DECISION FIELDS EXPLAINED

| Field     | Description                              |
|-----------|------------------------------------------|
| `id`      | Unique decision identifier               |
| `timestamp` | When decision was made                 |
| `phase`   | Orchestration phase                      |
| `topic`   | What was being decided                   |
| `options` | All options that were considered         |
| `chosen`  | The selected option                      |
| `rationale` | Why this option was chosen             |
| `made_by` | Who made the decision                    |
| `debate_id` | If decision came from a debate         |
| `consensus` | Whether agents agreed or PM overrode  |

</command-instruction>

<current-context>
<decision-files>
!`ls .brainless/decisions/*.json 2>/dev/null | wc -l || echo "0"`
</decision-files>
<debate-files>
!`ls .brainless/debates/*.md 2>/dev/null | wc -l || echo "0"`
</debate-files>
</current-context>
