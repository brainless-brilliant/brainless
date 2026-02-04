/**
 * Atomic, durable file writes for brainlesscode.
 * Self-contained module with no external dependencies.
 */
/**
 * Create directory recursively (inline implementation).
 * Ensures parent directories exist before creating the target directory.
 *
 * @param dir Directory path to create
 */
export declare function ensureDirSync(dir: string): void;
/**
 * Write JSON data atomically to a file.
 * Uses temp file + atomic rename pattern to ensure durability.
 *
 * @param filePath Target file path
 * @param data Data to serialize as JSON
 * @throws Error if JSON serialization fails or write operation fails
 */
export declare function atomicWriteJson(filePath: string, data: unknown): Promise<void>;
/**
 * Read and parse JSON file with error handling.
 * Returns null if file doesn't exist or on parse errors.
 *
 * @param filePath Path to JSON file
 * @returns Parsed JSON data or null on error
 */
export declare function safeReadJson<T>(filePath: string): Promise<T | null>;
//# sourceMappingURL=atomic-write.d.ts.map