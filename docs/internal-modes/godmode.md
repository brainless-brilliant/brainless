# God-Mode Internal Mode

> AI-powered multi-agent orchestration with deep initialization

## Overview

God-mode is the most comprehensive execution mode in Brainless. It combines:
- **Deep Init**: AI-powered analysis of project structure
- **Multi-Agent Execution**: Parallel ralph loops with specialized agents
- **Full Integration**: Memory, debates, escalation, team-builder, model-routing

## Trigger

```
/brainless:god-mode "Your complex task"
```

## Phases

### Phase 1: Deep Init

1. **Directory Analysis** - Scans project structure
2. **Type Detection** - Identifies: api, ui, tests, docs, config, scripts, lib, src
3. **Team Assignment** - Uses TeamBuilder with Haiku classifier
4. **CLAUDE.md Generation** - Creates `.brainless/CLAUDE.md` per directory
5. **Memory Query** - Retrieves past work insights

### Phase 2: Task Decomposition

1. **Parse Task** - Understand the user's goal
2. **Map to Directories** - Identify relevant directories
3. **Create Subtasks** - Directory-specific work items
4. **Assign Agents** - From Phase 1 team recommendations

### Phase 3: Parallel Execution

1. **Spawn Ralph Loops** - One per relevant directory
2. **Monitor Progress** - HUD shows status
3. **Handle Conflicts** - Debates when agents disagree
4. **Route Blockers** - Escalation protocol

### Phase 4: Consolidation

1. **Architect Review** - Verify all changes
2. **Conflict Resolution** - Merge incompatible changes
3. **Memory Storage** - Store learnings
4. **Report** - Summary to user

## State Machine

```
deep_init → decomposition → execution → consolidation → complete
                              ↓
                           (blocked) → (debate/escalation) → (resume)
```

## HUD Display

When active, god-mode injects status:
```
🔮 God-Mode Active
Phase: execution | Dirs: 5/8 | Ralph: 3 running | Agents: 15
```

## Integration Points

### Memory
- Query: `memory.search(directory, 3)` during Deep Init
- Store: `memory.saveObservation()` during Consolidation

### Team Builder
- `buildTeam(task, classification)` per directory
- Uses directory type to inform recommendations

### Debates
- Created when agents propose conflicting approaches
- PM moderates
- Resolution stored in `.brainless/debates/`

### Escalation
- Blockers route through: Agent → PM → Specialist → User
- Types: blocker, design-decision, approval-needed

### Model Routing
- Complexity signals determine agent tier
- Critical directories get opus tier

## Files Created

Per directory:
```
project/
├── src/
│   ├── .brainless/
│   │   └── CLAUDE.md    # AI-generated context
│   ├── api/
│   │   └── .brainless/
│   │       └── CLAUDE.md
│   └── components/
│       └── .brainless/
│           └── CLAUDE.md
└── .brainless/
    └── godmode-state.json  # Execution state
```

## Cancellation

```
/brainless:cancel
```

Or keyword: `GODMODE_CANCEL`

## Cleanup

Remove all `.brainless/` directories:
```
/brainless:godmode-clean
```

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--max-depth` | 4 | Maximum directory depth |
| `--max-loops` | 5 | Maximum parallel ralph loops |
| `--no-gitignore` | false | Skip adding to .gitignore |
| `--dry-run` | false | Analyze only, don't execute |

## Example

```
/brainless:god-mode "Add comprehensive authentication with JWT, role-based access control, and audit logging"
```

This will:
1. Analyze `src/api/`, `src/middleware/`, `src/models/`, etc.
2. Generate `.brainless/CLAUDE.md` with:
   - Assigned agents: executor, security-reviewer
   - Testing commands: `npm test -- --testPathPattern=auth`
   - Past auth-related work from memory
3. Create subtasks:
   - `src/api/`: Add auth endpoints
   - `src/middleware/`: JWT validation
   - `src/models/`: User, Role, Session models
4. Spawn 3 parallel ralph loops
5. Architect reviews for security holes
6. Store learnings for next time
