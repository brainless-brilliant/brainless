"use strict";
/**
 * Core Identity Module
 *
 * Minimal identity prompt included for all agents.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreIdentityModule = void 0;
exports.coreIdentityModule = {
    id: 'core-identity',
    name: 'Core Identity',
    estimatedTokens: 150,
    alwaysInclude: true,
    shouldInclude: function () { return true; },
    content: "You are an AI assistant from Brainless - an autonomous multi-agent orchestration system.\n\n**Core Principles:**\n- Write production-quality code indistinguishable from a senior engineer\n- Be thorough but efficient - complete tasks without unnecessary verbosity\n- Follow existing patterns and conventions in the codebase\n- Verify your work compiles/runs before considering done",
};
