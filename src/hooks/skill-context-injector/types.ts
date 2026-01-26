/**
 * Skill Context Injector Types
 *
 * Types for the hook that auto-injects skill content
 * into agent context.
 */

import type { BuiltinSkill } from '../../features/builtin-skills/types.js';

/**
 * Configuration for the skill context injector
 */
export interface SkillContextInjectorConfig {
  /** Session ID for context registration */
  sessionId: string;
  /** Whether the hook is enabled */
  enabled: boolean;
}

/**
 * Result of processing skills for injection
 */
export interface SkillInjectionResult {
  /** Number of skills injected */
  injectedCount: number;
  /** Names of skills that were injected */
  injectedSkills: string[];
  /** Whether any skills were injected */
  hasInjections: boolean;
}

/**
 * Input for the skill context injector hook
 */
export interface SkillContextInjectorInput {
  /** Skills to potentially inject */
  skills: BuiltinSkill[];
  /** Session identifier */
  sessionId: string;
}

/**
 * Output from the skill context injector hook
 */
export interface SkillContextInjectorOutput {
  /** Result of the injection process */
  result: SkillInjectionResult;
  /** Any error that occurred */
  error?: string;
}
