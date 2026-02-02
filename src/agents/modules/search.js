"use strict";
/**
 * Search Guidance Module
 *
 * Included when task is a search/find operation.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGuidanceModule = void 0;
exports.searchGuidanceModule = {
    id: 'search-guidance',
    name: 'Search Guidance',
    estimatedTokens: 120,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsSearch; },
    content: "**Search Strategy:**\n- Use grep/ripgrep for text patterns\n- Use find for file paths\n- Check imports/exports for dependencies\n- Return exact file paths and line numbers\n- Be concise - list findings, don't over-explain",
};
