/**
 * Project Scanner Implementation
 *
 * Scans a project directory to detect technologies, frameworks,
 * and tools being used. Provides recommendations for agent selection.
 */
import type { DetectedTechnology, ProjectScanResult, ProjectScannerConfig, TechnologyCategory } from './types.js';
/**
 * Scan a project directory for technologies
 */
export declare function scanProject(projectRoot: string, config?: ProjectScannerConfig): ProjectScanResult;
/**
 * Format scan result as a readable summary
 */
export declare function formatScanSummary(result: ProjectScanResult): string;
/**
 * Quick check if a project uses a specific technology
 */
export declare function hasTechnology(result: ProjectScanResult, name: string): boolean;
/**
 * Get technologies by category
 */
export declare function getTechnologiesByCategory(result: ProjectScanResult, category: TechnologyCategory): DetectedTechnology[];
//# sourceMappingURL=scanner.d.ts.map