#!/usr/bin/env node

/**
 * God-Mode Status Injector
 * 
 * Injects god-mode status into prompts when active.
 * Cross-platform Node.js script.
 * 
 * © Brainless Technologies Pvt. Ltd.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const STATE_FILE = '.brainless/godmode-state.json';

async function main() {
  const cwd = process.cwd();
  const statePath = join(cwd, STATE_FILE);
  
  // Check if god-mode is active
  if (!existsSync(statePath)) {
    // No god-mode active, continue silently
    console.log(JSON.stringify({ continue: true }));
    return;
  }
  
  try {
    const content = readFileSync(statePath, 'utf-8');
    const state = JSON.parse(content);
    
    if (!state.active) {
      console.log(JSON.stringify({ continue: true }));
      return;
    }
    
    // Calculate stats
    const activeLoops = state.ralphLoops?.filter(l => l.status === 'running').length || 0;
    const completedLoops = state.ralphLoops?.filter(l => l.status === 'complete').length || 0;
    const blockedLoops = state.ralphLoops?.filter(l => l.status === 'blocked').length || 0;
    const totalDirs = state.directoriesTotal || 0;
    const analyzedDirs = state.directoriesAnalyzed || 0;
    
    // Build status message
    const status = `
<godmode-status>
## 🔮 God-Mode Active

| Phase | Directories | Ralph Loops | Agents |
|-------|-------------|-------------|--------|
| ${state.phase} | ${analyzedDirs}/${totalDirs} | ${activeLoops} running, ${completedLoops} done, ${blockedLoops} blocked | ${state.totalAgentsSpawned || 0} |

**Task**: ${state.task}
**Session**: ${state.sessionId}

${blockedLoops > 0 ? '⚠️ **Some loops are blocked - check escalations**' : ''}
${state.activeDebates?.length > 0 ? `💬 **${state.activeDebates.length} active debates**` : ''}
</godmode-status>
`;
    
    console.log(JSON.stringify({
      continue: true,
      message: status
    }));
    
  } catch (error) {
    // Error reading state, continue silently
    console.log(JSON.stringify({ continue: true }));
  }
}

main().catch(() => {
  console.log(JSON.stringify({ continue: true }));
});
