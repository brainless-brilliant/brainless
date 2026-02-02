"use strict";
/**
 * Testing Guidance Module
 *
 * Included when task involves testing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingGuidanceModule = void 0;
exports.testingGuidanceModule = {
    id: 'testing-guidance',
    name: 'Testing Guidance',
    estimatedTokens: 200,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsTesting; },
    content: "**Testing Standards:**\n\n- Write tests that validate behavior, not implementation\n- Include edge cases and error conditions\n- Use descriptive test names: \"should [expected behavior] when [condition]\"\n- Keep tests independent and deterministic\n\n**Test Structure:**\n1. Arrange - Set up test data and dependencies\n2. Act - Execute the code under test\n3. Assert - Verify expected outcomes\n\n**Coverage:**\n- Happy path + error cases\n- Boundary conditions\n- Integration points",
};
