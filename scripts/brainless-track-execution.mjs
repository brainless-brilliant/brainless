#!/usr/bin/env node
/**
 * Track execution progress with abort threshold monitoring
 * Usage: 
 *   node scripts/brainless-track-execution.mjs init <total_tasks>
 *   node scripts/brainless-track-execution.mjs update <task_id> <status>
 *   node scripts/brainless-track-execution.mjs status
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const TRACKER_FILE = '.brainless/orchestration/execution-tracker.json';
const ABORT_THRESHOLD = 0.5; // 50% failure rate
const MIN_TASKS_FOR_ABORT = 3; // Need at least 3 tasks before considering abort

function ensureDir() {
  const dir = '.brainless/orchestration';
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function loadTracker() {
  if (existsSync(TRACKER_FILE)) {
    return JSON.parse(readFileSync(TRACKER_FILE, 'utf-8'));
  }
  return { 
    total: 0, 
    completed: 0, 
    failed: 0, 
    in_progress: 0,
    tasks: {},
    started_at: null,
    last_updated: null
  };
}

function saveTracker(tracker) {
  tracker.last_updated = new Date().toISOString();
  writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2));
}

function checkAbort(tracker) {
  const attempted = tracker.completed + tracker.failed;
  if (attempted < MIN_TASKS_FOR_ABORT) return false;
  
  const failRate = tracker.failed / attempted;
  return failRate >= ABORT_THRESHOLD;
}

const [action, arg1, arg2] = process.argv.slice(2);

if (!action) {
  console.error('Usage:');
  console.error('  brainless-track-execution.mjs init <total_tasks>');
  console.error('  brainless-track-execution.mjs update <task_id> <completed|failed|in_progress>');
  console.error('  brainless-track-execution.mjs status');
  process.exit(1);
}

ensureDir();
const tracker = loadTracker();

switch (action) {
  case 'init': {
    const total = parseInt(arg1, 10);
    if (isNaN(total) || total <= 0) {
      console.error('Error: total_tasks must be a positive number');
      process.exit(1);
    }
    tracker.total = total;
    tracker.completed = 0;
    tracker.failed = 0;
    tracker.in_progress = 0;
    tracker.tasks = {};
    tracker.started_at = new Date().toISOString();
    saveTracker(tracker);
    console.log(`✓ Execution tracker initialized`);
    console.log(`  Total tasks: ${total}`);
    console.log(`  Abort threshold: ${ABORT_THRESHOLD * 100}% failure rate`);
    break;
  }
  
  case 'update': {
    const taskId = arg1;
    const status = arg2;
    
    if (!taskId || !status) {
      console.error('Error: task_id and status required');
      process.exit(1);
    }
    
    if (!['completed', 'failed', 'in_progress'].includes(status)) {
      console.error('Error: status must be completed, failed, or in_progress');
      process.exit(1);
    }
    
    const oldStatus = tracker.tasks[taskId];
    
    // Decrement old status count
    if (oldStatus === 'completed') tracker.completed--;
    if (oldStatus === 'failed') tracker.failed--;
    if (oldStatus === 'in_progress') tracker.in_progress--;
    
    // Update task
    tracker.tasks[taskId] = status;
    
    // Increment new status count
    if (status === 'completed') tracker.completed++;
    if (status === 'failed') tracker.failed++;
    if (status === 'in_progress') tracker.in_progress++;
    
    saveTracker(tracker);
    
    const attempted = tracker.completed + tracker.failed;
    const failRate = attempted > 0 ? (tracker.failed / attempted) : 0;
    const progress = Math.round((tracker.completed / tracker.total) * 100);
    
    console.log(`✓ ${taskId}: ${status}`);
    console.log(`  Progress: ${tracker.completed}/${tracker.total} (${progress}%)`);
    console.log(`  In progress: ${tracker.in_progress}`);
    console.log(`  Failed: ${tracker.failed} (${Math.round(failRate * 100)}% failure rate)`);
    
    if (checkAbort(tracker)) {
      console.log('');
      console.log('⛔ ABORT THRESHOLD REACHED ⛔');
      console.log(`   Failure rate: ${Math.round(failRate * 100)}% (threshold: ${ABORT_THRESHOLD * 100}%)`);
      console.log('   Recommendation: STOP execution and investigate failures');
      console.log('');
      console.log('   Failed tasks:');
      Object.entries(tracker.tasks)
        .filter(([_, s]) => s === 'failed')
        .forEach(([id, _]) => console.log(`     - ${id}`));
    }
    break;
  }
  
  case 'status': {
    const attempted = tracker.completed + tracker.failed;
    const failRate = attempted > 0 ? (tracker.failed / attempted) : 0;
    const progress = tracker.total > 0 ? Math.round((tracker.completed / tracker.total) * 100) : 0;
    
    console.log('═══════════════════════════════════════');
    console.log('  EXECUTION STATUS');
    console.log('═══════════════════════════════════════');
    console.log(`  Total tasks:   ${tracker.total}`);
    console.log(`  Completed:     ${tracker.completed} (${progress}%)`);
    console.log(`  In progress:   ${tracker.in_progress}`);
    console.log(`  Failed:        ${tracker.failed}`);
    console.log(`  Failure rate:  ${Math.round(failRate * 100)}%`);
    console.log(`  Started:       ${tracker.started_at || 'N/A'}`);
    console.log(`  Last updated:  ${tracker.last_updated || 'N/A'}`);
    console.log('');
    
    if (checkAbort(tracker)) {
      console.log('⛔ STATUS: ABORT RECOMMENDED');
    } else if (tracker.completed === tracker.total) {
      console.log('✅ STATUS: COMPLETE');
    } else {
      console.log('🔄 STATUS: IN PROGRESS');
    }
    break;
  }
  
  default:
    console.error(`Unknown action: ${action}`);
    process.exit(1);
}
