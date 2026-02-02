#!/usr/bin/env node
/**
 * Transition orchestration phase using infrastructure API
 * Usage: node scripts/brainless-transition-phase.mjs <orch_id> <new_phase>
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const ORCH_DIR = '.brainless/orchestration';
const ACTIVE_FILE = `${ORCH_DIR}/active.json`;

const PHASES = ['initialized', 'analyzing', 'designing', 'planning', 'executing', 'verifying', 'completed'];

const [orchId, newPhase] = process.argv.slice(2);

if (!orchId || !newPhase) {
  console.error('Usage: brainless-transition-phase.mjs <orch_id> <new_phase>');
  console.error('Phases: initialized, analyzing, designing, planning, executing, verifying, completed');
  process.exit(1);
}

if (!PHASES.includes(newPhase)) {
  console.error(`Invalid phase: ${newPhase}`);
  console.error(`Valid phases: ${PHASES.join(', ')}`);
  process.exit(1);
}

// Ensure directory exists
if (!existsSync(ORCH_DIR)) {
  mkdirSync(ORCH_DIR, { recursive: true });
}

const orchFile = `${ORCH_DIR}/${orchId}.json`;

let orch;
if (existsSync(orchFile)) {
  orch = JSON.parse(readFileSync(orchFile, 'utf-8'));
} else {
  orch = {
    id: orchId,
    task: 'Unknown task',
    startedAt: new Date().toISOString(),
    phase: 'initialized',
    phases_completed: []
  };
}

const oldPhase = orch.phase;
orch.phase = newPhase;
orch.phases_completed = orch.phases_completed || [];
if (!orch.phases_completed.includes(oldPhase)) {
  orch.phases_completed.push(oldPhase);
}
orch.lastUpdated = new Date().toISOString();

writeFileSync(orchFile, JSON.stringify(orch, null, 2));

// Update active reference
writeFileSync(ACTIVE_FILE, JSON.stringify({ activeOrchestration: orchId, phase: newPhase }, null, 2));

const phaseIndex = PHASES.indexOf(newPhase);
const progress = Math.round((phaseIndex / (PHASES.length - 1)) * 100);

console.log(`✓ Phase transition: ${oldPhase} → ${newPhase}`);
console.log(`  Orchestration: ${orchId}`);
console.log(`  Progress: ${progress}% (${phaseIndex + 1}/${PHASES.length})`);
console.log(`  Phases completed: ${orch.phases_completed.join(', ')}`);
