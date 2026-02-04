import { readState, writeState, StateLocation } from '../features/state-manager/index.js';
import * as fs from 'fs/promises';
import * as path from 'path';
const TOKEN_LOG_FILE = '.brainless/state/token-tracking.jsonl';
const SESSION_STATS_FILE = '.brainless/state/session-token-stats.json';
export class TokenTracker {
    currentSessionId;
    sessionStats;
    constructor(sessionId) {
        this.currentSessionId = sessionId || this.generateSessionId();
        this.sessionStats = this.initializeSessionStats();
    }
    generateSessionId() {
        return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    initializeSessionStats() {
        return {
            sessionId: this.currentSessionId,
            totalInputTokens: 0,
            totalOutputTokens: 0,
            totalCacheCreation: 0,
            totalCacheRead: 0,
            totalCost: 0,
            byAgent: {},
            byModel: {},
            startTime: new Date().toISOString(),
            lastUpdate: new Date().toISOString()
        };
    }
    async recordTokenUsage(usage) {
        const record = {
            ...usage,
            sessionId: this.currentSessionId,
            timestamp: new Date().toISOString()
        };
        // Append to JSONL log (append-only for performance)
        await this.appendToLog(record);
        // Update session stats
        this.updateSessionStats(record);
        // Persist session stats
        await this.saveSessionStats();
    }
    async appendToLog(record) {
        const logPath = path.resolve(process.cwd(), TOKEN_LOG_FILE);
        const logDir = path.dirname(logPath);
        await fs.mkdir(logDir, { recursive: true });
        await fs.appendFile(logPath, JSON.stringify(record) + '\n', 'utf-8');
    }
    updateSessionStats(record) {
        this.sessionStats.totalInputTokens += record.inputTokens;
        this.sessionStats.totalOutputTokens += record.outputTokens;
        this.sessionStats.totalCacheCreation += record.cacheCreationTokens;
        this.sessionStats.totalCacheRead += record.cacheReadTokens;
        this.sessionStats.lastUpdate = record.timestamp;
        // Group by agent
        if (record.agentName) {
            if (!this.sessionStats.byAgent[record.agentName]) {
                this.sessionStats.byAgent[record.agentName] = [];
            }
            this.sessionStats.byAgent[record.agentName].push(record);
        }
        // Group by model
        if (!this.sessionStats.byModel[record.modelName]) {
            this.sessionStats.byModel[record.modelName] = [];
        }
        this.sessionStats.byModel[record.modelName].push(record);
    }
    async saveSessionStats() {
        writeState('session-token-stats', this.sessionStats, StateLocation.LOCAL);
    }
    async loadSessionStats(sessionId) {
        const sid = sessionId || this.currentSessionId;
        // Try to load from state
        const result = readState('session-token-stats', StateLocation.LOCAL);
        if (result.exists && result.data && result.data.sessionId === sid) {
            this.sessionStats = result.data;
            return result.data;
        }
        // Rebuild from JSONL log if needed
        return this.rebuildStatsFromLog(sid);
    }
    async rebuildStatsFromLog(sessionId) {
        const logPath = path.resolve(process.cwd(), TOKEN_LOG_FILE);
        try {
            const content = await fs.readFile(logPath, 'utf-8');
            const lines = content.trim().split('\n');
            const stats = this.initializeSessionStats();
            stats.sessionId = sessionId;
            for (const line of lines) {
                const record = JSON.parse(line);
                if (record.sessionId === sessionId) {
                    this.updateSessionStats(record);
                }
            }
            return stats.totalInputTokens > 0 ? stats : null;
        }
        catch (error) {
            return null;
        }
    }
    getSessionStats() {
        return { ...this.sessionStats };
    }
    async getTopAgents(limit = 5) {
        const { calculateCost } = await import('./cost-estimator.js');
        const agentStats = Object.entries(this.sessionStats.byAgent).map(([agent, usages]) => {
            const totalTokens = usages.reduce((sum, u) => sum + u.inputTokens + u.outputTokens, 0);
            const totalCost = usages.reduce((sum, u) => {
                const cost = calculateCost({
                    modelName: u.modelName,
                    inputTokens: u.inputTokens,
                    outputTokens: u.outputTokens,
                    cacheCreationTokens: u.cacheCreationTokens,
                    cacheReadTokens: u.cacheReadTokens
                });
                return sum + cost.totalCost;
            }, 0);
            return { agent, tokens: totalTokens, cost: totalCost };
        });
        return agentStats.sort((a, b) => b.cost - a.cost).slice(0, limit);
    }
    async cleanupOldLogs(retentionDays = 30) {
        const logPath = path.resolve(process.cwd(), TOKEN_LOG_FILE);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        try {
            const content = await fs.readFile(logPath, 'utf-8');
            const lines = content.trim().split('\n');
            let kept = 0;
            let removed = 0;
            const filteredLines = lines.filter(line => {
                const record = JSON.parse(line);
                const recordDate = new Date(record.timestamp);
                if (recordDate >= cutoffDate) {
                    kept++;
                    return true;
                }
                removed++;
                return false;
            });
            await fs.writeFile(logPath, filteredLines.join('\n') + '\n', 'utf-8');
            return removed;
        }
        catch (error) {
            return 0;
        }
    }
}
// Singleton instance for current session
let globalTracker = null;
export function getTokenTracker(sessionId) {
    if (!globalTracker) {
        globalTracker = new TokenTracker(sessionId);
    }
    return globalTracker;
}
export function resetTokenTracker(sessionId) {
    globalTracker = new TokenTracker(sessionId);
    return globalTracker;
}
//# sourceMappingURL=token-tracker.js.map