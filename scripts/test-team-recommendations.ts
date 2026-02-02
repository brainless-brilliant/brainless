import { classifyTask } from '../src/features/model-routing/classifier/index.js';

async function testTeamRecommendations() {
  console.log('🧪 Testing Haiku Team Recommendations\n');

  const testTasks = [
    'Build an Angular presentation platform from scratch',
    'Fix security vulnerabilities in authentication module',
    'Refactor the payment service architecture',
  ];

  for (const task of testTasks) {
    console.log(`\n📝 Task: "${task}"`);
    
    try {
      const result = await classifyTask(task, () => ({
        needsDelegation: false,
        needsSearch: false,
        needsArchitecture: false,
        needsSecurity: false,
        needsTesting: false,
        needsToolGuidance: false,
      }));

      console.log(`Source: ${result.source}`);
      console.log(`Recommended Agents: ${result.recommendedAgents?.join(', ') || 'none'}`);
      console.log(`Rationale: ${result.teamRationale || 'n/a'}`);
      console.log(`Confidence: ${result.confidence || 'n/a'}`);
    } catch (err) {
      console.error(`❌ Error: ${err}`);
    }
  }
}

testTeamRecommendations().catch(console.error);
