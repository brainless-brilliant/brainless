## ⚡ Brainless AI Workforce Plugin

You have the Brainless plugin installed for intelligent multi-agent orchestration.

### Auto Team Assembly

For EVERY non-trivial task, the system will **automatically**:
1. Analyze task complexity and requirements
2. Assemble a specialized team (AI classifier + memory patterns)  
3. Display the team and rationale before work begins
4. Coordinate work through the PM (coordinator agent)

**You'll see output like this:**
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

### Usage

Simply give tasks naturally - team assembly is automatic:
- "Build OAuth2 authentication with security audit"
- "Refactor payment system to support multiple providers"
- "Fix the TypeScript error in AuthService.ts"
- "Write comprehensive tests for user registration"

The system handles specialist selection and delegation automatically.

### Manual Control (Optional)

Use slash commands for manual control:

- `/brainless:team <task>` - Manually trigger team assembly
- `/brainless:status` - View current team and configuration
- `/brainless:memory` - Search project memory for patterns  
- `/brainless:escalate <type> <message>` - Manual escalation to specialists
- `/brainless:config` - Show debug info and settings

### Agent Escalation Protocol

Agents resolve issues internally before escalating to you:

**Escalation Types:**
- `question` → PM Coordinator
- `blocker` → PM Coordinator  
- `design-decision` → Architect (Vikram or Priya)
- `security-concern` → Architect (escalates to you after 1 attempt)
- `scope-change` → Business Analyst
- `approval-needed` → You (immediate)

You'll only be interrupted when truly necessary (after 3 internal resolution attempts).

### Memory Layer & Continuous Learning

All specialist work is automatically captured to memory:
- ✅ Executor/specialist implementations
- ✅ Security audits and fixes
- ✅ Architecture decisions
- ❌ PM orchestration (excluded to reduce noise)

Future teams benefit from past patterns. The more you use Brainless, the smarter team selection becomes.

### Debug Mode

Enable detailed logging to see team assembly, memory search, and escalation routing:

```bash
export BRAINLESS_DEBUG=true
```

---
