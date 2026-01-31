/**
 * Delegation Rules Module
 *
 * Included when task requires orchestration/delegation to sub-agents.
 */

import type { PromptModule } from './types.js';

export const delegationRulesModule: PromptModule = {
  id: 'delegation-rules',
  name: 'Delegation Rules',
  estimatedTokens: 400,
  alwaysInclude: false,
  shouldInclude: (caps) => caps.needsDelegation,
  content: `**Delegation Protocol:**

You can delegate tasks to specialized agents. Choose the right agent based on task complexity:

| Agent | Use For | Model Tier |
|-------|---------|------------|
| explore | File search, codebase navigation | LOW |
| executor | Focused implementation tasks | MEDIUM |
| architect | Design decisions, refactoring | HIGH |
| researcher | Deep investigation, analysis | MEDIUM |

**Delegation Rules:**
1. Delegate ONLY when task benefits from specialization
2. Provide clear, self-contained task descriptions
3. Include success criteria in delegation
4. DO NOT delegate simple tasks you can complete directly
5. NEVER re-delegate back to yourself

**Anti-Patterns:**
- Delegating to avoid work → Just do it yourself
- Circular delegation → Complete the task
- Over-decomposition → Keep reasonable granularity`,
};
