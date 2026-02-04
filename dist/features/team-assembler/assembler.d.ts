/**
 * Team Assembler Implementation
 *
 * Assembles a team of AI agents based on detected project technologies.
 * Uses the project scanner results to recommend the optimal agent composition.
 */
import type { ProjectScanResult, AgentRecommendation } from '../project-scanner/types.js';
import type { TeamComposition, TeamAssemblerConfig } from './types.js';
/**
 * Assemble a team based on project scan results
 */
export declare function assembleTeam(scanResult: ProjectScanResult, config?: TeamAssemblerConfig): TeamComposition;
/**
 * Quick team assembly for a project path
 */
export declare function quickAssemble(projectRoot: string, config?: TeamAssemblerConfig): TeamComposition;
/**
 * Format team composition as a resource loading sheet
 */
export declare function formatResourceSheet(composition: TeamComposition): string;
/**
 * Get a subset of team for a specific task type
 */
export declare function getTeamForTask(composition: TeamComposition, taskType: 'planning' | 'implementation' | 'review' | 'testing'): AgentRecommendation[];
//# sourceMappingURL=assembler.d.ts.map