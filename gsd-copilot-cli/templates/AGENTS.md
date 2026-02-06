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

When triggered, you MUST execute these phases IN ORDER. Do NOT skip any phase.

### PHASE 1: QUESTIONING (MANDATORY)

**Display this banner, then immediately ask questions:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► QUESTIONING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**🛑 DO NOT CREATE FILES. DO NOT WRITE CODE.**

**Immediately ask these questions in your response (do not wait for a tool):**

"Before I start building, I need to understand a few things:

1. **Who is this for?** (yourself, friends, public?)
2. **What features matter most?** (scoring, levels, mobile support, multiplayer?)
3. **Any specific tech requirements?** (vanilla JS only, framework preference, styling?)
4. **What's the scope?** What should v1 include vs later versions?
5. **What should I NOT include?** (to keep scope clear)

Please answer these so I can plan properly."

**WAIT for user to respond before proceeding.**

After they answer, you may ask follow-up questions if anything is unclear.

When you have clarity, ask:
> "I think I understand. Ready to define requirements, or do you want to share more?"

Only proceed when user says they're ready.

---

### PHASE 2: RESEARCH (OPTIONAL)

Ask the user:
> "Would you like me to research best practices for [domain] before we plan? (yes/no)"

**If yes:**
- Research standard stacks for this type of project
- Find recommended libraries/frameworks
- Identify common pitfalls
- Share findings and ask for user input

**If no:** Skip to Phase 3.

---

### PHASE 3: REQUIREMENTS

**👤 ANNOUNCE:** Display this banner:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► DEFINING REQUIREMENTS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Based on the questioning, present requirements to the user:

```
## Proposed Requirements

### V1 (Must Have)
- REQ-001: [requirement from questioning]
- REQ-002: [requirement]
- REQ-003: [requirement]

### V2 (Nice to Have)
- REQ-101: [deferred item]

### Out of Scope
- [explicitly excluded]
```

Ask: "Does this capture what you need? Any additions or changes?"

**Wait for confirmation before proceeding.**

---

### PHASE 4: ROADMAP

**👤 ANNOUNCE:** Display this banner:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► CREATING ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Propose phases based on requirements:

```
## Proposed Roadmap

### Phase 1: [Name] — [Goal]
- [Key deliverable]
- [Key deliverable]
Requirements: REQ-001, REQ-002

### Phase 2: [Name] — [Goal]
Depends on: Phase 1
- [Key deliverable]
Requirements: REQ-003

[etc.]
```

Ask: "Does this structure make sense? Any reordering needed?"

**Wait for confirmation before proceeding.**

---

### PHASE 5: CREATE FILES

**ONLY NOW may you create files.**

Create these in `.planning/`:

1. **PROJECT.md** — Vision and key decisions
2. **REQUIREMENTS.md** — The approved requirements  
3. **ROADMAP.md** — The approved roadmap
4. **STATE.md** — Current status:

```markdown
# Project State

Current Phase: Phase 1
Status: 🟡 Ready to plan
Next Action: Run `gsd plan-phase 1`
```

---

### PHASE 6: COMPLETION

**👤 ANNOUNCE:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PROJECT INITIALIZED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files created:
- .planning/PROJECT.md
- .planning/REQUIREMENTS.md
- .planning/ROADMAP.md
- .planning/STATE.md

Next: Run `gsd plan-phase 1` to start planning.
```

**STOP. Do not start building. Wait for user to trigger next command.**

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
