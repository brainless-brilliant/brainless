"use strict";
/**
 * Haiku Classification Prompt
 *
 * Production-grade prompt optimized for accurate task classification.
 * Designed for Claude Haiku's capabilities with clear structure and examples.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLASSIFICATION_EXAMPLES = exports.CLASSIFICATION_SYSTEM_PROMPT = void 0;
exports.createClassificationPrompt = createClassificationPrompt;
exports.createSystemPromptWithExamples = createSystemPromptWithExamples;
exports.parseClassificationResponse = parseClassificationResponse;
/**
 * System prompt for classification
 */
exports.CLASSIFICATION_SYSTEM_PROMPT = "You are a task classifier for an AI coding assistant. Your job is to analyze a task description and determine what capabilities are needed to complete it.\n\nYou MUST respond with ONLY a valid JSON object. No explanation, no markdown, no code fences.\n\nThe JSON must have exactly these boolean fields:\n{\n  \"needsDelegation\": boolean,  // Task needs breaking into subtasks or multi-agent coordination\n  \"needsSearch\": boolean,      // Task is about finding/locating files or code\n  \"needsArchitecture\": boolean, // Task involves design decisions, refactoring, or system changes\n  \"needsSecurity\": boolean,    // Task touches security-sensitive areas\n  \"needsTesting\": boolean,     // Task involves writing or running tests\n  \"needsToolGuidance\": boolean, // Task requires multiple file operations\n  \"confidence\": number         // 0.0-1.0 confidence in classification\n}";
/**
 * Create the user message for classification
 */
function createClassificationPrompt(taskPrompt) {
    // Truncate very long prompts to save tokens
    var maxLength = 2000;
    var truncated = taskPrompt.length > maxLength
        ? taskPrompt.slice(0, maxLength) + '...[truncated]'
        : taskPrompt;
    return "Classify this task:\n\n\"\"\"\n".concat(truncated, "\n\"\"\"\n\nRespond with JSON only.");
}
/**
 * Few-shot examples for improved accuracy (optional, adds ~200 tokens)
 */
exports.CLASSIFICATION_EXAMPLES = [
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
function createSystemPromptWithExamples() {
    var examples = exports.CLASSIFICATION_EXAMPLES.map(function (ex, i) {
        return "Example ".concat(i + 1, ":\nTask: \"").concat(ex.task, "\"\nResponse: ").concat(JSON.stringify(ex.response));
    }).join('\n\n');
    return "".concat(exports.CLASSIFICATION_SYSTEM_PROMPT, "\n\nHere are examples of correct classifications:\n\n").concat(examples);
}
/**
 * Validate and parse Haiku response
 */
function parseClassificationResponse(response) {
    try {
        // Try to extract JSON if wrapped in markdown code blocks
        var jsonStr = response.trim();
        // Remove markdown code fences if present
        var jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1].trim();
        }
        var parsed = JSON.parse(jsonStr);
        // Validate required fields
        var requiredFields = [
            'needsDelegation',
            'needsSearch',
            'needsArchitecture',
            'needsSecurity',
            'needsTesting',
            'needsToolGuidance',
        ];
        for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
            var field = requiredFields_1[_i];
            if (typeof parsed[field] !== 'boolean') {
                return {
                    success: false,
                    error: "Missing or invalid field: ".concat(field),
                };
            }
        }
        // Ensure confidence is a valid number
        var confidence = typeof parsed.confidence === 'number'
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
                confidence: confidence,
            },
        };
    }
    catch (e) {
        return {
            success: false,
            error: "JSON parse error: ".concat(e instanceof Error ? e.message : String(e)),
        };
    }
}
