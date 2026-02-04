---
name: brainless-memory
description: Search project memory for patterns and past task solutions
args:
  - name: query
    description: Search query for memory patterns
    required: false
---

# Brainless Memory Search

Search the project memory layer for patterns, solutions, and past task history.

## Task

**DISPLAY IMMEDIATELY - NO BASH WRAPPERS**

Search project memory for patterns and past solutions.

## Query

{{query}}

## Execution

**If query provided:**

1. Search memory for relevant entries
2. Display results in this format:

```
🧠 Memory Search: "{{query}}"

Found [X] relevant entries:

──────────────────────────────────────

📍 Entry #1 [timestamp]
Task: [task description]
Team: [agents involved]
Outcome: [✅ Success | ⚠️ Partial | ❌ Failed]
Learning: [key takeaway]

──────────────────────────────────────

📍 Entry #2 [timestamp]
Task: [task description]
Team: [agents involved]
Outcome: [result]
Learning: [key takeaway]

──────────────────────────────────────

🔍 Patterns Identified:
- [Pattern 1, e.g., "Authentication tasks always include Elena"]
- [Pattern 2, e.g., "Complex refactors need Jordan + Maya"]

💡 Suggested Approach:
[Based on successful past patterns]
```

**If no query (general summary):**

Display overview:

```
🧠 Project Memory Summary

Total entries: [count]
Success rate: [X]%
Most active specialists: [Top 3]

📊 Task Categories:
- Implementation: [count]
- Bug fixes: [count]
- Architecture: [count]
- Security audits: [count]

🏆 Top Patterns:
1. [Most common pattern]
2. [Second most common]
3. [Third most common]

💡 Key Learnings:
- [Top learning 1]
- [Top learning 2]
- [Top learning 3]

Use /brainless:memory "search term" to find specific patterns
```

**Important:**
- Display formatted text directly
- Do NOT use `Bash(cat << 'EOF' ...)`
- Query actual memory system where available
- Use placeholders [like this] for dynamic data
- Reveals project-specific patterns
