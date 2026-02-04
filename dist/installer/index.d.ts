/**
 * Installer Module
 *
 * Handles installation of OMC agents, commands, and configuration
 * into the Claude Code config directory (~/.claude/).
 *
 * This replicates the functionality of scripts/install.sh but in TypeScript,
 * allowing npm postinstall to work properly.
 *
 * Cross-platform support:
 * - Windows: Uses Node.js-based hook scripts (.mjs)
 * - Unix (macOS, Linux): Uses Bash scripts (.sh) by default
 *
 * Environment variables:
 * - OMC_USE_NODE_HOOKS=1: Force Node.js hooks on any platform
 * - OMC_USE_BASH_HOOKS=1: Force Bash hooks (Unix only)
 */
/** Claude Code configuration directory */
export declare const CLAUDE_CONFIG_DIR: string;
export declare const AGENTS_DIR: string;
export declare const COMMANDS_DIR: string;
export declare const SKILLS_DIR: string;
export declare const HOOKS_DIR: string;
export declare const HUD_DIR: string;
export declare const SETTINGS_FILE: string;
export declare const VERSION_FILE: string;
/**
 * Core commands - DISABLED for v3.0+
 * All commands are now plugin-scoped skills managed by Claude Code.
 * The installer no longer copies commands to ~/.claude/commands/
 */
export declare const CORE_COMMANDS: string[];
/** Current version */
export declare const VERSION = "3.4.0";
/** Installation result */
export interface InstallResult {
    success: boolean;
    message: string;
    installedAgents: string[];
    installedCommands: string[];
    installedSkills: string[];
    hooksConfigured: boolean;
    errors: string[];
}
/** Installation options */
export interface InstallOptions {
    force?: boolean;
    verbose?: boolean;
    skipClaudeCheck?: boolean;
}
/**
 * Check if the current Node.js version meets the minimum requirement
 */
export declare function checkNodeVersion(): {
    valid: boolean;
    current: number;
    required: number;
};
/**
 * Check if Claude Code is installed
 * Uses 'where' on Windows, 'which' on Unix
 */
export declare function isClaudeInstalled(): boolean;
/**
 * Check if we're running in Claude Code plugin context
 *
 * When installed as a plugin, we should NOT copy files to ~/.claude/
 * because the plugin system already handles file access via ${CLAUDE_PLUGIN_ROOT}.
 *
 * Detection method:
 * - Check if CLAUDE_PLUGIN_ROOT environment variable is set (primary method)
 * - This env var is set by the Claude Code plugin system when running plugin hooks
 *
 * @returns true if running in plugin context, false otherwise
 */
export declare function isRunningAsPlugin(): boolean;
/**
 * Install OMC agents, commands, skills, and hooks
 */
export declare function install(options?: InstallOptions): Promise<InstallResult>;
/**
 * Check if OMC is already installed
 */
export declare function isInstalled(): boolean;
/**
 * Get installation info
 */
export declare function getInstallInfo(): {
    version: string;
    installedAt: string;
    method: string;
} | null;
//# sourceMappingURL=index.d.ts.map