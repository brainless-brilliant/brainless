/**
 * Skill Context Injector Hook
 *
 * Automatically injects skill content marked with `injectAsContext: true`
 * into the agent context via the ContextCollector.
 *
 * This enables "passive knowledge injection" where agents are empowered
 * with skill content without explicit slash commands.
 */

import { contextCollector } from '../../features/context-injector/index.js';
import { createBuiltinSkills, getBuiltinSkill } from '../../features/builtin-skills/skills.js';
import type { BuiltinSkill } from '../../features/builtin-skills/types.js';
import type {
  SkillContextInjectorConfig,
  SkillInjectionResult,
  SkillContextInjectorInput,
  SkillContextInjectorOutput,
} from './types.js';

// Re-export types
export type {
  SkillContextInjectorConfig,
  SkillInjectionResult,
  SkillContextInjectorInput,
  SkillContextInjectorOutput,
} from './types.js';

/** Default session ID if none provided */
const DEFAULT_SESSION_ID = 'default';

/** Context source type for skills */
const SKILL_CONTEXT_SOURCE = 'skill';

/**
 * Filter skills that should be injected as context
 */
export function getInjectableSkills(skills: BuiltinSkill[]): BuiltinSkill[] {
  return skills.filter(skill => skill.injectAsContext === true);
}

/**
 * Inject a single skill's content into the context
 */
export function injectSkillContent(
  skill: BuiltinSkill,
  sessionId: string = DEFAULT_SESSION_ID
): void {
  contextCollector.register(sessionId, {
    id: `skill-${skill.name}`,
    source: SKILL_CONTEXT_SOURCE,
    content: formatSkillContent(skill),
    priority: 'normal',
    metadata: {
      skillName: skill.name,
      skillDescription: skill.description,
    },
  });
}

/**
 * Format skill content for injection
 */
function formatSkillContent(skill: BuiltinSkill): string {
  const header = `## Skill: ${skill.name}\n\n`;
  const description = skill.description ? `*${skill.description}*\n\n` : '';
  return `${header}${description}${skill.template}`;
}

/**
 * Inject all applicable skills for a session
 */
export function injectAllSkills(sessionId: string = DEFAULT_SESSION_ID): SkillInjectionResult {
  const allSkills = createBuiltinSkills();
  const injectableSkills = getInjectableSkills(allSkills);

  const injectedSkills: string[] = [];

  for (const skill of injectableSkills) {
    injectSkillContent(skill, sessionId);
    injectedSkills.push(skill.name);
  }

  return {
    injectedCount: injectedSkills.length,
    injectedSkills,
    hasInjections: injectedSkills.length > 0,
  };
}

/**
 * Inject a specific skill by name
 */
export function injectSkillByName(
  skillName: string,
  sessionId: string = DEFAULT_SESSION_ID
): boolean {
  const skill = getBuiltinSkill(skillName);
  if (!skill) {
    return false;
  }

  injectSkillContent(skill, sessionId);
  return true;
}

/**
 * Create the skill context injector hook
 *
 * This hook is called during session initialization to
 * inject all skills marked with `injectAsContext: true`.
 */
export function createSkillContextInjectorHook(config?: Partial<SkillContextInjectorConfig>) {
  const enabled = config?.enabled ?? true;
  const sessionId = config?.sessionId ?? DEFAULT_SESSION_ID;

  return {
    /**
     * Initialize and inject all applicable skills
     */
    initialize(): SkillInjectionResult {
      if (!enabled) {
        return {
          injectedCount: 0,
          injectedSkills: [],
          hasInjections: false,
        };
      }

      return injectAllSkills(sessionId);
    },

    /**
     * Inject a specific skill by name
     */
    injectSkill(skillName: string): boolean {
      if (!enabled) {
        return false;
      }
      return injectSkillByName(skillName, sessionId);
    },

    /**
     * Process input and inject skills
     */
    process(input: SkillContextInjectorInput): SkillContextInjectorOutput {
      if (!enabled) {
        return {
          result: {
            injectedCount: 0,
            injectedSkills: [],
            hasInjections: false,
          },
        };
      }

      try {
        const injectableSkills = getInjectableSkills(input.skills);
        const injectedSkills: string[] = [];

        for (const skill of injectableSkills) {
          injectSkillContent(skill, input.sessionId);
          injectedSkills.push(skill.name);
        }

        return {
          result: {
            injectedCount: injectedSkills.length,
            injectedSkills,
            hasInjections: injectedSkills.length > 0,
          },
        };
      } catch (error) {
        return {
          result: {
            injectedCount: 0,
            injectedSkills: [],
            hasInjections: false,
          },
          error: error instanceof Error ? error.message : String(error),
        };
      }
    },

    /**
     * Check if the hook is enabled
     */
    isEnabled(): boolean {
      return enabled;
    },

    /**
     * Get the session ID being used
     */
    getSessionId(): string {
      return sessionId;
    },
  };
}

/** Export a default hook instance */
export const skillContextInjector = createSkillContextInjectorHook();
