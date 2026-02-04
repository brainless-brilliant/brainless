/**
 * Transcript Logger
 *
 * Handles logging, reading, and managing agent activity transcripts.
 * Stores activities in JSONL format for efficient append operations.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
import { existsSync, mkdirSync, readFileSync, appendFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { DEFAULT_TRANSCRIPT_CONFIG } from './types.js';
/**
 * Get the transcript directory path
 */
export function getTranscriptDir(workingDir) {
    const baseDir = workingDir || process.cwd();
    return join(baseDir, '.anv', 'transcripts');
}
/**
 * Get the path to the main activity log file
 */
export function getActivityLogPath(workingDir) {
    return join(getTranscriptDir(workingDir), 'activity.jsonl');
}
/**
 * Get the path to debates directory
 */
export function getDebatesDir(workingDir) {
    return join(getTranscriptDir(workingDir), 'debates');
}
/**
 * Get the path to decisions log
 */
export function getDecisionsPath(workingDir) {
    return join(getTranscriptDir(workingDir), 'decisions.jsonl');
}
/**
 * Ensure transcript directories exist
 */
export function ensureTranscriptDirs(workingDir) {
    const transcriptDir = getTranscriptDir(workingDir);
    const debatesDir = getDebatesDir(workingDir);
    if (!existsSync(transcriptDir)) {
        mkdirSync(transcriptDir, { recursive: true });
    }
    if (!existsSync(debatesDir)) {
        mkdirSync(debatesDir, { recursive: true });
    }
}
/**
 * Generate a unique activity ID
 */
export function generateActivityId() {
    return `act_${Date.now()}_${randomUUID().slice(0, 8)}`;
}
/**
 * Generate a unique debate ID
 */
export function generateDebateId() {
    return `debate_${Date.now()}_${randomUUID().slice(0, 8)}`;
}
/**
 * Generate a unique decision ID
 */
export function generateDecisionId() {
    return `dec_${Date.now()}_${randomUUID().slice(0, 8)}`;
}
/**
 * Truncate a string to max length with ellipsis
 */
export function truncateSummary(text, maxLength = 200) {
    if (!text)
        return '';
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength - 3) + '...';
}
/**
 * Log an agent activity
 */
export function logActivity(activity, workingDir, config = {}) {
    const fullConfig = { ...DEFAULT_TRANSCRIPT_CONFIG, ...config };
    if (!fullConfig.enabled) {
        return { ...activity, id: generateActivityId(), timestamp: new Date().toISOString() };
    }
    ensureTranscriptDirs(workingDir);
    const fullActivity = {
        ...activity,
        id: generateActivityId(),
        timestamp: new Date().toISOString(),
        input_summary: truncateSummary(activity.input_summary, fullConfig.max_summary_length),
        output_summary: activity.output_summary
            ? truncateSummary(activity.output_summary, fullConfig.max_summary_length)
            : undefined
    };
    const logPath = getActivityLogPath(workingDir);
    appendFileSync(logPath, JSON.stringify(fullActivity) + '\n', 'utf-8');
    if (fullConfig.console_logging) {
        const icon = getActionIcon(fullActivity.action);
        console.log(`[AVK] ${icon} ${fullActivity.agent}: ${fullActivity.action} - ${fullActivity.input_summary}`);
    }
    return fullActivity;
}
/**
 * Get icon for activity action
 */
function getActionIcon(action) {
    const icons = {
        spawned: '🚀',
        completed: '✅',
        failed: '❌',
        delegated: '➡️',
        proposed: '💡',
        approved: '👍',
        rejected: '👎',
        debated: '💬',
        decided: '⚖️',
        gate_pending: '⏳',
        gate_passed: '🚪'
    };
    return icons[action] || '•';
}
/**
 * Read all activities for a session
 */
