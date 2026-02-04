/**
 * OMC HUD - Analytics Display
 *
 * Display components for token tracking and cost analytics in the HUD.
 */
export interface AnalyticsDisplay {
    sessionCost: string;
    sessionTokens: string;
    topAgents: string;
    cacheEfficiency: string;
    costColor: 'green' | 'yellow' | 'red';
}
/**
 * Get analytics display data for the current session.
 * Safe to call even if analytics modules are not initialized.
 *
 * @returns Analytics display data with safe defaults
 */
export declare function getAnalyticsDisplay(): Promise<AnalyticsDisplay>;
/**
 * Render analytics as a single-line string for HUD display.
 */
export declare function renderAnalyticsLine(analytics: AnalyticsDisplay): string;
/**
 * Get current session info for HUD display.
 */
export declare function getSessionInfo(): Promise<string>;
//# sourceMappingURL=analytics-display.d.ts.map