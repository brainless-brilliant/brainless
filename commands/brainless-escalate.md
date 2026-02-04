---
name: brainless-escalate
description: Manually escalate an issue to a specialist or the user
args:
  - name: type
    description: Escalation type (question, blocker, design-decision, security-concern, scope-change, approval-needed)
    required: true
  - name: message
    description: Escalation message/question
    required: true
---

# Brainless Manual Escalation

**DISPLAY IMMEDIATELY - NO BASH WRAPPERS**

Manually escalate: **{{type}}** - "{{message}}"

## Escalation Details

**Type**: {{type}}
**Message**: {{message}}

## Execution

**Step 1:** Validate escalation type

Allowed types:
- `question` → PM Coordinator
- `blocker` → PM Coordinator
- `design-decision` → Architect (Vikram/Priya)
- `security-concern` → Architect then User
- `scope-change` → Business Analyst
- `approval-needed` → Direct to User

**Step 2:** Route based on type

For **{{type}}**, route as follows:

**If routing to specialist (design-decision, security-concern initially):**

Display:
```
🚨 Escalating to appropriate specialist...
Type: {{type}}

Question: "{{message}}"

Routing to [Vikram (Architect) | Priya (Architect) | Chloe (Business Analyst)]...
```

Then delegate to that specialist and wait for response.

**If routing to user (approval-needed or security after attempts):**

Display:
```
⚠️ USER DECISION REQUIRED

Type: {{type}}

{{message}}

[Include any internal discussion if applicable]

Please decide how to proceed.
```

**Step 3:** Display response

After specialist/user responds:

```
✅ Response:

[Response text]

─────────────────────────────────────

Proceeding with recommendation...
```

---

## Example: Design Decision

```
🚨 Escalating to appropriate specialist...
Type: design-decision

Question: "Should we use REST or GraphQL?"

Routing to Vikram (Principal Architect)...

─────────────────────────────────────

✅ Architect Response:

"Use REST for this case. Simple CRUD operations don't need GraphQL complexity.
REST is faster to implement and your team already knows it.

Recommendation: REST + OpenAPI spec."

─────────────────────────────────────

Proceeding with REST implementation...
```

---

## Example: User Approval

```
⚠️ USER DECISION REQUIRED

Type: approval-needed

We need to make a breaking API change to support the new feature.
This will require mobile app updates.

Options:
A) Proceed with breaking change (requires coordinated deployment)
B) Maintain backward compatibility (more complex implementation)
C) Delay feature until v2.0

Please decide how to proceed.
```

---

## Important

- **DO NOT** wrap in `Bash(cat << 'EOF' ...)`
- **DO** display formatted text directly  
- **DO** actually route the escalation
- **DO** wait for specialist/user response before proceeding

## Escalation Flow

```
Manual Escalation
    ↓
Validate Type
    ↓
Route to Specialist/User
    ↓
    ├─→ Specialist → Get Response → Continue
    └─→ User → Wait for Decision
```

## Notes

- Bypasses automatic 3-tier internal resolution
- Useful when you know exactly who to ask
- All escalations logged to memory
- Security concerns escalate to user after 1 attempt
