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

**Search Query**: {{query}}

## Your Instructions

1. **Import Memory Module**:
   ```typescript
   const { searchMemory } = await import('${CLAUDE_PLUGIN_ROOT}/dist/features/memory/index.js');
   ```

2. **Search Memory**:
   ```typescript
   const results = await searchMemory("{{query}}", {
     limit: 10,
     minRelevance: 0.5
   });
   ```

3. **Display Results**:
   ```
   🔍 Memory Search Results for "{{query}}"
   
   Found <N> relevant entries:
   
   1. <Task description>
      📅 <timestamp>
      👥 Team: <agents used>
      ✅ Outcome: <success/failure>
      💡 Key insight: <what was learned>
   
   2. ...
   ```

4. **Show Patterns**:
   ```
   📊 Patterns Detected:
   - Angular builds often need Marcus (Build Engineer)
   - Security audits always include Elena
   - Complex refactoring prefers Jordan + Maya combo
   ```

5. **Suggest Actions** (if relevant):
   ```
   💡 Suggestions:
   - Similar task succeeded with [Team X]
   - Watch out for: <common pitfall from history>
   - Recommended approach: <what worked before>
   ```

## Example Output (With Query)

```
🔍 Memory Search Results for "authentication"

Found 5 relevant entries:

1. OAuth2 authentication implementation
   📅 2 days ago
   👥 Team: Vikram, Elena, Alex
   ✅ Success
   💡 JWT validation required extra security layer

2. Session management refactor
   📅 1 week ago
   👥 Team: Priya, Sam, Jordan
   ✅ Success
   💡 Redis better than in-memory for production

3. Password reset flow
   📅 2 weeks ago
   👥 Team: Elena, Taylor
   ✅ Success with minor issues
   💡 Rate limiting essential for security

📊 Patterns Detected:
- Authentication always includes Elena (Security Lead)
- Complex auth needs Vikram for architecture
- Testing requires Maya for edge cases

💡 Suggestions:
- Consider the JWT validation approach from Entry #1
- Don't forget rate limiting (learned from Entry #3)
```

## Example Output (No Query - Full Summary)

```
🧠 Project Memory Summary

📊 Total entries: 47 tasks
📅 Date range: Last 30 days
✅ Success rate: 91% (43/47)

🔥 Most Active Specialists:
1. Alex (Senior Engineer) - 23 tasks
2. Elena (Security Lead) - 18 tasks
3. Vikram (Principal Architect) - 15 tasks

📈 Top Patterns:
- "Security audit" → Always includes Elena
- "Refactoring" → Prefers Jordan + Maya combo
- "TypeScript errors" → Katie handles 80% solo

🎯 Recent Learnings:
- API rate limiting is critical (learned 3 days ago)
- Redis outperforms in-memory cache (learned 1 week ago)
- JWT needs refresh token rotation (learned 2 weeks ago)

💡 Tip: Use /brainless:memory "specific query" to search
```

## Notes

- Query is optional - shows summary if omitted
- Searches all captured task history
- Helps inform future team selection
- Reveals project-specific patterns
