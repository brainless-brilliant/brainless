/**
 * Agent Escalation Protocol
 * 
 * Enables agents to communicate internally before escalating to users.
 * Implements the hierarchy: Agent → PM → Specialist (BA/Arch/SM) → User
 */

export type EscalationType = 
  | 'question'           // Need clarification
  | 'blocker'            // Stuck, need help
  | 'design-decision'    // Architecture/design choice needed
  | 'security-concern'   // Security issue found
  | 'scope-change'       // Requirements changed
  | 'approval-needed';   // Need sign-off

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
export class EscalationRouter {
  /**
   * Determine who should handle an escalation
   */
  static route(request: EscalationRequest): string {
    if (request.to !== 'auto') {
      return request.to;
    }

    // Route by escalation type
    switch (request.type) {
      case 'design-decision':
      case 'security-concern':
        return 'architect'; // Vikram handles design/security

      case 'scope-change':
      case 'approval-needed':
        return 'analyst'; // Zoe (BA) handles scope/requirements

      case 'blocker':
      case 'question':
        return 'coordinator'; // PM handles general blockers

      default:
        return 'coordinator';
    }
  }

  /**
   * Determine if escalation should go to user
   */
  static shouldEscalateToUser(thread: EscalationThread): boolean {
    // Escalate to user if:
    // 1. Thread has 3+ failed internal attempts
    // 2. Marked as 'approval-needed'
    // 3. Security concern unresolved after architect review
    
    const attempts = thread.responses.length;
    const allUnresolved = thread.responses.every(r => !r.resolved);

    if (attempts >= 3 && allUnresolved) {
      return true;
    }

    if (thread.request.type === 'approval-needed') {
      return true;
    }

    if (thread.request.type === 'security-concern' && attempts >= 1 && allUnresolved) {
      return true;
    }

    return false;
  }

  /**
   * Format escalation for user display
   */
  static formatForUser(thread: EscalationThread): string {
    const { request, responses } = thread;
    
    let output = `## ⚠️ ${request.type.toUpperCase().replace('-', ' ')}\n\n`;
    output += `**From**: ${request.from}\n`;
    output += `**Issue**: ${request.message}\n\n`;

    if (responses.length > 0) {
      output += `### Internal Discussion:\n\n`;
      for (const resp of responses) {
        output += `- **${resp.from}**: ${resp.message}\n`;
      }
      output += `\n`;
    }

    output += `**We need your input to proceed.**\n`;
    
    return output;
  }
}

/**
 * In-memory escalation store (could be persisted later)
 */
export class EscalationStore {
  private threads: Map<string, EscalationThread> = new Map();

  createThread(request: EscalationRequest): EscalationThread {
    const thread: EscalationThread = {
      id: `esc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      request,
      responses: [],
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.threads.set(thread.id, thread);
    return thread;
  }

  getThread(id: string): EscalationThread | undefined {
    return this.threads.get(id);
  }

  addResponse(threadId: string, response: EscalationResponse): void {
    const thread = this.threads.get(threadId);
    if (!thread) return;

    thread.responses.push(response);
    thread.updatedAt = Date.now();

    // Update status
    if (response.resolved) {
      thread.status = 'resolved';
    } else if (response.nextAction === 'ask-user') {
      thread.status = 'user-needed';
    } else if (response.nextAction === 'escalate-higher') {
      thread.status = 'escalated';
    }
  }

  getPendingThreads(): EscalationThread[] {
    return Array.from(this.threads.values()).filter(t => t.status === 'pending');
  }

  getUserNeededThreads(): EscalationThread[] {
    return Array.from(this.threads.values()).filter(t => t.status === 'user-needed');
  }

  /**
   * Log escalation to memory layer
   */
  async logToMemory(thread: EscalationThread): Promise<void> {
    try {
      const { memory } = await import('../memory/index.js');
      
      const summary = `Escalation: ${thread.request.type} from ${thread.request.from}`;
      const narrative = `${thread.request.message}. Attempts: ${thread.responses.length}. Status: ${thread.status}`;
      
      // Record as observation (would need memory.recordInteraction to be public)
      // For now, just search to ensure memory is active
      memory.search(thread.request.type, 1);
    } catch (err) {
      // Memory not available, skip
    }
  }
}

// Global escalation store
export const escalationStore = new EscalationStore();
