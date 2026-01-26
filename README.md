# Brainless AI Workforce

<p align="center">
  <strong>AI Workforce Orchestration System for Claude Code</strong><br>
  <em>Intelligent multi-agent provisioning and orchestration</em>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#features">Features</a> •
  <a href="#workforce-provisioning">Workforce Provisioning</a> •
  <a href="#commands">Commands</a>
</p>

---

## What is Brainless?

Brainless AI Workforce transforms Claude Code into an intelligent multi-agent system that:

- 🔍 **Scans your project** to detect technologies and frameworks
- 🤖 **Provisions a tailored team** of AI agents for your stack
- ⚡ **Automates orchestration** with smart model routing
- 🎯 **Zero learning curve** - everything activates automatically

## Installation

```bash
# Install via npm
npm install -g @anveeksha/workforce

# Or as a Claude Code plugin
claude /install-plugin @anveeksha/workforce
```

## Quick Start

```bash
# Run setup wizard
anveeksha install

# Or use the short alias
avk install
```

Then in Claude Code:
```
/setup     # Configure Brainless
/provision # Auto-detect your stack and get agent recommendations
```

## Features

### 🎭 Multi-Agent Orchestration
28+ specialized agents with intelligent model routing:
- **Opus tier**: Architect, Planner, Critic, Security Reviewer
- **Sonnet tier**: Executor, Designer, Code Reviewer, QA Tester
- **Haiku tier**: Explorer, Writer, Quick tasks

### 🔧 Workforce Provisioning
Automatically analyzes your project and provisions the right team:

```bash
anveeksha provision
```

Detects 50+ technologies including:
- Languages: TypeScript, Python, Rust, Go, Java
- Frameworks: React, Next.js, Django, FastAPI
- Tools: Vite, Webpack, Docker, Kubernetes
- And more...

### 🪄 Magic Keywords
Include these words naturally in your requests:

| Keyword | Effect |
|---------|--------|
| `ralph` | Persistence mode - don't stop until done |
| `ulw` | Maximum parallelism |
| `eco` | Token-efficient mode |
| `plan` | Planning interview |

**Example:** `"ralph ulw: refactor the entire API"`

### 🎯 Smart Model Routing
Tasks are automatically routed to the optimal model tier based on complexity.

## Commands

### CLI Commands
```bash
anveeksha install     # Install to Claude Code
anveeksha provision   # Scan project and provision workforce
anveeksha info        # Show available agents
anveeksha update      # Check for updates
```

### Slash Commands (in Claude Code)
```
/setup              # Initial configuration wizard
/default            # Configure project defaults
/provision          # Provision AI workforce
/plan <task>        # Start planning mode
/autopilot <task>   # Autonomous execution
/ultrawork <task>   # Maximum performance
```

## Programmatic Usage

```typescript
import { 
  createWorkforceSession,
  scanProject,
  assembleTeam 
} from '@anveeksha/workforce';

// Create orchestration session
const session = createWorkforceSession();

// Or provision based on project
const scan = scanProject('/path/to/project');
const team = assembleTeam(scan);

console.log(team.summary);
```

## Configuration

Brainless works out of the box, but you can customize via:
- `.claude/CLAUDE.md` - Project configuration
- `~/.claude/CLAUDE.md` - Global configuration

Run `/setup --local` or `/setup --global` to configure.

## Credits & Acknowledgments

This project is built upon and inspired by **[anveekshacode](https://github.com/anthropics/claude-code-plugins/tree/main/anveekshacode)** by **Yeochan Heo**.

We extend our gratitude for the excellent foundation that enabled us to push the boundaries further with:
- 🤖 **PM-managed autonomous team orchestration**
- 💬 **Inter-agent debate protocol** for cross-cutting concerns
- 📋 **Full activity transcripts** with decision logging
- 🎯 **Approval gates** between orchestration phases

## License

MIT License

---

<p align="center">
  <strong>© Brainless Technologies Pvt. Ltd.</strong><br>
  <em>Empowering developers with intelligent AI workforce</em><br><br>
  <sub>Built upon the foundation of anveekshacode by Yeochan Heo</sub>
</p>
