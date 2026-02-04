import { MemoryStore } from './store.js';
export declare class MemoryCompressor {
    private store;
    private llm;
    constructor(store: MemoryStore);
    compress(toolName: string, toolInput: any, toolOutput: any, cwd: string, project: string, memorySessionId: string, promptNumber: number): Promise<void>;
}
//# sourceMappingURL=compression.d.ts.map