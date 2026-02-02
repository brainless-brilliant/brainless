import Database from 'better-sqlite3';
import { join } from 'path';
import { homedir } from 'os';
import { mkdirSync } from 'fs';
import { SCHEMA } from './schema.js';

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
  facts: string[]; // Stored as JSON
  narrative: string | null;
  concepts: string[]; // Stored as JSON
  files_read: string[]; // Stored as JSON
  files_modified: string[]; // Stored as JSON
  prompt_number: number;
  discovery_tokens?: number;
  created_at_epoch: number;
}

export class MemoryStore {
  private db: Database.Database;

  constructor(dbPath?: string) {
    if (!dbPath) {
      const dir = join(homedir(), '.brainless');
      mkdirSync(dir, { recursive: true });
      dbPath = join(dir, 'memory.db');
    }
    
    this.db = new Database(dbPath);
    this.init();
  }

  private init() {
    this.db.pragma('journal_mode = WAL');
    
    // Check if tables exist, if not run schema
    const check = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='observations'").get();
    if (!check) {
      this.db.transaction(() => {
        for (const statement of SCHEMA) {
          this.db.exec(statement);
        }
      })();
    }
  }

  saveSession(session: Session) {
    const stmt = this.db.prepare(`
      INSERT INTO sessions (
        project, content_session_id, memory_session_id, user_prompt, created_at_epoch
      ) VALUES (
        @project, @content_session_id, @memory_session_id, @user_prompt, @created_at_epoch
      )
    `);

    return stmt.run(session);
  }

  saveObservation(obs: Observation) {
    const stmt = this.db.prepare(`
      INSERT INTO observations (
        memory_session_id, project, type, title, subtitle, facts, narrative, 
        concepts, files_read, files_modified, prompt_number, discovery_tokens, created_at_epoch
      ) VALUES (
        @memory_session_id, @project, @type, @title, @subtitle, @facts, @narrative, 
        @concepts, @files_read, @files_modified, @prompt_number, @discovery_tokens, @created_at_epoch
      )
    `);

    return stmt.run({
      ...obs,
      facts: JSON.stringify(obs.facts),
      concepts: JSON.stringify(obs.concepts),
      files_read: JSON.stringify(obs.files_read),
      files_modified: JSON.stringify(obs.files_modified)
    });
  }

  searchObservations(query: string, limit = 20): Observation[] {
    // FTS5 MATCH query
    // We search title, narrative, facts (concepts are also indexed)
    const stmt = this.db.prepare(`
      SELECT o.* 
      FROM fts_observations
      JOIN observations o ON fts_observations.rowid = o.id
      WHERE fts_observations MATCH @query
      ORDER BY rank
      LIMIT @limit
    `);

    const results = stmt.all({ query, limit }) as any[];

    // Parse JSON fields back to arrays
    return results.map(row => ({
      ...row,
      facts: JSON.parse(row.facts || '[]'),
      concepts: JSON.parse(row.concepts || '[]'),
      files_read: JSON.parse(row.files_read || '[]'),
      files_modified: JSON.parse(row.files_modified || '[]')
    }));
  }

  getTimeline(anchorEpoch: number, depth: number = 5): Observation[] {
    // Simple time-based window
    // Get obs BEFORE anchor
    const beforeStmt = this.db.prepare(`
      SELECT * FROM observations 
      WHERE created_at_epoch <= @anchorEpoch
      ORDER BY created_at_epoch DESC
      LIMIT @depth
    `);

    // Get obs AFTER anchor
    const afterStmt = this.db.prepare(`
      SELECT * FROM observations 
      WHERE created_at_epoch > @anchorEpoch
      ORDER BY created_at_epoch ASC
      LIMIT @depth
    `);

    const before = beforeStmt.all({ anchorEpoch, depth }) as any[];
    const after = afterStmt.all({ anchorEpoch, depth }) as any[];

    // Combine and sort
    const all = [...before, ...after].sort((a, b) => a.created_at_epoch - b.created_at_epoch);

    return all.map(row => ({
      ...row,
      facts: JSON.parse(row.facts || '[]'),
      concepts: JSON.parse(row.concepts || '[]'),
      files_read: JSON.parse(row.files_read || '[]'),
      files_modified: JSON.parse(row.files_modified || '[]')
    }));
  }
}
