/**
 * Project Scanner Module
 *
 * Provides project technology detection and analysis capabilities.
 * Used by the workforce provisioner to recommend agents based on
 * the project's tech stack.
 */
// Core scanner
export { scanProject, formatScanSummary, hasTechnology, getTechnologiesByCategory, } from './scanner.js';
// Signatures
export { TECHNOLOGY_SIGNATURES, getSignaturesByCategory, getSignatureByName, extendSignatures, } from './signatures.js';
//# sourceMappingURL=index.js.map