---
name: godmode
description: AI-powered multi-agent orchestration that creates .brainless directories with specialized context and spawns parallel ralph loops
---

# God-Mode Skill

## Overview

God-mode is the ultimate orchestration system that:
1. **Analyzes** your entire codebase to understand its architecture
2. **Generates** specialized `.brainless/` directories with AI context
3. **Decomposes** your task into directory-specific subtasks
4. **Spawns** parallel ralph loops with the right agents per directory
5. **Consolidates** results through architect verification

## Phases

### Phase 1: Deep Init

The system analyzes each directory to determine:
- **Type**: api, ui, tests, docs, config, scripts, lib, src
- **Languages**: TypeScript, Python, Rust, etc.
- **Agents**: Which agents are best suited for this directory

Then it generates `.brainless/CLAUDE.md` files with:
- Directory purpose and conventions
- Assigned agents with rationale
- Testing commands specific to the directory
- Past work from memory (if available)

### Phase 2: Task Decomposition

The task is broken into directory-specific subtasks:
- "Add authentication" → 
  - `src/api/`: Add auth middleware
  - `src/ui/`: Add login component
  - `src/tests/`: Add auth tests

### Phase 3: Parallel Execution

Multiple ralph loops run simultaneously:
- Each directory gets its own loop
- Agents are scoped to their assigned directory
- Debates trigger when agents disagree
- Escalations bubble up blockers

### Phase 4: Consolidation

- Architect reviews all changes
- Conflicts are resolved
- Learnings are stored in memory

## Integration with Brainless Features

### Memory
- Queries past work per directory during Phase 1
- Stores learnings after completion
- Informs future team selection

### Team Builder
- Uses Haiku classifier to select agents
- Memory insights improve selection
- Directory type influences choices

### Debates
- Auto-created when agents conflict
- PM moderates resolution
- Decision stored in `.brainless/debates/`

### Escalation
- Blockers route through Agent→PM→Specialist→User
- Logged for pattern recognition
- Prevents infinite loops

### Model Routing
- Complexity signals determine tier
- Critical directories get opus
- Simple tasks use haiku

## Usage

Invoke via slash command:
```
/brainless:god-mode "Add comprehensive authentication"
```

Or with options:
```
/brainless:god-mode "Refactor API layer" --max-depth 3 --max-loops 3
```

## HUD Display

During execution, the HUD shows:
```
[GOD-MODE] Phase: execution | Dirs: 8/12 | Ralph: 3 running, 5 done | Agents: 24
```

## Cancellation

To cancel an active god-mode:
```
/brainless:cancel
```

## Safety

- **Git**: `.brainless` auto-added to `.gitignore`
- **Warning**: Command hint warns about directory creation
- **Cleanup**: `/brainless:godmode-clean` removes all `.brainless/`
