#!/usr/bin/env node
/**
 * Create a formal debate room using infrastructure API
 * Usage: node scripts/brainless-create-debate.mjs <topic> <participants> <moderator> [context]
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';

const DEBATES_DIR = '.brainless/debates';

const [topic, participantsStr, moderator, context] = process.argv.slice(2);

if (!topic || !participantsStr || !moderator) {
  console.error('Usage: brainless-create-debate.mjs <topic> <participants> <moderator> [context]');
  console.error('Example: brainless-create-debate.mjs "JWT vs Sessions" "architect,security-reviewer" "pm" "Auth design decision"');
  process.exit(1);
}

// Ensure directory exists
if (!existsSync(DEBATES_DIR)) {
  mkdirSync(DEBATES_DIR, { recursive: true });
}

const participants = participantsStr.split(',').map(p => p.trim());
const debateId = `debate_${Date.now()}`;

const debate = {
  id: debateId,
  topic: topic,
  participants: participants,
  moderator: moderator,
  context: context || '',
  status: 'open',
  created_at: new Date().toISOString(),
  messages: [],
  proposals: [],
  concerns: [],
  resolution: null
};

writeFileSync(`${DEBATES_DIR}/${debateId}.json`, JSON.stringify(debate, null, 2));

console.log(`✓ Debate created: ${debateId}`);
console.log(`  Topic: ${topic}`);
console.log(`  Participants: ${participants.join(', ')}`);
console.log(`  Moderator: ${moderator}`);
console.log(`  Status: OPEN`);
console.log('');
console.log('To add proposals:');
console.log(`  node scripts/omc-add-proposal.mjs "${debateId}" "agent" "proposal text"`);
console.log('To resolve:');
console.log(`  node scripts/omc-resolve-debate.mjs "${debateId}" "decision" "rationale"`);
