---
description: Manually trigger team assembly for a task
argument-hint: <task>
---

<command-instruction>
You are executing the /brainless:team command. Your job is to assemble a specialized team for the user's task.

## STEP 0: DISPLAY ANALYZING MESSAGE (IMMEDIATE)

Print this EXACTLY:

```
🎯 Analyzing your question...
```

## STEP 1: CLASSIFY THE TASK

Analyze the user's task description to determine:
- **Primary category**: architecture / security / implementation / qa / frontend / documentation / research / data / planning / business-logic
- **Complexity level**: simple / medium / complex
- **Required specialists**: Which of the 29 agents best fit this task

### Specialist Registry

| Domain | Agents |
|--------|--------|
| Architecture/Design | Vikram, Priya, Rohan |
| Security | Elena, Sam |
| Implementation | Jordan, Alex, Taylor |
| QA/Testing | Maya, Oliver, Sophia |
| Frontend/UI | Zoe, Liam, Aiden, Mia |
| Documentation | Olivia, Ethan |
| Research | Aria, Lucas, Isla |
| Data/Analytics | Noah, Emma, Leo |
| Planning | Amelia, Ryan |
| Business Logic | Chloe, Mason |

### Selection Rules

- **Simple tasks** (single concern): 1-2 specialists
- **Medium tasks** (2-3 concerns): 2-3 specialists
- **Complex tasks** (multiple concerns): 3-5 specialists
- **Security-related**: ALWAYS include Elena or Sam
- **Architecture-related**: ALWAYS include Vikram or Priya
- **Implementation**: Match executor to task domain (frontend → Zoe/Liam, backend → Jordan/Alex)

## STEP 2: SEARCH MEMORY (OPTIONAL)

If the project has `.brainless/memory/` with past task patterns, check for:
- Similar past tasks and which teams worked well
- Failed team combinations to avoid
- Project-specific agent preferences

## STEP 3: DISPLAY TEAM ROSTER (MANDATORY OUTPUT)

**You MUST print this output block. NO BASH COMMANDS. NO PERMISSION PROMPTS.**

Print the team in this EXACT format:

```
👥 Team of [N] assembled:
   [emoji] **[Name]** ([Role]): "[Catchphrase]"
   [emoji] **[Name]** ([Role]): "[Catchphrase]"
   ...

💡 Rationale: [1-2 sentence explanation of why these specialists]
📊 Confidence: [X]% | Source: [haiku/memory/fallback]
```

### Agent Catchphrases

| Agent | Emoji | Role | Catchphrase |
|-------|-------|------|-------------|
| Vikram | 🏗️ | Principal Architect | "CAP theorem in my sleep" |
| Priya | 🎯 | Solutions Architect | "Complexity is the enemy" |
| Rohan | 📐 | Systems Architect | "Distributed by design" |
| Elena | 🔒 | Security Lead | "Assuming everything is a SQL injection" |
| Sam | 🛡️ | Security Engineer | "Trust no input" |
| Jordan | ⚙️ | Senior Engineer | "Ship it or skip it" |
| Alex | 💻 | Staff Engineer | "Code is liability, features are assets" |
| Taylor | 🔧 | Backend Engineer | "APIs are contracts" |
| Maya | ✅ | QA Lead | "If it's not tested, it's broken" |
| Oliver | 🧪 | Test Engineer | "Edge cases are the main cases" |
| Sophia | 🔍 | QA Analyst | "Users will find a way" |
| Zoe | 🎨 | Frontend Lead | "Pixels matter" |
| Liam | 🖼️ | UI Engineer | "Responsive is non-negotiable" |
| Aiden | 📱 | Mobile Engineer | "60fps or nothing" |
| Mia | ✨ | UX Engineer | "Delightful by default" |
| Olivia | 📝 | Tech Writer | "If it's not documented, it doesn't exist" |
| Ethan | 📚 | Documentation Lead | "Write for the future you" |
| Aria | 🔬 | Research Lead | "Data drives decisions" |
| Lucas | 📊 | Data Scientist | "Correlation is not causation" |
| Isla | 🧠 | ML Engineer | "Garbage in, garbage out" |
| Noah | 📈 | Analytics Engineer | "Measure twice, query once" |
| Emma | 💾 | Data Engineer | "Schema is destiny" |
| Leo | 🗄️ | Database Admin | "Indexes are free until they're not" |
| Amelia | 📋 | Product Manager | "Scope is a four-letter word" |
| Ryan | 🚀 | DevOps Lead | "Automate everything" |
| Chloe | 💼 | Business Analyst | "Requirements are negotiable" |
| Mason | 📊 | Systems Analyst | "Edge cases define the system" |

## STEP 4: ASK FOR CONFIRMATION

After displaying the team, ask:

```
──────────────────────────────────────

Proceed with this team? (yes/no)
```

Wait for user response before proceeding to any orchestration.

## STEP 5: IF USER CONFIRMS

If user says yes/proceed:
- Begin orchestration using the assembled team
- PM (if in team) takes coordinator role
- Log activity to `.brainless/transcripts/`

If user says no/different:
- Ask what changes they'd like
- Re-run team selection with adjustments

---

## EXAMPLES

**Input:** `/brainless:team "Build authentication API with JWT"`

**Output:**
```
🎯 Analyzing your question...

👥 Team of 3 assembled:
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"
   ⚙️ **Jordan** (Senior Engineer): "Ship it or skip it"
   ✅ **Maya** (QA Lead): "If it's not tested, it's broken"

💡 Rationale: Authentication is security-critical. Need security review, solid backend implementation, and thorough testing.
📊 Confidence: 92% | Source: haiku

──────────────────────────────────────

Proceed with this team? (yes/no)
```

**Input:** `/brainless:team "Design dark mode landing page"`

**Output:**
```
🎯 Analyzing your question...

👥 Team of 2 assembled:
   🎨 **Zoe** (Frontend Lead): "Pixels matter"
   🏗️ **Vikram** (Principal Architect): "CAP theorem in my sleep"

💡 Rationale: UI-focused task needs frontend expertise. Architect for component structure decisions.
📊 Confidence: 85% | Source: haiku

──────────────────────────────────────

Proceed with this team? (yes/no)
```

</command-instruction>

<current-context>
<project-has-memory>
!`test -d .brainless/memory && echo "yes" || echo "no"`
</project-has-memory>
<recent-teams>
!`ls -la .brainless/transcripts/*.md 2>/dev/null | tail -3 || echo "no transcripts"`
</recent-teams>
</current-context>
