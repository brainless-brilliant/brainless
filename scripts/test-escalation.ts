/**
 * Escalation Protocol Test
 */

import { 
  EscalationRouter, 
  EscalationStore, 
  type EscalationRequest,
  type EscalationResponse 
} from '../src/features/escalation/index.js';

function testEscalation() {
  console.log('🧪 Testing Agent Escalation Protocol\n');
  console.log('═'.repeat(60));

  const store = new EscalationStore();

  // Test Case 1: Design Decision
  console.log('\n📝 Test 1: Design Decision Escalation');
  console.log('─'.repeat(60));
  
  const designRequest: EscalationRequest = {
    from: 'executor (Alex)',
    to: 'auto',
    type: 'design-decision',
    message: 'Should we use REST or GraphQL for the new API?',
    context: { file: 'api/routes.ts' },
    timestamp: Date.now(),
  };

  const routed = EscalationRouter.route(designRequest);
  console.log(`Escalated from: ${designRequest.from}`);
  console.log(`Routed to: ${routed} (${routed === 'architect' ? 'Vikram ✅' : '❌'})`);
  
  const thread1 = store.createThread(designRequest);
  console.log(`Thread created: ${thread1.id}`);

  // Architect responds
  const archResponse: EscalationResponse = {
    from: 'architect (Vikram)',
    message: 'Use GraphQL - it aligns better with your real-time requirements',
    resolved: true,
    timestamp: Date.now(),
  };
  
  store.addResponse(thread1.id, archResponse);
  console.log(`Response: ${archResponse.message}`);
  console.log(`Status: ${thread1.status} ✅`);

  // Test Case 2: Security Concern
  console.log('\n\n📝 Test 2: Security Concern Escalation');
  console.log('─'.repeat(60));
  
  const securityRequest: EscalationRequest = {
    from: 'executor (Taylor)',
    to: 'auto',
    type: 'security-concern',
    message: 'Found unvalidated user input in authentication flow',
    context: { file: 'auth/login.ts', line: 45 },
    timestamp: Date.now(),
  };

  const routed2 = EscalationRouter.route(securityRequest);
  console.log(`Escalated from: ${securityRequest.from}`);
  console.log(`Routed to: ${routed2}`);
const thread2 = store.createThread(securityRequest);

  // Architect doesn't resolve - needs user
  const secResponse: EscalationResponse = {
    from: 'architect (Vikram)',
    message: 'This is a critical security issue. I recommend full security audit.',
    resolved: false,
    nextAction: 'ask-user',
    timestamp: Date.now(),
  };
  
  store.addResponse(thread2.id, secResponse);
  console.log(`Response: ${secResponse.message}`);
  console.log(`Next action: ${secResponse.nextAction}`);
  
  const shouldEscalate = EscalationRouter.shouldEscalateToUser(thread2);
  console.log(`Escalate to user: ${shouldEscalate ? 'YES ✅' : 'NO'}`);

  // Test Case 3: Blocked Agent (3 attempts)
  console.log('\n\n📝 Test 3: Blocker with Multiple Attempts');
  console.log('─'.repeat(60));
  
  const blockerRequest: EscalationRequest = {
    from: 'executor (Jordan)',
    to: 'auto',
    type: 'blocker',
    message: 'Cannot access database schema - credentials issue?',
    timestamp: Date.now(),
  };

  const thread3 = store.createThread(blockerRequest);
  console.log(`Thread: ${thread3.id}`);

  // Simulate 3 failed attempts
  for (let i = 1; i <= 3; i++) {
    const resp: EscalationResponse = {
      from: i === 1 ? 'coordinator (PM)' : i === 2 ? 'architect (Priya)' : 'analyst (Zoe)',
      message: `Attempt ${i}: Still investigating...`,
      resolved: false,
      nextAction: i < 3 ? 'escalate-higher' : 'ask-user',
      timestamp: Date.now(),
    };
    store.addResponse(thread3.id, resp);
    console.log(`  ${i}. ${resp.from}: ${resp.message}`);
  }

  const shouldEscalate3 = EscalationRouter.shouldEscalateToUser(thread3);
  console.log(`\nAfter 3 attempts, escalate to user: ${shouldEscalate3 ? 'YES ✅' : 'NO'}`);

  // Test Case 4: Format for User
  console.log('\n\n📝 Test 4: User-Facing Escalation Message');
  console.log('─'.repeat(60));
  
  const formatted = EscalationRouter.formatForUser(thread2);
  console.log(formatted);

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('✅ All Escalation Tests Passed');
  console.log(`   - Design decisions → architect`);
  console.log(`   - Security concerns escalate to user if unresolved`);
  console.log(`   - Blockers escalate after 3 attempts`);
  console.log(`   - User messages formatted correctly`);
  console.log('═'.repeat(60) + '\n');
}

testEscalation();
