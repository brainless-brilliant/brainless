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

### Quick Install (Recommended)

In Claude Code, use the `/plugin` command:

```
/plugin add https://github.com/brainless-brilliant/brainless
```

That's it! The plugin will be installed and activated automatically.

**First-time setup:**
- If you have an existing `CLAUDE.md`, the installer will prompt you to:
  - **Override**: Use Brainless defaults (your file is backed up)
  - **Merge**: AI-powered merge that preserves your custom instructions
  - **Skip**: Manual merge later

### Verify Installation

After installation, give Claude any task:

```
"Build a REST API with authentication"
```

You should see the team assembly display before work begins:
```
🎯 Building your dream team...
👥 Team of 3 assembled...
```

### Manual Installation (Alternative)

If you prefer manual installation:

1. Clone the repository:
```bash
git clone https://github.com/brainless-brilliant/brainless.git
```

2. Build the plugin:
```bash
cd brainless
npm install
npm run build
```

3. Install in Claude Code:
```
/plugin install /path/to/brainless
```

> **For contributors**: See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup

---

## Getting Started: Optimal Usage

### First-Time Setup (Recommended Workflow)

After installation, follow this workflow for best results:

#### 1. Initialize Configuration
```
/brainless:init
```

**What it does:**
- Merges plugin instructions into your CLAUDE.md
- Preserves your existing custom rules (if any)
- AI-powered merge (Sonnet <10KB, Opus >10KB)
- Creates automatic backup

**Choose merge option:**
- **Merge**: Preserves your SOPs + adds Brainless features ✅ Recommended
- **Override**: Fresh start with Brainless defaults
- **Skip**: Manual merge later

---

#### 2. Verify Installation
```
/brainless:config
```

**Check for:**
- ✅ Plugin loaded correctly
- ✅ Haiku classifier status (online/fallback)
- ✅ Memory layer accessible
- ✅ All 29 specialists registered

---

#### 3. Enable Debug Mode (Learning Phase)
```bash
export BRAINLESS_DEBUG=true
```

**See under the hood:**
- Team assembly reasoning
- Memory search results
- Escalation routing
- Confidence scores

**Tip:** Run debug mode for your first 5-10 tasks to understand how the system works.

---

#### 4. Test with Simple Task
```
"Build a simple REST API endpoint for user registration"
```

**What you'll see:**
```
🎯 Building your dream team...

👥 Team of 2 assembled:
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"
   🧪 **Maya** (QA Lead): "Testing in prod is a lifestyle"

💡 Rationale: Implementation + testing needed
📊 Confidence: 78% | Sources: haiku

✨ Your team is ready! Coordinator will orchestrate their work.
```

---

### Optimal Workflows for Common Scenarios

#### Scenario 1: Complex Feature Implementation

**Task:** "Add OAuth2 authentication with Google, GitHub, and Microsoft providers"

**Best Practice:**
1. **Let team assembly run automatically** (no manual commands needed)
2. **Review the team** - Expect Vikram (architect), Elena (security), Alex (engineer)
3. **Trust the specialists** - They'll escalate internally if blocked
4. **Check memory afterwards** - Search for similar auth patterns

**What happens:**
- Haiku classifies: Architecture + Security + Implementation
- Memory searches: Past OAuth/auth tasks
- Team assembled: 3-4 specialists
- Coordinator delegates in logical order
- Security audit runs automatically (Elena always audits auth)

**Post-task:**
```bash
/brainless:memory "authentication"
```
See what patterns were captured for future reference.

---

#### Scenario 2: Quick Bug Fix

**Task:** "Fix the TypeScript error in src/components/Header.tsx"

**Best Practice:**
1. **Let it run** - System detects simple task
2. **Solo assignment expected** - Katie (Build Intern) or Taylor (Engineer)
3. **Fast execution** - No team overhead

**What happens:**
- Haiku classifies: Low complexity, build error
- Memory: None needed for simple fixes
- Solo agent: Katie or Taylor
- Quick fix + verification
- Done in minutes

**Why it's optimal:**
- No unnecessary team assembly
- Right-sized for the task
- Token-efficient

---

#### Scenario 3: Security-Critical Work

**Task:** "Add JWT token refresh mechanism with secure storage"

**Best Practice:**
1. **Expect Elena on the team** - Security always includes Elena/Sam
2. **Post-implementation audit** - Elena will review before completion
3. **Internal escalation likely** - Security concerns go to Vikram first
4. **You'll only be interrupted if critical** - Escalation protocol handles most issues

