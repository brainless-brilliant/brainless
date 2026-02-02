/**
 * Memory Access Module
 *
 * Instructs agents to consult project memory/history when working.
 */

import type { PromptModule } from './types.js';

export const memoryAccessModule: PromptModule = {
  id: 'memory-access',
  name: 'Memory & History Access',
  estimatedTokens: 250,
  alwaysInclude: true,  // All agents should know about memory
  shouldInclude: () => true,
  content: `**Project Memory & History:**

The system maintains a memory layer with:
- **Past Observations**: What worked/failed in previous tasks
- **Transcripts**: Complete history of all work done in this project  
- **Patterns**: Common solutions, pitfalls, and best practices

**When to Consult Memory:**
1. **Before starting** - Check if similar work was done before
2. **When stuck** - See how past agents solved similar problems
3. **On errors** - Check if this error was encountered before
4. **For context** - Understand project history and decisions

**How to Access:**
- Memory is queried automatically during team assembly
- Your team was selected based on past successful patterns
- If you need specific history, ask the PM or escalate

**What Memory Captures:**
✅ All executor/specialist agent work (your work will be remembered!)
✅ Build fixes, refactorings, implementations
✅ Security audits, code reviews, test creation
❌ PM orchestration (not captured - would clutter memory)

**Key Insight**: Every task you complete teaches the system. Future teams benefit from your work.`,
};
