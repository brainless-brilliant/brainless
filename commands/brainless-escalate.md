---
description: Manually escalate an issue to specialists or user
argument-hint: <type> <message>
---

<command-instruction>
You are executing the /brainless:escalate command. Your job is to route an escalation to the appropriate handler.

## STEP 0: VALIDATE ARGUMENTS

The command requires:
- **type**: One of `question`, `blocker`, `design-decision`, `security-concern`, `scope-change`, `approval-needed`
- **message**: Description of the issue

If arguments missing, display:

```
⚠️ Usage: /brainless:escalate <type> <message>

Escalation Types:
  • question        - General question needing clarification
  • blocker         - Something blocking progress
  • design-decision - Architecture/design choice needed
  • security-concern - Security issue requiring review
  • scope-change    - Scope modification request
  • approval-needed - Requires explicit user approval

Example: /brainless:escalate blocker "Cannot proceed without API credentials"
```

Exit if arguments not provided.

## STEP 1: DISPLAY ESCALATION HEADER (IMMEDIATE)

Print this:

```
🚨 Escalation Initiated
═══════════════════════════════════════════════════
Type: [escalation type]
Message: [user's message]
═══════════════════════════════════════════════════
```

## STEP 2: ROUTE TO APPROPRIATE HANDLER

Use the 3-tier escalation protocol:

### Escalation Routing Table

| Type | Tier 1 (Self) | Tier 2 (Specialist) | Tier 3 (User) |
|------|---------------|---------------------|---------------|
| question | Attempt answer | → PM Coordinator | → User |
| blocker | Analyze cause | → PM Coordinator | → User |
| design-decision | Review options | → Architect (Vikram/Priya) | → User |
| security-concern | Quick assessment | → Security Lead (Elena/Sam) | → User (immediate) |
| scope-change | Impact analysis | → Business Analyst (Chloe) | → User |
| approval-needed | N/A | N/A | → User (immediate) |

### Special Cases

- **security-concern**: Always escalates to user after 1 specialist attempt
- **approval-needed**: Bypasses tiers, goes directly to user

## STEP 3: ATTEMPT TIER 1 RESOLUTION (MANDATORY OUTPUT)

For types that support self-resolution:

```
🔄 Tier 1: Attempting self-resolution...

[Your analysis/attempt to resolve the issue]

Result: ✅ Resolved | ❌ Need specialist
```

If resolved, display resolution and exit.
If not resolved, proceed to Tier 2.

## STEP 4: ESCALATE TO TIER 2 SPECIALIST (MANDATORY OUTPUT)

```
📤 Tier 2: Escalating to [Specialist Name] ([Role])...

Consulting [Specialist] on: [issue summary]

[Specialist's analysis/recommendation]

Result: ✅ Resolved | ❌ Need user input
```

If resolved, display resolution and exit.
If not resolved, proceed to Tier 3.

## STEP 5: ESCALATE TO USER (MANDATORY OUTPUT)

```
## ⏸️ Escalation to User - [Type]

**Original Issue:** [message]

### Resolution Attempts

**Tier 1 (Self):** [what was tried]
**Tier 2 ([Specialist]):** [what was tried]

### Specialist Recommendation

[Recommendation from Tier 2 specialist, if any]

### Question for User

[Specific question or decision needed]

### Options (if applicable)

1. [Option A] - [implications]
2. [Option B] - [implications]

---
Reply to continue. Orchestration paused.
```

## STEP 6: LOG ESCALATION

Write escalation to `.brainless/escalations/[timestamp]-[type].md`:

```markdown
# Escalation: [Type]
Date: [timestamp]
Status: [pending/resolved]

## Issue
[Original message]

## Resolution Path
- Tier 1: [result]
- Tier 2: [result]
- Tier 3: [result if reached]

## Resolution
[How it was resolved, once known]
```

---

## EXAMPLES

**Input:** `/brainless:escalate design-decision "Should we use REST or GraphQL for the API?"`

**Output:**
```
🚨 Escalation Initiated
═══════════════════════════════════════════════════
Type: design-decision
Message: Should we use REST or GraphQL for the API?
═══════════════════════════════════════════════════

🔄 Tier 1: Attempting self-resolution...

Analyzing API requirements:
- Data structure complexity
- Client requirements
- Team familiarity

Result: ❌ Need specialist (multiple valid approaches)

📤 Tier 2: Escalating to Vikram (Principal Architect)...

Consulting Vikram on: REST vs GraphQL decision

Vikram's Analysis:
"For this use case, I'd lean towards REST because:
1. Simpler caching strategy
2. Team has REST experience
3. Mobile clients benefit from predictable endpoints

However, if the data model is highly relational with many nested queries, GraphQL could reduce round-trips."

Result: ❌ Need user input (trade-offs require business decision)

## ⏸️ Escalation to User - Design Decision

**Original Issue:** Should we use REST or GraphQL for the API?

### Resolution Attempts

**Tier 1 (Self):** Analyzed requirements, found multiple valid approaches
**Tier 2 (Vikram):** Recommends REST for simplicity, but notes GraphQL benefits for complex queries

### Specialist Recommendation

Vikram recommends REST unless data model requires heavy nesting.

### Question for User

Which API style aligns better with your long-term vision?

### Options

1. **REST** - Simpler, cacheable, team-familiar
2. **GraphQL** - Flexible queries, single endpoint, steeper learning curve

---
Reply to continue. Orchestration paused.
```

**Input:** `/brainless:escalate approval-needed "Ready to deploy to production"`

**Output:**
```
🚨 Escalation Initiated
═══════════════════════════════════════════════════
Type: approval-needed
Message: Ready to deploy to production
═══════════════════════════════════════════════════

## ⏸️ Escalation to User - Approval Needed

**Request:** Ready to deploy to production

### Pre-Deploy Checklist

✅ All tests passing
✅ Code reviewed
✅ Security scan complete
✅ Documentation updated

### Action Required

Please confirm production deployment.

### Options

1. **Approve** - Proceed with deployment
2. **Reject** - Cancel deployment
3. **Delay** - Schedule for later

---
Reply to continue. Orchestration paused.
```

</command-instruction>

<current-context>
<escalations-dir>
!`test -d .brainless/escalations && echo "exists" || echo "not found"`
</escalations-dir>
<pending-escalations>
!`grep -l "Status: pending" .brainless/escalations/*.md 2>/dev/null | wc -l || echo "0"`
</pending-escalations>
</current-context>
