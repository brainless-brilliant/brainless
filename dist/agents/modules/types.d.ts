/**
 * Prompt Module Types
 *
 * Type definitions for the modular prompt composition system.
 */
/**
 * Available prompt module identifiers
 */
export type PromptModuleId = 'core-identity' | 'delegation-rules' | 'search-guidance' | 'architecture-guidance' | 'security-rules' | 'memory-access' | 'testing-guidance' | 'tool-usage' | 'completion-rules';
/**
 * Task capabilities detected from prompt analysis
 */
export interface TaskCapabilities {
    /** Task requires delegation to sub-agents */
    needsDelegation: boolean;
    /** Task is a search/find operation */
    needsSearch: boolean;
    /** Task involves architecture/refactoring */
    needsArchitecture: boolean;
    /** Task is in security domain */
    needsSecurity: boolean;
    /** Task involves testing */
    needsTesting: boolean;
    /** Task is tool-heavy */
    needsToolGuidance: boolean;
}
/**
 * A prompt module definition
 */
export interface PromptModule {
    /** Unique identifier */
    id: PromptModuleId;
    /** Human-readable name */
    name: string;
    /** Estimated token count */
    estimatedTokens: number;
    /** Whether this module is always included */
    alwaysInclude: boolean;
    /** Function to check if module should be included */
    shouldInclude: (capabilities: TaskCapabilities) => boolean;
    /** The actual prompt content */
    content: string;
}
/**
 * Result of prompt composition
 */
export interface ComposedPrompt {
    /** The assembled prompt */
    prompt: string;
    /** Modules that were included */
    includedModules: PromptModuleId[];
    /** Estimated total tokens */
    estimatedTokens: number;
}
//# sourceMappingURL=types.d.ts.map