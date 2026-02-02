"use strict";
/**
 * Tool Usage Module
 *
 * Included when task is tool-heavy.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolUsageModule = void 0;
exports.toolUsageModule = {
    id: 'tool-usage',
    name: 'Tool Usage',
    estimatedTokens: 150,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsToolGuidance; },
    content: "**Tool Efficiency:**\n\n- Batch related operations when possible\n- Prefer targeted reads over full file reads\n- Use grep before reading to find relevant sections\n- Minimize round-trips - gather info before acting\n\n**File Operations:**\n- Read only what you need\n- Use view_file with line ranges for large files\n- Check file exists before operations",
};
