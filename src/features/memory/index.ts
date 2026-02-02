import { MemoryStore } from './store.js';
import { MemoryCompressor } from './compression.js';
import { v4 as uuidv4 } from 'uuid';

export class BrainlessMemory {
  private static instance: BrainlessMemory;
  private store: MemoryStore;
  private compressor: MemoryCompressor;
  private currentMemorySessionId: string;
  private currentPromptNumber: number;

  private constructor() {
    this.store = new MemoryStore();
    this.compressor = new MemoryCompressor(this.store);
    this.currentMemorySessionId = uuidv4();
    this.currentPromptNumber = 0;
  }

  public static getInstance(): BrainlessMemory {
    if (!BrainlessMemory.instance) {
      BrainlessMemory.instance = new BrainlessMemory();
    }
    return BrainlessMemory.instance;
  }

  public getSessionId(): string {
    return this.currentMemorySessionId;
  }

  public startSession(project: string, contentSessionId: string, userPrompt?: string): void {
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

  public async recordInteraction(
    toolName: string,
    toolInput: any,
    toolOutput: any,
    cwd: string,
    project: string
  ): Promise<void> {
    // Increment prompt number for this interaction
    this.currentPromptNumber++;
    
    // Fire and forget compression to avoid blocking the main thread
    this.compressor.compress(
      toolName,
      toolInput,
      toolOutput,
      cwd,
      project,
      this.currentMemorySessionId,
      this.currentPromptNumber
    ).catch(err => console.error('Memory compression failed:', err));
  }

  public search(query: string, limit: number = 20) {
    return this.store.searchObservations(query, limit);
  }

  public getTimeline(anchorEpoch: number, depth: number = 5) {
    return this.store.getTimeline(anchorEpoch, depth);
  }
}

export const memory = BrainlessMemory.getInstance();
