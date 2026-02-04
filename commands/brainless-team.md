---
name: brainless-team
description: Manually trigger team assembly for a task
args:
  - name: task
    description: The task description to assemble a team for
    required: true
---

# /brainless:team - Manual Team Assembly

Manually trigger team assembly to preview which specialists will be selected for your task.

## When to Use

- **Preview team composition**: See who gets selected before starting work
- **Understand agent selection**: Learn how the classifier routes tasks
- **Test team assembly**: Verify the right specialists are chosen
- **Manual delegation**: Start orchestration after team approval

## How It Works

When you run `/brainless:team "<task>"`, the system will:

1. **Analyze the task** using the Haiku-powered classifier
2. **Select specialists** from the registry of 29 agents based on:
   - Task category (architecture, security, implementation, etc.)
   - Required skills and expertise
   - Complexity level
3. **Display the team** with:
   - Agent names and roles
   - Their specializations/catchphrases
   - Selection rationale
   - Confidence score
   - Source (haiku classifier / memory / fallback)

4. **Wait for confirmation** before proceeding

## Team Assembly Rules

The classifier follows these principles:

| Task Type | Specialists Selected |
|-----------|---------------------|
| Architecture/Design | Vikram, Priya, Rohan (architects) |
| Security Review | Elena, Sam (security leads) |
| Implementation | Jordan, Alex, Taylor (executors) |
| QA/Testing | Maya, Oliver, Sophia (QA testers) |
| Frontend/UI | Zoe, Liam, Aiden, Mia (designers) |
| Documentation | Olivia, Ethan (writers) |
| Research | Aria, Lucas, Isla (researchers) |
| Data/Analytics | Noah, Emma, Leo (data specialists) |
| Planning | Amelia, Ryan (planners) |
| Business Logic | Chloe, Mason (analysts) |

**Complex tasks** may select multiple specialists from different domains.

## Memory Integration

The team assembly learns from past success:
- Tracks which teams worked well together
- Remembers successful agent combinations
- Adjusts recommendations based on project patterns

## Examples

```
/brainless:team "Build authentication API with JWT"
→ Shows: Elena (security), Jordan (executor), Maya (QA)

/brainless:team "Design dark mode landing page"
→ Shows: Zoe (frontend), Vikram (architect)

/brainless:team "Optimize database queries"
→ Shows: Noah (data), Rohan (architect), Oliver (QA)
```

## Output Format

```
🎯 Building your dream team for this task...

👥 Team of 3 assembled:
   🏗️ **Vikram** (Principal Architect): "CAP theorem in my sleep"
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"  
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"

💡 Rationale: Task involves system design and security review
📊 Confidence: 87% | Source: haiku

──────────────────────────────────────

Proceed with this team? (yes/no)
```

---

**Tip**: Use this command to validate team selection before running `/team` for full orchestration!
