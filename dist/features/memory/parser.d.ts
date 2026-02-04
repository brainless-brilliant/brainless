/**
 * XML Parser - Robust observation parsing with type validation
 */
export interface ParsedObservation {
    type: string;
    title: string | null;
    subtitle: string | null;
    facts: string[];
    narrative: string | null;
    concepts: string[];
    files_read: string[];
    files_modified: string[];
}
/**
 * Parse observation XML from LLM response
 * Always returns a valid observation or null if explicitly ignored
 */
export declare function parseObservation(xml: string): ParsedObservation | null;
//# sourceMappingURL=parser.d.ts.map