import { CostBreakdown } from './types.js';
export interface CostInput {
    modelName: string;
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
}
export declare function calculateCost(input: CostInput): CostBreakdown;
export declare function formatCost(cost: number): string;
export declare function getCostColor(cost: number): 'green' | 'yellow' | 'red';
export declare function estimateDailyCost(tokensPerHour: number, modelName: string): number;
export declare function estimateMonthlyCost(tokensPerHour: number, modelName: string): number;
//# sourceMappingURL=cost-estimator.d.ts.map