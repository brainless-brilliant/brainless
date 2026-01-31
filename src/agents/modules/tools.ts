/**
 * Tool Usage Module
 *
 * Included when task is tool-heavy.
 */

import type { PromptModule } from './types.js';

export const toolUsageModule: PromptModule = {
  id: 'tool-usage',
  name: 'Tool Usage',
  estimatedTokens: 150,
  alwaysInclude: false,
  shouldInclude: (caps) => caps.needsToolGuidance,
  content: `**Tool Efficiency:**

- Batch related operations when possible
- Prefer targeted reads over full file reads
- Use grep before reading to find relevant sections
- Minimize round-trips - gather info before acting

**File Operations:**
- Read only what you need
- Use view_file with line ranges for large files
- Check file exists before operations`,
};
