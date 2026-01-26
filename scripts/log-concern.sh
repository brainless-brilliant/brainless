#!/bin/bash
# Log cross-cutting concerns to persistent file
# Usage: ./scripts/log-concern.sh "issue" "raised_by" "affects" "priority"

CONCERN_FILE=".brainless/transcripts/concerns.jsonl"
mkdir -p "$(dirname "$CONCERN_FILE")"

TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
ISSUE="${1:-Unknown issue}"
RAISED_BY="${2:-unknown}"
AFFECTS="${3:-unknown}"
PRIORITY="${4:-medium}"

echo "{\"timestamp\":\"$TIMESTAMP\",\"issue\":\"$ISSUE\",\"raised_by\":\"$RAISED_BY\",\"affects\":\"$AFFECTS\",\"priority\":\"$PRIORITY\",\"status\":\"open\"}" >> "$CONCERN_FILE"

echo "✓ Cross-cutting concern logged:"
echo "  Issue: $ISSUE"
echo "  Raised by: $RAISED_BY"
echo "  Affects: $AFFECTS"
echo "  Priority: $PRIORITY"
