/**
 * Agent Personas & Human-Friendly Names
 *
 * Gives each agent a personality, nickname, and witty introduction.
 */
export const AGENT_PERSONAS = {
    'architect': {
        id: 'architect',
        name: 'Vikram',
        title: 'Principal Architect',
        personality: 'Philosophical, loves diagrams',
        intro: 'Drawing boxes and arrows since 2010',
        emoji: '🏗️',
    },
    'architect-medium': {
        id: 'architect-medium',
        name: 'Priya',
        title: 'Senior Architect',
        personality: 'Pragmatic, no-nonsense',
        intro: 'Here to refactor your spaghetti',
        emoji: '📐',
    },
    'architect-low': {
        id: 'architect-low',
        name: 'Rohan',
        title: 'Junior Architect',
        personality: 'Eager, asks good questions',
        intro: 'Learning the art of overthinking',
        emoji: '🎓',
    },
    'security-reviewer': {
        id: 'security-reviewer',
        name: 'Elena',
        title: 'Security Lead',
        personality: 'Paranoid (in a good way)',
        intro: 'Assuming everything is a SQL injection',
        emoji: '🔒',
    },
    'security-reviewer-low': {
        id: 'security-reviewer-low',
        name: 'Sam',
        title: 'Security Analyst',
        personality: 'Vigilant, thorough',
        intro: 'Quick scan, big impact',
        emoji: '🛡️',
    },
    'build-fixer': {
        id: 'build-fixer',
        name: 'Marcus',
        title: 'Build Engineer',
        personality: 'Patient, loves red squiggles',
        intro: 'TypeScript errors fear me',
        emoji: '🔧',
    },
    'build-fixer-low': {
        id: 'build-fixer-low',
        name: 'Katie',
        title: 'Build Intern',
        personality: 'Quick fixes, fast turnaround',
        intro: 'One-liners only, please',
        emoji: '⚡',
    },
    'executor': {
        id: 'executor',
        name: 'Alex',
        title: 'Senior Engineer',
        personality: 'Gets stuff done',
        intro: 'Ship it or skip it',
        emoji: '⚙️',
    },
    'executor-high': {
        id: 'executor-high',
        name: 'Jordan',
        title: 'Staff Engineer',
        personality: 'Handles the gnarly stuff',
        intro: 'Multi-file changes are my cardio',
        emoji: '🚀',
    },
    'executor-low': {
        id: 'executor-low',
        name: 'Taylor',
        title: 'Engineer',
        personality: 'Simple, effective',
        intro: 'One file at a time',
        emoji: '💻',
    },
    'qa-tester': {
        id: 'qa-tester',
        name: 'Maya',
        title: 'QA Lead',
        personality: 'Breaks everything',
        intro: 'Your code works? Let me check that',
        emoji: '🧪',
    },
    'tdd-guide': {
        id: 'tdd-guide',
        name: 'Oliver',
        title: 'TDD Evangelist',
        personality: 'Tests before code, always',
        intro: 'Red, green, refactor, repeat',
        emoji: '✅',
    },
    'code-reviewer': {
        id: 'code-reviewer',
        name: 'Sophia',
        title: 'Code Quality Lead',
        personality: 'Nitpicky (positively)',
        intro: 'Did you really need that nested ternary?',
        emoji: '👀',
    },
    'code-reviewer-low': {
        id: 'code-reviewer-low',
        name: 'Liam',
        title: 'Code Reviewer',
        personality: 'Fast, focused',
        intro: 'Quick glance, quick feedback',
        emoji: '⚡',
    },
    'researcher': {
        id: 'researcher',
        name: 'Nina',
        title: 'Research Lead',
        personality: 'Knows where the docs are',
        intro: 'RTFM? I wrote the FM',
        emoji: '📚',
    },
    'researcher-low': {
        id: 'researcher-low',
        name: 'Ethan',
        title: 'Documentation Analyst',
        personality: 'Quick searcher',
        intro: 'Ctrl+F is my superpower',
        emoji: '🔍',
    },
    'explore': {
        id: 'explore',
        name: 'Diego',
        title: 'Codebase Navigator',
        personality: 'Knows every file',
        intro: 'Lost code? I find it',
        emoji: '🧭',
    },
    'explore-medium': {
        id: 'explore-medium',
        name: 'Ava',
        title: 'Senior Navigator',
        personality: 'Traces call stacks for fun',
        intro: 'Deeper than grep, smarter than find',
        emoji: '🗺️',
    },
    'explore-high': {
        id: 'explore-high',
        name: 'Leo',
        title: 'Architecture Mapper',
        personality: 'Sees the big picture',
        intro: 'Mapping dependencies since breakfast',
        emoji: '🔭',
    },
    'designer': {
        id: 'designer',
        name: 'Isabella',
        title: 'UI/UX Lead',
        personality: 'Pixel-perfect',
        intro: 'That button is 2px off, just saying',
        emoji: '🎨',
    },
    'designer-low': {
        id: 'designer-low',
        name: 'Noah',
        title: 'UI Engineer',
        personality: 'Quick tweaks, big wins',
        intro: 'CSS wizardry in 5 lines',
        emoji: '✨',
    },
    'designer-high': {
        id: 'designer-high',
        name: 'Mia',
        title: 'Design Systems Architect',
        personality: 'Components > chaos',
        intro: 'Building design systems you\'ll actually use',
        emoji: '🏛️',
    },
    'planner': {
        id: 'planner',
        name: 'James',
        title: 'Technical Planner',
        personality: 'Strategy first',
        intro: 'Measure twice, code once',
        emoji: '📋',
    },
    'analyst': {
        id: 'analyst',
        name: 'Zoe',
        title: 'Business Analyst',
        personality: 'Reads between the lines',
        intro: 'What you asked vs. what you need',
        emoji: '🔬',
    },
    'writer': {
        id: 'writer',
        name: 'Olivia',
        title: 'Technical Writer',
        personality: 'Makes docs readable',
        intro: 'Documentation that devs might actually read',
        emoji: '📝',
    },
    'scientist': {
        id: 'scientist',
        name: 'Ryan',
        title: 'Data Scientist',
        personality: 'Loves numbers',
        intro: 'Your data has a story, I listen',
        emoji: '📊',
    },
    'vision': {
        id: 'vision',
        name: 'Chloe',
        title: 'Visual Analyst',
        personality: 'A picture says 1000 bugs',
        intro: 'I see screenshots, you see solutions',
        emoji: '👁️',
    },
    'critic': {
        id: 'critic',
        name: 'Daniel',
        title: 'Plan Reviewer',
        personality: 'Devil\'s advocate',
        intro: 'This will fail because...',
        emoji: '🎭',
    },
};
/**
 * Get persona for an agent
 */
