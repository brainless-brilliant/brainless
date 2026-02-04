/**
 * Runtime Team Builder
 *
 * Assembles dynamic agent teams based on:
 * 1. Haiku classifier recommendations
 * 2. Memory layer insights (what worked before)
 * 3. Task complexity signals
 */
import { memory } from '../memory/index.js';
import { formatTeamIntro, getWittyMessage } from './personas.js';
/**
 * Available agents and their specializations
 */
const AGENT_REGISTRY = {
    // Core implementation
    'executor': { tier: 'medium', specialty: 'code-implementation' },
    'executor-high': { tier: 'high', specialty: 'complex-implementation' },
    'executor-low': { tier: 'low', specialty: 'simple-tasks' },
    // Analysis & Architecture
    'architect': { tier: 'high', specialty: 'architecture-design' },
    'architect-medium': { tier: 'medium', specialty: 'moderate-analysis' },
    'architect-low': { tier: 'low', specialty: 'quick-questions' },
    // Security & Quality
    'security-reviewer': { tier: 'high', specialty: 'security-audit' },
    'security-reviewer-low': { tier: 'low', specialty: 'quick-security-scan' },
    'build-fixer': { tier: 'medium', specialty: 'build-errors' },
    'build-fixer-low': { tier: 'low', specialty: 'simple-type-fixes' },
    'code-reviewer': { tier: 'high', specialty: 'code-quality' },
    'code-reviewer-low': { tier: 'low', specialty: 'quick-review' },
    'tdd-guide': { tier: 'medium', specialty: 'test-driven-development' },
    'qa-tester': { tier: 'high', specialty: 'testing-verification' },
    // Research & Navigation
    'researcher': { tier: 'medium', specialty: 'external-research' },
    'researcher-low': { tier: 'low', specialty: 'quick-docs' },
    'explore': { tier: 'low', specialty: 'codebase-search' },
    'explore-medium': { tier: 'medium', specialty: 'thorough-search' },
    'explore-high': { tier: 'high', specialty: 'architectural-search' },
    // Specialized
    'designer': { tier: 'medium', specialty: 'ui-ux' },
    'designer-low': { tier: 'low', specialty: 'simple-styling' },
    'designer-high': { tier: 'high', specialty: 'complex-ui' },
    'planner': { tier: 'high', specialty: 'strategic-planning' },
    'analyst': { tier: 'medium', specialty: 'requirements-analysis' },
    'writer': { tier: 'low', specialty: 'documentation' },
    'scientist': { tier: 'medium', specialty: 'data-analysis' },
    'vision': { tier: 'medium', specialty: 'image-analysis' },
};
/**
 * Build a team for a given task
 */
export async function buildTeam(taskPrompt, classification, verbose = false) {
    if (verbose)
        console.log(`\n${getWittyMessage('team-assembly')}\n`);
    const sources = [];
    let agents = [];
    let rationale = '';
    let confidence = 0.8;
    // 1. Use Haiku recommendations if available
    if (classification.recommendedAgents && classification.recommendedAgents.length > 0) {
        const validAgents = classification.recommendedAgents.filter(a => a in AGENT_REGISTRY);
        if (validAgents.length > 0) {
            if (verbose)
                console.log(getWittyMessage('haiku-success'));
            agents = validAgents;
            rationale = classification.teamRationale || 'Haiku classifier recommendation';
            confidence = classification.confidence || 0.8;
            sources.push('haiku');
        }
    }
    // 2. Augment with memory insights
    try {
        const keywords = extractKeywords(taskPrompt);
        if (keywords.length > 0) {
            if (verbose)
                console.log(getWittyMessage('memory-search'));
            const memoryResults = memory.search(keywords.join(' OR '), 3);
            if (memoryResults.length > 0) {
                sources.push('memory');
                // TODO: Extract patterns from past observations (e.g., "Angular tasks often needed build-fixer")
                // For now, just note that we consulted memory
                if (!rationale.includes('memory')) {
                    rationale += ` (informed by ${memoryResults.length} similar past tasks)`;
                }
            }
        }
    }
    catch (err) {
        // Memory search failed, continue without it
    }
    // 3. Fallback to capability-based team selection
    if (agents.length === 0) {
        if (verbose)
            console.log(getWittyMessage('fallback'));
        agents = selectTeamFromCapabilities(classification);
        rationale = 'Selected based on task capabilities';
        confidence = 0.6;
        sources.push('fallback');
    }
    // 4. Log team assembly
    if (verbose && agents.length > 0) {
        console.log(formatTeamIntro(agents));
        console.log(`\n💡 ${rationale}\n`);
    }
    return {
        agents,
        rationale,
        confidence,
        sources,
    };
}
/**
 * Select team based on boolean capability flags (fallback)
 */
function selectTeamFromCapabilities(classification) {
    const team = [];
    const caps = classification.capabilities;
    if (caps.needsArchitecture) {
        team.push('architect');
    }
    if (caps.needsSecurity) {
        team.push('security-reviewer');
    }
    if (caps.needsTesting) {
        team.push('qa-tester');
    }
    if (caps.needsSearch) {
        team.push('explore');
    }
    // Default to executor for implementation
    if (caps.needsDelegation || team.length === 0) {
        team.push('executor');
    }
    return team;
}
/**
 * Extract search keywords from task prompt
 */
function extractKeywords(prompt) {
    const keywords = [];
    const lowercasePrompt = prompt.toLowerCase();
    // Technology/framework keywords
    const techs = ['angular', 'react', 'vue', 'node', 'typescript', 'python', 'auth', 'build', 'test', 'deploy'];
    for (const tech of techs) {
        if (lowercasePrompt.includes(tech)) {
            keywords.push(tech);
        }
    }
    // Action keywords
    const actions = ['fix', 'build', 'refactor', 'implement', 'deploy', 'debug', 'test'];
    for (const action of actions) {
        if (lowercasePrompt.includes(action)) {
            keywords.push(action);
        }
    }
    return keywords.slice(0, 3); // Limit to 3 keywords
}
/**
 * Get agent info
 */
export function getAgentInfo(agentName) {
    return AGENT_REGISTRY[agentName] || null;
}
/**
 * List all available agents
 */
export function listAvailableAgents() {
    return Object.entries(AGENT_REGISTRY).map(([name, info]) => ({
        name,
        ...info,
    }));
}
//# sourceMappingURL=index.js.map