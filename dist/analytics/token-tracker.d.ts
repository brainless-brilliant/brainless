import { TokenUsage, SessionTokenStats } from './types.js';
export declare class TokenTracker {
    private currentSessionId;
    private sessionStats;
    constructor(sessionId?: string);
    private generateSessionId;
    private initializeSessionStats;
    recordTokenUsage(usage: Omit<TokenUsage, 'sessionId' | 'timestamp'>): Promise<void>;
    private appendToLog;
    private updateSessionStats;
    private saveSessionStats;
    loadSessionStats(sessionId?: string): Promise<SessionTokenStats | null>;
    private rebuildStatsFromLog;
    getSessionStats(): SessionTokenStats;
    getTopAgents(limit?: number): Promise<Array<{
        agent: string;
        tokens: number;
        cost: number;
    }>>;
    cleanupOldLogs(retentionDays?: number): Promise<number>;
}
export declare function getTokenTracker(sessionId?: string): TokenTracker;
export declare function resetTokenTracker(sessionId?: string): TokenTracker;
//# sourceMappingURL=token-tracker.d.ts.map