---
description: Show available Brainless Workforce commands
---

# Brainless Workforce - Help

## Available Commands

| Command | Description |
|---------|-------------|
| `/team <task>` | Start PM-orchestrated autonomous team execution |
| `/transcript` | View agent activity log |
| `/timeline` | Visual activity timeline |
| `/decisions` | View all decisions made |
| `/help` | Show this help |

---

## How It Works

When you run `/team <task>`, the PM Agent:

1. **Consults Business Analyst** - Gathers requirements and creates user stories
2. **Consults Scrum Master** - Assesses complexity, recommends execution mode
3. **Orchestrates the Team** - Spawns specialist agents through phases
4. **Monitors Progress** - Tracks execution with abort on failures

You don't need to know about internal modes - the PM handles everything automatically!

---

## Phase Flow

```
/team <task>
    │
    ▼
📋 Requirements Gathering (Business Analyst)
    │
    ▼
📊 Complexity Assessment (Scrum Master)
    │
    ▼
🔍 Analysis Phase
    │
    ▼
🏗️ Design Phase + Security Review
    │
    ▼
📝 Planning Phase + Critic Review  
    │
    ▼
⚡ Execution Phase (auto-selects optimal mode)
    │
    ▼
✅ Verification Phase
    │
    ▼
📄 Summary & Deliverables
```

---

## Check Progress

While orchestration is running:

- **`/transcript`** - See all agent activities in table format
- **`/timeline`** - Visual tree view of activities
- **`/decisions`** - All decisions made with rationale

---

## Examples

```
/team Build a REST API with authentication

/team Create a landing page with dark mode

/team Refactor the data layer for better performance
```

---

© Brainless Technologies Pvt. Ltd.
