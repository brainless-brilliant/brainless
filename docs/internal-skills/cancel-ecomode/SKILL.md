---
name: cancel-ecomode
description: Cancel active Ecomode mode
---

# Cancel Ecomode

[ECOMODE CANCELLED]

The Ecomode has been cancelled. Clearing state files.

## MANDATORY ACTION

**First**, check if ecomode is linked to an active Ralph loop:

```bash
cat .brainless/ecomode-state.json 2>/dev/null | jq -r '.linked_to_ralph // false'
```

**If linked_to_ralph is true**: Use `/anveekshacode:cancel-ralph` instead to cancel both Ralph and its linked Ecomode.

**Otherwise**, execute this command to cancel Ecomode:

```bash
mkdir -p .anv && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ecomode"}' > .brainless/ecomode-state.json && \
echo '{"active": false, "cancelled_at": "'$(date -Iseconds)'", "reason": "User cancelled via /cancel-ecomode"}' > ~/.claude/ecomode-state.json
```

After running this command, ecomode will be deactivated and the HUD will update.

## Note on Linked Modes

Since v3.5, Ralph can activate either Ultrawork OR Ecomode based on user preference. If you see `linked_to_ralph: true` in the ecomode state, it means Ecomode was auto-activated by Ralph. In this case:
- Use `/anveekshacode:cancel-ralph` to cancel both modes
- If you only cancel ecomode, Ralph will continue but without parallel execution benefits

## To Start Fresh

- `/anveekshacode:ecomode "task"` - Start ecomode only (standalone)
- `/anveekshacode:ralph "task"` - Start ralph with default execution mode
