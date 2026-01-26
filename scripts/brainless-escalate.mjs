#!/usr/bin/env node
/**
 * Log escalation to user and pause orchestration
 * Usage: node scripts/brainless-escalate.mjs "<topic>" "<context>" "<question>" "<options>"
 */

import { appendFileSync, mkdirSync, existsSync } from 'fs';

const ESCALATIONS_FILE = '.brainless/escalations/log.jsonl';
const ESCALATIONS_DIR = '.brainless/escalations';

const [topic, context, question, options] = process.argv.slice(2);

if (!topic || !question) {
  console.error('Usage: brainless-escalate.mjs "<topic>" "<context>" "<question>" "<options>"');
  console.error('Example: brainless-escalate.mjs "Token expiry" "Implementing auth" "7 days or 30 days?" "1. 7 days|2. 30 days"');
  process.exit(1);
}

// Ensure directory exists
if (!existsSync(ESCALATIONS_DIR)) {
  mkdirSync(ESCALATIONS_DIR, { recursive: true });
}

const escalation = {
  timestamp: new Date().toISOString(),
  topic: topic,
  context: context || '',
  question: question,
  options: options ? options.split('|') : [],
  status: 'pending'
};

appendFileSync(ESCALATIONS_FILE, JSON.stringify(escalation) + '\n');

// Output formatted escalation for user
console.log('');
console.log('## ⏸️ Orchestration Paused - User Input Required');
console.log('');
console.log(`**Topic:** ${topic}`);
console.log(`**Context:** ${context || 'N/A'}`);
console.log('');
console.log('### Question');
console.log(question);
console.log('');

if (options) {
  console.log('### Options');
  options.split('|').forEach((opt, i) => {
    console.log(`${i + 1}. ${opt.trim()}`);
  });
  console.log('');
}

console.log('---');
console.log('Reply with your choice to continue orchestration.');
console.log('');
