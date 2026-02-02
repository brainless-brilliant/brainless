#!/usr/bin/env npx tsx

/**
 * Classifier Comparison Test
 * 
 * Shows the ACTUAL prompts that get built based on classification.
 * This is the real test - what prompt does Claude receive?
 * 
 * Run with: ANTHROPIC_API_KEY=your_key npx tsx scripts/test-classifier.ts
 */

import { extractAllSignals, extractTaskCapabilities } from '../src/features/model-routing/signals.js';
import { classifyTask, resetClassifier, getClassifier } from '../src/features/model-routing/classifier/index.js';
import { composePromptFromModules, ALL_MODULES, getDefaultCapabilities } from '../src/agents/modules/index.js';
import type { TaskCapabilities } from '../src/agents/modules/types.js';
import { writeFileSync } from 'fs';

// Test cases
const TEST_CASES = [
  {
    name: 'Simple search',
    prompt: 'Find where the login function is defined',
  },
  {
    name: 'Complex refactor',
    prompt: 'Refactor the authentication module to use OAuth2 instead of basic auth, update all dependent services',
  },
  {
    name: 'Add tests',
    prompt: 'Add unit tests for the payment service',
  },
  {
    name: 'Security fix',
    prompt: 'Fix the XSS vulnerability in the user input sanitization',
  },
  {
    name: 'Multi-file edit',
    prompt: 'Rename the UserService class to AccountService across all files in src/',
  },
  {
    name: 'Simple question',
    prompt: 'What does the handleSubmit function do?',
  },
  {
    name: 'Architecture design',
    prompt: 'Design a new caching layer for the API to reduce database load',
  },
  {
    name: 'Bug investigation',
    prompt: 'Debug why the login is failing intermittently in production',
  },
];

interface TestResult {
  name: string;
  taskPrompt: string;
  
  // Classification results
  keywordCaps: TaskCapabilities;
  haikuCaps: TaskCapabilities | null;
  source: string;
  confidence: number | null;
  
  // Prompt composition results
  keywordModules: string[];
  keywordPrompt: string;
  keywordTokens: number;
  
  haikuModules: string[];
  haikuPrompt: string;
  haikuTokens: number;
  
  // Comparison
  fullPromptTokens: number;
  tokenSavingsKeyword: number;
  tokenSavingsHaiku: number;
}

async function runTest(): Promise<void> {
  console.log('🧪 Classifier Prompt Composition Test\n');
  console.log('This test shows the ACTUAL prompts that get built.\n');
  console.log(`Running ${TEST_CASES.length} test cases...\n`);

  resetClassifier();

  // Calculate full prompt (all modules) for baseline
  const allCaps: TaskCapabilities = {
    needsDelegation: true,
    needsSearch: true,
    needsArchitecture: true,
    needsSecurity: true,
    needsTesting: true,
    needsToolGuidance: true,
  };
  const fullPrompt = composePromptFromModules(allCaps);
  const fullPromptTokens = fullPrompt.estimatedTokens;

  console.log(`📊 Baseline: Full prompt with ALL modules = ~${fullPromptTokens} tokens\n`);

  const results: TestResult[] = [];

  for (const testCase of TEST_CASES) {
    console.log(`Testing: ${testCase.name}...`);
    
    // Get keyword classification
    const signals = extractAllSignals(testCase.prompt, { taskPrompt: testCase.prompt });
    const keywordCaps = extractTaskCapabilities(signals);
    const keywordComposed = composePromptFromModules(keywordCaps);

    // Get Haiku classification
    const haikuResult = await classifyTask(testCase.prompt, () => keywordCaps);
    const haikuComposed = composePromptFromModules(haikuResult.capabilities);

    const result: TestResult = {
      name: testCase.name,
      taskPrompt: testCase.prompt,
      
      keywordCaps,
      haikuCaps: haikuResult.capabilities,
      source: haikuResult.source,
      confidence: haikuResult.confidence ?? null,
      
      keywordModules: keywordComposed.includedModules,
      keywordPrompt: keywordComposed.prompt,
      keywordTokens: keywordComposed.estimatedTokens,
      
      haikuModules: haikuComposed.includedModules,
      haikuPrompt: haikuComposed.prompt,
      haikuTokens: haikuComposed.estimatedTokens,
      
      fullPromptTokens,
      tokenSavingsKeyword: fullPromptTokens - keywordComposed.estimatedTokens,
      tokenSavingsHaiku: fullPromptTokens - haikuComposed.estimatedTokens,
    };

    results.push(result);
    console.log(`  → ${haikuResult.source}: ${haikuComposed.includedModules.length} modules, ~${haikuComposed.estimatedTokens} tokens`);
  }

  // Generate markdown report
  const report = generateReport(results, fullPromptTokens);
  
  const outputPath = 'classifier.test.result.md';
  writeFileSync(outputPath, report);
  console.log(`\n✅ Results written to ${outputPath}`);
}

