---
name: transcript
description: View agent activity transcript and audit trail
---

<command-instruction>
You are executing the /transcript command. Display the agent activity log.

## STEP 1: CHECK FOR TRANSCRIPT FILES

Look for transcripts in `.brainless/transcripts/`:

```bash
ls -la .brainless/transcripts/*.md 2>/dev/null | head -10
```

If no transcripts found:
```
📭 No Transcripts Found

No agent activity has been recorded yet.
Transcripts are created when you use /team for orchestration.

Run /team "your task" to start an orchestrated session.
```
Exit if no transcripts.

## STEP 2: READ ACTIVITY LOG

Read the most recent transcript file or `activity.jsonl` if present.

Parse each activity record with fields:
- `timestamp`: When it happened
- `agent`: Which agent acted
- `action`: What they did (spawned, completed, proposed, etc.)
- `summary`: Brief description

## STEP 3: DISPLAY TRANSCRIPT (MANDATORY OUTPUT)

Format and display the transcript:

```
📋 Agent Activity Transcript
═══════════════════════════════════════════════════
Session: [session-id or filename]
Generated: [current timestamp]
Total Activities: [count]
═══════════════════════════════════════════════════

| Time  | Agent     | Action    | Summary                              |
|-------|-----------|-----------|--------------------------------------|
| 10:30 | pm        | spawned   | Orchestrating: Build auth system     |
| 10:31 | analyst   | spawned   | Analyzing requirements               |
| 10:32 | analyst   | completed | Found 5 requirements, 2 risks        |
| 10:33 | architect | spawned   | Designing system architecture        |
| 10:35 | architect | proposed  | Microservices with JWT auth          |
| 10:35 | security  | counter   | Suggest session tokens instead       |
| 10:36 | pm        | decided   | Using JWT - better for stateless API |
| 10:37 | planner   | spawned   | Creating implementation plan         |
| ...   | ...       | ...       | ...                                  |

═══════════════════════════════════════════════════

📊 Summary:
   • Agents involved: [list]
   • Decisions made: [count]
   • Debates held: [count]
   • Duration: [time]
   • Status: [Active/Completed]

═══════════════════════════════════════════════════
```

## STEP 4: HANDLE VARIANTS

If user specifies a variant:

### `/transcript full`
Show all activities without limit.

### `/transcript timeline`
Redirect to /timeline command.

### `/transcript summary`
Show only the summary section.

## ACTION ICONS

Use these icons based on action type:

| Icon | Action     | Meaning                    |
|------|------------|----------------------------|
| 🚀   | spawned    | Agent was started          |
| ✅   | completed  | Agent finished             |
| ❌   | failed     | Agent error                |
| ➡️   | delegated  | Spawned another agent      |
| 💡   | proposed   | Made a proposal            |
| 👍   | approved   | PM approved                |
| 👎   | rejected   | PM rejected                |
| 💬   | debated    | Discussion started         |
| ⚖️   | decided    | Decision made              |
| ⏳   | pending    | Waiting for approval       |
| 🚪   | passed     | Gate passed                |

</command-instruction>

<current-context>
<!-- Context is automatically injected by the context-injector.mjs hook -->
<!-- Parse the <brainless-context> JSON block above for: -->
<!-- - brainless.transcripts: count of transcript files -->
<!-- - brainless.recentTranscripts: array of recent filenames -->
<!-- - hasActivityLog: whether activity.jsonl exists -->
</current-context>
