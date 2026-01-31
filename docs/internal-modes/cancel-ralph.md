---
description: Cancel active Ralph (and linked ultrawork if auto-activated)
---

# Cancel Ralph

[RALPH CANCELLED]

Ralph has been cancelled. You MUST now deactivate the state files.

## MANDATORY ACTION

Execute this command to fully cancel ALL persistent modes:

```bash
mkdir -p .anv ~/.claude && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ralph"}' > .brainless/ralph-state.json && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ralph", "linked_to_ralph": false}' > .brainless/ultrawork-state.json && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ralph"}' > .brainless/ralph-plan-state.json && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ralph"}' > ~/.claude/ralph-state.json && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ralph"}' > ~/.claude/ultrawork-state.json && \
rm -f .brainless/ralph-verification.json
```

After running this command, you are free to stop working. The persistent mode hook will no longer force continuation.

## What Was Cancelled

- **Ralph**: Self-referential completion loop
- **Ultrawork**: Parallel execution mode (auto-activated with Ralph by default)
- **Ralph Plan**: Iterative planning loop (if active via /ralplan)
- **Verification State**: Any pending architect verification

## Note on Linked Modes

Since v3.0, Ralph automatically activates Ultrawork for parallel execution. When you cancel Ralph, the linked Ultrawork is also cancelled. If you started Ultrawork separately (not via Ralph), use `/brainless:cancel-ultrawork` to cancel it independently.

## To Start Fresh

- `/brainless:ralph "task"` - Start ralph with ultrawork (default)
- `/brainless:ultrawork "task"` - Start ultrawork only (standalone)
