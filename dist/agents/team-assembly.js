/**
 * Team Assembly Hook
 *
 * Integrates runtime team builder with task orchestration.
 * Called at the start of each PM task to assemble the optimal team.
 */
import { classifyTask } from '../features/model-routing/classifier/index.js';
import { buildTeam } from '../features/team-builder/index.js';
import { formatTeamIntro } from '../features/team-builder/personas.js';
/**
 * Assemble a team for a given user request
 */
export async function assembleTeamForTask(userRequest, fallbackCapabilities, verbose = true) {
    // 1. Classify the task
    const classification = await classifyTask(userRequest, fallbackCapabilities || (() => ({
        needsDelegation: true,
        needsSearch: false,
        needsArchitecture: false,
        needsSecurity: false,
        needsTesting: false,
        needsToolGuidance: false,
    })));
    // 2. Build the team
    const team = await buildTeam(userRequest, classification, verbose);
    // 3. Log team assembly (if verbose)
    if (verbose && team.agents.length > 0) {
        console.log('\n' + '═'.repeat(60));
        console.log(formatTeamIntro(team.agents));
        console.log(`\n💡 ${team.rationale}`);
        console.log(`📊 Confidence: ${(team.confidence * 100).toFixed(0)}% | Sources: ${team.sources.join(' + ')}`);
        console.log('═'.repeat(60) + '\n');
    }
    return team;
}
/**
 * Get team assembly prompt for PM
 */
export function getTeamAssemblyPrompt(team) {
    if (team.agents.length === 0) {
        return 'No specialized team assembled. Proceed with available tools.';
    }
    const agentList = team.agents.map(a => `\`${a}\``).join(', ');
    return `**Your Assembled Team:** ${agentList}

These agents were selected based on:
- ${team.rationale}
- Confidence: ${(team.confidence * 100).toFixed(0)}%

Delegate work to these specialists using the Task tool with \`subagent_type\` parameter.`;
}
//# sourceMappingURL=team-assembly.js.map