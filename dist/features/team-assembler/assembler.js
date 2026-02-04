/**
 * Team Assembler Implementation
 *
 * Assembles a team of AI agents based on detected project technologies.
 * Uses the project scanner results to recommend the optimal agent composition.
 */
import { AGENT_REGISTRY, TECH_TO_AGENT_MAPPINGS, getAgentMetadata, } from './registry.js';
/** Default configuration */
const DEFAULT_CONFIG = {
    maxAgents: 10,
    minRelevance: 0.3,
    includeCoreAgents: true,
    customAgents: [],
};
/** Core agents that are always recommended for any project */
const CORE_AGENT_NAMES = ['architect', 'executor', 'code-reviewer'];
/**
 * Assemble a team based on project scan results
 */
export function assembleTeam(scanResult, config) {
    const cfg = { ...DEFAULT_CONFIG, ...config };
    // Start with core agents if enabled
    const coreAgents = cfg.includeCoreAgents
        ? CORE_AGENT_NAMES.map(name => ({
            agentName: name,
            reason: 'Core agent for all projects',
            relevance: 1.0,
            matchedTechnologies: [],
        }))
        : [];
    // Track agent scores for deduplication
    const agentScores = new Map();
    // Initialize with core agents
    for (const agent of coreAgents) {
        agentScores.set(agent.agentName, {
            score: agent.relevance,
            reasons: [agent.reason],
            technologies: [],
        });
    }
    // Collect skills to inject
    const skillsToInject = new Set();
    // Process each detected technology
    for (const tech of scanResult.technologies) {
        // Find mapping for this technology
        const mapping = TECH_TO_AGENT_MAPPINGS.find(m => m.technology === tech.name);
        if (mapping) {
            // Add agents from mapping
            for (const agentName of mapping.agents) {
                const existing = agentScores.get(agentName);
                const techScore = mapping.relevance * tech.confidence;
                if (existing) {
                    existing.score = Math.min(1, existing.score + techScore * 0.3);
                    existing.reasons.push(`Specializes in ${tech.displayName}`);
                    existing.technologies.push(tech.name);
                }
                else {
                    agentScores.set(agentName, {
                        score: techScore,
                        reasons: [`Specializes in ${tech.displayName}`],
                        technologies: [tech.name],
                    });
                }
            }
            // Collect skills
            for (const skill of mapping.skills) {
                skillsToInject.add(skill);
            }
        }
        // Also check agent specializations
        for (const agent of AGENT_REGISTRY) {
            if (agent.specializations.includes(tech.name)) {
                const existing = agentScores.get(agent.name);
                const specScore = tech.confidence * 0.5;
                if (existing) {
                    existing.score = Math.min(1, existing.score + specScore);
                    if (!existing.technologies.includes(tech.name)) {
                        existing.reasons.push(`Expertise in ${tech.displayName}`);
                        existing.technologies.push(tech.name);
                    }
                }
                else {
                    agentScores.set(agent.name, {
                        score: specScore,
                        reasons: [`Expertise in ${tech.displayName}`],
                        technologies: [tech.name],
                    });
                }
            }
        }
    }
    // Convert to recommendations and filter
    const allRecommendations = Array.from(agentScores.entries())
        .filter(([_, data]) => data.score >= cfg.minRelevance)
        .map(([name, data]) => ({
        agentName: name,
        reason: data.reasons.join('; '),
        relevance: data.score,
        matchedTechnologies: data.technologies,
    }))
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, cfg.maxAgents);
    // Separate core and tech agents
    const techAgents = allRecommendations.filter(a => !CORE_AGENT_NAMES.includes(a.agentName));
    // Generate summary
    const summary = generateSummary(scanResult, allRecommendations);
    return {
        scanResult,
        coreAgents: allRecommendations.filter(a => CORE_AGENT_NAMES.includes(a.agentName)),
        techAgents,
        allAgents: allRecommendations,
        skillsToInject: Array.from(skillsToInject),
        summary,
        assembledAt: new Date(),
    };
}
/**
 * Generate a human-readable summary
 */
