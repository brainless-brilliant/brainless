# Contributing to Brainless

Thank you for your interest in contributing to Brainless! This guide will help you get started.

---

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Claude Code (for testing the plugin)

### Clone and Build

1. **Fork and clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/brainless.git
cd brainless
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the project:**
```bash
npm run build
```

4. **Run tests:**
```bash
npm test
```

All tests should pass before making changes.

---

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run unit tests
npm test

# Run specific test suites
npx tsx scripts/test-team-builder-integration.ts
npx tsx scripts/test-escalation.ts
npx tsx scripts/test-e2e-integration.ts
```

### 4. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add new specialist agent for database optimization"
git commit -m "fix: resolve memory filter edge case"
git commit -m "docs: update agent persona documentation"
```

**Commit message format:**
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `test:` test updates
- `refactor:` code refactoring
- `chore:` maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with:
- Clear description of changes
- Reference to any related issues
- Screenshots/examples if applicable

---

## Project Structure

```
brainless/
├── src/
│   ├── agents/              # Agent definitions and prompts
│   │   ├── modules/         # Modular prompt system
│   │   ├── coordinator.ts   # PM orchestrator
│   │   ├── executor.ts      # Implementation agents
│   │   └── ...
│   ├── features/
│   │   ├── team-builder/    # Dynamic team assembly
│   │   ├── escalation/      # Agent escalation protocol
│   │   ├── memory/          # Memory layer integration
│   │   └── model-routing/   # Haiku classifier
│   ├── hooks/               # Lifecycle hooks
│   └── tools/               # Tool implementations
├── scripts/                 # Test and demo scripts
└── templates/               # Configuration templates
```

---

## Adding New Features

### Adding a New Agent

1. Create agent file in `src/agents/`:
```typescript
// src/agents/my-agent.ts
import type { AgentConfig, AgentPromptMetadata } from './types.js';

export const MY_AGENT_PROMPT_METADATA: AgentPromptMetadata = {
  category: 'specialist',
  cost: 'MEDIUM',
  promptAlias: 'my-agent',
  triggers: [{ domain: 'My Domain', trigger: 'Description' }],
  useWhen: ['When to use this agent'],
  avoidWhen: ['When to avoid'],
};

export const myAgent: AgentConfig = {
  name: 'my-agent',
  description: 'What this agent does',
  prompt: `Agent prompt here...`,
  tools: ['Read', 'Write'],
  model: 'sonnet',
  metadata: MY_AGENT_PROMPT_METADATA,
};
```

2. Add to `src/agents/index.ts`
3. Add persona to `src/features/team-builder/personas.ts`
4. Update `src/features/team-builder/index.ts` AGENT_REGISTRY

### Adding a New Escalation Type

1. Update `src/features/escalation/index.ts`:
```typescript
export type EscalationType = 
  | 'existing-types'
  | 'your-new-type';
```

2. Add routing logic in `EscalationRouter.route()`
3. Add tests in `scripts/test-escalation.ts`

### Extending Memory Layer

Memory integration points:
- `src/features/memory/index.ts` - Core memory API
- `src/hooks/bridge.ts` - Memory capture filter
- `src/features/team-builder/index.ts` - Memory-informed team selection

---

## Testing Guidelines

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
# Team builder
npx tsx scripts/test-team-builder-integration.ts

# Escalation protocol
npx tsx scripts/test-escalation.ts

# End-to-end
npx tsx scripts/test-e2e-integration.ts
```

### Manual Testing

1. Build the plugin: `npm run build`
2. Install in Claude Code
3. Test with real tasks
4. Enable debug mode: `export BRAINLESS_DEBUG=true`

---

## Code Style

- **TypeScript**: Use strict types, avoid `any`
- **Formatting**: Run `npm run format` (if configured)
- **Naming**: Descriptive names, camelCase for variables, PascalCase for types
- **Comments**: Explain "why", not "what"
- **Error Handling**: Always handle errors gracefully

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- **Be respectful** - Treat everyone with respect and kindness
- **Be collaborative** - Work together, help each other
- **Be constructive** - Provide helpful feedback
- **Be patient** - Remember everyone was new once

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling, insulting, or derogatory language
- Personal or political attacks
- Publishing others' private information

### Enforcement

Violations may result in temporary or permanent ban from the project.

Report issues to: [maintainer email or GitHub issues]

---

## Architecture Decisions

### Why Haiku for Classification?

- **Speed**: Sub-second task analysis
- **Cost**: 100x cheaper than Opus
- **Accuracy**: Good enough for team recommendations
- **Fallback**: Keyword mode when unavailable

### Why Memory Layer?

- **Learning**: System improves over time
- **Context**: Teams benefit from project history
- **Patterns**: Identifies what works

### Why 3-Tier Escalation?

- **Efficiency**: Most issues resolve internally
- **User Experience**: Less interruption
- **Collaboration**: Agents help each other

---

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run all tests
4. Create git tag: `git tag v1.x.x`
5. Push: `git push origin master --tags`
6. Create GitHub release with notes

---

## Getting Help

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions, share ideas
- **Pull Requests**: Review in-progress work

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Brainless!** 🙏

Every contribution, no matter how small, makes this project better.
