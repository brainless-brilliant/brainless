---
name: brainless-godmode
description: AI-powered multi-agent orchestration - analyzes codebase, generates context, spawns parallel execution
hint: "⚡ CAUTION: Creates .brainless/ directories throughout project. Auto-added to .gitignore."
---

# God-Mode

<command-instruction>
The user is invoking god-mode, the ultimate orchestration system that combines deep initialization with multi-agent parallel execution.

## What God-Mode Does

1. **Deep Init** - Analyzes every relevant directory and creates `.brainless/CLAUDE.md` with:
   - AI-inferred purpose and conventions
   - Assigned agents optimized for that directory type
   - Testing commands and past learnings

2. **Task Decomposition** - Breaks the user's task into directory-specific subtasks

3. **Parallel Execution** - Spawns ralph loops per directory with specialized agents

4. **Consolidation** - Architect verification and memory storage

## How to Execute

### Phase 1: Deep Init

Start by analyzing the project structure:

```
Task(subagent_type="brainless:godmode-init",
  prompt="Analyze project structure and create .brainless directories with specialized context for: [USER_TASK]")
```

This will:
- Run the directory analyzer
- Build teams per directory using TeamBuilder
- Query memory for past work insights
- Generate CLAUDE.md files
- Add .brainless to gitignore

### Phase 2: Decomposition

Break the task into directory subtasks:

```
For each analyzed directory:
1. Determine if this directory is relevant to the task
2. Create a focused subtask scoped to that directory
3. Assign the team recommendation from Phase 1
```

### Phase 3: Parallel Ralph Loops

Spawn ralph loops for each relevant directory:

```
// For each relevant directory in parallel:
Task(subagent_type="brainless:ralph-loop",
  prompt="Execute in [DIR_PATH]: [SUBTASK]
  
  Context: Read .brainless/CLAUDE.md in this directory first.
  Agents: [ASSIGNED_AGENTS]
  Max iterations: 10
  
  Signal completion: RALPH_COMPLETE")
```

### Phase 4: Consolidation

After all loops complete:

1. Spawn architect for verification:
   ```
   Task(subagent_type="brainless:architect",
     prompt="Review all changes made by god-mode execution:
     - Verify consistency across directories
     - Check for conflicts or duplications
     - Validate the original task is fully addressed")
   ```

2. Store learnings to memory
3. Report summary to user

## Integration Points

### Trigger Debates
If agents propose conflicting approaches:
```
Create debate with participants: [conflicting-agents]
Topic: [the conflict]
Moderator: pm
```

### Trigger Escalation
If agents hit blockers:
```
Escalate through: Agent → PM → Specialist → User
Type: blocker | design-decision | approval-needed
```

### Update Memory
Store observations per directory:
```
memory.saveObservation({
  project: directory_path,
  type: 'god-mode-execution',
  title: subtask_summary,
  facts: [what_was_done],
  files_modified: [files]
})
```

## HUD Signals

- **Start**: `GOD_MODE_START`
- **Phase transitions**: `GOD_PHASE_[PHASE]`
- **Completion**: `GOD_MODE_COMPLETE`
- **Failure**: `GOD_MODE_FAILED`

## Options

Parse user input for options:
- `--max-depth N`: Limit directory analysis depth (default: 4)
- `--max-loops N`: Limit parallel ralph loops (default: 5)
- `--no-gitignore`: Don't add .brainless to gitignore
- `--dry-run`: Analyze only, don't execute

</command-instruction>

<current-context>
<!-- Context is automatically injected by the context-injector.mjs hook -->
<!-- Parse the <brainless-context> JSON block above for: -->
<!-- - brainless.exists: whether .brainless already exists -->
<!-- - claudeMd: existing project configuration -->
<!-- - agentCount: number of available agents -->
</current-context>
