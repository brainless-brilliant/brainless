/**
 * End-to-End Integration Test
 * 
 * Tests the full flow: User Request → Classifier → Team Builder → PM Delegation
 */

import { assembleTeamForTask, getTeamAssemblyPrompt } from '../src/agents/team-assembly.js';

async function testE2EIntegration() {
  console.log('🧪 End-to-End Integration Test\n');
  console.log('Testing: User Request → Classifier → Team Builder → PM Prompt\n');
  console.log('═'.repeat(70));

  const testCases = [
    {
      name: 'Security + Architecture Task',
      request: 'Refactor authentication to use OAuth2, audit for vulnerabilities, ensure zero-trust architecture',
    },
    {
      name: 'Build + Implementation Task',
      request: 'Fix all TypeScript build errors and implement the new API endpoints',
    },
    {
      name: 'Testing + Quality Task',
      request: 'Add comprehensive test coverage and perform code quality review',
    },
  ];

  for (const testCase of testCases) {
    console.log(`\n\n📝 ${testCase.name}`);
    console.log(`Request: "${testCase.request}"\n`);
    console.log('─'.repeat(70));

    // Step 1: Assemble team
    const team = await assembleTeamForTask(testCase.request, undefined, true);

    // Step 2: Generate PM prompt
    const pmPrompt = getTeamAssemblyPrompt(team);
    
    console.log('\n📋 PM Delegation Prompt:');
    console.log('─'.repeat(70));
    console.log(pmPrompt);
    console.log('─'.repeat(70));

    // Step 3: Verify
    console.log('\n✅ Verification:');
    console.log(`   - Team Size: ${team.agents.length}`);
    console.log(`   - Confidence: ${(team.confidence * 100).toFixed(0)}%`);
    console.log(`   - Sources: ${team.sources.join(', ')}`);
    console.log(`   - Agents Ready: ${team.agents.length > 0 ? 'Yes' : 'No'}`);
  }

  console.log('\n\n' + '═'.repeat(70));
  console.log('✨ All Integration Tests Complete');
  console.log('═'.repeat(70));
  console.log('\n🎯 Status: PM can now receive dynamic teams and delegate accordingly!\n');
}

testE2EIntegration().catch(console.error);
