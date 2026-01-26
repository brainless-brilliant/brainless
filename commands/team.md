---
description: PM-orchestrated autonomous team execution with full agent cooperation
---

# /team - Autonomous Team Orchestration

> **⚠️ STANDALONE COMMAND** - Do NOT combine with `/plan`.
> - Use `/team <task>` for full autonomous execution (analysis → design → plan → execute → verify)
> - Use `/plan <task>` for planning only (no execution)

## Pre-Flight Check (MANDATORY)

Before starting orchestration, check for existing plans:

```bash
ls .brainless/plans/*.md 2>/dev/null
```

**If a plan exists**, ask the user:

```
I found an existing plan at `.brainless/plans/X.md`. What would you like to do?

1. **Use this plan** - Skip to execution phase
2. **Start fresh** - Full orchestration from scratch
3. **Cancel** - Let me review the plan first
```

Wait for user response before proceeding.

## Usage

```
/team <task description>
```

## What Happens

When you invoke `/team`, the PM Agent takes ownership and orchestrates:

1. **ANALYZING** - Spawn analyst to gather requirements
2. **DESIGNING** - Spawn architect + **mandatory security-reviewer debate**
3. **PLANNING** - Spawn planner + **mandatory critic review**
4. **EXECUTING** - Spawn executors with **abort monitoring (50% failure threshold)**
5. **VERIFYING** - Spawn code-reviewer and qa-tester

## Mandatory Checks

| Phase | Mandatory Action |
|-------|------------------|
| Design | Security reviewer must be spawned |
| Plan | Critic must approve before execution |
| Execute | Track progress, abort if 50% failures |

## User Visibility

Check progress anytime with:
- `/transcript` - All agent activities
- `/timeline` - Visual activity view  
- `/decisions` - All decisions made

## Full Instructions

Read the complete PM Agent protocol at `agents/pm.md`.