function generateReport(results: TestResult[], fullPromptTokens: number): string {
  let md = `# Classifier Prompt Composition Test Results

Generated: ${new Date().toISOString()}

## The Core Question
> "What prompt does the agent ACTUALLY receive?"

This test shows the real prompts built by the modular composition system.

---

## Token Budget Baseline

| Configuration | Tokens |
|--------------|--------|
| **Full Prompt (all modules)** | ~${fullPromptTokens} |
| Available Modules | ${ALL_MODULES.map(m => m.id).join(', ')} |

---

## Results by Task

`;

  for (const result of results) {
    md += `### ${result.name}

**Task:** \`${result.taskPrompt}\`

#### Classification Comparison

| Method | Source | Modules Selected | Tokens | Savings |
|--------|--------|------------------|--------|---------|
| Keyword | instant | ${result.keywordModules.length} | ~${result.keywordTokens} | ${result.tokenSavingsKeyword} (${((result.tokenSavingsKeyword/fullPromptTokens)*100).toFixed(0)}%) |
| Haiku | ${result.source}${result.confidence ? ` (${(result.confidence*100).toFixed(0)}%)` : ''} | ${result.haikuModules.length} | ~${result.haikuTokens} | ${result.tokenSavingsHaiku} (${((result.tokenSavingsHaiku/fullPromptTokens)*100).toFixed(0)}%) |

#### Capabilities Detected

| Capability | Keyword | Haiku |
|------------|---------|-------|
| needsDelegation | ${result.keywordCaps.needsDelegation ? '✅' : '❌'} | ${result.haikuCaps?.needsDelegation ? '✅' : '❌'} |
| needsSearch | ${result.keywordCaps.needsSearch ? '✅' : '❌'} | ${result.haikuCaps?.needsSearch ? '✅' : '❌'} |
| needsArchitecture | ${result.keywordCaps.needsArchitecture ? '✅' : '❌'} | ${result.haikuCaps?.needsArchitecture ? '✅' : '❌'} |
| needsSecurity | ${result.keywordCaps.needsSecurity ? '✅' : '❌'} | ${result.haikuCaps?.needsSecurity ? '✅' : '❌'} |
| needsTesting | ${result.keywordCaps.needsTesting ? '✅' : '❌'} | ${result.haikuCaps?.needsTesting ? '✅' : '❌'} |
| needsToolGuidance | ${result.keywordCaps.needsToolGuidance ? '✅' : '❌'} | ${result.haikuCaps?.needsToolGuidance ? '✅' : '❌'} |

#### Modules Included

**Keyword:** ${result.keywordModules.join(', ')}

**Haiku:** ${result.haikuModules.join(', ')}

<details>
<summary>📄 View Actual Haiku-Composed Prompt (~${result.haikuTokens} tokens)</summary>

\`\`\`
${result.haikuPrompt}
\`\`\`

</details>

---

`;
  }

  // Summary table
  md += `## Summary: Token Savings

| Task | Keyword Tokens | Haiku Tokens | Difference | Better? |
|------|---------------|--------------|------------|---------|
`;

  for (const result of results) {
    const diff = result.keywordTokens - result.haikuTokens;
    const better = diff === 0 ? 'Same' : (diff > 0 ? 'Haiku' : 'Keyword');
    md += `| ${result.name} | ${result.keywordTokens} | ${result.haikuTokens} | ${Math.abs(diff)} | ${better} |\n`;
  }

  // Overall stats
  const avgKeywordTokens = results.reduce((sum, r) => sum + r.keywordTokens, 0) / results.length;
  const avgHaikuTokens = results.reduce((sum, r) => sum + r.haikuTokens, 0) / results.length;

  md += `
## Overall Statistics

| Metric | Value |
|--------|-------|
| Avg Keyword Tokens | ${avgKeywordTokens.toFixed(0)} |
| Avg Haiku Tokens | ${avgHaikuTokens.toFixed(0)} |
| Avg Savings vs Full | ${((1 - avgHaikuTokens/fullPromptTokens)*100).toFixed(0)}% |
| Full Prompt Baseline | ${fullPromptTokens} |
`;

  return md;
}

runTest().catch(console.error);

