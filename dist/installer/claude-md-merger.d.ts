/**
 * CLAUDE.md Merger Module
 *
 * Smart merging of user's existing CLAUDE.md with Brainless plugin defaults.
 * Preserves user SOPs while adding plugin functionality.
 */
export interface CLAUDEmdLocation {
    path: string;
    exists: boolean;
    size: number;
    priority: number;
}
export interface MergeResult {
    success: boolean;
    merged: string;
    model: 'sonnet' | 'opus';
    confidence: number;
    changes: string[];
    error?: string;
}
export interface MergeOptions {
    userChoice?: 'override' | 'merge' | 'skip';
    backupPath?: string;
    verbose?: boolean;
}
/**
 * Detect existing CLAUDE.md files in all possible locations
 */
export declare function detectExistingCLAUDEmd(cwd?: string): CLAUDEmdLocation[];
/**
 * Find the highest priority existing CLAUDE.md
 */
export declare function findPrimaryLocation(locations: CLAUDEmdLocation[]): CLAUDEmdLocation | null;
/**
 * Prompt user for merge choice
 */
export declare function promptUserForChoice(location: CLAUDEmdLocation, verbose?: boolean): Promise<'override' | 'merge' | 'skip'>;
/**
 * Create backup of existing file
 */
export declare function backupExistingFile(filePath: string): string;
/**
 * AI-powered merge using Anthropic API
 */
export declare function mergeCLAUDEmd(userContent: string, pluginContent: string, verbose?: boolean): Promise<MergeResult>;
/**
 * Main merge workflow
 */
export declare function performCLAUDEmdMerge(pluginContent: string, targetPath: string, options?: MergeOptions): Promise<{
    success: boolean;
    message: string;
    backupPath?: string;
}>;
//# sourceMappingURL=claude-md-merger.d.ts.map