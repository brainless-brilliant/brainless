---
name: team
description: PM-orchestrated team execution with SM-delegated sprint
---

# /team - Autonomous Team Orchestration

Activate PM Agent to orchestrate a complete team execution with strategic oversight while Scrum Master handles sprint execution.

## How It Works

```
USER: /team <task>
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                    PM (Athena)                               │
│  • Owns strategy and gates                                   │
│  • Spawns BA for requirements                                │
│  • Spawns SM for complexity assessment                       │
│  • Approves each phase gate                                  │
│  • Resolves escalations (with BA/Architect)                  │
│  • Escalates to user when needed                             │
└─────────────────────────────────────────────────────────────┘
        │
        │ [After planning approved]
        ▼
┌─────────────────────────────────────────────────────────────┐
│                 SCRUM MASTER (Hermes)                        │
│  • Owns sprint execution                                     │
│  • Spawns executors, reviewers, testers                      │
│  • Tracks progress (25%, 50%, 75%, 100%)                     │
│  • Handles minor clarifications                              │
│  • Escalates requirement/technical issues to PM              │
│  • Reports completion to PM                                  │
└─────────────────────────────────────────────────────────────┘
```

## Phase Flow

```
REQUIREMENTS ──── BA gathers → PM approves
    │
    ▼
ASSESSMENT ──── SM evaluates complexity → PM reviews
    │
    ▼
ANALYSIS ──── Analyst investigates → PM approves
    │
    ▼
DESIGN ──── Architect designs → Security debates → PM approves
    │
    ▼
PLANNING ──── Planner creates tasks → Critic reviews → PM approves
    │
    ▼
EXECUTION ──── **SM takes over** → Spawns executors → Reports to PM
    │
    ▼
VERIFICATION ──── QA tests → PM approves
    │
    ▼
COMPLETE
```

## Escalation Chain

| Question Type | Who Handles |
|---------------|-------------|
| Implementation detail | SM decides |
| Requirement ambiguity | PM + BA debate |
| Technical trade-off | PM + Architect debate |
| Unresolvable | PM → User (pauses, asks) |

## User Visibility

Check progress anytime:
- `/transcript` - All agent activities
- `/timeline` - Visual activity view
- `/decisions` - All decisions made

## Agent Roles

| Agent | Named | Role |
|-------|-------|------|
| **PM** | Athena | Strategy, gates, escalation resolution |
| **Scrum Master** | Hermes | Sprint execution, progress tracking |
| **Business Analyst** | Demeter | Requirements, user stories |
| **Architect** | - | Technical design |
| **Security Reviewer** | - | Security review |
| **Critic** | - | Validation, review |
| **Planner** | - | Task breakdown |
| **Executor** | - | Implementation |
| **QA Tester** | - | Quality testing |
| **Code Reviewer** | - | Code review |

## Human-in-Loop

When agents cannot resolve an issue:

```
## ⏸️ Orchestration Paused - User Input Required

**Topic:** [Issue]
**Context:** [What was tried]

### Question
[Specific question for user]

### Options
1. [Option A]
2. [Option B]

---
Reply to continue orchestration.
```

## Usage

```
/team Build a REST API with authentication
```

## Files Created

```
.brainless/
├── requirements/    # BA requirements docs
├── orchestration/   # State files
├── transcripts/     # Activity logs
├── plans/           # Work plans
├── debates/         # PM + BA/Architect debates
└── escalations/     # User escalation history
```
