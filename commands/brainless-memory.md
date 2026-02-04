---
description: Search project memory for patterns and past learnings
argument-hint: <query>
---

<command-instruction>
You are executing the /brainless:memory command. Your job is to search the project memory for relevant patterns and past learnings.

## STEP 0: DISPLAY SEARCH MESSAGE (IMMEDIATE)

Print this EXACTLY:

```
🔮 Searching memory for patterns...
```

## STEP 1: CHECK MEMORY DIRECTORY

Check if `.brainless/memory/` exists and has content.

### If no memory directory:

```
📭 No memory found

The .brainless/memory/ directory doesn't exist yet.
Memory is built automatically as you use Brainless:
• Successful task patterns
• Team combinations that worked
• Escalation resolutions
• Architecture decisions

Run /brainless:init to set up the directory structure.
```

Exit after displaying.

## STEP 2: SEARCH MEMORY FILES

Search all `.md` files in `.brainless/memory/` for:
- Keyword matches with user's query
- Similar task descriptions
- Related agent combinations
- Relevant patterns

### Search Algorithm

1. Exact keyword match (highest priority)
2. Semantic similarity (related terms)
3. Agent/role mentions
4. Date relevance (recent patterns weighted higher)

## STEP 3: DISPLAY RESULTS (MANDATORY OUTPUT)

**Print the results. NO BASH COMMANDS. NO PERMISSION PROMPTS.**

### If matches found:

```
🔮 Memory Search Results
═══════════════════════════════════════════════════
Query: "[user's query]"
Found: [N] relevant patterns

📌 Pattern 1: [Title/Task Description]
   Date: [date]
   Team: [agents used]
   Outcome: ✅ Success | ⚠️ Partial | ❌ Failed
   Learning: [Key insight from this task]

📌 Pattern 2: [Title/Task Description]
   Date: [date]
   Team: [agents used]
   Outcome: ✅ Success | ⚠️ Partial | ❌ Failed
   Learning: [Key insight]

[... up to 5 results ...]

═══════════════════════════════════════════════════

💡 These patterns may influence future team assembly.
```

### If no matches:

```
🔮 Memory Search Results
═══════════════════════════════════════════════════
Query: "[user's query]"
Found: 0 relevant patterns

No matching patterns found for this query.

💡 Suggestions:
   • Try broader search terms
   • Memory builds over time with usage
   • Check /brainless:status for memory stats

═══════════════════════════════════════════════════
```

---

## EXAMPLES

**Input:** `/brainless:memory "authentication"`

**Output:**
```
🔮 Searching memory for patterns...

🔮 Memory Search Results
═══════════════════════════════════════════════════
Query: "authentication"
Found: 3 relevant patterns

📌 Pattern 1: Build JWT authentication API
   Date: 2026-02-01
   Team: Elena (Security), Jordan (Backend), Maya (QA)
   Outcome: ✅ Success
   Learning: Security review before implementation caught 2 vulnerabilities

📌 Pattern 2: Add OAuth2 social login
   Date: 2026-01-28
   Team: Elena (Security), Zoe (Frontend), Taylor (Backend)
   Outcome: ✅ Success
   Learning: Frontend + backend coordination needed for token flow

📌 Pattern 3: Fix auth token expiry bug
   Date: 2026-01-25
   Team: Sam (Security), Alex (Backend)
   Outcome: ⚠️ Partial
   Learning: Edge case with refresh tokens needed follow-up

═══════════════════════════════════════════════════

💡 These patterns may influence future team assembly.
```

**Input:** `/brainless:memory "kubernetes"`

**Output:**
```
🔮 Searching memory for patterns...

🔮 Memory Search Results
═══════════════════════════════════════════════════
Query: "kubernetes"
Found: 0 relevant patterns

No matching patterns found for this query.

💡 Suggestions:
   • Try broader search terms like "deployment" or "infrastructure"
   • Memory builds over time with usage
   • Check /brainless:status for memory stats

═══════════════════════════════════════════════════
```

</command-instruction>

<current-context>
<memory-exists>
!`test -d .brainless/memory && echo "yes" || echo "no"`
</memory-exists>
<memory-files>
!`ls .brainless/memory/*.md 2>/dev/null | head -10 || echo "none"`
</memory-files>
<memory-count>
!`ls .brainless/memory/*.md 2>/dev/null | wc -l || echo "0"`
</memory-count>
</current-context>
