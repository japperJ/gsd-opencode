# GSD — Get Shit Done

## CRITICAL RULES — READ FIRST

**When user says "gsd new-project" or "gsd-new-project":**

🛑 **STOP. DO NOT WRITE ANY CODE.**

You MUST follow the questioning workflow below BEFORE creating ANY files or writing ANY code.
The user's description after "gsd new-project" is just initial context — NOT permission to build.

**Use `ask_user` tool for all user choices** — present selectable options (up/down + Enter) instead of asking users to type responses.

**ALWAYS show content before asking for confirmation** — if asking "Does this look right?", you MUST display what "this" is in your message FIRST.

**🚨 NEVER pause between phases to announce what you're about to do.**
- WRONG: "Next, I'll define the requirements and confirm with you." (then stopping)
- RIGHT: Just display the requirements and call ask_user immediately.

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

**🚨 CRITICAL RULE: NEVER STOP BETWEEN PHASES**

This workflow is ONE continuous conversation. After EACH user response:
1. Process their answer
2. **IMMEDIATELY** continue to the next phase IN THE SAME MESSAGE
3. Do NOT say "Next, I'll..." — just DO IT
4. Only stop when calling `ask_user` for the next confirmation

**WRONG:** "I'll now define the requirements and ask you to confirm."
**RIGHT:** Just display the requirements and call ask_user.

When triggered, execute these phases IN ORDER:

### PHASE 1: QUESTIONING

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► QUESTIONING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**🛑 DO NOT CREATE FILES. DO NOT WRITE CODE.**

**Use ask_user to gather context with selectable options:**

1. Ask about **audience**:
   - Options: "Just me", "Friends/team", "Public users"

2. Ask about **tech stack**:
   - Options: "Vanilla JS (no framework)", "React", "Vue", "Whatever you recommend"

3. Ask about **scope**:
   - Options: "Minimal MVP", "Full featured v1", "Quick prototype"

4. Ask any **clarifying questions** as free text if needed.

**After answers → AUTOMATICALLY continue to Phase 2.**

---

### PHASE 2: RESEARCH (quick check)

**Use ask_user with options:**
- Question: "Research best practices for [domain] first?"
- Options: "Yes, research first", "No, skip to requirements"

**If yes:** 
1. Do quick web search
2. **Display key findings in your message**

**If no:** Skip directly to Phase 3.

**🚨 CRITICAL: In the SAME message where you display research findings (or skip message), you MUST ALSO display the Phase 3 banner and requirements. Do NOT stop after research. Do NOT say "Next, I'll..." — just DO it immediately.**

**→ Continue to Phase 3 IN THIS SAME RESPONSE.**

---

### PHASE 3: REQUIREMENTS

**🚨 This phase happens IMMEDIATELY after Phase 2 — in the SAME message.**

Display this banner AND the full requirements list in your message:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► DEFINING REQUIREMENTS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## V1 Requirements
- REQ-001: [specific requirement from their answers]
- REQ-002: [specific requirement]
- REQ-003: [specific requirement]

## Out of Scope
- [item 1]
- [item 2]
```

**All requirements MUST be visible in your message BEFORE calling ask_user.**

**THEN call ask_user:**
- Question: "Does this requirements list look right?"
- Options: "Yes, continue", "No, make changes"

**When user answers → continue to Phase 4 IN THE SAME RESPONSE.**

---

### PHASE 4: ROADMAP

**🚨 This phase happens IMMEDIATELY after Phase 3 — in the SAME message.**

Display this banner AND the full roadmap in your message:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► CREATING ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Phase 1: [Name] — [Goal]
- [deliverable 1]
- [deliverable 2]
Requirements: REQ-001, REQ-002

## Phase 2: [Name] — [Goal]
- [deliverable 1]
Requirements: REQ-003
```

**All roadmap content MUST be visible BEFORE calling ask_user.**

**THEN call ask_user:**
- Question: "Does this roadmap work?"
- Options: "Yes, create files", "No, adjust phases"

**When user answers Yes → continue to Phase 5 IN THE SAME RESPONSE.**

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
```

**Use ask_user with options:**
- Question: "Project initialized. What next?"
- Options: "Start planning phase 1", "I'll do it later"

If "Start planning phase 1" → run gsd plan-phase 1 workflow.
If "later" → stop and wait.

---

## gsd plan-phase N

1. Read `.planning/ROADMAP.md` for phase N details
2. Use `/plan` to create implementation plan
3. Save plan to `.planning/phases/0N-name/0N-01-PLAN.md`
4. Update STATE.md: Status = 🟡 Planned

**Display the full plan with checkboxes in your message:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PHASE N PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Tasks
- [ ] Task 1: [specific description]
- [ ] Task 2: [specific description]
- [ ] Task 3: [specific description]
```

**IMPORTANT: Show ALL tasks in your message BEFORE asking for confirmation.**

**THEN use ask_user with options:**
- Question: "Phase N planned. Ready to execute?"
- Options: "Yes, execute now", "No, I'll review first"

If "execute now" → run gsd execute-phase N workflow.

---

## gsd execute-phase N

**Display progress banner at start:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► EXECUTING PHASE N
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

1. Read plans in `.planning/phases/0N-*/`

**Show task list with status as you work:**
```
## Progress
- [x] Task 1: [description] ✓
- [→] Task 2: [description] ← current
- [ ] Task 3: [description]
```

2. For each task:
   - **Show:** `[→] Working on: [task description]`
   - Execute the task
   - Commit changes
   - **Show:** `[✓] Completed: [task description]`
   - Update the progress display

3. Update STATE.md after each task
4. On completion: Mark phase COMPLETED in ROADMAP.md

**Show completion:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PHASE N COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Completed Tasks
- [x] Task 1 ✓
- [x] Task 2 ✓
- [x] Task 3 ✓
```

**Use ask_user with options:**
- Question: "Phase N complete. What next?"
- Options: "Verify the work", "Plan next phase", "I'm done for now"

---

## gsd verify-work N

1. Use `/review` to check implementation
2. Verify: All tasks done, code works, tests pass
3. Update STATE.md: Status = 🟢 Verified or 🔴 Needs fixes

**Use ask_user with options:**
- Question: "Verification complete. Result?"
- Options: "All good, continue", "Issues found, needs fixes"

**If "All good, continue":**

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PHASE N VERIFIED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Then immediately use ask_user:**
- Question: "What would you like to do next?"
- Options: "Plan next phase", "See project progress", "I'm done for now"

If "Plan next phase" → run gsd plan-phase (N+1) workflow.
If "See project progress" → run gsd progress workflow.

**If "Issues found, needs fixes":**
- Ask what issues were found
- Create fix tasks
- Re-run execution for fixes

---

## gsd progress

Read STATE.md and ROADMAP.md, then display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PROJECT PROGRESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Phases
- [x] Phase 1: Foundation ✓
- [→] Phase 2: Core Features ← current
- [ ] Phase 3: Polish

## Current Phase Tasks
- [x] Task 2.1 ✓
- [→] Task 2.2 ← in progress
- [ ] Task 2.3

Status: [from STATE.md]
Next: [suggested action]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Use ask_user with options:**
- Question: "What would you like to do?"
- Options: "Continue current phase", "See phase details", "Nothing for now"

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
