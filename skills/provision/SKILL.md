---
name: provision
description: Scan project and provision an AI workforce team
---

<command-instruction>
You are executing the /provision command. Your job is to scan the project and provision a tailored AI workforce team.

## STEP 1: DISPLAY SCANNING MESSAGE (IMMEDIATE)

Print:
```
🔍 Scanning project to provision AI workforce...
```

## STEP 2: SCAN PROJECT STRUCTURE

Scan the current project to detect:

### Languages
Look for files with extensions:
- `.ts`, `.tsx` → TypeScript
- `.js`, `.jsx` → JavaScript
- `.py` → Python
- `.rs` → Rust
- `.go` → Go
- `.java` → Java
- `.rb` → Ruby

### Package Managers
Check for:
- `package.json` → Node.js project
- `requirements.txt`, `pyproject.toml` → Python
- `Cargo.toml` → Rust
- `go.mod` → Go

### Frameworks (from dependencies)
Parse package files for:
- `react`, `next`, `vue`, `angular` → Frontend
- `express`, `fastify`, `koa` → Node backend
- `django`, `flask`, `fastapi` → Python backend
- `prisma`, `drizzle` → Database ORMs

### Testing
Look for:
- `jest.config.*`, `vitest.config.*` → JS testing
- `pytest.ini`, `pyproject.toml` → Python testing
- `playwright.config.*` → E2E testing

### DevOps
Look for:
- `Dockerfile` → Docker
- `kubernetes/`, `k8s/` → Kubernetes
- `.github/workflows/` → GitHub Actions
- `terraform/` → IaC

## STEP 3: ASSEMBLE TEAM

Based on detected stack, select agents:

### Core Team (Always included)
| Agent | Role | Tier |
|-------|------|------|
| Vikram | Architect - System design | opus |
| Jordan | Executor - Implementation | sonnet |
| Alex | Code Reviewer - Quality | sonnet |

### Tech-Specific Agents (Based on scan)

| Stack Detected | Add Agent | Reason |
|----------------|-----------|--------|
| React/Vue/Frontend | Zoe (Frontend Lead) | UI expertise |
| API/Backend | Taylor (Backend Engineer) | API design |
| Tests present | Maya (QA Lead) | Test coverage |
| Security-sensitive | Elena (Security Lead) | Security review |
| Database/ORM | Leo (Database Admin) | Schema design |
| DevOps/Docker | Ryan (DevOps Lead) | Deployment |
| Data/ML | Isla (ML Engineer) | Data pipelines |

## STEP 4: DISPLAY RESOURCE SHEET (MANDATORY OUTPUT)

```
═══════════════════════════════════════════════════
📋 AI Workforce Resource Sheet
═══════════════════════════════════════════════════
Generated: [timestamp]

🔍 Project Analysis
───────────────────────────────────────────────────
Root: [project path]
Technologies: [N] detected
Scan Duration: [X]ms

Detected Stack:
• [Language 1] - [files count]
• [Framework 1] - from dependencies
• [Tool 1] - [source file]

═══════════════════════════════════════════════════

👥 Core Team (Always Included)
───────────────────────────────────────────────────

🏗️ Vikram (Principal Architect)
   Role: System design and architecture planning
   Tier: opus (complex decisions)

⚙️ Jordan (Senior Engineer)
   Role: Code implementation and feature development
   Tier: sonnet (implementation)

💻 Alex (Staff Engineer)
   Role: Code review and quality assessment
   Tier: sonnet (review)

═══════════════════════════════════════════════════

🎯 Tech-Specific Agents
───────────────────────────────────────────────────

[For each matched agent:]

🎨 Zoe (Frontend Lead)
   Role: UI/UX development
   Relevance: [X]%
   Matched: react, tailwindcss
   Tier: sonnet

✅ Maya (QA Lead)
   Role: Test creation and quality assurance
   Relevance: [X]%
   Matched: vitest, playwright
   Tier: sonnet

[... more agents based on scan ...]

═══════════════════════════════════════════════════

📚 Skills to Inject
───────────────────────────────────────────────────
• [skill-1] - Enhanced [technology] patterns
• [skill-2] - [Framework] best practices
• [skill-3] - Testing patterns

═══════════════════════════════════════════════════

✅ Workforce provisioned! [N] agents ready.

💡 This team will be used for /team orchestrations.
   Run /brainless:status to verify configuration.

═══════════════════════════════════════════════════
```

## AGENT TIER REFERENCE

| Tier | Model | Use For |
|------|-------|---------|
| **opus** | Claude 3 Opus | Architecture, security, complex planning |
| **sonnet** | Claude 3 Sonnet | Implementation, review, testing |
| **haiku** | Claude 3 Haiku | Quick fixes, simple tasks |

</command-instruction>

<current-context>
<package-json>
!`test -f package.json && echo "exists" || echo "not found"`
</package-json>
<languages>
!`find . -maxdepth 3 -type f \( -name "*.ts" -o -name "*.py" -o -name "*.rs" -o -name "*.go" \) 2>/dev/null | head -5`
</languages>
<frameworks>
!`cat package.json 2>/dev/null | grep -E '"(react|next|vue|express|prisma)"' | head -5 || echo "none"`
</frameworks>
<tests>
!`ls jest.config.* vitest.config.* pytest.ini 2>/dev/null || echo "none"`
</tests>
<devops>
!`ls Dockerfile docker-compose.yml .github/workflows/*.yml 2>/dev/null | head -3 || echo "none"`
</devops>
</current-context>
