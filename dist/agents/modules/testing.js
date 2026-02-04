/**
 * Testing Guidance Module
 *
 * Included when task involves testing.
 */
export const testingGuidanceModule = {
    id: 'testing-guidance',
    name: 'Testing Guidance',
    estimatedTokens: 200,
    alwaysInclude: false,
    shouldInclude: (caps) => caps.needsTesting,
    content: `**Testing Standards:**

- Write tests that validate behavior, not implementation
- Include edge cases and error conditions
- Use descriptive test names: "should [expected behavior] when [condition]"
- Keep tests independent and deterministic

**Test Structure:**
1. Arrange - Set up test data and dependencies
2. Act - Execute the code under test
3. Assert - Verify expected outcomes

**Coverage:**
- Happy path + error cases
- Boundary conditions
- Integration points`,
};
//# sourceMappingURL=testing.js.map