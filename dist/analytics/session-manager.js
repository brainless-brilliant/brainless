import { readState, writeState, StateLocation } from '../features/state-manager/index.js';
import { getTokenTracker } from './token-tracker.js';
const SESSION_HISTORY_FILE = 'session-history';
export class SessionManager {
    currentSession = null;
    history = null;
    async startSession(goals, tags = ['other'], notes = '') {
        const session = {
            id: this.generateSessionId(),
            projectPath: process.cwd(),
            goals,
            tags,
            startTime: new Date().toISOString(),
            status: 'active',
            outcomes: [],
            notes
        };
        this.currentSession = session;
        await this.saveCurrentSession();
        return session;
    }
    async endSession(outcomes, status = 'completed') {
        if (!this.currentSession) {
            throw new Error('No active session to end');
        }
        const endTime = new Date().toISOString();
        const startTime = new Date(this.currentSession.startTime);
        const duration = new Date(endTime).getTime() - startTime.getTime();
        this.currentSession.endTime = endTime;
        this.currentSession.duration = duration;
        this.currentSession.status = status;
        this.currentSession.outcomes = outcomes;
        // Add to history
        await this.addToHistory(this.currentSession);
        const completedSession = { ...this.currentSession };
        this.currentSession = null;
        return completedSession;
    }
    async getCurrentSession() {
        if (!this.currentSession) {
            // Try to load from state
            const result = readState('current-session', StateLocation.LOCAL);
            if (result.exists && result.data && result.data.status === 'active') {
                this.currentSession = result.data;
            }
        }
        return this.currentSession;
    }
    async resumeSession(sessionId) {
        const history = await this.loadHistory();
        const session = history.sessions.find(s => s.id === sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found in history`);
        }
        if (session.status !== 'active') {
            // Reactivate session
            session.status = 'active';
            delete session.endTime;
            delete session.duration;
        }
        this.currentSession = session;
        await this.saveCurrentSession();
        return session;
    }
    async getSessionAnalytics(sessionId) {
        const tracker = getTokenTracker();
        const stats = await tracker.loadSessionStats(sessionId);
        if (!stats) {
            // Return empty analytics
            return {
                sessionId,
                totalTokens: 0,
                totalCost: 0,
                agentUsage: {},
                modelUsage: {},
                filesModified: [],
                tasksCompleted: 0,
                errorCount: 0,
                successRate: 0
            };
        }
        // Aggregate agent usage
        const agentUsage = {};
        for (const [agent, usages] of Object.entries(stats.byAgent)) {
            agentUsage[agent] = usages.reduce((sum, u) => sum + u.inputTokens + u.outputTokens, 0);
        }
        // Aggregate model usage
        const modelUsage = {};
        for (const [model, usages] of Object.entries(stats.byModel)) {
            modelUsage[model] = usages.reduce((sum, u) => sum + u.inputTokens + u.outputTokens, 0);
        }
        const totalTokens = stats.totalInputTokens + stats.totalOutputTokens;
        return {
            sessionId,
            totalTokens,
            totalCost: stats.totalCost,
            agentUsage,
            modelUsage,
            filesModified: [], // TODO: Track via git or file watcher
            tasksCompleted: 0, // TODO: Integrate with task list
            errorCount: 0, // TODO: Track errors
            successRate: 1.0 // TODO: Calculate based on tasks/errors
        };
    }
    async getSessionSummary(sessionId) {
        const history = await this.loadHistory();
        const metadata = history.sessions.find(s => s.id === sessionId);
        if (!metadata) {
            throw new Error(`Session ${sessionId} not found`);
        }
        const analytics = await this.getSessionAnalytics(sessionId);
        return { metadata, analytics };
    }
    async getHistory() {
        return this.loadHistory();
    }
    async searchSessions(query) {
        const history = await this.loadHistory();
        return history.sessions.filter(session => {
            if (query.tags && !query.tags.some(tag => session.tags.includes(tag))) {
                return false;
            }
            if (query.status && session.status !== query.status) {
                return false;
            }
            if (query.projectPath && session.projectPath !== query.projectPath) {
                return false;
            }
            if (query.startDate && session.startTime < query.startDate) {
                return false;
            }
            if (query.endDate && session.endTime && session.endTime > query.endDate) {
                return false;
            }
            return true;
        });
    }
    async saveCurrentSession() {
        if (this.currentSession) {
            writeState('current-session', this.currentSession, StateLocation.LOCAL);
        }
    }
    async loadHistory() {
        if (this.history) {
            return this.history;
        }
        const result = readState(SESSION_HISTORY_FILE, StateLocation.LOCAL);
        if (result.exists && result.data) {
            this.history = result.data;
            return result.data;
        }
        // Initialize empty history
        this.history = {
            sessions: [],
            totalSessions: 0,
            totalCost: 0,
            averageDuration: 0,
            successRate: 0,
            lastUpdated: new Date().toISOString()
        };
        return this.history;
    }
    async addToHistory(session) {
        const history = await this.loadHistory();
        history.sessions.push(session);
        history.totalSessions++;
        history.lastUpdated = new Date().toISOString();
        // Recalculate aggregates
        const completedSessions = history.sessions.filter(s => s.status === 'completed');
        if (completedSessions.length > 0) {
            const totalDuration = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0);
            history.averageDuration = totalDuration / completedSessions.length;
            history.successRate = completedSessions.length / history.totalSessions;
        }
        // Calculate total cost (requires analytics for each session)
        let totalCost = 0;
        for (const s of history.sessions) {
            const analytics = await this.getSessionAnalytics(s.id);
            totalCost += analytics.totalCost;
        }
        history.totalCost = totalCost;
        writeState(SESSION_HISTORY_FILE, history, StateLocation.LOCAL);
        this.history = history;
    }
    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
// Singleton instance
let globalManager = null;
export function getSessionManager() {
    if (!globalManager) {
        globalManager = new SessionManager();
    }
    return globalManager;
}
export function resetSessionManager() {
    globalManager = new SessionManager();
    return globalManager;
}
//# sourceMappingURL=session-manager.js.map