/**
 * Search Guidance Module
 *
 * Included when task is a search/find operation.
 */

import type { PromptModule } from './types.js';

export const searchGuidanceModule: PromptModule = {
  id: 'search-guidance',
  name: 'Search Guidance',
  estimatedTokens: 120,
  alwaysInclude: false,
  shouldInclude: (caps) => caps.needsSearch,
  content: `**Search Strategy:**
- Use grep/ripgrep for text patterns
- Use find for file paths
- Check imports/exports for dependencies
- Return exact file paths and line numbers
- Be concise - list findings, don't over-explain`,
};
