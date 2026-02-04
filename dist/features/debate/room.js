/**
 * Debate Room Management
 *
 * Handles creating, managing, and resolving inter-agent debates.
 *
 * © Brainless Technologies Pvt. Ltd.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { DEFAULT_DEBATE_CONFIG } from './types.js';
import { logActivity } from '../transcript/index.js';
/**
 * Get debates directory path
 */
export function getDebatesDir(workingDir) {
    const baseDir = workingDir || process.cwd();
    return join(baseDir, '.anv', 'debates');
}
/**
 * Ensure debates directory exists
 */
export function ensureDebatesDir(workingDir) {
    const dir = getDebatesDir(workingDir);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}
/**
 * Generate debate ID
 */
export function generateDebateId() {
    return `debate_${Date.now()}_${randomUUID().slice(0, 8)}`;
}
/**
 * Generate message ID
 */
export function generateMessageId() {
    return `msg_${Date.now()}_${randomUUID().slice(0, 6)}`;
}
/**
 * Generate concern ID
 */
export function generateConcernId() {
    return `concern_${Date.now()}_${randomUUID().slice(0, 6)}`;
}
/**
 * Create a new debate room
 */
export function createDebate(topic, participants, moderator = 'brainless:pm', context, orchestrationId, workingDir, config = {}) {
    ensureDebatesDir(workingDir);
    const fullConfig = { ...DEFAULT_DEBATE_CONFIG, ...config };
    const room = {
        id: generateDebateId(),
        topic,
        context,
        created_at: new Date().toISOString(),
        participants: participants.map(p => p.startsWith('brainless:') ? p : `brainless:${p}`),
        moderator: moderator.startsWith('brainless:') ? moderator : `brainless:${moderator}`,
        messages: [],
        concerns: [],
        round: 1,
        max_rounds: fullConfig.max_rounds,
        status: 'active',
        orchestration_id: orchestrationId
    };
    saveDebate(room, workingDir);
    // Log activity
    logActivity({
        session_id: orchestrationId || 'debate',
        agent: moderator,
        action: 'debated',
        input_summary: `Started debate: ${topic}`,
        orchestration_id: orchestrationId,
        metadata: {
            debate_id: room.id,
            participants: room.participants
        }
    }, workingDir);
    return room;
}
/**
 * Save debate room to file
 */
export function saveDebate(room, workingDir) {
    ensureDebatesDir(workingDir);
    const filePath = join(getDebatesDir(workingDir), `${room.id}.json`);
    writeFileSync(filePath, JSON.stringify(room, null, 2), 'utf-8');
}
/**
 * Load a debate room
 */
export function loadDebate(debateId, workingDir) {
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
 * List all debates
 */
export function listDebates(workingDir) {
    const dir = getDebatesDir(workingDir);
    if (!existsSync(dir)) {
        return [];
    }
    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    const summaries = [];
    for (const file of files) {
        const room = loadDebate(file.replace('.json', ''), workingDir);
        if (room) {
            summaries.push(getDebateSummary(room));
        }
    }
    return summaries.sort((a, b) => new Date(b.duration).getTime() - new Date(a.duration).getTime());
}
/**
 * Get debate summary
 */
export function getDebateSummary(room) {
    const durationMs = new Date().getTime() - new Date(room.created_at).getTime();
    const minutes = Math.floor(durationMs / 60000);
    return {
        id: room.id,
        topic: room.topic.length > 60 ? room.topic.slice(0, 60) + '...' : room.topic,
        participants: room.participants.map(p => p.replace('brainless:', '')),
        message_count: room.messages.length,
        concern_count: room.concerns.length,
        status: room.status,
        duration: minutes < 1 ? 'Just started' : `${minutes} min`,
        decision: room.resolution?.decision
    };
}
/**
 * Add a message to a debate
 */
export function addMessage(debateId, from, type, content, references, tags, priority, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room || room.status !== 'active') {
        return null;
    }
    const agent = from.startsWith('brainless:') ? from : `brainless:${from}`;
    const message = {
        id: generateMessageId(),
        timestamp: new Date().toISOString(),
        from: agent,
        type,
        content,
        references,
        tags,
        priority
    };
    room.messages.push(message);
    // Add to participants if not already
    if (!room.participants.includes(agent)) {
        room.participants.push(agent);
    }
    saveDebate(room, workingDir);
    return message;
}
/**
 * Add a proposal to the debate
 */
export function addProposal(debateId, from, proposal, workingDir) {
    return addMessage(debateId, from, 'proposal', proposal, undefined, undefined, undefined, workingDir);
}
/**
 * Add a counter-argument
 */
export function addCounter(debateId, from, counter, referencedProposalId, workingDir) {
    return addMessage(debateId, from, 'counter', counter, referencedProposalId ? [referencedProposalId] : undefined, undefined, undefined, workingDir);
}
/**
 * Raise a cross-cutting concern
 */
