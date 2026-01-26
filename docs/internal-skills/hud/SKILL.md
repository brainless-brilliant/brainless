---
name: hud
description: Configure HUD display options (layout, presets, display elements)
role: config-writer  # DOCUMENTATION ONLY - This skill writes to ~/.claude/ paths
scope: ~/.claude/**  # DOCUMENTATION ONLY - Allowed write scope
---

# HUD Skill

Configure the Brainless HUD (Heads-Up Display) for the statusline.

## Quick Commands

| Command | Description |
|---------|-------------|
| `/hud` | Show current HUD status (auto-setup if needed) |
| `/hud setup` | Install/repair HUD statusline |
| `/hud minimal` | Switch to minimal display |
| `/hud focused` | Switch to focused display (default) |
| `/hud full` | Switch to full display |
| `/hud status` | Show detailed HUD status |

## Auto-Setup

When you run `/hud` or `/hud setup`, the system will automatically:
1. Check if `~/.claude/hud/avk-hud.mjs` exists
2. Check if `statusLine` is configured in `~/.claude/settings.json`
3. If missing, create the HUD wrapper script and configure settings
4. Report status and prompt to restart Claude Code if changes were made

**IMPORTANT**: If the argument is `setup` OR if the HUD script doesn't exist at `~/.claude/hud/avk-hud.mjs`, you MUST create the HUD files directly using the instructions below.

### Setup Instructions (Run These Commands)

**Step 1:** Check if setup is needed:
```bash
ls ~/.claude/hud/avk-hud.mjs 2>/dev/null && echo "EXISTS" || echo "MISSING"
```

**Step 2:** Check if the plugin is built:
```bash
PLUGIN_VERSION=$(ls ~/.claude/plugins/cache/anveeksha/workforce/ 2>/dev/null | sort -V | tail -1)
if [ -n "$PLUGIN_VERSION" ]; then
  ls ~/.claude/plugins/cache/anveeksha/workforce/$PLUGIN_VERSION/dist/hud/index.js 2>/dev/null && echo "BUILT" || echo "NOT_BUILT"
fi
```

**If NOT_BUILT**, the plugin needs to be compiled. Run:
```bash
cd ~/.claude/plugins/cache/anveeksha/workforce/$PLUGIN_VERSION && npm install
```

**Step 3:** If avk-hud.mjs is MISSING or argument is `setup`, create the HUD directory and script:

```bash
mkdir -p ~/.claude/hud
```

Then create `~/.claude/hud/avk-hud.mjs`:

```javascript
#!/usr/bin/env node
/**
 * Brainless HUD - Statusline Script
 * Wrapper that imports from plugin cache or development paths
 */

import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

async function main() {
  const home = homedir();

  // 1. Try plugin cache first
  const pluginCacheBase = join(home, ".claude/plugins/cache/anveeksha/workforce");
  if (existsSync(pluginCacheBase)) {
    try {
      const versions = readdirSync(pluginCacheBase);
      if (versions.length > 0) {
        const latestVersion = versions.sort().reverse()[0];
        const pluginPath = join(pluginCacheBase, latestVersion, "dist/hud/index.js");
        if (existsSync(pluginPath)) {
          await import(pluginPath);
          return;
        }
      }
    } catch { /* continue */ }
  }

  // 2. Development paths
  const devPaths = [
    join(home, "wanderlust/anveekshacode/dist/hud/index.js"),
    join(home, "Workspace/anveekshacode/dist/hud/index.js"),
    join(home, "workspace/workforce/dist/hud/index.js"),
  ];

  for (const devPath of devPaths) {
    if (existsSync(devPath)) {
      try {
        await import(devPath);
        return;
      } catch { /* continue */ }
    }
  }

  // 3. Fallback
  console.log("[AVK] run /setup to install properly");
}

main();
```

**Step 4:** Make executable and update settings:
```bash
chmod +x ~/.claude/hud/avk-hud.mjs
```

Update `~/.claude/settings.json`:
```json
{
  "statusLine": {
    "type": "command",
    "command": "node ~/.claude/hud/avk-hud.mjs"
  }
}
```

## Display Presets

### Minimal
```
[AVK] ralph | ultrawork | todos:2/5
```

### Focused (Default)
```
[AVK] ralph:3/10 | orch:designing(3/8) | ctx:67% | agents:2 | todos:2/5
```

### Full
```
[AVK] ralph:3/10 | orch:designing(3/8) | ctx:[████░░]67% | agents:3 | bg:3/5 | todos:2/5
├─ O architect    2m   analyzing architecture patterns...
├─ e explore     45s   searching for test files
└─ s executor     1m   implementing validation logic
```

## Orchestration Status (NEW)

When a `/team` orchestration is active, the HUD displays:

```
orch:designing(3/8)
```

- `orch:` - Orchestration active indicator
- `designing` - Current phase (analyzing, designing, planning, executing, etc.)
- `(3/8)` - Phase progress (3 of 8 phases)

### Orchestration Indicators

| Display | Meaning |
|---------|---------|
| `orch:analyzing(1/8)` | PM analyzing requirements |
| `orch:designing(3/8)` | Architect designing solution |
| `orch:planning(5/8)` | Planner creating work plan |
| `orch:executing(6/8)` | Executor implementing |
| `orch:verifying(7/8)` | Reviewer checking quality |
| `orch:⏳gate` | Waiting for approval gate |

## Display Elements

| Element | Description |
|---------|-------------|
| `[AVK]` | Mode identifier |
| `ralph:3/10` | Ralph loop iteration/max |
| `orch:phase(n/m)` | Orchestration phase |
| `ultrawork` | Ultrawork mode badge |
| `ctx:67%` | Context window usage |
| `agents:2` | Running subagent count |
| `bg:3/5` | Background task slots |
| `todos:2/5` | Todo completion |

## Color Coding

- **Green**: Normal/healthy
- **Yellow**: Warning (context >70%, ralph >7)
- **Red**: Critical (context >85%, ralph at max)
- **Cyan**: Orchestration active

## Troubleshooting

If the HUD is not showing:
1. Run `/hud setup` to auto-install and configure
2. Restart Claude Code after setup completes
3. If still not working, check settings.json has statusLine configured

---

© Brainless Technologies Pvt. Ltd.

