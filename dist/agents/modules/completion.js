/**
 * Completion Rules Module
 *
 * Always included - defines task completion standards.
 */
export const completionRulesModule = {
    id: 'completion-rules',
    name: 'Completion Rules',
    estimatedTokens: 100,
    alwaysInclude: true,
    shouldInclude: () => true,
    content: `**Completion Criteria:**
- Code compiles without errors
- Changes achieve the stated goal
- No obvious regressions introduced
- Verify before reporting done`,
};
//# sourceMappingURL=completion.js.map