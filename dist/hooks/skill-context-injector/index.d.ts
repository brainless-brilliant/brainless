/**
 * Skill Context Injector Hook
 *
 * Automatically injects skill content marked with `injectAsContext: true`
 * into the agent context via the ContextCollector.
 *
 * This enables "passive knowledge injection" where agents are empowered
 * with skill content without explicit slash commands.
 */
import type { BuiltinSkill } from '../../features/builtin-skills/types.js';
import type { SkillContextInjectorConfig, SkillInjectionResult, SkillContextInjectorInput, SkillContextInjectorOutput } from './types.js';
export type { SkillContextInjectorConfig, SkillInjectionResult, SkillContextInjectorInput, SkillContextInjectorOutput, } from './types.js';
/**
 * Filter skills that should be injected as context
 */
export declare function getInjectableSkills(skills: BuiltinSkill[]): BuiltinSkill[];
/**
 * Inject a single skill's content into the context
 */
export declare function injectSkillContent(skill: BuiltinSkill, sessionId?: string): void;
/**
 * Inject all applicable skills for a session
 */
export declare function injectAllSkills(sessionId?: string): SkillInjectionResult;
/**
 * Inject a specific skill by name
 */
export declare function injectSkillByName(skillName: string, sessionId?: string): boolean;
/**
 * Create the skill context injector hook
 *
 * This hook is called during session initialization to
 * inject all skills marked with `injectAsContext: true`.
 */
export declare function createSkillContextInjectorHook(config?: Partial<SkillContextInjectorConfig>): {
    /**
     * Initialize and inject all applicable skills
     */
    initialize(): SkillInjectionResult;
    /**
     * Inject a specific skill by name
     */
    injectSkill(skillName: string): boolean;
    /**
     * Process input and inject skills
     */
    process(input: SkillContextInjectorInput): SkillContextInjectorOutput;
    /**
     * Check if the hook is enabled
     */
    isEnabled(): boolean;
    /**
     * Get the session ID being used
     */
    getSessionId(): string;
};
/** Export a default hook instance */
export declare const skillContextInjector: {
    /**
     * Initialize and inject all applicable skills
     */
    initialize(): SkillInjectionResult;
    /**
     * Inject a specific skill by name
     */
    injectSkill(skillName: string): boolean;
    /**
     * Process input and inject skills
     */
    process(input: SkillContextInjectorInput): SkillContextInjectorOutput;
    /**
     * Check if the hook is enabled
     */
    isEnabled(): boolean;
    /**
     * Get the session ID being used
     */
    getSessionId(): string;
};
//# sourceMappingURL=index.d.ts.map