/**
 * Agent Escalation Protocol
 *
 * Enables agents to communicate internally before escalating to users.
 * Implements the hierarchy: Agent → PM → Specialist (BA/Arch/SM) → User
 */
export type EscalationType = 'question' | 'blocker' | 'design-decision' | 'security-concern' | 'scope-change' | 'approval-needed';
export interface EscalationRequest {
    /** Who is escalating */
    from: string;
    /** Who to escalate to (or 'auto' for routing) */
    to: string | 'auto';
    /** Type of escalation */
    type: EscalationType;
    /** The question or issue */
    message: string;
    /** Context (file paths, code snippets, etc.) */
    context?: Record<string, unknown>;
    /** Timestamp */
    timestamp: number;
}
export interface EscalationResponse {
    /** Who responded */
    from: string;
    /** Response to the escalation */
    message: string;
    /** Whether issue is resolved */
    resolved: boolean;
    /** If not resolved, next step */
    nextAction?: 'escalate-higher' | 'ask-user' | 'retry';
    /** Timestamp */
    timestamp: number;
}
export interface EscalationThread {
    /** Unique thread ID */
    id: string;
    /** Original request */
    request: EscalationRequest;
    /** Responses in this thread */
    responses: EscalationResponse[];
    /** Current status */
    status: 'pending' | 'resolved' | 'escalated' | 'user-needed';
    /** Created timestamp */
    createdAt: number;
    /** Updated timestamp */
    updatedAt: number;
}
/**
 * Escalation routing logic
 */
export declare class EscalationRouter {
    /**
     * Determine who should handle an escalation
     */
    static route(request: EscalationRequest): string;
    /**
     * Determine if escalation should go to user
     */
    static shouldEscalateToUser(thread: EscalationThread): boolean;
    /**
     * Format escalation for user display
     */
    static formatForUser(thread: EscalationThread): string;
}
/**
 * In-memory escalation store (could be persisted later)
 */
export declare class EscalationStore {
    private threads;
    createThread(request: EscalationRequest): EscalationThread;
    getThread(id: string): EscalationThread | undefined;
    addResponse(threadId: string, response: EscalationResponse): void;
    getPendingThreads(): EscalationThread[];
    getUserNeededThreads(): EscalationThread[];
    /**
     * Log escalation to memory layer
     */
    logToMemory(thread: EscalationThread): Promise<void>;
}
export declare const escalationStore: EscalationStore;
//# sourceMappingURL=index.d.ts.map