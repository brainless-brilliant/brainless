---
name: cancel-ultraqa
description: Cancel active UltraQA cycling workflow
---

# Cancel UltraQA

[ULTRAQA CANCELLED]

The UltraQA cycling workflow has been cancelled. Clearing state file.

## MANDATORY ACTION

Execute this command to cancel UltraQA:

```bash
mkdir -p .brainless && echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ultraqa"}' > .brainless/ultraqa-state.json
```

After running this command, the QA cycling will stop.

## To Start Fresh

- `/anveekshacode:ultraqa --tests` - Run until all tests pass
- `/anveekshacode:ultraqa --build` - Run until build succeeds
- `/anveekshacode:ultraqa --lint` - Run until no lint errors
- `/anveekshacode:ultraqa --typecheck` - Run until no type errors
- `/anveekshacode:ultraqa --custom "pattern"` - Run until pattern matches
