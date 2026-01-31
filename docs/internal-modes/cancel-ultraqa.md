---
description: Cancel active UltraQA cycling workflow
---

# Cancel UltraQA

[ULTRAQA CANCELLED]

The UltraQA cycling workflow has been cancelled. Clearing state file.

## MANDATORY ACTION

Execute this command to cancel UltraQA:

```bash
mkdir -p .sisyphus && echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ultraqa"}' > .brainless/ultraqa-state.json
```

After running this command, the QA cycling will stop.

## To Start Fresh

- `/brainless:ultraqa --tests` - Run until all tests pass
- `/brainless:ultraqa --build` - Run until build succeeds
- `/brainless:ultraqa --lint` - Run until no lint errors
- `/brainless:ultraqa --typecheck` - Run until no type errors
- `/brainless:ultraqa --custom "pattern"` - Run until pattern matches
