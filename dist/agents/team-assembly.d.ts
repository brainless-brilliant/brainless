/**
 * Team Assembly Hook
 *
 * Integrates runtime team builder with task orchestration.
 * Called at the start of each PM task to assemble the optimal team.
 */
import { type TeamConfig } from '../features/team-builder/index.js';
import type { TaskCapabilities } from './modules/types.js';
/**
 * Assemble a team for a given user request
 */
export declare function assembleTeamForTask(userRequest: string, fallbackCapabilities?: () => TaskCapabilities, verbose?: boolean): Promise<TeamConfig>;
/**
 * Get team assembly prompt for PM
 */
export declare function getTeamAssemblyPrompt(team: TeamConfig): string;
//# sourceMappingURL=team-assembly.d.ts.map