**What happens:**
- Haiku detects: Security-critical auth work
- Memory finds: Past JWT/security tasks
- Team: Elena (security), Vikram (architect), Alex (engineer)
- Implementation by Alex
- Security audit by Elena
- If issues found → escalates to Vikram (internal)
- Only escalates to you if unresolvable after 3 attempts

**Optimal approach:**
- **Trust the protocol** - Don't micromanage
- **Review team rationale** - Understand why Elena is included
- **Check escalations** - If you get one, it's genuinely needed

---

#### Scenario 4: Architecture Refactoring

**Task:** "Refactor the entire authentication system to use a plugin architecture"

**Best Practice:**
1. **Search memory first** (optional but helpful):
   ```
   /brainless:memory "refactoring architecture"
   ```
2. **Let team assembly run** - Expect 4-5 specialists
3. **Expect planning escalation** - Vikram may ask design questions
4. **Use manual team review** (optional):
   ```
   /brainless:team "Refactor auth to plugin architecture"
   ```
   Review team before delegating

**What happens:**
- Memory search: Past large refactors (if you ran manual search)
- Haiku classifies: High complexity, architecture + refactoring
- Team: Vikram (lead architect), Jordan (staff engineer), Maya (QA), Olivia (docs)
- Planning phase: Vikram may escalate design decisions
- Implementation: Jordan breaks down into phases
- Testing: Maya ensures nothing breaks
- Documentation: Olivia updates arch docs

**Why manual team review helps:**
- Large refactors are risky
- See the plan before delegating
- Confirm team composition
- Set expectations

---

#### Scenario 5: Research & Exploration

**Task:** "Research the best approach for implementing real-time collaboration"

**Best Practice:**
1. **Let system handle** - Research agents auto-selected
2. **Expect research team** - Aria (Researcher), Lucas (Senior Researcher)
3. **Longer execution time** - Research takes time
4. **Review memory after** - Captures research findings

**What happens:**
- Haiku classifies: Research task
- Team: Aria or Lucas (research specialists)
- Exploration of:
  - WebSockets vs Server-Sent Events
  - CRDT libraries (Yjs, Automerge)
  - Scalability considerations
- Summary with recommendations

**Optimal:**
- **Don't rush** - Research needs time
- **Ask follow-ups** - "Compare Yjs vs Automerge in detail"
- **Memory captures findings** - Reusable for future features

---

### Advanced Usage: Power User Tips

#### Tip 1: Initialize on New Projects
```
cd new-project
/brainless:init --force
```

Fresh Brainless setup without prompts. Clean slate for new work.

---

#### Tip 2: Re-Merge After Plugin Updates
```
git pull  # Update Brainless plugin
/brainless:init  # Choose "merge"
```

Preserves your custom CLAUDE.md rules while adding new plugin features.

---

#### Tip 3: Manual Team Assembly for Critical Work
```
/brainless:team "Migrate database from MongoDB to PostgreSQL"
```

**When to use:**
- High-risk changes (DB migrations, auth refactors)
- Learning how team selection works
- Reviewing team before committing to delegation

**You'll see:**
- Proposed team with rationale
- Confidence score
- Data sources (haiku, memory, fallback)

**Then decide:**
- Proceed with this team
- Request different specialists
- Adjust task description

---

#### Tip 4: Search Patterns Before Starting
```
/brainless:memory "database migration"
```

**See:**
- Past migration tasks
- What teams worked
- Success/failure patterns
- Key learnings ("Always backup before migration!")

**Then start:**
```
"Migrate from MongoDB to PostgreSQL"
```

Team selection benefits from the memory context.

---

#### Tip 5: Check System Status Anytime
```
/brainless:status
```

**Useful when:**
- Wondering if plugin is working
- Checking which team is active
- Debugging team selection
- Verifying memory/classifier status

---

#### Tip 6: Manual Escalation for Design Questions
```
/brainless:escalate design-decision "Should we use microservices or monolith for this project?"
```

**Routes to:** Vikram (Principal Architect)

**When to use:**
- Pre-implementation architecture questions
- Trade-off decisions
- Don't want to start full implementation yet

**Faster than:**
- Starting implementation to get design advice
- Waiting for internal escalation

---

#### Tip 7: Enable Debug for Complex Tasks
```bash
export BRAINLESS_DEBUG=true
"Implement real-time collaborative editing"
export BRAINLESS_DEBUG=false
```

**See:**
- Why system chose this team
- What memory patterns influenced decision
- Confidence breakdown
- Internal escalations (if any)

**Learn:**
- How patterns emerge
- When fallback mode activates
- How memory improves over time

---

### Best Practices Summary

