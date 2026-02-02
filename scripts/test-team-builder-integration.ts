import { classifyTask } from '../src/features/model-routing/classifier/index.js';
import { buildTeam } from '../src/features/team-builder/index.js';

async function testTeamBuilderIntegration() {
  console.log('🧪 Testing Classifier → Team Builder Integration\n');

  const testCases = [
    {
      task: 'Build an Angular presentation platform from scratch',
      expectedAgents: ['architect', 'executor', 'designer'],
    },
    {
      task: 'Fix security vulnerabilities in the authentication module',
      expectedAgents: ['security-reviewer', 'executor'],
    },
    {
      task: 'Add comprehensive test suite for the payment service',
      expectedAgents: ['qa-tester', 'tdd-guide'],
    },
  ];

  for (const testCase of testCases) {
    console.log(`\n📝 Task: "${testCase.task}"`);
    
    // Step 1: Classify
    const classification = await classifyTask(testCase.task, () => ({
      needsDelegation: true,
      needsSearch: false,
      needsArchitecture: testCase.task.includes('architecture') || testCase.task.includes('scratch'),
      needsSecurity: testCase.task.includes('security'),
      needsTesting: testCase.task.includes('test'),
      needsToolGuidance: true,
    }));

    console.log(`Classifier: ${classification.source} (confidence: ${classification.confidence || 'n/a'})`);
    
    // Step 2: Build Team
    const team = await buildTeam(testCase.task, classification);
    
    console.log(`\n🚀 Team Assembled:`);
    console.log(`   Agents: ${team.agents.join(', ')}`);
    console.log(`   Rationale: ${team.rationale}`);
    console.log(`   Confidence: ${team.confidence}`);
    console.log(`   Sources: ${team.sources.join(', ')}`);
    
    // Verify
    const hasExpectedAgent = testCase.expectedAgents.some(agent => team.agents.includes(agent));
    console.log(`   ✅ Includes expected agent: ${hasExpectedAgent ? 'Yes' : 'No'}`);
  }
  
  console.log('\n\n✨ Integration Test Complete');
}

testTeamBuilderIntegration().catch(console.error);
