---
description: Initialize or re-initialize Brainless CLAUDE.md configuration
argument-hint: [--force]
---

<command-instruction>
You are executing the /brainless:init command. Your job is to initialize the Brainless plugin configuration for this project.

## STEP 0: DISPLAY INITIALIZATION MESSAGE (IMMEDIATE)

Print this EXACTLY:

```
🚀 Initializing Brainless AI Workforce...
```

## STEP 1: CHECK FOR EXISTING CLAUDE.md

Check these locations in order:
1. `.claude/CLAUDE.md` (project-specific)
2. `CLAUDE.md` (project root)
3. `~/.claude/CLAUDE.md` (global)

### Detection Logic

```
IF .claude/CLAUDE.md exists:
  → EXISTING_LOCATION = "project"
  → EXISTING_PATH = ".claude/CLAUDE.md"
ELSE IF CLAUDE.md exists in project root:
  → EXISTING_LOCATION = "root"
  → EXISTING_PATH = "CLAUDE.md"
ELSE IF ~/.claude/CLAUDE.md exists:
  → EXISTING_LOCATION = "global"
  → EXISTING_PATH = "~/.claude/CLAUDE.md"
ELSE:
  → EXISTING_LOCATION = "none"
```

## STEP 2: DISPLAY STATUS (MANDATORY OUTPUT)

**Print the status. NO BASH COMMANDS. NO PERMISSION PROMPTS.**

### If no existing CLAUDE.md:

```
📁 Status: No existing CLAUDE.md found

✨ Creating fresh Brainless configuration...
```

Then proceed to STEP 4 (create new).

### If existing CLAUDE.md found:

```
📁 Status: Found existing CLAUDE.md at [path]
   Size: [X] bytes | Lines: [N]

🔍 Detected content:
   • [Brief summary of what's in the file]
   • [E.g., "Custom SOPs detected", "Plain template", etc.]
```

Then proceed to STEP 3 (merge options).

## STEP 3: OFFER MERGE OPTIONS (If existing file)

Present these options:

```
📋 Merge Options:

1. **Override** - Replace with Brainless defaults (backup created)
2. **Merge (AI)** - Intelligently combine your SOPs with Brainless features
3. **Skip** - Keep existing, don't modify

Which option? (1/2/3)
```

Wait for user response.

### If user chooses Override (1):
- Create backup at `[original-path].backup.[timestamp]`
- Replace with Brainless template
- Print: `✅ Backed up to [backup-path] and replaced with Brainless defaults`

### If user chooses Merge (2):
- Use AI to intelligently merge:
  - Preserve user's custom SOPs
  - Add Brainless behavioral instructions
  - Avoid duplicating content
- Print merged result summary
- Ask for confirmation before writing

### If user chooses Skip (3):
- Print: `⏭️ Skipping CLAUDE.md modification. Your configuration is unchanged.`
- Exit

## STEP 4: CREATE/UPDATE CLAUDE.md

Write the Brainless template content that includes:
- Team assembly behavioral instructions
- Escalation protocol (3-tier)
- Memory integration rules
- Agent delegation protocol

### Template Structure

```markdown
# Brainless AI Workforce - Runtime Behavior

[Behavioral instructions for Claude - NOT documentation for humans]

## Automatic Team Assembly
[When to trigger, what to display]

## Escalation Protocol
[3-tier: Self → Specialist → User]

## Memory Integration
[Search before work, capture after]

## Slash Commands
[Reference to command files]
```

## STEP 5: CREATE .brainless DIRECTORY

Ensure project structure exists:

```
.brainless/
├── memory/         # Task patterns and learnings
├── transcripts/    # Agent activity logs
├── plans/          # Work plans
├── debates/        # Agent discussions
└── escalations/    # User escalation history
```

Create any missing directories.

## STEP 6: DISPLAY COMPLETION (MANDATORY OUTPUT)

```
✅ Brainless initialized successfully!

📁 Configuration:
   • CLAUDE.md: [path where written]
   • Memory: .brainless/memory/
   • Transcripts: .brainless/transcripts/

🎯 Next steps:
   1. Run /brainless:status to verify configuration
   2. Try /brainless:team "your task" to test team assembly
   3. Enable debug mode: export BRAINLESS_DEBUG=true

💡 Tip: Your existing SOPs were [preserved/merged/backed up].
```

---

## EXAMPLES

**Fresh install:**
```
🚀 Initializing Brainless AI Workforce...

📁 Status: No existing CLAUDE.md found

✨ Creating fresh Brainless configuration...

✅ Brainless initialized successfully!

📁 Configuration:
   • CLAUDE.md: .claude/CLAUDE.md
   • Memory: .brainless/memory/
   • Transcripts: .brainless/transcripts/

🎯 Next steps:
   1. Run /brainless:status to verify configuration
   2. Try /brainless:team "your task" to test team assembly
   3. Enable debug mode: export BRAINLESS_DEBUG=true
```

**Merge scenario:**
```
🚀 Initializing Brainless AI Workforce...

📁 Status: Found existing CLAUDE.md at .claude/CLAUDE.md
   Size: 2,450 bytes | Lines: 87

🔍 Detected content:
   • Custom coding standards
   • Git workflow preferences
   • Testing requirements

📋 Merge Options:

1. **Override** - Replace with Brainless defaults (backup created)
2. **Merge (AI)** - Intelligently combine your SOPs with Brainless features
3. **Skip** - Keep existing, don't modify

Which option? (1/2/3)
```

</command-instruction>

<current-context>
<project-claude-md>
!`test -f .claude/CLAUDE.md && echo "exists at .claude/CLAUDE.md" || echo "not found"`
</project-claude-md>
<root-claude-md>
!`test -f CLAUDE.md && echo "exists at root" || echo "not found"`
</root-claude-md>
<global-claude-md>
!`test -f ~/.claude/CLAUDE.md && echo "exists globally" || echo "not found"`
</global-claude-md>
<brainless-dir>
!`test -d .brainless && echo "exists" || echo "not found"`
</brainless-dir>
</current-context>
