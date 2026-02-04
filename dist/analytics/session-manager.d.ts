import { SessionMetadata, SessionAnalytics, SessionHistory, SessionSummary, SessionTag } from './session-types.js';
export declare class SessionManager {
    private currentSession;
    private history;
    startSession(goals: string[], tags?: SessionTag[], notes?: string): Promise<SessionMetadata>;
    endSession(outcomes: string[], status?: 'completed' | 'abandoned'): Promise<SessionMetadata>;
    getCurrentSession(): Promise<SessionMetadata | null>;
    resumeSession(sessionId: string): Promise<SessionMetadata>;
    getSessionAnalytics(sessionId: string): Promise<SessionAnalytics>;
    getSessionSummary(sessionId: string): Promise<SessionSummary>;
    getHistory(): Promise<SessionHistory>;
    searchSessions(query: {
        tags?: SessionTag[];
        startDate?: string;
        endDate?: string;
        status?: SessionMetadata['status'];
        projectPath?: string;
    }): Promise<SessionMetadata[]>;
    private saveCurrentSession;
    private loadHistory;
    private addToHistory;
    private generateSessionId;
}
export declare function getSessionManager(): SessionManager;
export declare function resetSessionManager(): SessionManager;
//# sourceMappingURL=session-manager.d.ts.map