#### ✅ DO:
- **Let team assembly run automatically** for most tasks
- **Trust the system** - It learns from every task
- **Enable debug mode** when learning
- **Search memory** before large refactors
- **Use manual team review** for high-risk changes
- **Re-init after plugin updates** to get new features
- **Check status** if something seems wrong

#### ❌ DON'T:
- **Micromanage** - Let escalation protocol work
- **Override teams unnecessarily** - System learns patterns
- **Skip init** - You'll miss plugin features
- **Ignore team rationale** - It explains "why"
- **Disable memory** - Learning requires history
- **Rush research tasks** - They need time

---

## Usage

### How It Works

Once installed, Brainless enhances your Claude Code experience by:
1. **Analyzing** every task you give to Claude
2. **Assembling** a specialized team of AI agents
3. **Displaying** the team and rationale before work begins
4. **Orchestrating** work through the coordinator (PM)
5. **Learning** from every task to improve future recommendations

### Basic Workflow

```bash
# In Claude Code, give any task
"Build OAuth2 authentication with security audit"
```

### What to Expect

#### 1. Team Assembly Display

```
🎯 Building your dream team (or at least a functional one)

🔮 Memory lane has some useful detours
👥 Team of 3 assembled:
   🏗️ **Vikram** (Principal Architect): "CAP theorem in my sleep"
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"

💡 Rationale: Security audit + architecture design needed
📊 Confidence: 85% | Sources: haiku + memory

✨ Your team is ready! Coordinator will now orchestrate their work.
```

#### 2. Coordinator Takes Over

The PM (coordinator) will:
- Read the task requirements
- Delegate to the assembled specialists
- Verify each step
- Ensure all work is complete

#### 3. Specialists Execute

Each agent works in their domain:
- **Vikram** designs the OAuth2 architecture
- **Elena** audits for security vulnerabilities
- **Alex** implements the authentication flow

#### 4. Memory Capture

All work is saved to memory, informing future team selections.

---

## Examples

### Example 1: Complex Architecture Task

**Your Request:**
```
"Refactor the payment processing system to support multiple payment providers"
```

**Team Assembled:**
```
👥 Team of 4 assembled:
   🏗️ **Vikram** (Principal Architect): Design the provider abstraction
   💰 **Jordan** (Staff Engineer): Handle complex multi-file refactoring
   🧪 **Maya** (QA Lead): Ensure no payment bugs slip through
   📝 **Olivia** (Documentation Writer): Update integration docs

💡 Multi-provider architecture + critical payment path
📊 Confidence: 92% | Sources: haiku + memory
```

**Why This Team:**
- Vikram for abstraction layer design
- Jordan for heavy refactoring work
- Maya because payment bugs are expensive
- Olivia to keep docs in sync

---

### Example 2: Quick Bug Fix

**Your Request:**
```
"Fix the TypeScript error in AuthService.ts"
```

**Team Assembled:**
```
👤 Solo mission assigned to:
   ⚙️ **Katie** (Build Intern): "Googling TypeScript errors since 2024"

💡 Quick type fix, no need for the cavalry
📊 Confidence: 75% | Sources: fallback
```

**Why Solo:**
- Simple task doesn't need multiple specialists
- Katie handles quick fixes efficiently

---

### Example 3: Security-Critical Work

**Your Request:**
```
"Add user authentication with JWT tokens"
```

**Team Assembled:**
```
👥 Team of 3 assembled:
   🔒 **Elena** (Security Lead): "Assuming everything is a SQL injection"
   🏗️ **Priya** (Senior Architect): "Pragmatism over perfection"
   ⚙️ **Alex** (Senior Engineer): "Ship it or skip it"

💡 Authentication = security critical, needs Elena's paranoia
📊 Confidence: 88% | Sources: haiku + memory

⚠️ Security work detected - Elena will audit before completion
```

**Special Notes:**
- Security tasks automatically include Elena or Sam
- Post-implementation security audit is mandatory
- If issues found, escalates internally before proceeding

---

### Example 4: Testing & Quality

**Your Request:**
```
"Write comprehensive tests for the user registration flow"
```

**Team Assembled:**
```
👥 Team of 2 assembled:
   🧪 **Maya** (QA Lead): "Testing in prod is a lifestyle"
   🎯 **Oliver** (TDD Evangelist): "Red, green, refactor, repeat"

💡 Test-first approach with comprehensive coverage
📊 Confidence: 90% | Sources: haiku + memory
```

**What Happens:**
- Oliver sets up test structure (TDD style)
- Maya ensures edge cases are covered
- Both verify tests actually catch bugs

