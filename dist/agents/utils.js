/**
 * Agent Utilities
 *
 * Shared utilities for agent creation and management.
 * Includes prompt builders and configuration helpers.
 *
 * Ported from oh-my-opencode's agent utils.
 */
/**
 * Create tool restrictions configuration
 * Returns an object that can be spread into agent config to restrict tools
 */
export function createAgentToolRestrictions(blockedTools) {
    const restrictions = {};
    for (const tool of blockedTools) {
        restrictions[tool.toLowerCase()] = false;
    }
    return { tools: restrictions };
}
/**
 * Merge agent configuration with overrides
 */
export function mergeAgentConfig(base, override) {
    const { prompt_append, ...rest } = override;
    const merged = {
        ...base,
        ...(rest.model && { model: rest.model }),
        ...(rest.enabled !== undefined && { enabled: rest.enabled })
    };
    if (prompt_append && merged.prompt) {
        merged.prompt = merged.prompt + '\n\n' + prompt_append;
    }
    return merged;
}
/**
 * Build delegation table section for Brainless prompt
 */
export function buildDelegationTable(availableAgents) {
    if (availableAgents.length === 0) {
        return '';
    }
    const rows = availableAgents
        .filter(a => a.metadata.triggers.length > 0)
        .map(a => {
        const triggers = a.metadata.triggers
            .map(t => `${t.domain}: ${t.trigger}`)
            .join('; ');
        return `| ${a.metadata.promptAlias || a.name} | ${a.metadata.cost} | ${triggers} |`;
    });
    if (rows.length === 0) {
        return '';
    }
    return `### Agent Delegation Table

| Agent | Cost | When to Use |
|-------|------|-------------|
${rows.join('\n')}`;
}
/**
 * Build use/avoid section for an agent
 */
export function buildUseAvoidSection(metadata) {
    const sections = [];
    if (metadata.useWhen && metadata.useWhen.length > 0) {
        sections.push(`**USE when:**
${metadata.useWhen.map(u => `- ${u}`).join('\n')}`);
    }
    if (metadata.avoidWhen && metadata.avoidWhen.length > 0) {
        sections.push(`**AVOID when:**
${metadata.avoidWhen.map(a => `- ${a}`).join('\n')}`);
    }
    return sections.join('\n\n');
}
/**
 * Create environment context for agents
 */
export function createEnvContext() {
    const now = new Date();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
    return `
<env-context>
  Current time: ${timeStr}
  Timezone: ${timezone}
  Locale: ${locale}
</env-context>`;
}
/**
 * Get all available agents as AvailableAgent descriptors
 */
export function getAvailableAgents(agents) {
    return Object.entries(agents)
        .filter(([_, config]) => config.metadata)
        .map(([name, config]) => ({
        name,
        description: config.description,
        metadata: config.metadata
    }));
}
/**
 * Build key triggers section for Brainless prompt
 */
export function buildKeyTriggersSection(availableAgents) {
    const triggers = [];
    for (const agent of availableAgents) {
        for (const trigger of agent.metadata.triggers) {
            triggers.push(`- **${trigger.domain}** → ${agent.metadata.promptAlias || agent.name}: ${trigger.trigger}`);
        }
    }
    if (triggers.length === 0) {
        return '';
    }
    return `### Key Triggers (CHECK BEFORE ACTING)

${triggers.join('\n')}`;
}
/**
 * Validate agent configuration
 */
export function validateAgentConfig(config) {
    const errors = [];
    if (!config.name) {
        errors.push('Agent name is required');
    }
    if (!config.description) {
        errors.push('Agent description is required');
    }
    if (!config.prompt) {
        errors.push('Agent prompt is required');
    }
    if (!config.tools || config.tools.length === 0) {
        errors.push('Agent must have at least one tool');
    }
    return errors;
}
/**
 * Deep merge utility for configurations
 */
export function deepMerge(target, source) {
    const result = { ...target };
    for (const key of Object.keys(source)) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (sourceValue &&
            typeof sourceValue === 'object' &&
            !Array.isArray(sourceValue) &&
            targetValue &&
            typeof targetValue === 'object' &&
            !Array.isArray(targetValue)) {
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else if (sourceValue !== undefined) {
            result[key] = sourceValue;
        }
    }
    return result;
}
//# sourceMappingURL=utils.js.map