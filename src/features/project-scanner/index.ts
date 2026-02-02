/**
 * Project Scanner Module
 *
 * Provides project technology detection and analysis capabilities.
 * Used by the workforce provisioner to recommend agents based on
 * the project's tech stack.
 */

// Core scanner
export {
  scanProject,
  formatScanSummary,
  hasTechnology,
  getTechnologiesByCategory,
} from './scanner.js';

// Signatures
export {
  TECHNOLOGY_SIGNATURES,
  getSignaturesByCategory,
  getSignatureByName,
  extendSignatures,
} from './signatures.js';

// Types
export type {
  DetectedTechnology,
  TechnologyCategory,
  TechnologySignature,
  ProjectScanResult,
  ProjectScannerConfig,
  AgentRecommendation,
  ProvisioningRecommendation,
} from './types.js';
