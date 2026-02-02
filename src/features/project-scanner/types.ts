/**
 * Project Scanner Types
 *
 * Type definitions for project technology detection and analysis.
 */

/**
 * Detected technology/framework with confidence level
 */
export interface DetectedTechnology {
  /** Technology identifier (e.g., 'react', 'typescript', 'python') */
  name: string;

  /** Human-readable display name */
  displayName: string;

  /** Category of technology */
  category: TechnologyCategory;

  /** Detection confidence (0-1) */
  confidence: number;

  /** Version if detected */
  version?: string;

  /** Source file(s) that led to detection */
  detectedFrom: string[];
}

/**
 * Categories of technologies
 */
export type TechnologyCategory =
  | 'language'
  | 'framework'
  | 'library'
  | 'build-tool'
  | 'testing'
  | 'database'
  | 'cloud'
  | 'devops'
  | 'other';

/**
 * Signature for detecting a technology
 */
export interface TechnologySignature {
  /** Technology identifier */
  name: string;

  /** Display name */
  displayName: string;

  /** Category */
  category: TechnologyCategory;

  /** File patterns to look for (glob-like) */
  filePatterns?: string[];

  /** Package names to detect in package.json dependencies */
  npmPackages?: string[];

  /** Package names to detect in requirements.txt or pyproject.toml */
  pythonPackages?: string[];

  /** Content patterns to search for in files (regex) */
  contentPatterns?: Array<{
    file: string;
    pattern: RegExp;
  }>;

  /** Configuration files that indicate this technology */
  configFiles?: string[];
}

/**
 * Result of scanning a project
 */
export interface ProjectScanResult {
  /** Root directory scanned */
  projectRoot: string;

  /** All detected technologies */
  technologies: DetectedTechnology[];

  /** Primary language(s) */
  primaryLanguages: string[];

  /** Primary framework(s) */
  primaryFrameworks: string[];

  /** Scan timestamp */
  scannedAt: Date;

  /** Scan duration in ms */
  scanDurationMs: number;
}

/**
 * Scanner configuration options
 */
export interface ProjectScannerConfig {
  /** Maximum directory depth to scan */
  maxDepth?: number;

  /** Directories to ignore */
  ignoreDirs?: string[];

  /** Additional signatures to include */
  additionalSignatures?: TechnologySignature[];

  /** Minimum confidence threshold (0-1) */
  minConfidence?: number;
}

/**
 * Recommended agents based on detected technologies
 */
export interface AgentRecommendation {
  /** Agent name */
  agentName: string;

  /** Why this agent is recommended */
  reason: string;

  /** Relevance score (0-1) */
  relevance: number;

  /** Technologies that triggered this recommendation */
  matchedTechnologies: string[];
}

/**
 * Full provisioning recommendation
 */
export interface ProvisioningRecommendation {
  /** Scan result */
  scanResult: ProjectScanResult;

  /** Recommended agents */
  agents: AgentRecommendation[];

  /** Skills to inject as context */
  skillsToInject: string[];

  /** Summary for display */
  summary: string;
}
