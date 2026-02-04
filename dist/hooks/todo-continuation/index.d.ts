/**
 * Todo Continuation Enforcer Hook
 *
 * Prevents stopping when incomplete tasks remain in the todo list.
 * Forces the agent to continue until all tasks are marked complete.
 *
 * Ported from oh-my-opencode's todo-continuation-enforcer hook.
 */
export interface Todo {
    content: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    priority?: string;
    id?: string;
}
export interface IncompleteTodosResult {
    count: number;
    todos: Todo[];
    total: number;
}
/**
 * Context from Stop hook event
 *
 * NOTE: Field names support both camelCase and snake_case variants
 * for compatibility with different Claude Code versions.
 *
 * IMPORTANT: The abort detection patterns below are assumed. Verify
 * actual stop_reason values from Claude Code before finalizing.
 */
export interface StopContext {
    /** Reason for stop (from Claude Code) - snake_case variant */
    stop_reason?: string;
    /** Reason for stop (from Claude Code) - camelCase variant */
    stopReason?: string;
    /** End turn reason (from API) - snake_case variant */
    end_turn_reason?: string;
    /** End turn reason (from API) - camelCase variant */
    endTurnReason?: string;
    /** Whether user explicitly requested stop - snake_case variant */
    user_requested?: boolean;
    /** Whether user explicitly requested stop - camelCase variant */
    userRequested?: boolean;
}
export interface TodoContinuationHook {
    checkIncomplete: (sessionId?: string) => Promise<IncompleteTodosResult>;
}
/**
 * Detect if stop was due to user abort (not natural completion)
 *
 * NOTE: These patterns are ASSUMED. Verify against actual Claude Code
 * API responses and update as needed.
 */
export declare function isUserAbort(context?: StopContext): boolean;
/**
 * Check for incomplete todos across all possible locations
 */
export declare function checkIncompleteTodos(sessionId?: string, directory?: string, stopContext?: StopContext): Promise<IncompleteTodosResult>;
/**
 * Create a Todo Continuation hook instance
 */
export declare function createTodoContinuationHook(directory: string): TodoContinuationHook;
/**
 * Get formatted status string for todos
 */
export declare function formatTodoStatus(result: IncompleteTodosResult): string;
/**
 * Get the next pending todo
 */
export declare function getNextPendingTodo(result: IncompleteTodosResult): Todo | null;
//# sourceMappingURL=index.d.ts.map