export function raiseConcern(debateId, from, description, affects, priority = 'medium', options = [], workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room || room.status !== 'active') {
        return null;
    }
    const agent = from.startsWith('brainless:') ? from : `brainless:${from}`;
    const concern = {
        id: generateConcernId(),
        description,
        raised_by: agent,
        affects,
        priority,
        options,
        raised_at: new Date().toISOString()
    };
    room.concerns.push(concern);
    // Also add as a message for visibility
    addMessage(debateId, from, 'concern', `⚠️ **Cross-cutting concern**: ${description}\n\n**Affects**: ${affects.join(', ')}\n\n**Priority**: ${priority}`, undefined, affects, priority, workingDir);
    saveDebate(room, workingDir);
    // Log activity
    logActivity({
        session_id: room.orchestration_id || 'debate',
        agent,
        action: 'proposed',
        input_summary: `Raised concern: ${description.slice(0, 100)}`,
        orchestration_id: room.orchestration_id,
        metadata: {
            debate_id: debateId,
            concern_id: concern.id,
            priority,
            affects
        }
    }, workingDir);
    return concern;
}
/**
 * Resolve a concern
 */
export function resolveConcern(debateId, concernId, resolution, resolvedBy, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room) {
        return null;
    }
    const concern = room.concerns.find(c => c.id === concernId);
    if (!concern) {
        return null;
    }
    concern.resolution = resolution;
    concern.resolved_by = resolvedBy.startsWith('brainless:') ? resolvedBy : `brainless:${resolvedBy}`;
    concern.resolved_at = new Date().toISOString();
    saveDebate(room, workingDir);
    return concern;
}
/**
 * Advance debate to next round
 */
export function advanceRound(debateId, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room || room.status !== 'active') {
        return null;
    }
    room.round++;
    // Check if max rounds exceeded
    if (room.round > room.max_rounds) {
        room.status = 'escalated';
    }
    saveDebate(room, workingDir);
    return room;
}
/**
 * Resolve a debate with a decision
 */
export function resolveDebate(debateId, decision, rationale, decidedBy = 'pm', wasConsensus = false, winningProposalId, dissenters, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room) {
        return null;
    }
    const moderator = decidedBy.startsWith('brainless:') ? decidedBy : `brainless:${decidedBy}`;
    room.status = wasConsensus ? 'consensus' : 'resolved';
    room.resolution = {
        decided_by: moderator,
        decision,
        rationale,
        winning_proposal_id: winningProposalId,
        dissenters,
        was_consensus: wasConsensus,
        timestamp: new Date().toISOString()
    };
    // Add decision message
    addMessage(debateId, decidedBy, 'decision', `**Decision**: ${decision}\n\n**Rationale**: ${rationale}`, undefined, undefined, undefined, workingDir);
    saveDebate(room, workingDir);
    // Log activity
    logActivity({
        session_id: room.orchestration_id || 'debate',
        agent: moderator,
        action: 'decided',
        input_summary: `Resolved debate "${room.topic}": ${decision.slice(0, 100)}`,
        orchestration_id: room.orchestration_id,
        metadata: {
            debate_id: debateId,
            was_consensus: wasConsensus
        }
    }, workingDir);
    return room;
}
/**
 * Format debate as readable text
 */
export function formatDebate(debateId, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room) {
        return 'Debate not found.';
    }
    const lines = [
        `# Debate: ${room.topic}`,
        '',
        `**Status**: ${room.status} | **Round**: ${room.round}/${room.max_rounds}`,
        `**Participants**: ${room.participants.map(p => p.replace('brainless:', '')).join(', ')}`,
        ''
    ];
    if (room.context) {
        lines.push('## Context', '', room.context, '');
    }
    lines.push('## Discussion', '');
    for (const msg of room.messages) {
        const agent = msg.from.replace('brainless:', '');
        const icon = getMessageIcon(msg.type);
        lines.push(`**${icon} ${agent}** (${msg.type}):`);
        lines.push(msg.content);
        lines.push('');
    }
    if (room.concerns.length > 0) {
        lines.push('## Cross-Cutting Concerns', '');
        for (const concern of room.concerns) {
            const icon = concern.resolution ? '✅' : '⚠️';
            lines.push(`${icon} **${concern.description}**`);
            lines.push(`   - Priority: ${concern.priority}`);
            lines.push(`   - Affects: ${concern.affects.join(', ')}`);
            lines.push(`   - Raised by: ${concern.raised_by.replace('brainless:', '')}`);
            if (concern.resolution) {
                lines.push(`   - Resolution: ${concern.resolution}`);
            }
            lines.push('');
        }
    }
    if (room.resolution) {
        lines.push('## Resolution', '');
        lines.push(`**Decision**: ${room.resolution.decision}`);
        lines.push('');
        lines.push(`**Rationale**: ${room.resolution.rationale}`);
        lines.push('');
        lines.push(`**Decided by**: ${room.resolution.decided_by.replace('brainless:', '')}`);
        lines.push(`**Consensus**: ${room.resolution.was_consensus ? 'Yes' : 'No'}`);
    }
    return lines.join('\n');
}
/**
 * Get icon for message type
 */
function getMessageIcon(type) {
    const icons = {
        proposal: '💡',
        counter: '↩️',
        support: '👍',
        question: '❓',
        clarify: '💬',
        concern: '⚠️',
        acknowledge: '✓',
        decision: '⚖️'
    };
    return icons[type] || '•';
}
/**
 * Get active concerns (unresolved)
 */
export function getActiveConcerns(debateId, workingDir) {
    const room = loadDebate(debateId, workingDir);
    if (!room) {
        return [];
    }
    return room.concerns.filter(c => !c.resolution);
}
/**
 * Get unresolved blockers
 */
export function getBlockers(debateId, workingDir) {
    return getActiveConcerns(debateId, workingDir).filter(c => c.priority === 'blocker');
}
//# sourceMappingURL=room.js.map