# Brainless - Brilliant AI Workforce Orchestration

**A Claude Code plugin for intelligent, self-assembling AI agent teams with memory and escalation protocols.**

---

## What is Brainless?

Brainless is a production-ready AI workforce orchestration plugin for [Claude Code](https://claude.ai/code) that dynamically assembles specialist agent teams, learns from experience, and resolves issues internally before escalating to users.

### Key Features

🤖 **Dynamic Team Assembly**
- AI analyzes your task and recommends specialist agents
- 29 named agents with unique personalities (Vikram, Elena, Maya, Alex...)
- Memory-informed selection based on past successful patterns

🧠 **Continuous Learning**
- Every task is captured in memory
- Future teams benefit from historical patterns
- Agents are instructed to consult project history

🚨 **Smart Escalation Protocol**
- 3-tier internal problem-solving before user involvement
- Routes issues to appropriate specialists (Design→Architect, Security→Architect, Scope→BA)
- Only escalates to users when truly necessary

✨ **Delightful UX**
- Witty runtime messages ("🚀 Summoning the cavalry")
- Clear team introductions with rationale
- Confidence scores and data source transparency

---

## Installation

### For Claude Code

1. Clone this repository:
```bash
git clone https://github.com/brainless-brilliant/brainless.git
cd brainless
```

2. Install dependencies:
```bash
npm install
```

3. Build the plugin:
```bash
npm run build
```

4. Link to Claude Code's plugins directory (follow Claude Code plugin installation guide)

---

## Usage

Once installed, Brainless works automatically when you use Claude Code:

```bash
# In Claude Code, just start working
"Build OAuth2 authentication with security audit"
```

**Output**:
```
🎯 Building your dream team (or at least a functional one)

👥 Team of 3 assembled:
   🏗️ **Vikram** (Principal Architect)
   🔒 **Elena** (Security Lead)
   ⚙️ **Alex** (Senior Engineer)

💡 Security audit + architecture design needed
📊 Confidence: 85% | Sources: haiku + memory

✨ Your team is ready! Coordinator will now orchestrate their work.
```

---

## Architecture

```
User Request
    ↓
AI Classifier (Haiku)
    ↓
Team Builder (AI + Memory + Fallback)
    ↓
Coordinator (PM)
    ↓
Specialist Agents Execute
    ↓
Work Captured → Memory
    ↓
Future Teams Learn
```

---

## The 29 Specialists

### Architecture & Design
- **Vikram** (Principal Architect) - Design decisions, refactoring
- **Priya** (Senior Architect) - Pragmatic analysis
- **Rohan** (Junior Architect) - Quick questions

### Security
- **Elena** (Security Lead) - Full security audits
- **Sam** (Security Analyst) - Quick scans

### Implementation
- **Jordan** (Staff Engineer) - Complex multi-file work
- **Alex** (Senior Engineer) - Standard implementation
- **Taylor** (Engineer) - Simple tasks

### Quality Assurance
- **Maya** (QA Lead) - Comprehensive testing
- **Oliver** (TDD Evangelist) - Test-driven development
- **Sophia** (Code Quality Lead) - Code reviews

### Build & Fix
- **Marcus** (Build Engineer) - TypeScript/build errors
- **Katie** (Build Intern) - Quick fixes

... and 17 more specialists across research, design, planning, and data analysis.

---

## Configuration

### Debug Mode

Enable detailed logging:

```bash
export BRAINLESS_DEBUG=true
```

This shows:
- Team assembly details
- Memory search results
- Escalation routing
- Internal agent communication

---

## Features in Detail

### 1. Runtime Team Assembly

Every task triggers intelligent team selection:
- **AI Analysis**: Haiku classifier recommends agents
- **Memory Search**: Finds similar past tasks
- **Capability Matching**: Safety net fallback

### 2. Agent Escalation

6 escalation types with smart routing:
- `question` → Coordinator (PM)
- `blocker` → Coordinator (PM)
- `design-decision` → Architect
- `security-concern` → Architect (escalates to user after 1 attempt)
- `scope-change` → Business Analyst
- `approval-needed` → User (immediate)

### 3. Memory Layer

Selective memory capture:
- ✅ Executor/specialist work
- ✅ Implementations, audits, fixes
- ❌ PM orchestration (excluded to reduce noise)

### 4. Agent Personalities

Each agent has:
- Human name
- Job title
- Personality trait
- Witty introduction

Example: **Elena** (Security Lead) - "Assuming everything is a SQL injection"

---

## Development

### Build from Source

```bash
git clone https://github.com/brainless-brilliant/brainless.git
cd brainless
npm install
npm run build
```

### Run Tests

```bash
npm test
```

**Test Suites**:
- Team builder integration
- Escalation protocol
- End-to-end orchestration
- Live coordinator
- Memory filtering

All tests passing ✅

---

## Credits & Inspiration

Brainless is built on the foundation of [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode) originally developed as `sisyphus`. We're deeply grateful for their pioneering work in agentic coding systems.

**What we added**:
- Dynamic team assembly with AI classification
- 29 named agent personas
- Escalation protocol with internal resolution
- Memory layer integration (inspired by [claude-mem](https://github.com/cyanheads/claude-mem))
- Continuous learning from task history

While the core architecture originated from oh-my-opencode, the abstractions we introduced (runtime teams, escalation, memory influence) represent a fundamental evolution of the orchestration model.

---

## Architecture Highlights

### Modular Prompt System
Agents receive contextual prompt modules based on task requirements:
- Core identity
- Delegation rules
- Security guidelines
- Memory access
- Testing guidance

### Haiku Classification Engine
- Fast, cheap task analysis
- Boolean capability flags
- Team recommendations
- Confidence scoring
- Caching layer for performance

### Team Builder
Three-stage selection:
1. Haiku recommendations (primary)
2. Memory insights (augmentation)
3. Capability fallback (safety net)

---

## License

MIT License - see [LICENSE](LICENSE) file

---

## Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

---

## Roadmap

- [x] Dynamic team assembly
- [x] Agent escalation protocol
- [x] Memory integration
- [x] Production PM integration
- [ ] Multi-project memory sharing
- [ ] Agent performance analytics
- [ ] Custom specialist creation
- [ ] Web UI for team visualization

---

**Built with ❤️**

*"Why settle for anything less than A+?"*

