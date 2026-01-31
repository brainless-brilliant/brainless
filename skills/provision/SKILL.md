---
name: provision
description: Scan project and provision an AI workforce team
inject-as-context: false
---

# AI Workforce Provisioner

This skill analyzes the current project and provisions a tailored team of AI agents based on the detected technology stack.

## What This Does

1. **Scans** the project directory to detect:
   - Programming languages (TypeScript, Python, Rust, Go, etc.)
   - Frameworks (React, Next.js, Django, FastAPI, etc.)
   - Build tools (Vite, Webpack, esbuild)
   - Testing frameworks (Jest, Vitest, Playwright, Pytest)
   - Databases (Prisma, Drizzle, MongoDB)
   - DevOps tools (Docker, Kubernetes, Terraform)

2. **Assembles** a recommended team of AI agents:
   - **Core Team**: Architect, Executor, Code Reviewer (always included)
   - **Tech Specialists**: Based on your stack (Designer for React, Security Reviewer for APIs, etc.)

3. **Identifies** skills to inject for enhanced context

## Usage

When the user invokes this skill, you should:

```typescript
// 1. Import the provisioning functions
const { scanProject } = require('./dist/features/project-scanner/index.js');
const { assembleTeam, formatResourceSheet } = require('./dist/features/team-assembler/index.js');

// 2. Scan the current project
const projectRoot = process.cwd(); // or user's workspace root
const scanResult = scanProject(projectRoot);

// 3. Assemble the team
const team = assembleTeam(scanResult);

// 4. Display the resource sheet
console.log(formatResourceSheet(team));
```

## Output Format

The provisioner generates a **Resource Loading Sheet** containing:

- **Project Analysis**: Technologies detected, scan duration
- **Core Team**: Always-included essential agents
- **Tech-Specific Agents**: Specialists based on your stack
- **Skills to Inject**: Context to be loaded for enhanced performance

## Example Output

```
# AI Workforce Resource Sheet

Generated: 2025-01-24T12:00:00.000Z

## Project Analysis

- **Root:** /path/to/project
- **Technologies:** 4 detected
- **Scan Duration:** 12ms

## Core Team

### Architect
- **Role:** System design and architecture planning
- **Tier:** opus

### Executor
- **Role:** Code implementation and feature development
- **Tier:** sonnet

### Code Reviewer
- **Role:** Code review and quality assessment
- **Tier:** sonnet

## Tech-Specific Agents

### QA Tester
- **Role:** Test creation and quality assurance
- **Relevance:** 90%
- **Reason:** Specializes in Vitest
- **Technologies:** vitest

### Designer
- **Role:** UI/UX design and frontend development
- **Relevance:** 85%
- **Reason:** Specializes in React
- **Technologies:** react, tailwindcss

## Skills to Inject

- typescript-best-practices
- react-patterns
- testing-patterns
```

## Agent Tiers

Agents are assigned to model tiers:

| Tier | Model | Use For |
|------|-------|---------|
| **opus** | Claude 3 Opus | Complex planning, architecture, security |
| **sonnet** | Claude 3 Sonnet | Implementation, review, testing |
| **haiku** | Claude 3 Haiku | Simple fixes, quick tasks |

## Customization

You can customize the team assembly:

```typescript
const team = assembleTeam(scanResult, {
  maxAgents: 8,           // Limit team size
  minRelevance: 0.5,      // Higher relevance threshold
  includeCoreAgents: true // Always include core team
});
```

---

*Part of brainless Workforce Provisioning System*
