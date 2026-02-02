export const SCHEMA = [
  // 1. Core Tables
  `CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project TEXT NOT NULL,
    content_session_id TEXT NOT NULL,
    memory_session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at_epoch BIGINT NOT NULL,
    user_prompt TEXT,
    last_assistant_message TEXT,
    last_prompt_number INTEGER DEFAULT 0
  );`,

  `CREATE TABLE IF NOT EXISTS observations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memory_session_id TEXT NOT NULL,
    project TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    facts TEXT, -- JSON array
    narrative TEXT,
    concepts TEXT, -- JSON array
    files_read TEXT, -- JSON array
    files_modified TEXT, -- JSON array
    prompt_number INTEGER NOT NULL,
    discovery_tokens INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at_epoch BIGINT NOT NULL
  );`,

  `CREATE TABLE IF NOT EXISTS session_summaries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    memory_session_id TEXT NOT NULL,
    project TEXT NOT NULL,
    request TEXT,
    investigated TEXT,
    learned TEXT,
    completed TEXT,
    next_steps TEXT,
    notes TEXT,
    prompt_number INTEGER NOT NULL,
    discovery_tokens INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at_epoch BIGINT NOT NULL
  );`,

  // INDEXES
  `CREATE INDEX IF NOT EXISTS idx_sessions_project ON sessions(project);`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_memory_id ON sessions(memory_session_id);`,
  
  `CREATE INDEX IF NOT EXISTS idx_observations_project ON observations(project);`,
  `CREATE INDEX IF NOT EXISTS idx_observations_memory_id ON observations(memory_session_id);`,
  `CREATE INDEX IF NOT EXISTS idx_observations_created_at_epoch ON observations(created_at_epoch);`,
  
  `CREATE INDEX IF NOT EXISTS idx_summaries_project ON session_summaries(project);`,
  `CREATE INDEX IF NOT EXISTS idx_summaries_memory_id ON session_summaries(memory_session_id);`,

  // 2. Full Text Search (FTS5)
  // We explicitly create an External Content FTS5 table to save space and keep sync simple
  // Ref: https://sqlite.org/fts5.html#external_content_tables
  
  `CREATE VIRTUAL TABLE IF NOT EXISTS fts_observations USING fts5(
    title,
    narrative,
    facts,
    concepts,
    content='observations',
    content_rowid='id'
  );`,

  // 3. Triggers to keep FTS5 in sync with observations
  `CREATE TRIGGER IF NOT EXISTS obs_ai AFTER INSERT ON observations BEGIN
    INSERT INTO fts_observations(rowid, title, narrative, facts, concepts)
    VALUES (new.id, new.title, new.narrative, new.facts, new.concepts);
  END;`,

  `CREATE TRIGGER IF NOT EXISTS obs_ad AFTER DELETE ON observations BEGIN
    INSERT INTO fts_observations(fts_observations, rowid, title, narrative, facts, concepts)
    VALUES('delete', old.id, old.title, old.narrative, old.facts, old.concepts);
  END;`,

  `CREATE TRIGGER IF NOT EXISTS obs_au AFTER UPDATE ON observations BEGIN
    INSERT INTO fts_observations(fts_observations, rowid, title, narrative, facts, concepts)
    VALUES('delete', old.id, old.title, old.narrative, old.facts, old.concepts);
    INSERT INTO fts_observations(rowid, title, narrative, facts, concepts)
    VALUES (new.id, new.title, new.narrative, new.facts, new.concepts);
  END;`
];
