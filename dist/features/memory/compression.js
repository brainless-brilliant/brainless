import { MemoryLLM } from './llm.js';
import { SYSTEM_PROMPT, buildObservationPrompt } from './prompts.js';
import { parseObservation } from './parser.js';
export class MemoryCompressor {
    store;
    llm;
    constructor(store) {
        this.store = store;
        this.llm = new MemoryLLM();
    }
    async compress(toolName, toolInput, toolOutput, cwd, project, memorySessionId, promptNumber) {
        // 1. Build prompt
        const userPrompt = buildObservationPrompt(toolName, toolInput, toolOutput, cwd);
        // 2. Call LLM
        const xml = await this.llm.complete(SYSTEM_PROMPT, userPrompt);
        if (!xml || !xml.includes('<observation>')) {
            return; // No observation generated
        }
        // 3. Parse XML using robust parser
        const obs = parseObservation(xml);
        if (!obs) {
            return; // Explicitly ignored or invalid
        }
        // 4. Save to store
        this.store.saveObservation({
            memory_session_id: memorySessionId,
            project,
            type: obs.type,
            title: obs.title,
            subtitle: obs.subtitle,
            facts: obs.facts,
            narrative: obs.narrative,
            concepts: obs.concepts,
            files_read: obs.files_read,
            files_modified: obs.files_modified,
            prompt_number: promptNumber,
            created_at_epoch: Date.now()
        });
    }
}
//# sourceMappingURL=compression.js.map