"use strict";
/**
 * Completion Rules Module
 *
 * Always included - defines task completion standards.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.completionRulesModule = void 0;
exports.completionRulesModule = {
    id: 'completion-rules',
    name: 'Completion Rules',
    estimatedTokens: 100,
    alwaysInclude: true,
    shouldInclude: function () { return true; },
    content: "**Completion Criteria:**\n- Code compiles without errors\n- Changes achieve the stated goal\n- No obvious regressions introduced\n- Verify before reporting done",
};
