# GSD — Get Shit Done

## CRITICAL RULES — READ FIRST

**When user says "gsd new-project" or "gsd-new-project":**

🛑 **STOP. DO NOT WRITE ANY CODE.**

You MUST follow the questioning workflow below BEFORE creating ANY files or writing ANY code.
The user's description after "gsd new-project" is just initial context — NOT permission to build.

---

## Commands

| Trigger | Action |
|---------|--------|
| `gsd help` | Show commands |
| `gsd new-project [description]` | **START QUESTIONING** (do NOT build yet) |
| `gsd plan-phase N` | Plan phase N |
| `gsd execute-phase N` | Execute phase N |
| `gsd verify-work N` | Review phase N |
| `gsd progress` | Show status |
| `gsd quick [task]` | Small immediate task |

---

## gsd new-project — MANDATORY WORKFLOW

**CRITICAL: This is ONE continuous conversation. After each user response, AUTOMATICALLY continue to the next phase. Do NOT stop and wait for a new command.**

When triggered, execute these phases IN ORDER:

### PHASE 1: QUESTIONING

**Display this banner, then immediately ask questions:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► QUESTIONING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**🛑 DO NOT CREATE FILES. DO NOT WRITE CODE.**

Ask:
> "Before I start building, I need to understand:
> 1. **Who is this for?** (yourself, friends, public?)
> 2. **What features matter most?**
> 3. **Any tech requirements?** (vanilla JS, specific framework?)
> 4. **What's v1 scope vs later?**
> 5. **What should I NOT include?**"

**Wait for user to answer → then AUTOMATICALLY continue to Phase 2.**

---

### PHASE 2: RESEARCH (quick check)

Ask: "Want me to quickly research best practices for [domain]? (yes/no)"

- If yes: Do quick research, share key findings
- If no: Skip

**After research (or skip) → AUTOMATICALLY continue to Phase 3.**

---

### PHASE 3: REQUIREMENTS

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► DEFINING REQUIREMENTS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Present requirements based on what user said:
```
## V1 Requirements
- REQ-001: [from their answers]
- REQ-002: [from their answers]

## Out of Scope
- [what they said to exclude]
```

Ask: "Does this look right? (yes / changes needed)"

**If yes → AUTOMATICALLY continue to Phase 4.**
**If changes → make changes, then continue to Phase 4.**

---

### PHASE 4: ROADMAP

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► CREATING ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Propose phases:
```
## Phase 1: [Name]
- [deliverable]
Requirements: REQ-001, REQ-002

## Phase 2: [Name]  
- [deliverable]
```

Ask: "Does this structure work? (yes / changes needed)"

**If yes → AUTOMATICALLY continue to Phase 5.**

---

### PHASE 5: CREATE FILES

**NOW create files** in `.planning/`:
- PROJECT.md — Vision
- REQUIREMENTS.md — Approved requirements  
- ROADMAP.md — Approved roadmap
- STATE.md — Status set to "Ready to plan phase 1"

---

### PHASE 6: DONE

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PROJECT INITIALIZED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files created in .planning/

Next: Say "gsd plan-phase 1" to start planning.
```

**NOW stop and wait for next command.**

---

## gsd plan-phase N

1. Read `.planning/ROADMAP.md` for phase N details
2. Use `/plan` to create implementation plan:
   ```
   /plan Implement [phase name]: [deliverables]
   ```
3. Save plan to `.planning/phases/0N-name/0N-01-PLAN.md`
4. Update STATE.md: Status = 🟡 Planned, Next = `gsd execute-phase N`

---

## gsd execute-phase N

1. Read plans in `.planning/phases/0N-*/`
2. Execute each task, committing after each
3. Update STATE.md after each task
4. On completion: Mark phase COMPLETED in ROADMAP.md

---

## gsd verify-work N

1. Use `/review` to check implementation:
   ```
   /review Phase N vs .planning/phases/0N-*
   ```
2. Verify: All tasks done, code works, tests pass
3. Update STATE.md: Status = 🟢 Verified or 🔴 Needs fixes

---

## gsd progress

Read STATE.md and display:
```
═══════════════════════════════════════
📊 GSD PROGRESS
═══════════════════════════════════════

Current Phase: [from STATE.md]
Status: [status]
Last Action: [action]
Next Action: [next]

═══════════════════════════════════════
```

---

## gsd quick [task]

For small tasks that don't need planning:
- Execute directly
- Commit with proper message
- Update STATE.md if relevant

---

## gsd delegate-task [description]

Use `/delegate [description]` for async work.

---

## File Structure

```
.planning/
├── PROJECT.md              # Vision
├── REQUIREMENTS.md         # Scoped requirements
├── ROADMAP.md              # Phases
├── STATE.md                # Current state (update often!)
└── phases/
    └── 01-foundation/
        ├── 01-01-PLAN.md
        └── 01-01-SUMMARY.md
```

---

## Native Features

Use these Copilot CLI features:
- `/plan` — Structured planning (used by gsd plan-phase)
- `/review` — Code review (used by gsd verify-work)
- `/delegate` — Async work (used by gsd delegate-task)
- `/context` — Check token usage
- `Shift+Tab` — Toggle plan mode
- `@filename` — Include file in context
