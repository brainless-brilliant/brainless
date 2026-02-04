/**
 * Project Scanner Implementation
 *
 * Scans a project directory to detect technologies, frameworks,
 * and tools being used. Provides recommendations for agent selection.
 */
import { existsSync, readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { TECHNOLOGY_SIGNATURES, extendSignatures } from './signatures.js';
/** Default directories to ignore during scanning */
const DEFAULT_IGNORE_DIRS = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.next',
    '.nuxt',
    '__pycache__',
    '.venv',
    'venv',
    'env',
    '.cache',
    'coverage',
    '.turbo',
    '.svelte-kit',
];
/** Default maximum scan depth */
const DEFAULT_MAX_DEPTH = 4;
/** Default minimum confidence threshold */
const DEFAULT_MIN_CONFIDENCE = 0.3;
/**
 * Scan a project directory for technologies
 */
export function scanProject(projectRoot, config) {
    const startTime = Date.now();
    const maxDepth = config?.maxDepth ?? DEFAULT_MAX_DEPTH;
    const ignoreDirs = new Set([...DEFAULT_IGNORE_DIRS, ...(config?.ignoreDirs ?? [])]);
    const minConfidence = config?.minConfidence ?? DEFAULT_MIN_CONFIDENCE;
    // Extend signatures if provided
    const signatures = config?.additionalSignatures
        ? extendSignatures(config.additionalSignatures)
        : TECHNOLOGY_SIGNATURES;
    // Collect detection evidence
    const detectionMap = new Map();
    // Scan for files
    const files = collectFiles(projectRoot, maxDepth, ignoreDirs);
    // Check for package.json dependencies (high-value detection)
    const packageJsonPath = join(projectRoot, 'package.json');
    let packageJson = null;
    if (existsSync(packageJsonPath)) {
        try {
            packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        }
        catch {
            // Ignore parse errors
        }
    }
    // Check for requirements.txt (Python packages)
    const requirementsPath = join(projectRoot, 'requirements.txt');
    let pythonPackages = [];
    if (existsSync(requirementsPath)) {
        try {
            const content = readFileSync(requirementsPath, 'utf-8');
            pythonPackages = content
                .split('\n')
                .map(line => line.split('==')[0].split('>=')[0].split('<=')[0].trim())
                .filter(pkg => pkg && !pkg.startsWith('#'));
        }
        catch {
            // Ignore read errors
        }
    }
    // Check for pyproject.toml
    const pyprojectPath = join(projectRoot, 'pyproject.toml');
    if (existsSync(pyprojectPath)) {
        try {
            const content = readFileSync(pyprojectPath, 'utf-8');
            // Simple extraction of dependencies from pyproject.toml
            const depMatch = content.match(/dependencies\s*=\s*\[([\s\S]*?)\]/);
            if (depMatch) {
                const deps = depMatch[1].match(/"([^"]+)"/g);
                if (deps) {
                    deps.forEach(dep => {
                        const pkgName = dep.replace(/"/g, '').split(/[<>=]/)[0].trim();
                        if (pkgName)
                            pythonPackages.push(pkgName);
                    });
                }
            }
        }
        catch {
            // Ignore read errors
        }
    }
    // Process each signature
    for (const signature of signatures) {
        const evidence = [];
        let confidence = 0;
        // Check config files
        if (signature.configFiles) {
            for (const configFile of signature.configFiles) {
                if (files.has(configFile) || existsSync(join(projectRoot, configFile))) {
                    evidence.push(`config: ${configFile}`);
                    confidence += 0.4;
                }
            }
        }
        // Check npm packages
        if (signature.npmPackages && packageJson) {
            const allDeps = {
                ...packageJson.dependencies,
                ...packageJson.devDependencies,
            };
            for (const pkg of signature.npmPackages) {
                if (allDeps[pkg]) {
                    evidence.push(`npm: ${pkg}@${allDeps[pkg]}`);
                    confidence += 0.5;
                    // Extract version
                    if (!detectionMap.get(signature.name)?.version) {
                        const version = allDeps[pkg].replace(/[\^~]/, '');
                        if (version && !version.startsWith('*')) {
                            const existing = detectionMap.get(signature.name);
                            if (existing) {
                                existing.version = version;
                            }
                        }
                    }
                }
            }
        }
        // Check Python packages
        if (signature.pythonPackages && pythonPackages.length > 0) {
            for (const pkg of signature.pythonPackages) {
                if (pythonPackages.some(p => p.toLowerCase() === pkg.toLowerCase())) {
                    evidence.push(`python: ${pkg}`);
                    confidence += 0.5;
                }
            }
        }
        // Check file patterns
        if (signature.filePatterns) {
            for (const pattern of signature.filePatterns) {
                const matchCount = countMatchingFiles(files, pattern);
                if (matchCount > 0) {
                    evidence.push(`files: ${matchCount} ${pattern} files`);
                    confidence += Math.min(0.3, matchCount * 0.05);
                }
            }
        }
        // Store detection if we have evidence
        if (evidence.length > 0 && confidence >= minConfidence) {
            const normalizedConfidence = Math.min(1, confidence);
            const existing = detectionMap.get(signature.name);
            if (!existing || existing.confidence < normalizedConfidence) {
                detectionMap.set(signature.name, {
                    signature,
                    evidence,
                    confidence: normalizedConfidence,
                    version: existing?.version,
                });
            }
        }
    }
    // Convert to DetectedTechnology array
    const technologies = Array.from(detectionMap.entries())
        .map(([name, data]) => ({
        name,
        displayName: data.signature.displayName,
        category: data.signature.category,
        confidence: data.confidence,
        version: data.version,
        detectedFrom: data.evidence,
    }))
        .sort((a, b) => b.confidence - a.confidence);
    // Extract primary languages and frameworks
    const primaryLanguages = technologies
        .filter(t => t.category === 'language' && t.confidence >= 0.5)
        .map(t => t.name);
    const primaryFrameworks = technologies
        .filter(t => t.category === 'framework' && t.confidence >= 0.4)
        .map(t => t.name);
    return {
        projectRoot,
        technologies,
        primaryLanguages,
        primaryFrameworks,
        scannedAt: new Date(),
        scanDurationMs: Date.now() - startTime,
    };
}
/**
 * Collect all files in a directory up to a certain depth
 */