export function getActivities(sessionId, workingDir) {
    const logPath = getActivityLogPath(workingDir);
    if (!existsSync(logPath)) {
        return [];
    }
    const content = readFileSync(logPath, 'utf-8');
    const lines = content.trim().split('\n').filter(line => line.trim());
    const activities = lines.map(line => {
        try {
            return JSON.parse(line);
        }
        catch {
            return null;
        }
    }).filter((a) => a !== null);
    if (sessionId) {
        return activities.filter(a => a.session_id === sessionId);
    }
    return activities;
}
/**
 * Get recent activities (last N)
 */
export function getRecentActivities(count = 10, workingDir) {
    const activities = getActivities(undefined, workingDir);
    return activities.slice(-count);
}
/**
 * Log a decision
 */
export function logDecision(decision, workingDir) {
    ensureTranscriptDirs(workingDir);
    const fullDecision = {
        ...decision,
        id: generateDecisionId(),
        timestamp: new Date().toISOString()
    };
    const logPath = getDecisionsPath(workingDir);
    appendFileSync(logPath, JSON.stringify(fullDecision) + '\n', 'utf-8');
    // Also log as an activity
    logActivity({
        session_id: 'decision',
        agent: decision.made_by,
        action: 'decided',
        input_summary: `${decision.topic}: ${decision.chosen}`,
        metadata: { decision_id: fullDecision.id }
    }, workingDir);
    return fullDecision;
}
/**
 * Get all decisions
 */
export function getDecisions(workingDir) {
    const logPath = getDecisionsPath(workingDir);
    if (!existsSync(logPath)) {
        return [];
    }
    const content = readFileSync(logPath, 'utf-8');
    const lines = content.trim().split('\n').filter(line => line.trim());
    return lines.map(line => {
        try {
            return JSON.parse(line);
        }
        catch {
            return null;
        }
    }).filter((d) => d !== null);
}
/**
 * Create a new debate room
 */
export function createDebateRoom(topic, participants, moderator, orchestrationId, workingDir) {
    ensureTranscriptDirs(workingDir);
    const room = {
        id: generateDebateId(),
        topic,
        created_at: new Date().toISOString(),
        participants,
        moderator,
        messages: [],
        status: 'active',
        orchestration_id: orchestrationId
    };
    saveDebateRoom(room, workingDir);
    // Log as activity
    logActivity({
        session_id: orchestrationId || 'debate',
        agent: moderator,
        action: 'debated',
        input_summary: `Started debate: ${topic}`,
        orchestration_id: orchestrationId,
        metadata: { debate_id: room.id, participants }
    }, workingDir);
    return room;
}
/**
 * Save debate room to file
 */
export function saveDebateRoom(room, workingDir) {
    const debatesDir = getDebatesDir(workingDir);
    const filePath = join(debatesDir, `${room.id}.json`);
    writeFileSync(filePath, JSON.stringify(room, null, 2), 'utf-8');
}
/**
 * Load a debate room
 */
export function loadDebateRoom(debateId, workingDir) {
    const filePath = join(getDebatesDir(workingDir), `${debateId}.json`);
    if (!existsSync(filePath)) {
        return null;
    }
    try {
        const content = readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    }
    catch {
        return null;
    }
}
/**
 * Add a message to a debate room
 */
export function addDebateMessage(debateId, from, type, content, references, workingDir) {
    const room = loadDebateRoom(debateId, workingDir);
    if (!room || room.status !== 'active') {
        return null;
    }
    const message = {
        id: `msg_${Date.now()}_${randomUUID().slice(0, 8)}`,
        timestamp: new Date().toISOString(),
        from,
        type,
        content,
        references
    };
    room.messages.push(message);
    saveDebateRoom(room, workingDir);
    return message;
}
/**
 * Resolve a debate with a decision
 */
