/**
 * Delegation Rules Module
 *
 * Included when task requires orchestration/delegation to sub-agents.
 */
export const delegationRulesModule = {
    id: 'delegation-rules',
    name: 'Delegation Rules',
    estimatedTokens: 400,
    alwaysInclude: false,
    shouldInclude: (caps) => caps.needsDelegation,
    content: `**Dynamic Team Assembly:**

When you receive a task, the system will automatically assemble a specialized team for you.
The team is selected using:
1. **AI Analysis** - Haiku classifier recommends agents based on task complexity
2. **Memory Insights** - Past successful team compositions
3. **Capability Matching** - Task requirements → specialist skills

**Your Job:**
- Review the assembled team (shown at task start)
- Delegate to the recommended agents
- Trust the AI's agent selection (it's smarter than hardcoded rules)

**Available Specialist Agents:**
- **Security**: Elena (security-reviewer), Sam (security-low)
- **Build/Fix**: Marcus (build-fixer), Katie (build-fixer-low)
- **Architecture**: Vikram (architect), Priya (architect-medium), Rohan (architect-low)
- **Testing**: Maya (qa-tester), Oliver (tdd-guide)
- **Code Quality**: Sophia (code-reviewer), Liam (code-reviewer-low)
- **Implementation**: Jordan (executor-high), Alex (executor), Taylor (executor-low)
- **Research**: Nina (researcher), Ethan (researcher-low)
- **Navigation**: Leo (explore-high), Ava (explore-medium), Diego (explore)
- **Design**: Mia (designer-high), Isabella (designer), Noah (designer-low)
- **Data**: Ryan (scientist)
- **Planning**: James (planner), Zoe (analyst)
- **Docs**: Olivia (writer)
- **Vision**: Chloe (vision)

**Delegation Tips:**
1. Use the agent names shown in team assembly (e.g., "Elena, audit the auth module")
2. Provide complete context in delegation prompts
3. Multiple agents can work in parallel on independent tasks
4. Don't re-delegate back to yourself`,
};
//# sourceMappingURL=delegation.js.map