function collectFiles(dir, maxDepth, ignoreDirs, currentDepth = 0, baseDir = dir) {
    const files = new Set();
    if (currentDepth > maxDepth)
        return files;
    if (!existsSync(dir))
        return files;
    try {
        const entries = readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                if (!ignoreDirs.has(entry.name)) {
                    const subFiles = collectFiles(join(dir, entry.name), maxDepth, ignoreDirs, currentDepth + 1, baseDir);
                    subFiles.forEach(f => files.add(f));
                }
            }
            else {
                files.add(relative(baseDir, join(dir, entry.name)));
            }
        }
    }
    catch {
        // Ignore directory read errors
    }
    return files;
}
/**
 * Count files matching a glob-like pattern
 */
function countMatchingFiles(files, pattern) {
    // Simple glob matching: *.ext -> matches extension
    if (pattern.startsWith('*.')) {
        const ext = pattern.slice(1);
        return Array.from(files).filter(f => f.endsWith(ext)).length;
    }
    // Exact match
    return files.has(pattern) ? 1 : 0;
}
/**
 * Format scan result as a readable summary
 */
export function formatScanSummary(result) {
    const lines = [];
    lines.push(`## Project Analysis`);
    lines.push('');
    lines.push(`**Scanned:** ${result.projectRoot}`);
    lines.push(`**Duration:** ${result.scanDurationMs}ms`);
    lines.push(`**Technologies Found:** ${result.technologies.length}`);
    lines.push('');
    if (result.primaryLanguages.length > 0) {
        lines.push(`### Primary Languages`);
        lines.push(result.primaryLanguages.join(', '));
        lines.push('');
    }
    if (result.primaryFrameworks.length > 0) {
        lines.push(`### Primary Frameworks`);
        lines.push(result.primaryFrameworks.join(', '));
        lines.push('');
    }
    // Group by category
    const byCategory = new Map();
    for (const tech of result.technologies) {
        const list = byCategory.get(tech.category) ?? [];
        list.push(tech);
        byCategory.set(tech.category, list);
    }
    lines.push(`### All Detected Technologies`);
    lines.push('');
    for (const [category, techs] of byCategory) {
        lines.push(`**${category}:** ${techs.map(t => t.displayName).join(', ')}`);
    }
    return lines.join('\n');
}
/**
 * Quick check if a project uses a specific technology
 */
export function hasTechnology(result, name) {
    return result.technologies.some(t => t.name === name);
}
/**
 * Get technologies by category
 */
export function getTechnologiesByCategory(result, category) {
    return result.technologies.filter(t => t.category === category);
}
//# sourceMappingURL=scanner.js.map