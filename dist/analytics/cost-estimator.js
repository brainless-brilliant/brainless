import { PRICING } from './types.js';
export function calculateCost(input) {
    const pricing = getPricingForModel(input.modelName);
    // Base input cost
    const inputCost = (input.inputTokens / 1_000_000) * pricing.inputPerMillion;
    // Output cost
    const outputCost = (input.outputTokens / 1_000_000) * pricing.outputPerMillion;
    // Cache write cost (25% markup on input price)
    const cacheWriteCost = (input.cacheCreationTokens / 1_000_000) *
        pricing.inputPerMillion * (1 + pricing.cacheWriteMarkup);
    // Cache read cost (90% discount on input price)
    const cacheReadCost = (input.cacheReadTokens / 1_000_000) *
        pricing.inputPerMillion * (1 - pricing.cacheReadDiscount);
    const totalCost = inputCost + outputCost + cacheWriteCost + cacheReadCost;
    return {
        inputCost,
        outputCost,
        cacheWriteCost,
        cacheReadCost,
        totalCost
    };
}
function getPricingForModel(modelName) {
    // Normalize model name
    const normalized = normalizeModelName(modelName);
    if (PRICING[normalized]) {
        return PRICING[normalized];
    }
    // Default to Sonnet if unknown
    console.warn(`Unknown model: ${modelName}, defaulting to Sonnet pricing`);
    return PRICING['claude-sonnet-4.5'];
}
function normalizeModelName(modelName) {
    // Handle various model name formats
    const lower = modelName.toLowerCase();
    if (lower.includes('haiku'))
        return 'claude-haiku-4';
    if (lower.includes('sonnet'))
        return 'claude-sonnet-4.5';
    if (lower.includes('opus'))
        return 'claude-opus-4.5';
    // Check exact matches
    if (PRICING[modelName])
        return modelName;
    // Default
    return 'claude-sonnet-4.5';
}
export function formatCost(cost) {
    if (cost < 0.01) {
        return `$${(cost * 100).toFixed(4)}¢`;
    }
    return `$${cost.toFixed(4)}`;
}
export function getCostColor(cost) {
    if (cost < 1.0)
        return 'green';
    if (cost < 5.0)
        return 'yellow';
    return 'red';
}
export function estimateDailyCost(tokensPerHour, modelName) {
    const pricing = getPricingForModel(modelName);
    const tokensPerDay = tokensPerHour * 24;
    const costPerDay = (tokensPerDay / 1_000_000) * pricing.inputPerMillion;
    return costPerDay;
}
export function estimateMonthlyCost(tokensPerHour, modelName) {
    return estimateDailyCost(tokensPerHour, modelName) * 30;
}
//# sourceMappingURL=cost-estimator.js.map