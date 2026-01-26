---
description: Cancel any active OMC mode (autopilot, ralph, ultrawork, ecomode, ultraqa, swarm, ultrapilot, pipeline)
---

# Cancel Command

[UNIFIED CANCEL - INTELLIGENT MODE DETECTION]

You are cancelling the active OMC mode. The cancel skill will automatically detect which mode is running and clean it up properly.

## Auto-Detection

The skill checks state files to determine what's active and cancels in order of dependency:

1. **Autopilot** - Stops workflow, preserves progress for resume, cleans up ralph/ultraqa
2. **Ralph** - Stops persistence loop, cleans up linked ultrawork or ecomode
3. **Ultrawork** - Stops parallel execution (standalone)
4. **Ecomode** - Stops token-efficient execution (standalone)
5. **UltraQA** - Stops QA cycling workflow
6. **Swarm** - Stops coordinated agents, releases claimed tasks
7. **Ultrapilot** - Stops parallel autopilot workers
8. **Pipeline** - Stops sequential agent chain

## Usage

Basic cancellation (auto-detects mode):
```
/anveekshacode:cancel
```

Force clear ALL state files:
```
/anveekshacode:cancel --force
/anveekshacode:cancel --all
```

## User Arguments

{{ARGUMENTS}}

## State Files Checked

- `.brainless/autopilot-state.json` → Autopilot
- `.brainless/ralph-state.json` → Ralph
- `.brainless/ultrawork-state.json` → Ultrawork
- `.brainless/ecomode-state.json` → Ecomode
- `.brainless/ultraqa-state.json` → UltraQA
- `.brainless/swarm-state.json` → Swarm
- `.brainless/ultrapilot-state.json` → Ultrapilot
- `.brainless/pipeline-state.json` → Pipeline

## What Gets Preserved

| Mode | Progress Preserved | Resume |
|------|-------------------|--------|
| Autopilot | Yes (phase, spec, plan) | `/anveekshacode:autopilot` |
| All Others | No | N/A |

## Dependency-Aware Cleanup

- **Autopilot cancellation** → Cleans ralph + ultraqa if active
- **Ralph cancellation** → Cleans linked ultrawork OR ecomode if applicable
- **Force mode** → Clears ALL state files regardless of what's active

## Exit Messages

The skill will report:
- Which mode was cancelled
- What phase/iteration it was in (if applicable)
- What dependent modes were cleaned up
- How to resume (if applicable)

## Implementation

Run the cancel skill which contains the full bash implementation for intelligent mode detection and cleanup.
