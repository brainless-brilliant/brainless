/**
 * Pre-Tool Hook for Coordinator
 * 
 * Runs before coordinator starts work - assembles team and displays to user.
 */

import { assembleTeamForTask } from '../agents/team-assembly.js';

export async function coordinatorPreHook(userRequest: string): Promise<void> {
  try {
    // Assemble team (verbose = true to show output)
    const team = await assembleTeamForTask(userRequest, undefined, true);
    
    // Additional context for coordinator
    if (team.agents.length > 0) {
      console.log('\n✨ Your team is ready! Coordinator will now orchestrate their work.\n');
    }
  } catch (err) {
    // Non-blocking - coordinator can proceed even if team assembly fails
    if (process.env.AVK_DEBUG === 'true') {
      console.error('[Team Assembly] Failed:', err);
    }
  }
}
