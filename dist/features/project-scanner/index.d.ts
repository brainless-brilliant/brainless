/**
 * Project Scanner Module
 *
 * Provides project technology detection and analysis capabilities.
 * Used by the workforce provisioner to recommend agents based on
 * the project's tech stack.
 */
export { scanProject, formatScanSummary, hasTechnology, getTechnologiesByCategory, } from './scanner.js';
export { TECHNOLOGY_SIGNATURES, getSignaturesByCategory, getSignatureByName, extendSignatures, } from './signatures.js';
export type { DetectedTechnology, TechnologyCategory, TechnologySignature, ProjectScanResult, ProjectScannerConfig, AgentRecommendation, ProvisioningRecommendation, } from './types.js';
//# sourceMappingURL=index.d.ts.map