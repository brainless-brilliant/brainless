import { MemoryStore } from './store.js';
import { MemoryCompressor } from './compression.js';
import { v4 as uuidv4 } from 'uuid';
export class BrainlessMemory {
    static instance;
    store;
    compressor;
    currentMemorySessionId;
    currentPromptNumber;
    constructor() {
        this.store = new MemoryStore();
        this.compressor = new MemoryCompressor(this.store);
        this.currentMemorySessionId = uuidv4();
        this.currentPromptNumber = 0;
    }
    static getInstance() {
        if (!BrainlessMemory.instance) {
            BrainlessMemory.instance = new BrainlessMemory();
        }
        return BrainlessMemory.instance;
    }
    getSessionId() {
        return this.currentMemorySessionId;
    }
    startSession(project, contentSessionId, userPrompt) {
        this.currentMemorySessionId = uuidv4();
        this.currentPromptNumber = 0;
        this.store.saveSession({
            project,
            content_session_id: contentSessionId,
            memory_session_id: this.currentMemorySessionId,
            user_prompt: userPrompt || null,
            created_at_epoch: Date.now()
        });
    }
    async recordInteraction(toolName, toolInput, toolOutput, cwd, project) {
        // Increment prompt number for this interaction
        this.currentPromptNumber++;
        // Fire and forget compression to avoid blocking the main thread
        this.compressor.compress(toolName, toolInput, toolOutput, cwd, project, this.currentMemorySessionId, this.currentPromptNumber).catch(err => console.error('Memory compression failed:', err));
    }
    search(query, limit = 20) {
        return this.store.searchObservations(query, limit);
    }
    getTimeline(anchorEpoch, depth = 5) {
        return this.store.getTimeline(anchorEpoch, depth);
    }
}
export const memory = BrainlessMemory.getInstance();
//# sourceMappingURL=index.js.map