function generateSummary(scanResult, agents) {
    const lines = [];
    lines.push(`## Workforce Provisioning Summary`);
    lines.push('');
    // Tech stack overview
    if (scanResult.primaryLanguages.length > 0) {
        lines.push(`**Languages:** ${scanResult.primaryLanguages.join(', ')}`);
    }
    if (scanResult.primaryFrameworks.length > 0) {
        lines.push(`**Frameworks:** ${scanResult.primaryFrameworks.join(', ')}`);
    }
    lines.push('');
    // Team composition
    lines.push(`### Recommended Team (${agents.length} agents)`);
    lines.push('');
    for (const agent of agents) {
        const metadata = getAgentMetadata(agent.agentName);
        const displayName = metadata?.displayName ?? agent.agentName;
        const tier = metadata?.defaultTier ?? 'sonnet';
        lines.push(`- **${displayName}** (${tier}) - ${agent.reason}`);
    }
    return lines.join('\n');
}
/**
 * Quick team assembly for a project path
 */
export function quickAssemble(projectRoot, config) {
    // Import scanner dynamically to avoid circular deps
    const { scanProject } = require('../project-scanner/scanner.js');
    const scanResult = scanProject(projectRoot);
    return assembleTeam(scanResult, config);
}
/**
 * Format team composition as a resource loading sheet
 */
export function formatResourceSheet(composition) {
    const lines = [];
    lines.push(`# AI Workforce Resource Sheet`);
    lines.push('');
    lines.push(`Generated: ${composition.assembledAt.toISOString()}`);
    lines.push('');
    lines.push(`## Project Analysis`);
    lines.push('');
    lines.push(`- **Root:** ${composition.scanResult.projectRoot}`);
    lines.push(`- **Technologies:** ${composition.scanResult.technologies.length} detected`);
    lines.push(`- **Scan Duration:** ${composition.scanResult.scanDurationMs}ms`);
    lines.push('');
    lines.push(`## Core Team`);
    lines.push('');
    for (const agent of composition.coreAgents) {
        const metadata = getAgentMetadata(agent.agentName);
        lines.push(`### ${metadata?.displayName ?? agent.agentName}`);
        lines.push(`- **Role:** ${metadata?.description ?? 'N/A'}`);
        lines.push(`- **Tier:** ${metadata?.defaultTier ?? 'sonnet'}`);
        lines.push('');
    }
    if (composition.techAgents.length > 0) {
        lines.push(`## Tech-Specific Agents`);
        lines.push('');
        for (const agent of composition.techAgents) {
            const metadata = getAgentMetadata(agent.agentName);
            lines.push(`### ${metadata?.displayName ?? agent.agentName}`);
            lines.push(`- **Role:** ${metadata?.description ?? 'N/A'}`);
            lines.push(`- **Relevance:** ${(agent.relevance * 100).toFixed(0)}%`);
            lines.push(`- **Reason:** ${agent.reason}`);
            if (agent.matchedTechnologies.length > 0) {
                lines.push(`- **Technologies:** ${agent.matchedTechnologies.join(', ')}`);
            }
            lines.push('');
        }
    }
    if (composition.skillsToInject.length > 0) {
        lines.push(`## Skills to Inject`);
        lines.push('');
        for (const skill of composition.skillsToInject) {
            lines.push(`- ${skill}`);
        }
        lines.push('');
    }
    return lines.join('\n');
}
/**
 * Get a subset of team for a specific task type
 */
export function getTeamForTask(composition, taskType) {
    const taskCapabilities = {
        planning: ['planning', 'design', 'analysis'],
        implementation: ['coding', 'debugging'],
        review: ['reviewing', 'security'],
        testing: ['testing'],
    };
    const requiredCapabilities = taskCapabilities[taskType] ?? [];
    return composition.allAgents.filter(agent => {
        const metadata = getAgentMetadata(agent.agentName);
        if (!metadata)
            return false;
        return metadata.capabilities.some(cap => requiredCapabilities.includes(cap));
    });
}
//# sourceMappingURL=assembler.js.map