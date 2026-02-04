/**
 * Security Rules Module
 *
 * Included when task touches security-sensitive areas.
 */
export const securityRulesModule = {
    id: 'security-rules',
    name: 'Security Rules',
    estimatedTokens: 250,
    alwaysInclude: false,
    shouldInclude: (caps) => caps.needsSecurity,
    content: `**Security Requirements:**

NEVER:
- Hardcode secrets, API keys, or credentials
- Log sensitive data (passwords, tokens, PII)
- Disable security features without explicit approval
- Trust user input without validation

ALWAYS:
- Use parameterized queries for database operations
- Validate and sanitize all external inputs
- Follow principle of least privilege
- Use secure defaults

**Review for:**
- Injection vulnerabilities (SQL, command, XSS)
- Authentication/authorization bypasses
- Sensitive data exposure`,
};
//# sourceMappingURL=security.js.map