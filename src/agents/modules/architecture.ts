/**
 * Architecture Guidance Module
 *
 * Included when task involves refactoring or design decisions.
 */

import type { PromptModule } from './types.js';

export const architectureGuidanceModule: PromptModule = {
  id: 'architecture-guidance',
  name: 'Architecture Guidance',
  estimatedTokens: 300,
  alwaysInclude: false,
  shouldInclude: (caps) => caps.needsArchitecture,
  content: `**Architecture Principles:**

Before making structural changes:
1. Understand the existing design and its rationale
2. Consider impact on dependent modules
3. Preserve backward compatibility when possible
4. Document breaking changes

**Refactoring Checklist:**
- [ ] Existing tests still pass
- [ ] No circular dependencies introduced
- [ ] Consistent with codebase patterns
- [ ] Types updated throughout

**Design Decisions:**
- Favor composition over inheritance
- Keep interfaces narrow and focused
- Make dependencies explicit`,
};
