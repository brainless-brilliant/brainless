/**
 * Technology Signatures Registry
 *
 * Defines signatures for detecting technologies in a project.
 * Each signature specifies how to identify a technology via
 * file patterns, package names, or content patterns.
 */
/**
 * Built-in technology signatures
 */
export const TECHNOLOGY_SIGNATURES = [
    // Languages
    {
        name: 'typescript',
        displayName: 'TypeScript',
        category: 'language',
        configFiles: ['tsconfig.json', 'tsconfig.*.json'],
        filePatterns: ['*.ts', '*.tsx'],
        npmPackages: ['typescript'],
    },
    {
        name: 'javascript',
        displayName: 'JavaScript',
        category: 'language',
        filePatterns: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
        configFiles: ['jsconfig.json'],
    },
    {
        name: 'python',
        displayName: 'Python',
        category: 'language',
        filePatterns: ['*.py'],
        configFiles: ['pyproject.toml', 'setup.py', 'requirements.txt', 'Pipfile'],
    },
    {
        name: 'rust',
        displayName: 'Rust',
        category: 'language',
        filePatterns: ['*.rs'],
        configFiles: ['Cargo.toml'],
    },
    {
        name: 'go',
        displayName: 'Go',
        category: 'language',
        filePatterns: ['*.go'],
        configFiles: ['go.mod', 'go.sum'],
    },
    {
        name: 'java',
        displayName: 'Java',
        category: 'language',
        filePatterns: ['*.java'],
        configFiles: ['pom.xml', 'build.gradle', 'build.gradle.kts'],
    },
    {
        name: 'csharp',
        displayName: 'C#',
        category: 'language',
        filePatterns: ['*.cs'],
        configFiles: ['*.csproj', '*.sln'],
    },
    {
        name: 'swift',
        displayName: 'Swift',
        category: 'language',
        filePatterns: ['*.swift'],
        configFiles: ['Package.swift', '*.xcodeproj'],
    },
    {
        name: 'kotlin',
        displayName: 'Kotlin',
        category: 'language',
        filePatterns: ['*.kt', '*.kts'],
        configFiles: ['build.gradle.kts'],
    },
    // Frontend Frameworks
    {
        name: 'react',
        displayName: 'React',
        category: 'framework',
        npmPackages: ['react', 'react-dom'],
        filePatterns: ['*.jsx', '*.tsx'],
    },
    {
        name: 'nextjs',
        displayName: 'Next.js',
        category: 'framework',
        npmPackages: ['next'],
        configFiles: ['next.config.js', 'next.config.mjs', 'next.config.ts'],
    },
    {
        name: 'vue',
        displayName: 'Vue.js',
        category: 'framework',
        npmPackages: ['vue'],
        filePatterns: ['*.vue'],
        configFiles: ['vue.config.js', 'vite.config.ts'],
    },
    {
        name: 'nuxt',
        displayName: 'Nuxt',
        category: 'framework',
        npmPackages: ['nuxt'],
        configFiles: ['nuxt.config.js', 'nuxt.config.ts'],
    },
    {
        name: 'angular',
        displayName: 'Angular',
        category: 'framework',
        npmPackages: ['@angular/core'],
        configFiles: ['angular.json'],
    },
    {
        name: 'svelte',
        displayName: 'Svelte',
        category: 'framework',
        npmPackages: ['svelte'],
        filePatterns: ['*.svelte'],
        configFiles: ['svelte.config.js'],
    },
    {
        name: 'astro',
        displayName: 'Astro',
        category: 'framework',
        npmPackages: ['astro'],
        filePatterns: ['*.astro'],
        configFiles: ['astro.config.mjs', 'astro.config.ts'],
    },
    // Backend Frameworks
    {
        name: 'express',
        displayName: 'Express.js',
        category: 'framework',
        npmPackages: ['express'],
    },
    {
        name: 'fastify',
        displayName: 'Fastify',
        category: 'framework',
        npmPackages: ['fastify'],
    },
    {
        name: 'nestjs',
        displayName: 'NestJS',
        category: 'framework',
        npmPackages: ['@nestjs/core'],
    },
    {
        name: 'django',
        displayName: 'Django',
        category: 'framework',
        pythonPackages: ['django', 'Django'],
        configFiles: ['manage.py'],
    },
    {
        name: 'fastapi',
        displayName: 'FastAPI',
        category: 'framework',
        pythonPackages: ['fastapi'],
    },
    {
        name: 'flask',
        displayName: 'Flask',
        category: 'framework',
        pythonPackages: ['flask', 'Flask'],
    },
    // Build Tools
    {
        name: 'vite',
        displayName: 'Vite',
        category: 'build-tool',
        npmPackages: ['vite'],
        configFiles: ['vite.config.js', 'vite.config.ts', 'vite.config.mjs'],
    },
    {
        name: 'webpack',
        displayName: 'Webpack',
        category: 'build-tool',
        npmPackages: ['webpack'],
        configFiles: ['webpack.config.js', 'webpack.config.ts'],
    },
    {
        name: 'esbuild',
        displayName: 'esbuild',
        category: 'build-tool',
        npmPackages: ['esbuild'],
    },
    {
        name: 'rollup',
        displayName: 'Rollup',
        category: 'build-tool',
        npmPackages: ['rollup'],
        configFiles: ['rollup.config.js', 'rollup.config.mjs'],
    },
    {
        name: 'turbo',
        displayName: 'Turborepo',
        category: 'build-tool',
        npmPackages: ['turbo'],
        configFiles: ['turbo.json'],
    },
    // Testing
    {
        name: 'jest',
        displayName: 'Jest',
        category: 'testing',
        npmPackages: ['jest'],
        configFiles: ['jest.config.js', 'jest.config.ts'],
    },
    {
        name: 'vitest',
        displayName: 'Vitest',
        category: 'testing',
        npmPackages: ['vitest'],
        configFiles: ['vitest.config.ts', 'vitest.config.js'],
    },
    {
        name: 'playwright',
        displayName: 'Playwright',
        category: 'testing',
        npmPackages: ['@playwright/test', 'playwright'],
        configFiles: ['playwright.config.ts', 'playwright.config.js'],
    },
    {
        name: 'cypress',
        displayName: 'Cypress',
        category: 'testing',
        npmPackages: ['cypress'],
        configFiles: ['cypress.config.js', 'cypress.config.ts'],
    },
    {
        name: 'pytest',
        displayName: 'pytest',
        category: 'testing',
        pythonPackages: ['pytest'],
        configFiles: ['pytest.ini', 'conftest.py'],
    },
    // Databases
    {
        name: 'prisma',
        displayName: 'Prisma',
        category: 'database',
        npmPackages: ['@prisma/client', 'prisma'],
        configFiles: ['prisma/schema.prisma'],
    },
    {
        name: 'drizzle',
        displayName: 'Drizzle ORM',
        category: 'database',
        npmPackages: ['drizzle-orm'],
        configFiles: ['drizzle.config.ts'],
    },
    {
        name: 'mongoose',
        displayName: 'Mongoose',
        category: 'database',
        npmPackages: ['mongoose'],
    },
    {
        name: 'typeorm',
        displayName: 'TypeORM',
        category: 'database',
        npmPackages: ['typeorm'],
    },
    {
        name: 'sqlalchemy',
        displayName: 'SQLAlchemy',
        category: 'database',
        pythonPackages: ['sqlalchemy', 'SQLAlchemy'],
    },
    // Cloud/DevOps
    {
        name: 'docker',
        displayName: 'Docker',
        category: 'devops',
        configFiles: ['Dockerfile', 'docker-compose.yml', 'docker-compose.yaml'],
    },
    {
        name: 'kubernetes',
        displayName: 'Kubernetes',
        category: 'devops',
        configFiles: ['k8s/*.yaml', 'kubernetes/*.yaml'],
        filePatterns: ['*.k8s.yaml', '*.k8s.yml'],
    },
    {
        name: 'terraform',
        displayName: 'Terraform',
        category: 'devops',
        filePatterns: ['*.tf'],
        configFiles: ['main.tf', 'terraform.tfvars'],
    },
    {
        name: 'aws-cdk',
        displayName: 'AWS CDK',
        category: 'cloud',
        npmPackages: ['aws-cdk-lib', '@aws-cdk/core'],
        configFiles: ['cdk.json'],
    },
    {
        name: 'vercel',
        displayName: 'Vercel',
        category: 'cloud',
        configFiles: ['vercel.json'],
    },
    // Libraries
    {
        name: 'tailwindcss',
        displayName: 'Tailwind CSS',
        category: 'library',
        npmPackages: ['tailwindcss'],
        configFiles: ['tailwind.config.js', 'tailwind.config.ts'],
    },
    {
        name: 'graphql',
        displayName: 'GraphQL',
        category: 'library',
        npmPackages: ['graphql', '@apollo/client', '@apollo/server'],
        filePatterns: ['*.graphql', '*.gql'],
    },
    {
        name: 'trpc',
        displayName: 'tRPC',
        category: 'library',
        npmPackages: ['@trpc/server', '@trpc/client'],
    },
    {
        name: 'redux',
        displayName: 'Redux',
        category: 'library',
        npmPackages: ['redux', '@reduxjs/toolkit'],
    },
    {
        name: 'zustand',
        displayName: 'Zustand',
        category: 'library',
        npmPackages: ['zustand'],
    },
    {
        name: 'zod',
        displayName: 'Zod',
        category: 'library',
        npmPackages: ['zod'],
    },
];
/**
 * Get all signatures for a specific category
 */
export function getSignaturesByCategory(category) {
    return TECHNOLOGY_SIGNATURES.filter(sig => sig.category === category);
}
/**
 * Get a signature by name
 */
export function getSignatureByName(name) {
    return TECHNOLOGY_SIGNATURES.find(sig => sig.name === name);
}
/**
 * Add custom signatures
 */
export function extendSignatures(signatures) {
    return [...TECHNOLOGY_SIGNATURES, ...signatures];
}
//# sourceMappingURL=signatures.js.map