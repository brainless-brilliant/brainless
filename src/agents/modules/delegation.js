"use strict";
/**
 * Delegation Rules Module
 *
 * Included when task requires orchestration/delegation to sub-agents.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.delegationRulesModule = void 0;
exports.delegationRulesModule = {
    id: 'delegation-rules',
    name: 'Delegation Rules',
    estimatedTokens: 400,
    alwaysInclude: false,
    shouldInclude: function (caps) { return caps.needsDelegation; },
    content: "**Delegation Protocol:**\n\nYou can delegate tasks to specialized agents. Choose the right agent based on task complexity:\n\n| Agent | Use For | Model Tier |\n|-------|---------|------------|\n| explore | File search, codebase navigation | LOW |\n| executor | Focused implementation tasks | MEDIUM |\n| architect | Design decisions, refactoring | HIGH |\n| researcher | Deep investigation, analysis | MEDIUM |\n\n**Delegation Rules:**\n1. Delegate ONLY when task benefits from specialization\n2. Provide clear, self-contained task descriptions\n3. Include success criteria in delegation\n4. DO NOT delegate simple tasks you can complete directly\n5. NEVER re-delegate back to yourself\n\n**Anti-Patterns:**\n- Delegating to avoid work \u2192 Just do it yourself\n- Circular delegation \u2192 Complete the task\n- Over-decomposition \u2192 Keep reasonable granularity",
};
