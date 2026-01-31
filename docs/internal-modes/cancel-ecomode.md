---
description: Cancel active Ecomode mode (deprecated - use /brainless:cancel instead)
---

# Cancel Ecomode

[ECOMODE CANCELLED]

**DEPRECATION NOTICE:** This command is deprecated. Use `/brainless:cancel` instead, which intelligently detects and cancels any active mode including ecomode.

The unified cancel command is safer because it:
- Checks if ecomode is linked to Ralph and handles both
- Prevents orphaned state files
- Provides consistent cancellation experience

## Legacy Behavior

If you still use this command, it will:

1. Check if ecomode is linked to Ralph
2. If linked → Warn and suggest using `/brainless:cancel-ralph`
3. If standalone → Cancel ecomode only

## Arguments

{{ARGUMENTS}}

## Recommended Action

Use the unified cancel command:
```
/brainless:cancel
```

This will detect ecomode and cancel it properly, along with any linked modes.

## Implementation

If you must cancel ecomode directly:

```bash
# Check if linked to ralph
LINKED=$(cat .brainless/ecomode-state.json 2>/dev/null | jq -r '.linked_to_ralph // false')

if [[ "$LINKED" == "true" ]]; then
  echo "Warning: Ecomode is linked to Ralph."
  echo "Use /brainless:cancel to cancel both modes."
  exit 1
fi

# Cancel standalone ecomode
mkdir -p .anv ~/.claude
rm -f .brainless/ecomode-state.json
rm -f ~/.claude/ecomode-state.json

echo "Ecomode cancelled. Token-efficient execution mode deactivated."
```

## Migration

Replace:
```bash
/brainless:cancel-ecomode
```

With:
```bash
/brainless:cancel
```

The new unified cancel is smarter and safer.