export function getPersona(agentId) {
    return AGENT_PERSONAS[agentId] || null;
}
/**
 * Generate team introduction for transcript
 */
export function formatTeamIntro(agentIds) {
    const personas = agentIds.map(id => getPersona(id)).filter(Boolean);
    if (personas.length === 0) {
        return '🤖 Assembling generic team (someone forgot to add personas)';
    }
    const lines = personas.map(p => `   ${p.emoji} **${p.name}** (${p.title}): ${p.intro}`);
    const header = personas.length === 1
        ? '👤 Solo mission assigned to:'
        : `👥 Team of ${personas.length} assembled:`;
    return `${header}\n${lines.join('\n')}`;
}
/**
 * Generate sarcastic/witty runtime messages
 */
export function getWittyMessage(event) {
    const messages = {
        'team-assembly': [
            '🎯 Building your dream team (or at least a functional one)',
            '🚀 Summoning the cavalry',
            '🎪 Let\'s see who\'s available in the talent pool',
        ],
        'memory-search': [
            '🧠 Checking if we\'ve made this mistake before...',
            '📚 Consulting the ancient scrolls (aka last week\'s logs)',
            '🔮 Memory lane has some useful detours',
        ],
        'fallback': [
            '⚠️ Haiku ghosted us, going old school',
            '🛟 API key? What API key? Keyword mode engaged',
            '📡 Lost signal to mothership, improvising',
        ],
        'haiku-success': [
            '✨ Haiku came through (for once)',
            '🎵 Haiku sang its song, we listened',
            '🤖 AI picked the team (trust the machines)',
        ],
        'api-error': [
            '💥 API key says no (check your .env)',
            '🔌 Anthropic is taking a coffee break',
            '⚡ Rate limit says "slow down, cowboy"',
        ],
    };
    const options = messages[event];
    return options[Math.floor(Math.random() * options.length)];
}
//# sourceMappingURL=personas.js.map