---

## Understanding Team Selection

### Three-Stage Selection Process

**Stage 1: Haiku AI (Primary)**
- Analyzes task complexity, domain, and requirements
- Recommends 1-3 specialists
- Provides rationale for each selection

**Stage 2: Memory Augmentation**
- Searches for similar past tasks
- Identifies patterns (e.g., "Angular builds often need Marcus")
- Adjusts confidence based on historical success

**Stage 3: Capability Fallback**
- If Haiku unavailable (no API key), uses keyword matching
- Boolean flags: needsArchitecture, needsSecurity, needsTesting
- Ensures work never blocks on external dependencies

### Confidence Levels

- **90-100%**: High confidence, AI + memory aligned
- **70-89%**: Good confidence, clear task requirements
- **50-69%**: Moderate confidence, fallback mode or ambiguous task
- **Below 50%**: Low confidence, may need user clarification

---

## Agent Escalation in Action

### Internal Resolution Example

```
Scenario: Alex (executor) encounters a design decision

1. Alex escalates to PM Coordinator:
   "Should we use REST or GraphQL for this API?"

2. PM routes to Vikram (architect):
   Type: design-decision → architect

3. Vikram responds with recommendation:
   "Use REST for simplicity, GraphQL is overkill here"

4. Alex continues with REST implementation

Result: Resolved internally, user never interrupted
```

### User Escalation Example

```
Scenario: Security concern found

1. Elena (security) finds critical issue:
   "Unvalidated user input in admin panel"

2. Escalates to Vikram (architect) per protocol

3. Vikram confirms severity

4. After 1 unresolved internal attempt, escalates to user:

   ⚠️ SECURITY CONCERN
   From: security-reviewer (Elena)
   
   Found: Unvalidated user input in admin panel
   Risk: SQL injection, privilege escalation
   
   Internal Discussion:
   - architect (Vikram): "Critical, needs immediate fix"
   
   We need your input to proceed:
   A) Fix now and delay feature
   B) Add to security backlog
   C) Implement input sanitization

Result: User makes the call on security vs. deadline tradeoff
```

---

## Tips for Best Results

### 1. Be Specific in Requests

**❌ Vague:**
```
"Fix the app"
```

**✅ Specific:**
```
"Fix the authentication timeout issue in production where users are logged out after 5 minutes instead of the configured 30 minutes"
```

### 2. Trust the Team Selection

The AI has analyzed thousands of patterns. If it recommends Elena for a seemingly simple task, there's probably a security implication you missed.

### 3. Let Agents Escalate

Don't micromanage. If agents hit a blocker, they'll escalate internally first, reaching you only when necessary.

### 4. Review Team Rationale

The "💡 Rationale" line tells you *why* each specialist was chosen. This builds trust in the system.

### 5. Enable Debug Mode for Learning

```bash
export BRAINLESS_DEBUG=true
```

Watch team assembly, memory search, and escalation routing to understand the system's decision-making.

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

## Manual Control (Optional)

Brainless works automatically, but you can use slash commands for manual control:

### Available Commands

#### `/brainless:team <task>`
Manually trigger team assembly for a specific task.

**Example:**
```
/brainless:team "Refactor authentication system"
```

Displays the proposed team and waits for your confirmation before delegating.

---

#### `/brainless:status`
View current team, configuration, and system status.

**Shows:**
- Active team members
- Configuration status (debug mode, memory, classifier)
- Recent activity
- Available specialists (29 agents)

---

#### `/brainless:memory [query]`
Search project memory for patterns and past solutions.

**Examples:**
```
/brainless:memory "authentication"  # Search for auth-related tasks
/brainless:memory                    # Show full memory summary
```

**Displays:**
- Relevant past tasks
- Teams that worked on similar problems
- Success patterns
- Key learnings

---

#### `/brainless:escalate <type> <message>`
Manually escalate an issue to a specialist.

**Escalation types:**
- `question` - General question → PM
- `blocker` - Work blocker → PM
- `design-decision` - Architecture → Architect
- `security-concern` - Security → Architect
- `scope-change` - Scope → Business Analyst
- `approval-needed` - Direct user approval

**Example:**
```
/brainless:escalate design-decision "Should we use REST or GraphQL?"
```

---

#### `/brainless:config`
Show comprehensive configuration and debug information.

**Displays:**
- Plugin version and environment
- Haiku classifier status
- Memory configuration
- Agent registry (all 29 specialists)
- Feature flags
- Diagnostic checks

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

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development setup
- Code style guidelines
- Testing procedures
- Pull request process
- Code of conduct

---

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

