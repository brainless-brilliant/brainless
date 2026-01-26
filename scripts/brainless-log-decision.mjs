#!/usr/bin/env node
/**
 * Log a PM decision using the infrastructure API
 * Usage: node scripts/brainless-log-decision.mjs <phase> <topic> <chosen> <rationale> <made_by>
 */

import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const DECISIONS_FILE = '.brainless/transcripts/decisions.jsonl';

const [phase, topic, chosen, rationale, madeBy] = process.argv.slice(2);

if (!phase || !topic || !chosen) {
  console.error('Usage: brainless-log-decision.mjs <phase> <topic> <chosen> <rationale> <made_by>');
  console.error('Example: brainless-log-decision.mjs "designing" "Auth method" "JWT" "Better for microservices" "pm"');
  process.exit(1);
}

// Ensure directory exists
const dir = dirname(DECISIONS_FILE);
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}

const decision = {
  timestamp: new Date().toISOString(),
  phase: phase,
  topic: topic,
  chosen: chosen,
  rationale: rationale || '',
  made_by: madeBy || 'pm'
};

appendFileSync(DECISIONS_FILE, JSON.stringify(decision) + '\n');

console.log(`✓ Decision logged: ${topic} → ${chosen}`);
console.log(`  Phase: ${phase}`);
console.log(`  Rationale: ${rationale || '(none provided)'}`);
