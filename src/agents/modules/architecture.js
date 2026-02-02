"use strict";
/**
 * Architecture Guidance Module
 *
 * Included when task involves refactoring or design decisions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.architectureGuidanceModule = void 0;
exports.architectureGuidanceModule = {
    id: 'architecture-guidance',
    name: 'Architecture Guidance',
    estimatedTokens: 300,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsArchitecture; },
    content: "**Architecture Principles:**\n\nBefore making structural changes:\n1. Understand the existing design and its rationale\n2. Consider impact on dependent modules\n3. Preserve backward compatibility when possible\n4. Document breaking changes\n\n**Refactoring Checklist:**\n- [ ] Existing tests still pass\n- [ ] No circular dependencies introduced\n- [ ] Consistent with codebase patterns\n- [ ] Types updated throughout\n\n**Design Decisions:**\n- Favor composition over inheritance\n- Keep interfaces narrow and focused\n- Make dependencies explicit",
};