export function resolveDebate(debateId, decidedBy, decision, rationale, dissenters, workingDir) {
    const room = loadDebateRoom(debateId, workingDir);
    if (!room) {
        return null;
    }
    room.status = 'resolved';
    room.resolution = {
        decided_by: decidedBy,
        decision,
        rationale,
        dissenters,
        timestamp: new Date().toISOString()
    };
    // Add decision message
    addDebateMessage(debateId, decidedBy, 'decision', `Decision: ${decision}\nRationale: ${rationale}`, undefined, workingDir);
    saveDebateRoom(room, workingDir);
    // Log decision
    logDecision({
        phase: 'debate',
        topic: room.topic,
        options: room.messages.filter(m => m.type === 'proposal').map(m => m.content),
        chosen: decision,
        rationale,
        made_by: decidedBy,
        debate_id: debateId
    }, workingDir);
    return room;
}
/**
 * Generate transcript summary
 */
export function getTranscriptSummary(sessionId, workingDir) {
    const activities = getActivities(sessionId, workingDir);
    const decisions = getDecisions(workingDir);
    const agents = new Set();
    activities.forEach(a => agents.add(a.agent));
    const startTime = activities.length > 0 ? activities[0].timestamp : new Date().toISOString();
    const endTime = activities.length > 0 ? activities[activities.length - 1].timestamp : undefined;
    const debates = activities.filter(a => a.action === 'debated').length;
    return {
        session_id: sessionId || 'all',
        total_activities: activities.length,
        agents_involved: Array.from(agents),
        decisions_made: decisions.length,
        debates_held: debates,
        started_at: startTime,
        ended_at: endTime,
        total_duration_ms: endTime
            ? new Date(endTime).getTime() - new Date(startTime).getTime()
            : undefined,
        status: activities.some(a => a.action === 'failed')
            ? 'failed'
            : activities.some(a => a.action === 'completed')
                ? 'completed'
                : 'active'
    };
}
/**
 * Format transcript as human-readable text
 */
export function formatTranscript(sessionId, workingDir) {
    const activities = getActivities(sessionId, workingDir);
    if (activities.length === 0) {
        return 'No activities recorded.';
    }
    const lines = [
        '# Agent Activity Transcript',
        '',
        `Generated: ${new Date().toISOString()}`,
        `Total Activities: ${activities.length}`,
        '',
        '| Time | Agent | Action | Summary |',
        '|------|-------|--------|---------|'
    ];
    for (const activity of activities) {
        const time = new Date(activity.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const icon = getActionIcon(activity.action);
        const agentShort = activity.agent.replace('brainless:', '');
        const summary = activity.output_summary || activity.input_summary;
        lines.push(`| ${time} | ${agentShort} | ${icon} ${activity.action} | ${summary} |`);
    }
    return lines.join('\n');
}
/**
 * Format timeline view
 */
export function formatTimeline(sessionId, workingDir) {
    const activities = getActivities(sessionId, workingDir);
    if (activities.length === 0) {
        return 'No activities recorded.';
    }
    const lines = [
        '# Agent Activity Timeline',
        ''
    ];
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const time = new Date(activity.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const icon = getActionIcon(activity.action);
        const agentShort = activity.agent.replace('brainless:', '');
        const isLast = i === activities.length - 1;
        const connector = isLast ? '└──' : '├──';
        const continuation = isLast ? '   ' : '│  ';
        lines.push(`${time} ${connector} [${agentShort}] ${icon} ${activity.action}`);
        if (activity.input_summary) {
            lines.push(`       ${continuation} └── ${activity.input_summary}`);
        }
        if (activity.output_summary && activity.action === 'completed') {
            lines.push(`       ${continuation}     Result: ${activity.output_summary}`);
        }
        if (!isLast) {
            lines.push(`       │`);
        }
    }
    return lines.join('\n');
}
/**
 * Clear all transcript data
 */
export function clearTranscript(workingDir) {
    const activityPath = getActivityLogPath(workingDir);
    const decisionsPath = getDecisionsPath(workingDir);
    if (existsSync(activityPath)) {
        writeFileSync(activityPath, '', 'utf-8');
    }
    if (existsSync(decisionsPath)) {
        writeFileSync(decisionsPath, '', 'utf-8');
    }
}
//# sourceMappingURL=logger.js.map