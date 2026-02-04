/**
 * Technology Signatures Registry
 *
 * Defines signatures for detecting technologies in a project.
 * Each signature specifies how to identify a technology via
 * file patterns, package names, or content patterns.
 */
import type { TechnologySignature } from './types.js';
/**
 * Built-in technology signatures
 */
export declare const TECHNOLOGY_SIGNATURES: TechnologySignature[];
/**
 * Get all signatures for a specific category
 */
export declare function getSignaturesByCategory(category: string): TechnologySignature[];
/**
 * Get a signature by name
 */
export declare function getSignatureByName(name: string): TechnologySignature | undefined;
/**
 * Add custom signatures
 */
export declare function extendSignatures(signatures: TechnologySignature[]): TechnologySignature[];
//# sourceMappingURL=signatures.d.ts.map