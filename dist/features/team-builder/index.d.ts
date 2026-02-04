/**
 * Runtime Team Builder
 *
 * Assembles dynamic agent teams based on:
 * 1. Haiku classifier recommendations
 * 2. Memory layer insights (what worked before)
 * 3. Task complexity signals
 */
import type { ClassificationResult } from '../model-routing/classifier/types.js';
export interface TeamConfig {
    /** Primary agents for this task */
    agents: string[];
    /** Rationale for team composition */
    rationale: string;
    /** Confidence in team selection (0-1) */
    confidence: number;
    /** Data sources used */
    sources: Array<'haiku' | 'memory' | 'fallback'>;
}
/**
 * Build a team for a given task
 */
export declare function buildTeam(taskPrompt: string, classification: ClassificationResult, verbose?: boolean): Promise<TeamConfig>;
/**
 * Get agent info
 */
export declare function getAgentInfo(agentName: string): {
    readonly tier: "medium";
    readonly specialty: "code-implementation";
} | {
    readonly tier: "high";
    readonly specialty: "complex-implementation";
} | {
    readonly tier: "low";
    readonly specialty: "simple-tasks";
} | {
    readonly tier: "high";
    readonly specialty: "architecture-design";
} | {
    readonly tier: "medium";
    readonly specialty: "moderate-analysis";
} | {
    readonly tier: "low";
    readonly specialty: "quick-questions";
} | {
    readonly tier: "high";
    readonly specialty: "security-audit";
} | {
    readonly tier: "low";
    readonly specialty: "quick-security-scan";
} | {
    readonly tier: "medium";
    readonly specialty: "build-errors";
} | {
    readonly tier: "low";
    readonly specialty: "simple-type-fixes";
} | {
    readonly tier: "high";
    readonly specialty: "code-quality";
} | {
    readonly tier: "low";
    readonly specialty: "quick-review";
} | {
    readonly tier: "medium";
    readonly specialty: "test-driven-development";
} | {
    readonly tier: "high";
    readonly specialty: "testing-verification";
} | {
    readonly tier: "medium";
    readonly specialty: "external-research";
} | {
    readonly tier: "low";
    readonly specialty: "quick-docs";
} | {
    readonly tier: "low";
    readonly specialty: "codebase-search";
} | {
    readonly tier: "medium";
    readonly specialty: "thorough-search";
} | {
    readonly tier: "high";
    readonly specialty: "architectural-search";
} | {
    readonly tier: "medium";
    readonly specialty: "ui-ux";
} | {
    readonly tier: "low";
    readonly specialty: "simple-styling";
} | {
    readonly tier: "high";
    readonly specialty: "complex-ui";
} | {
    readonly tier: "high";
    readonly specialty: "strategic-planning";
} | {
    readonly tier: "medium";
    readonly specialty: "requirements-analysis";
} | {
    readonly tier: "low";
    readonly specialty: "documentation";
} | {
    readonly tier: "medium";
    readonly specialty: "data-analysis";
} | {
    readonly tier: "medium";
    readonly specialty: "image-analysis";
};
/**
 * List all available agents
 */
export declare function listAvailableAgents(): Array<{
    name: string;
    tier: string;
    specialty: string;
}>;
//# sourceMappingURL=index.d.ts.map