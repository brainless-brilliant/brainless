/**
 * Haiku Classification Prompt
 *
 * Production-grade prompt optimized for accurate task classification.
 * Designed for Claude Haiku's capabilities with clear structure and examples.
 */
/**
 * System prompt for classification
 */
export const CLASSIFICATION_SYSTEM_PROMPT = `You are a task classifier and team builder for an AI coding assistant. Your job is to analyze a task and determine:
1. What capabilities are needed
2. Which specialized agents should handle it

You MUST respond with ONLY a valid JSON object. No explanation, no markdown, no code fences.

Available agents:
- architect: Design decisions, debugging, system analysis
- security-reviewer: Security audits, vulnerability detection
- build-fixer: Build errors, TypeScript issues
- executor: Code implementation
- researcher: Documentation, external APIs
- explore: Codebase navigation, file search
- designer: UI/UX work
- qa-tester: Testing, verification
- tdd-guide: Test-driven development
- code-reviewer: Code quality review

The JSON must have exactly these fields:
{
  "needsDelegation": boolean,
  "needsSearch": boolean,
  "needsArchitecture": boolean,
  "needsSecurity": boolean,
  "needsTesting": boolean,
  "needsToolGuidance": boolean,
  "confidence": number,
  "recommendedAgents": string[],  // Array of agent names from list above (1-3 agents max)
  "teamRationale": string         // One sentence explaining why these agents
}`;
/**
 * Create the user message for classification
 */
export function createClassificationPrompt(taskPrompt) {
    // Truncate very long prompts to save tokens
    const maxLength = 2000;
    const truncated = taskPrompt.length > maxLength
        ? taskPrompt.slice(0, maxLength) + '...[truncated]'
        : taskPrompt;
    return `Classify this task:

"""
${truncated}
"""

Respond with JSON only.`;
}
/**
 * Few-shot examples for improved accuracy (optional, adds ~200 tokens)
 */
export const CLASSIFICATION_EXAMPLES = [
    {
        task: 'Find where the login function is defined',
        response: {
            needsDelegation: false,
            needsSearch: true,
            needsArchitecture: false,
            needsSecurity: false,
            needsTesting: false,
            needsToolGuidance: false,
            confidence: 0.95,
        },
    },
    {
        task: 'Refactor the authentication module to use OAuth2 instead of basic auth',
        response: {
            needsDelegation: true,
            needsSearch: false,
            needsArchitecture: true,
            needsSecurity: true,
            needsTesting: true,
            needsToolGuidance: true,
            confidence: 0.92,
        },
    },
    {
        task: 'Add unit tests for the payment service',
        response: {
            needsDelegation: false,
            needsSearch: false,
            needsArchitecture: false,
            needsSecurity: false,
            needsTesting: true,
            needsToolGuidance: false,
            confidence: 0.98,
        },
    },
];
/**
 * Create system prompt with examples (more accurate but uses more tokens)
 */
export function createSystemPromptWithExamples() {
    const examples = CLASSIFICATION_EXAMPLES.map((ex, i) => `Example ${i + 1}:
Task: "${ex.task}"
Response: ${JSON.stringify(ex.response)}`).join('\n\n');
    return `${CLASSIFICATION_SYSTEM_PROMPT}

Here are examples of correct classifications:

${examples}`;
}
/**
 * Validate and parse Haiku response
 */
export function parseClassificationResponse(response) {
    try {
        // Try to extract JSON if wrapped in markdown code blocks
        let jsonStr = response.trim();
        // Remove markdown code fences if present
        const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
        }
        const parsed = JSON.parse(jsonStr);
        // Validate required fields
        const requiredFields = [
            'needsDelegation',
            'needsSearch',
            'needsArchitecture',
            'needsSecurity',
            'needsTesting',
            'needsToolGuidance',
        ];
        for (const field of requiredFields) {
            if (typeof parsed[field] !== 'boolean') {
                return {
                    success: false,
                    error: `Missing or invalid field: ${field}`,
                };
            }
        }
        // Ensure confidence is a valid number
        const confidence = typeof parsed.confidence === 'number'
            ? Math.max(0, Math.min(1, parsed.confidence))
            : 0.8;
        return {
            success: true,
            result: {
                needsDelegation: parsed.needsDelegation,
                needsSearch: parsed.needsSearch,
                needsArchitecture: parsed.needsArchitecture,
                needsSecurity: parsed.needsSecurity,
                needsTesting: parsed.needsTesting,
                needsToolGuidance: parsed.needsToolGuidance,
                confidence,
                recommendedAgents: Array.isArray(parsed.recommendedAgents) ? parsed.recommendedAgents : [],
                teamRationale: typeof parsed.teamRationale === 'string' ? parsed.teamRationale : undefined,
            },
        };
    }
    catch (e) {
        return {
            success: false,
            error: `JSON parse error: ${e instanceof Error ? e.message : String(e)}`,
        };
    }
}
//# sourceMappingURL=prompt.js.map