---
name: brainless-memory
description: Search project memory for patterns and learnings
args:
  - name: query
    description: Search query (optional, shows summary if omitted)
    required: false
---

# /brainless:memory - Memory Search

Search project memory for patterns, past solutions, and learnings.

## How Memory Works

Brainless maintains a project memory system that captures:
- **Successful task completions**: What worked and why
- **Team compositions**: Which agents collaborated effectively
- **Technical patterns**: Reusable solutions and approaches
- **Failure learnings**: What didn't work and lessons learned

Memory is stored in `~/.brainless/memory/` and automatically captures task outcomes.

## Usage

### With Query
Search for specific topics:
```
/brainless:memory "authentication"
/brainless:memory "database optimization"
/brainless:memory "error handling"
```

### Without Query
Shows general memory summary:
```
/brainless:memory
```

## Search Results

When you search with a query, you'll see:

### Relevant Entries
```
🧠 Memory Search: "authentication"

Found 3 relevant entries:

──────────────────────────────────────

📍 Entry #1 [2026-02-01 14:30]
Task: Build JWT authentication API
Team: Elena (security), Jordan (executor), Maya (QA)
Outcome: ✅ Success
Learning: Always validate token expiry on both client and server

──────────────────────────────────────

📍 Entry #2 [2026-01-28 09:15]
Task: Add OAuth integration
Team: Elena, Alex, Oliver
Outcome: ✅ Success
Learning: Use PKCE flow for public clients

──────────────────────────────────────
```

### Identified Patterns
```
🔍 Patterns Identified:
- Authentication tasks always include Elena (security lead)
- Complex integrations need both executor + QA pairing
- OAuth requires architecture review before implementation
```

### Suggested Approach
```
💡 Suggested Approach:
Based on successful past patterns:
1. Start with security review (Elena)
2. Implement with executor (Jordan/Alex)
3. Verify with QA (Maya/Oliver)
4. Add integration tests before merging
```

## Memory Capture

Memory is automatically captured when:
- Task completes successfully (with `TASK_COMPLETE` promise)
- Executor or specialist agents finish work
- PM marks orchestration phase complete

Capture filter: Executor/specialist work only (not exploratory tasks)

## Examples

```
/brainless:memory "API design"
→ Shows API-related learnings and patterns

/brainless:memory "performance optimization"
→ Shows optimization approaches that worked

/brainless:memory
→ Shows general stats and recent entries
```

---

**Tip**: Check memory before starting similar tasks to learn from past successes!
