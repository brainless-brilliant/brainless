#!/usr/bin/env npx tsx

/**
 * Live Coordinator Test
 * 
 * Simulates a real user request to the coordinator to verify team assembly shows up.
 */

import { coordinatorPreHook } from '../src/hooks/coordinator-pre-hook.js';

async function testLiveCoordinator() {
  console.log('🎬 Live Coordinator Test with Team Assembly\n');
  console.log('═'.repeat(70));
  
  const userRequest = `Build a secure OAuth2 authentication system with comprehensive tests and security audit`;
  
  console.log(`\n📋 User Request:\n"${userRequest}"\n`);
  console.log('─'.repeat(70));
  console.log('\n🤖 Coordinator Starting...\n');
  
  // This is what happens before coordinator starts
  await coordinatorPreHook(userRequest);
  
  console.log('─'.repeat(70));
  console.log('\n✅ Team Assembly Complete');
  console.log('📝 Coordinator would now begin orchestrating the team...\n');
  console.log('═'.repeat(70));
}

testLiveCoordinator().catch(console.error);
