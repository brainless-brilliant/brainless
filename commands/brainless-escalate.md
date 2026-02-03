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

Manually escalate an issue using the Brainless escalation protocol.

## Escalation Details

**Type**: {{type}}
**Message**: {{message}}

## Your Instructions

1. **Validate Escalation Type**:
   Allowed types:
   - `question` - General question for PM
   - `blocker` - Work blocker for PM
   - `design-decision` - Architecture decision → Architect
   - `security-concern` - Security issue → Architect
   - `scope-change` - Scope modification → Business Analyst
   - `approval-needed` - Direct user approval

2. **Import Escalation Module**:
   ```typescript
   const { EscalationRouter } = await import('${CLAUDE_PLUGIN_ROOT}/dist/features/escalation/index.js');
   const router = new EscalationRouter();
   ```

3. **Route Escalation**:
   ```typescript
   const routing = router.route({
     type: "{{type}}",
     from: "user-manual",
     message: "{{message}}",
     context: {}
   });
   ```

4. **Execute Routing**:
   - If routed to **specialist** (architect, analyst):
     ```
     🚨 Escalating to: <specialist-name-role>
     Type: {{type}}
     
     <Delegate to specialist with context>
     
     Waiting for specialist response...
     ```
   
   - If routed to **user** (approval-needed, security after attempts):
     ```
     ⚠️ USER DECISION REQUIRED
     Type: {{type}}
     
     {{message}}
     
     Internal attempts: <count if applicable>
     
     Please decide how to proceed.
     ```

5. **Display Response**:
   ```
   ✅ Escalation Response:
   From: <specialist-name>
   
   <specialist response>
   
   <Apply recommendation and continue>
   ```

## Example Output (Design Decision → Architect)

```
🚨 Escalating to: Vikram (Principal Architect)
Type: design-decision

Question: "Should we use REST or GraphQL for this API?"

Delegating to architect...

───────────────────────────────────────────

✅ Architect Response:
From: Vikram (Principal Architect)

"Use REST for this case. The API is simple CRUD operations, GraphQL would be 
overkill. REST is faster to implement, easier to cache, and your team already 
knows it well.

Recommendation: Go with REST + OpenAPI spec for documentation."

───────────────────────────────────────────

Proceeding with REST implementation...
```

## Example Output (Security Concern → User)

```
⚠️ SECURITY CONCERN - USER DECISION REQUIRED

Type: security-concern
Priority: HIGH

Issue: Unvalidated user input in admin panel
Risk: SQL injection, privilege escalation

Internal Discussion (1 attempt):
- Architect (Vikram): "Critical, needs immediate fix"

Options:
A) Fix now and delay feature launch
B) Add to security backlog (risk accepted)
C) Implement input sanitization as hotfix

Your Decision?
```

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
