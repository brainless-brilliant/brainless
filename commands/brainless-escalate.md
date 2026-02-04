---
name: brainless-escalate
description: Manually escalate issues to specialists or user
args:
  - name: type
    description: Escalation type
    required: true
  - name: message
    description: Issue description
    required: true
---

# /brainless:escalate - Manual Escalation

Manually escalate issues to appropriate specialists or directly to the user.

## Escalation Types

| Type | Routes To | When to Use |
|------|-----------|-------------|
| `question` | PM Coordinator | General questions about approach |
| `blocker` | PM Coordinator | Task is blocked, need guidance |
| `design-decision` | Architect (Vikram/Priya) | Requires architectural input |
| `security-concern` | Security Lead → User | Security implications found |
| `scope-change` | Business Analyst (Chloe) | Requirements changing |
| `approval-needed` | User (Direct) | Explicit user decision required |

## How It Works

### Specialist Escalations
For `design-decision`, `security-concern`, `scope-change`:

1. **Route to specialist** (Vikram, Elena, Chloe)
2. **Specialist analyzes** the issue
3. **Provides recommendation**
4. **If unresolved**, escalates to user

### Direct User Escalations
For `approval-needed` or after specialist attempts:

1. **Present issue to user** with context
2. **Wait for user decision**
3. **Proceed based on user input**

## 3-Tier Internal Resolution

Brainless follows a 3-tier escalation protocol:

```
Tier 1: Agent Self-Resolution
  ↓ (if stuck)
Tier 2: Specialist Consultation
  ↓ (if still unresolved)
Tier 3: User Decision
```

This command **bypasses Tier 1** and goes directly to Tier 2 or 3.

## Usage

```
/brainless:escalate <type> "<message>"
```

## Examples

### Architecture Question
```
/brainless:escalate design-decision "Should we use event sourcing or traditional CRUD for order management?"
```
**Routes to**: Vikram (architect) for analysis and recommendation

### Security Concern
```
/brainless:escalate security-concern "User input not sanitized in search endpoint"
```
**Routes to**: Elena (security) first, then user if critical

### Approval Needed
```
/brainless:escalate approval-needed "Deploy to production now or wait for additional testing?"
```
**Routes to**: User directly (no specialist intermediary)

### Scope Change
```
/brainless:escalate scope-change "User wants real-time notifications, not just email"
```
**Routes to**: Chloe (business analyst) for impact assessment

## Output Format

### Specialist Routing
```
🚨 Escalating to appropriate specialist...
Type: design-decision

Question: "Should we use event sourcing or traditional CRUD?"

Routing to Vikram (Principal Architect)...

[Vikram's analysis appears here]

💡 Recommendation: [decision]
📊 Confidence: [X]%
```

### User Routing
```
⚠️ USER DECISION REQUIRED

Type: approval-needed

Deploy to production now or wait for additional testing?

[Include any internal discussion]

Please decide how to proceed.
```

## When to Use

- **Stuck on decision**: Need expert input to proceed
- **Security risk found**: Immediate attention required
- **Requirements unclear**: Business analyst review needed
- **User choice required**: No right/wrong answer, user must decide

---

**Tip**: Most issues resolve automatically through the 3-tier protocol. Use this command for urgent or explicit escalations!
