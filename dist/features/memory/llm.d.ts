export declare class MemoryLLM {
    private apiKey;
    private model;
    constructor(apiKey?: string);
    complete(system: string, user: string): Promise<string>;
}
//# sourceMappingURL=llm.d.ts.map