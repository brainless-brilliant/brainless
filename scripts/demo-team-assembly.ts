import { classifyTask } from '../src/features/model-routing/classifier/index.js';
import { buildTeam } from '../src/features/team-builder/index.js';

async function demo() {
  console.log('🎬 Brainless Team Assembly Demo\n');
  console.log('═'.repeat(60));

  const testCase = {
    task: 'Refactor the authentication module to use OAuth2, audit for security vulnerabilities, and add comprehensive tests',
  };

  console.log(`\n📋 Task: "${testCase.task}"\n`);
  console.log('─'.repeat(60));
  
  // Step 1: Classify
  const classification = await classifyTask(testCase.task, () => ({
    needsDelegation: true,
    needsSearch: false,
    needsArchitecture: true,
    needsSecurity: true,
    needsTesting: true,
    needsToolGuidance: true,
  }));

  // Step 2: Build Team (with verbose output)
  const team = await buildTeam(testCase.task, classification, true);
  
  console.log('─'.repeat(60));
  console.log(`\n📊 Team Stats:`);
  console.log(`   Confidence: ${(team.confidence * 100).toFixed(0)}%`);
  console.log(`   Data Sources: ${team.sources.join(' + ')}`);
  console.log('');
  console.log('═'.repeat(60));
}

demo().catch(console.error);
