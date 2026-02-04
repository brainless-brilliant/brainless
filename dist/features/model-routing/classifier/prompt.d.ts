/**
 * Haiku Classification Prompt
 *
 * Production-grade prompt optimized for accurate task classification.
 * Designed for Claude Haiku's capabilities with clear structure and examples.
 */
/**
 * System prompt for classification
 */
export declare const CLASSIFICATION_SYSTEM_PROMPT = "You are a task classifier and team builder for an AI coding assistant. Your job is to analyze a task and determine:\n1. What capabilities are needed\n2. Which specialized agents should handle it\n\nYou MUST respond with ONLY a valid JSON object. No explanation, no markdown, no code fences.\n\nAvailable agents:\n- architect: Design decisions, debugging, system analysis\n- security-reviewer: Security audits, vulnerability detection\n- build-fixer: Build errors, TypeScript issues\n- executor: Code implementation\n- researcher: Documentation, external APIs\n- explore: Codebase navigation, file search\n- designer: UI/UX work\n- qa-tester: Testing, verification\n- tdd-guide: Test-driven development\n- code-reviewer: Code quality review\n\nThe JSON must have exactly these fields:\n{\n  \"needsDelegation\": boolean,\n  \"needsSearch\": boolean,\n  \"needsArchitecture\": boolean,\n  \"needsSecurity\": boolean,\n  \"needsTesting\": boolean,\n  \"needsToolGuidance\": boolean,\n  \"confidence\": number,\n  \"recommendedAgents\": string[],  // Array of agent names from list above (1-3 agents max)\n  \"teamRationale\": string         // One sentence explaining why these agents\n}";
/**
 * Create the user message for classification
 */
export declare function createClassificationPrompt(taskPrompt: string): string;
/**
 * Few-shot examples for improved accuracy (optional, adds ~200 tokens)
 */
export declare const CLASSIFICATION_EXAMPLES: {
    task: string;
    response: {
        needsDelegation: boolean;
        needsSearch: boolean;
        needsArchitecture: boolean;
        needsSecurity: boolean;
        needsTesting: boolean;
        needsToolGuidance: boolean;
        confidence: number;
    };
}[];
/**
 * Create system prompt with examples (more accurate but uses more tokens)
 */
export declare function createSystemPromptWithExamples(): string;
/**
 * Validate and parse Haiku response
 */
export declare function parseClassificationResponse(response: string): {
    success: boolean;
    result?: {
        needsDelegation: boolean;
        needsSearch: boolean;
        needsArchitecture: boolean;
        needsSecurity: boolean;
        needsTesting: boolean;
        needsToolGuidance: boolean;
        confidence: number;
        recommendedAgents?: string[];
        teamRationale?: string;
    };
    error?: string;
};
//# sourceMappingURL=prompt.d.ts.map