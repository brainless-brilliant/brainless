import Database from 'better-sqlite3';
export interface Session {
    id?: number;
    project: string;
    content_session_id: string;
    memory_session_id: string;
    user_prompt: string | null;
    created_at_epoch: number;
}
export interface Observation {
    id?: number;
    memory_session_id: string;
    project: string;
    type: string;
    title: string | null;
    subtitle: string | null;
    facts: string[];
    narrative: string | null;
    concepts: string[];
    files_read: string[];
    files_modified: string[];
    prompt_number: number;
    discovery_tokens?: number;
    created_at_epoch: number;
}
export declare class MemoryStore {
    private db;
    constructor(dbPath?: string);
    private init;
    saveSession(session: Session): Database.RunResult;
    saveObservation(obs: Observation): Database.RunResult;
    searchObservations(query: string, limit?: number): Observation[];
    getTimeline(anchorEpoch: number, depth?: number): Observation[];
}
//# sourceMappingURL=store.d.ts.map