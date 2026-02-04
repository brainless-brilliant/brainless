export declare class BrainlessMemory {
    private static instance;
    private store;
    private compressor;
    private currentMemorySessionId;
    private currentPromptNumber;
    private constructor();
    static getInstance(): BrainlessMemory;
    getSessionId(): string;
    startSession(project: string, contentSessionId: string, userPrompt?: string): void;
    recordInteraction(toolName: string, toolInput: any, toolOutput: any, cwd: string, project: string): Promise<void>;
    search(query: string, limit?: number): import("./store.js").Observation[];
    getTimeline(anchorEpoch: number, depth?: number): import("./store.js").Observation[];
}
export declare const memory: BrainlessMemory;
//# sourceMappingURL=index.d.ts.map