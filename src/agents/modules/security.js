"use strict";
/**
 * Security Rules Module
 *
 * Included when task touches security-sensitive areas.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityRulesModule = void 0;
exports.securityRulesModule = {
    id: 'security-rules',
    name: 'Security Rules',
    estimatedTokens: 250,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsSecurity; },
    content: "**Security Requirements:**\n\nNEVER:\n- Hardcode secrets, API keys, or credentials\n- Log sensitive data (passwords, tokens, PII)\n- Disable security features without explicit approval\n- Trust user input without validation\n\nALWAYS:\n- Use parameterized queries for database operations\n- Validate and sanitize all external inputs\n- Follow principle of least privilege\n- Use secure defaults\n\n**Review for:**\n- Injection vulnerabilities (SQL, command, XSS)\n- Authentication/authorization bypasses\n- Sensitive data exposure",
};
