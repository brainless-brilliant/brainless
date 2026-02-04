/**
 * OMC HUD - Thinking Indicator Element
 *
 * Renders extended thinking mode indicator.
 */
import { RESET } from '../colors.js';
// Local color constants (following context.ts pattern)
const CYAN = '\x1b[36m';
/**
 * Render thinking indicator.
 *
 * Format: thinking
 */
export function renderThinking(state) {
    if (!state?.active)
        return null;
    return `${CYAN}thinking${RESET}`;
}
//# sourceMappingURL=thinking.js.map