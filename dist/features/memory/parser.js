/**
 * XML Parser - Robust observation parsing with type validation
 */
const VALID_TYPES = ['bugfix', 'feature', 'refactor', 'change', 'discovery', 'decision'];
const FALLBACK_TYPE = 'change';
/**
 * Parse observation XML from LLM response
 * Always returns a valid observation or null if explicitly ignored
 */
export function parseObservation(xml) {
    // Check for explicit ignore
    if (xml.includes('<type>ignored</type>')) {
        return null;
    }
    // Extract observation block
    const obsRegex = /<observation>([\s\S]*?)<\/observation>/;
    const match = obsRegex.exec(xml);
    if (!match) {
        return null;
    }
    const content = match[1];
    // Extract all fields
    const type = extractField(content, 'type');
    const title = extractField(content, 'title');
    const subtitle = extractField(content, 'subtitle');
    const narrative = extractField(content, 'narrative');
    const facts = extractArrayElements(content, 'facts', 'fact');
    const concepts = extractArrayElements(content, 'concepts', 'concept');
    const files_read = extractArrayElements(content, 'files_read', 'file');
    const files_modified = extractArrayElements(content, 'files_modified', 'file');
    // Validate type with fallback
    let finalType = FALLBACK_TYPE;
    if (type && VALID_TYPES.includes(type.toLowerCase())) {
        finalType = type.toLowerCase();
    }
    else if (type) {
        console.warn(`[Memory Parser] Invalid type "${type}", using fallback "${FALLBACK_TYPE}"`);
    }
    // Filter type from concepts (types and concepts are separate)
    const cleanedConcepts = concepts.filter(c => c !== finalType);
    return {
        type: finalType,
        title,
        subtitle,
        narrative,
        facts,
        concepts: cleanedConcepts,
        files_read,
        files_modified
    };
}
/**
 * Extract a simple field value from XML
 * Returns null for missing or empty fields
 */
function extractField(content, fieldName) {
    const regex = new RegExp(`<${fieldName}>([^<]*)</${fieldName}>`);
    const match = regex.exec(content);
    if (!match)
        return null;
    const trimmed = match[1].trim();
    return trimmed === '' ? null : trimmed;
}
/**
 * Extract array elements from XML
 */
function extractArrayElements(content, arrayName, elementName) {
    const elements = [];
    // Match the array block
    const arrayRegex = new RegExp(`<${arrayName}>(.*?)</${arrayName}>`, 's');
    const arrayMatch = arrayRegex.exec(content);
    if (!arrayMatch) {
        return elements;
    }
    const arrayContent = arrayMatch[1];
    // Extract individual elements
    const elementRegex = new RegExp(`<${elementName}>([^<]+)</${elementName}>`, 'g');
    let elementMatch;
    while ((elementMatch = elementRegex.exec(arrayContent)) !== null) {
        const value = elementMatch[1].trim();
        if (value) {
            elements.push(value);
        }
    }
    return elements;
}
//# sourceMappingURL=parser.js.map