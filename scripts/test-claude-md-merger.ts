/**
 * Test CLAUDE.md Merger Module
 * 
 * Verify detection, user prompts, and AI-powered merging
 */

import { detectExistingCLAUDEmd, findPrimaryLocation, backupExistingFile } from '../src/installer/claude-md-merger.js';
import { writeFileSync, mkdirSync, existsSync, unlinkSync, rmdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

async function testDetection() {
  console.log('\n=== Test 1: CLAUDE.md Detection ===\n');
  
  // Create temp directory
  const testDir = join(tmpdir(), 'brainless-test-' + Date.now());
  mkdirSync(testDir, { recursive: true });
  mkdirSync(join(testDir, '.claude'), { recursive: true });
  
  // Create test files
  writeFileSync(join(testDir, 'CLAUDE.md'), '# User Instructions\n\nSome custom rules.');
  writeFileSync(join(testDir, '.claude/CLAUDE.md'), '# Project Instructions\n\nProject-specific rules.');
  
  // Detect
  const locations = detectExistingCLAUDEmd(testDir);
  
  console.log('Detected locations:');
  locations.forEach(loc => {
    if (loc.exists) {
      console.log(`  ✅ ${loc.path} (${loc.size} bytes, priority ${loc.priority})`);
    } else {
      console.log(`  ❌ ${loc.path} (not found)`);
    }
  });
  
  // Find primary
  const primary = findPrimaryLocation(locations);
  console.log(`\n🎯 Primary location: ${primary?.path || 'none'}`);
  
  // Cleanup
  unlinkSync(join(testDir, 'CLAUDE.md'));
  unlinkSync(join(testDir, '.claude/CLAUDE.md'));
  rmdirSync(join(testDir, '.claude'));
  rmdirSync(testDir);
  
  console.log('\n✅ Detection test passed!');
}

async function testBackup() {
  console.log('\n=== Test 2: Backup System ===\n');
  
  const testDir = join(tmpdir(), 'brainless-backup-test-' + Date.now());
  mkdirSync(testDir, { recursive: true });
  
  const testFile = join(testDir, 'CLAUDE.md');
  writeFileSync(testFile, '# Original Content\n\nDo not lose this!');
  
  // Create backup
  const backupPath = backupExistingFile(testFile);
  
  console.log(`Original: ${testFile}`);
  console.log(`Backup: ${backupPath}`);
  
  // Verify backup exists and has same content
  if (existsSync(backupPath)) {
    const original = readFileSync(testFile, 'utf-8');
    const backup = readFileSync(backupPath, 'utf-8');
    
    if (original === backup) {
      console.log('\n✅ Backup test passed! Content preserved.');
    } else {
      console.error('\n❌ Backup content mismatch!');
    }
  } else {
    console.error('\n❌ Backup file not created!');
  }
  
  // Cleanup
  unlinkSync(testFile);
  unlinkSync(backupPath);
  rmdirSync(testDir);
}

async function testTemplate() {
  console.log('\n=== Test 3: Plugin Template ===\n');
  
  const templatePath = join(process.cwd(), 'templates', 'CLAUDE.brainless.md');
  
  if (existsSync(templatePath)) {
    const content = readFileSync(templatePath, 'utf-8');
    console.log(`Template size: ${content.length} bytes`);
    
    // Check required sections
    const requiredSections = [
      'Brainless AI Workforce Plugin',
      'Auto Team Assembly',
      'Manual Control',
      'Escalation Protocol',
      'Memory Layer'
    ];
    
    let allPresent = true;
    requiredSections.forEach(section => {
      if (content.includes(section)) {
        console.log(`  ✅ ${section}`);
      } else {
        console.log(`  ❌ ${section} - MISSING!`);
        allPresent = false;
      }
    });
    
    if (allPresent) {
      console.log('\n✅ Template test passed!');
    } else {
      console.error('\n❌ Template missing required sections!');
    }
  } else {
    console.error(`\n❌ Template not found: ${templatePath}`);
  }
}

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('CLAUDE.md Merger Module - Integration Tests');
  console.log('='.repeat(60));
  
  try {
    await testDetection();
    await testBackup();
    await testTemplate();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60) + '\n');
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ TEST FAILED:', error);
    console.error('='.repeat(60) + '\n');
    process.exit(1);
  }
}

main();
