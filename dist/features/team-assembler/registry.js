/**
 * Agent Registry
 *
 * Defines all available agents and their capabilities,
 * plus mappings from technologies to relevant agents.
 */
/**
 * Registry of all available agents with their metadata
 */
export const AGENT_REGISTRY = [
    // Core Planning & Architecture
    {
        name: 'architect',
        displayName: 'Architect',
        description: 'System design and architecture planning',
        capabilities: ['planning', 'design', 'analysis'],
        specializations: [],
        defaultTier: 'opus',
        tags: ['planning', 'design', 'architecture', 'system-design'],
    },
    {
        name: 'planner',
        displayName: 'Planner',
        description: 'Task decomposition and project planning',
        capabilities: ['planning', 'analysis'],
        specializations: [],
        defaultTier: 'opus',
        tags: ['planning', 'tasks', 'decomposition', 'roadmap'],
    },
    // Implementation
    {
        name: 'executor',
        displayName: 'Executor',
        description: 'Code implementation and feature development',
        capabilities: ['coding'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['coding', 'implementation', 'features'],
    },
    {
        name: 'build-fixer',
        displayName: 'Build Fixer',
        description: 'Fix build errors and compilation issues',
        capabilities: ['debugging', 'coding'],
        specializations: ['typescript', 'javascript', 'rust', 'go'],
        defaultTier: 'sonnet',
        tags: ['build', 'errors', 'compilation', 'debugging'],
    },
    // Quality Assurance
    {
        name: 'code-reviewer',
        displayName: 'Code Reviewer',
        description: 'Code review and quality assessment',
        capabilities: ['reviewing', 'analysis'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['review', 'quality', 'best-practices'],
    },
    {
        name: 'critic',
        displayName: 'Critic',
        description: 'Critical analysis and improvement suggestions',
        capabilities: ['reviewing', 'analysis'],
        specializations: [],
        defaultTier: 'opus',
        tags: ['critique', 'analysis', 'improvements'],
    },
    {
        name: 'qa-tester',
        displayName: 'QA Tester',
        description: 'Test creation and quality assurance',
        capabilities: ['testing'],
        specializations: ['jest', 'vitest', 'playwright', 'cypress', 'pytest'],
        defaultTier: 'sonnet',
        tags: ['testing', 'qa', 'tests', 'coverage'],
    },
    {
        name: 'tdd-guide',
        displayName: 'TDD Guide',
        description: 'Test-driven development guidance',
        capabilities: ['testing', 'coding'],
        specializations: ['jest', 'vitest', 'pytest'],
        defaultTier: 'sonnet',
        tags: ['tdd', 'testing', 'test-first'],
    },
    // Security
    {
        name: 'security-reviewer',
        displayName: 'Security Reviewer',
        description: 'Security analysis and vulnerability detection',
        capabilities: ['security', 'reviewing'],
        specializations: [],
        defaultTier: 'opus',
        tags: ['security', 'vulnerabilities', 'audit'],
    },
    // Research & Analysis
    {
        name: 'researcher',
        displayName: 'Researcher',
        description: 'Research and information gathering',
        capabilities: ['research', 'analysis'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['research', 'information', 'learning'],
    },
    {
        name: 'analyst',
        displayName: 'Analyst',
        description: 'Data and code analysis',
        capabilities: ['analysis'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['analysis', 'data', 'insights'],
    },
    {
        name: 'scientist',
        displayName: 'Scientist',
        description: 'Deep technical analysis and experimentation',
        capabilities: ['analysis', 'research', 'testing'],
        specializations: ['python', 'data-science', 'ml'],
        defaultTier: 'opus',
        tags: ['science', 'experiments', 'analysis'],
    },
    // Design & Documentation
    {
        name: 'designer',
        displayName: 'Designer',
        description: 'UI/UX design and frontend development',
        capabilities: ['design', 'coding'],
        specializations: ['react', 'vue', 'svelte', 'tailwindcss', 'css'],
        defaultTier: 'sonnet',
        tags: ['design', 'ui', 'ux', 'frontend'],
    },
    {
        name: 'writer',
        displayName: 'Writer',
        description: 'Documentation and technical writing',
        capabilities: ['documentation'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['documentation', 'writing', 'readme'],
    },
    // Exploration
    {
        name: 'explore',
        displayName: 'Explorer',
        description: 'Codebase exploration and understanding',
        capabilities: ['analysis', 'research'],
        specializations: [],
        defaultTier: 'sonnet',
        tags: ['explore', 'understand', 'navigate'],
    },
    {
        name: 'vision',
        displayName: 'Vision',
        description: 'Image and visual analysis',
        capabilities: ['analysis'],
        specializations: [],
        defaultTier: 'opus',
        tags: ['vision', 'images', 'visual'],
    },
];
/**
 * Mappings from technologies to relevant agents and skills
 */
export const TECH_TO_AGENT_MAPPINGS = [
    // Languages
    {
        technology: 'typescript',
        agents: ['executor', 'build-fixer', 'code-reviewer'],
        skills: ['typescript-best-practices'],
        relevance: 0.8,
    },
    {
        technology: 'javascript',
        agents: ['executor', 'code-reviewer'],
        skills: ['javascript-patterns'],
        relevance: 0.7,
    },
    {
        technology: 'python',
        agents: ['executor', 'scientist', 'qa-tester'],
        skills: ['python-best-practices'],
        relevance: 0.8,
    },
    {
        technology: 'rust',
        agents: ['executor', 'build-fixer', 'security-reviewer'],
        skills: ['rust-patterns'],
        relevance: 0.9,
    },
    {
        technology: 'go',
        agents: ['executor', 'build-fixer', 'code-reviewer'],
        skills: ['go-patterns'],
        relevance: 0.8,
    },
    // Frontend Frameworks
    {
        technology: 'react',
        agents: ['designer', 'executor', 'qa-tester'],
        skills: ['react-patterns', 'component-design'],
        relevance: 0.9,
    },
    {
        technology: 'nextjs',
        agents: ['designer', 'executor', 'architect'],
        skills: ['nextjs-patterns', 'ssr-optimization'],
        relevance: 0.9,
    },
    {
        technology: 'vue',
        agents: ['designer', 'executor'],
        skills: ['vue-patterns'],
        relevance: 0.8,
    },
    {
        technology: 'svelte',
        agents: ['designer', 'executor'],
        skills: ['svelte-patterns'],
        relevance: 0.8,
    },
    {
        technology: 'angular',
        agents: ['designer', 'executor', 'architect'],
        skills: ['angular-patterns'],
        relevance: 0.8,
    },
    // Backend Frameworks
    {
        technology: 'express',
        agents: ['executor', 'security-reviewer'],
        skills: ['express-patterns', 'api-design'],
        relevance: 0.7,
    },
    {
        technology: 'nestjs',
        agents: ['executor', 'architect', 'code-reviewer'],
        skills: ['nestjs-patterns', 'dependency-injection'],
        relevance: 0.9,
    },
    {
        technology: 'fastapi',
        agents: ['executor', 'security-reviewer'],
        skills: ['fastapi-patterns', 'api-design'],
        relevance: 0.8,
    },
    {
        technology: 'django',
        agents: ['executor', 'security-reviewer', 'architect'],
        skills: ['django-patterns'],
        relevance: 0.8,
    },
    // Testing
    {
        technology: 'jest',
        agents: ['qa-tester', 'tdd-guide'],
        skills: ['testing-patterns', 'jest-recipes'],
        relevance: 0.9,
    },
    {
        technology: 'vitest',
        agents: ['qa-tester', 'tdd-guide'],
        skills: ['testing-patterns', 'vitest-recipes'],
        relevance: 0.9,
    },
    {
        technology: 'playwright',
        agents: ['qa-tester'],
        skills: ['e2e-testing', 'playwright-patterns'],
        relevance: 0.9,
    },
    {
        technology: 'cypress',
        agents: ['qa-tester'],
        skills: ['e2e-testing', 'cypress-patterns'],
        relevance: 0.9,
    },
    {
        technology: 'pytest',
        agents: ['qa-tester', 'tdd-guide'],
        skills: ['pytest-patterns'],
        relevance: 0.9,
    },
    // Databases
    {
        technology: 'prisma',
        agents: ['executor', 'architect'],
        skills: ['prisma-patterns', 'database-design'],
        relevance: 0.8,
    },
    {
        technology: 'drizzle',
        agents: ['executor'],
        skills: ['drizzle-patterns', 'database-design'],
        relevance: 0.8,
    },
    {
        technology: 'mongoose',
        agents: ['executor'],
        skills: ['mongodb-patterns'],
        relevance: 0.7,
    },
    // DevOps
    {
        technology: 'docker',
        agents: ['architect', 'executor'],
        skills: ['docker-patterns', 'containerization'],
        relevance: 0.7,
    },
    {
        technology: 'kubernetes',
        agents: ['architect'],
        skills: ['kubernetes-patterns', 'orchestration'],
        relevance: 0.9,
    },
    {
        technology: 'terraform',
        agents: ['architect', 'executor'],
        skills: ['terraform-patterns', 'iac'],
        relevance: 0.8,
    },
    // Libraries
    {
        technology: 'tailwindcss',
        agents: ['designer'],
        skills: ['tailwind-patterns'],
        relevance: 0.8,
    },
    {
        technology: 'graphql',
        agents: ['architect', 'executor'],
        skills: ['graphql-patterns', 'api-design'],
        relevance: 0.8,
    },
    {
        technology: 'trpc',
        agents: ['architect', 'executor'],
        skills: ['trpc-patterns'],
        relevance: 0.9,
    },
    {
        technology: 'zod',
        agents: ['executor', 'code-reviewer'],
        skills: ['validation-patterns'],
        relevance: 0.7,
    },
];
/**
 * Get agent metadata by name
 */
export function getAgentMetadata(name) {
    return AGENT_REGISTRY.find(a => a.name === name);
}
/**
 * Get all agents with a specific capability
 */
export function getAgentsByCapability(capability) {
    return AGENT_REGISTRY.filter(a => a.capabilities.includes(capability));
}
/**
 * Get agents that specialize in a technology
 */
export function getAgentsForTechnology(tech) {
    const mapping = TECH_TO_AGENT_MAPPINGS.find(m => m.technology === tech);
    return mapping?.agents ?? [];
}
/**
 * Get skills relevant to a technology
 */
export function getSkillsForTechnology(tech) {
    const mapping = TECH_TO_AGENT_MAPPINGS.find(m => m.technology === tech);
    return mapping?.skills ?? [];
}
//# sourceMappingURL=registry.js.map