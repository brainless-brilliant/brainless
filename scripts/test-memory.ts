
import { memory } from '../src/features/memory/index.js';

async function main() {
  console.log('🧠 Testing Memory Layer...');

  // 1. Simulate a Tool Interaction
  console.log('📝 Recording interaction (Fixing race condition in AuthWrapper)...');
  
  const toolName = 'Edit';
  const cwd = process.cwd();
  const project = 'brainless-test';
  
  const input = {
    path: 'src/auth/AuthWrapper.ts',
    original: 'if (this.authenticating) return;',
    replacement: 'if (this.mutex.isLocked()) await this.mutex.waitForUnlock();'
  };
  
  const output = {
    result: 'File successfully edited.'
  };

  await memory.recordInteraction(toolName, input, output, cwd, project);

  // 2a. Manually insert a record for testing (in case API key is missing and compression is skipped)
  // Accessing private store via any cast for testing purposes
  const store = (memory as any).store;
  store.saveObservation({
    memory_session_id: 'test-session',
    project: 'brainless-test',
    type: 'bugfix',
    title: 'Fixed Race Condition in AuthWrapper',
    subtitle: 'Added mutex to prevent double-submission',
    facts: ['Added Mutex lock', 'Prevented race condition'],
    narrative: 'The auth wrapper was submitting twice. Added a mutex to serialize requests.',
    concepts: ['concurrency', 'mutex', 'race-condition'],
    files_read: ['src/auth/AuthWrapper.ts'],
    files_modified: ['src/auth/AuthWrapper.ts'],
    prompt_number: 1,
    discovery_tokens: 0,
    created_at_epoch: Date.now()
  });

  // 2. Wait for async compression (simulated)
  console.log('⏳ Waiting for processing (2s)...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 3. Search
  console.log('🔍 Searching for "mutex"...');
  const results = memory.search('mutex');

  if (results.length > 0) {
    console.log('✅ Found match!');
    console.log('---');
    console.log(`Title: ${results[0].title}`);
    console.log(`Type: ${results[0].type}`);
    console.log(`Narrative: ${results[0].narrative}`);
    console.log('---');
  } else {
    console.log('❌ No results found. (Check API Key or Haiku response)');
  }
}

main().catch(console.error);
