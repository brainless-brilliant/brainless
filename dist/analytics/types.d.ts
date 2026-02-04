export interface TokenUsage {
    timestamp: string;
    sessionId: string;
    agentName?: string;
    modelName: string;
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
}
export interface CostBreakdown {
    inputCost: number;
    outputCost: number;
    cacheWriteCost: number;
    cacheReadCost: number;
    totalCost: number;
}
export interface SessionTokenStats {
    sessionId: string;
    totalInputTokens: number;
    totalOutputTokens: number;
    totalCacheCreation: number;
    totalCacheRead: number;
    totalCost: number;
    byAgent: Record<string, TokenUsage[]>;
    byModel: Record<string, TokenUsage[]>;
    startTime: string;
    lastUpdate: string;
}
export interface ModelPricing {
    inputPerMillion: number;
    outputPerMillion: number;
    cacheWriteMarkup: number;
    cacheReadDiscount: number;
}
export declare const PRICING: Record<string, ModelPricing>;
//# sourceMappingURL=types.d.ts.map