# GSD — Get Shit Done

## CRITICAL RULES — READ FIRST

**When user says "gsd new-project" or "gsd-new-project":**

🛑 **STOP. DO NOT WRITE ANY CODE.**

You MUST follow the questioning workflow below BEFORE creating ANY files or writing ANY code.
The user's description after "gsd new-project" is just initial context — NOT permission to build.

**Use `ask_user` tool for all user choices** — present selectable options (up/down + Enter) instead of asking users to type responses.

**🚨 CRITICAL: Copilot CLI hides text output when ask_user is called.**
The ONLY text users see is the question parameter of ask_user.
If you need users to approve something (requirements, roadmap, plan), you MUST include that content IN the question text itself.

**NEVER pause between phases to announce what you're about to do.**
- WRONG: "Next, I'll define the requirements and confirm with you." (then stopping)
- RIGHT: Just call ask_user with the requirements embedded in the question.

---

## Default Coding Standards

These rules apply to ALL generated code **unless** overridden by `.planning/CONSTITUTION.md`.
They are the baseline quality floor — not optional suggestions.

1. **Handle errors.** Every async call gets try/catch or `.catch()`. Never swallow errors silently.
2. **No `any` in TypeScript.** Use `unknown` and narrow, or define a proper type.
3. **Prefer `const` over `let`.** Only use `let` when reassignment is actually needed. Never use `var`.
4. **Prefer named exports** over default exports (easier to refactor and search).
5. **Use early returns** to reduce nesting. Guard clauses first, happy path last.
6. **Validate inputs at boundaries.** API routes, form handlers, and CLI args must validate before processing.
7. **No hardcoded secrets or credentials.** Use environment variables.
8. **Keep functions small.** If a function does more than one thing, split it.
9. **Name things clearly.** `getUserById` not `getData`. `isValid` not `flag`. No single-letter variables outside loops.
10. **Delete dead code.** Don't comment it out — git has history.

---

## Execution Rules

**Read before write.** Before modifying or creating a file, always read neighboring files in the same directory to match existing patterns, imports, naming conventions, and code style. Never assume file contents.

**Follow existing project structure.** Place new files where the project's existing conventions dictate. If no structure exists, ask during the questioning phase. Don't invent new directory patterns when the project already has them.

**Guard dependencies.** Before adding a package:
- Check `package.json` (or equivalent) for an existing dependency that serves the same purpose.
- Prefer the standard library and existing deps over adding new ones.
- Never mix package managers (npm/yarn/pnpm) — detect and use what the project already uses.
- One utility function does not justify a new dependency.

**Fix, don't apologize.** During task execution, fix problems directly. Don't explain what went wrong before fixing it — include the explanation in the commit message instead. Tokens spent apologizing are tokens not spent building.

---

## Commands

| Trigger | Action |
|---------|--------|
| `gsd help` | Show commands |
| `gsd new-project [description]` | **START QUESTIONING** (do NOT build yet) |
| `gsd add-feature [description]` | Add feature to existing project (lightweight questioning) |
| `gsd add-phase [description]` | Append a phase to end of current roadmap |
| `gsd insert-phase [after] [description]` | Insert urgent phase using decimal numbering (e.g., 3.1) |
| `gsd new-milestone [name]` | Start new milestone cycle (archives current, continues numbering) |
| `gsd complete-milestone [version]` | Archive completed milestone, git tag, prepare for next |
| `gsd plan-phase N` | Plan phase N |
| `gsd execute-phase N` | Execute phase N |
| `gsd verify-work N` | Review phase N (3-level verification) |
| `gsd progress` | Show status |
| `gsd quick [task]` | Small immediate task |
| `gsd constitution` | Set project principles & standards |
| `gsd debug [issue]` | Debug with scientific method |
| `gsd pause` | Save work state for later |
| `gsd resume` | Resume from saved state |

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

**🚨 This phase happens IMMEDIATELY after Phase 2.**

Build the requirements list based on user answers.

**🚨 CRITICAL: Include requirements IN the ask_user question text itself.**

The CLI hides text output when ask_user is called. The ONLY text users see is the question parameter.

**Call ask_user with the requirements EMBEDDED in the question:**
```
ask_user(
  question: "━━━ GSD ► REQUIREMENTS ━━━\n\nV1 Requirements:\n- REQ-001: [requirement]\n- REQ-002: [requirement]\n- REQ-003: [requirement]\n\nOut of Scope:\n- [item]\n\nDoes this look right?",
  options: ["Yes, continue", "No, make changes"]
)
```

**The question text MUST contain the full requirements list so users can see what they're approving.**

**When user answers → continue to Phase 4 IN THE SAME RESPONSE.**

---

### PHASE 4: ROADMAP

**🚨 This phase happens IMMEDIATELY after Phase 3.**

Build the roadmap based on requirements.

**🚨 CRITICAL: Include roadmap IN the ask_user question text itself.**

**Call ask_user with the roadmap EMBEDDED in the question:**
```
ask_user(
  question: "━━━ GSD ► ROADMAP ━━━\n\nPhase 1: [Name]\n- [deliverable 1]\n- [deliverable 2]\nReqs: REQ-001, REQ-002\n\nPhase 2: [Name]\n- [deliverable 1]\nReqs: REQ-003\n\nDoes this roadmap work?",
  options: ["Yes, create files", "No, adjust phases"]
)
```

**The question text MUST contain the full roadmap so users can see what they're approving.**

**When user answers Yes → continue to Phase 4.5 IN THE SAME RESPONSE.**

---

### PHASE 4.5: CONSTITUTION (optional)

**Use ask_user:**
```
ask_user(
  question: "Set project coding standards and principles now?",
  options: ["Yes, set standards", "No, skip for now"]
)
```

**If yes:** Ask about coding standards, testing philosophy, and architecture style (see `gsd constitution` command for details). Include answers in CONSTITUTION.md during Phase 5.

**If no:** Skip. Can be set later with `gsd constitution`.

**→ Continue to Phase 5 IN THE SAME RESPONSE.**

---

### PHASE 5: CREATE FILES

**NOW create files** in `.planning/`:
- CONSTITUTION.md — Project principles (if set in Phase 4.5)
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
2. Read `.planning/CONSTITUTION.md` if it exists (project principles guide planning)
3. Use `/plan` to create implementation plan
4. **Self-verify plan** across 6 dimensions (see gsd-execution.instructions.md):
   - Requirement coverage, task completeness, dependency correctness
   - Wiring planned, scope sanity, verifiability
   - If issues found: revise and re-check (max 3 iterations)
5. Save plan to `.planning/phases/0N-name/0N-01-PLAN.md`
6. Update STATE.md: Status = 🟡 Planned

**🚨 CRITICAL: Include the plan IN the ask_user question text.**

**Call ask_user with the plan EMBEDDED in the question:**
```
ask_user(
  question: "━━━ GSD ► PHASE N PLAN ━━━\n\nTasks:\n- [ ] Task 1: [description]\n- [ ] Task 2: [description]\n- [ ] Task 3: [description]\n\nReady to execute?",
  options: ["Yes, execute now", "No, I'll review first"]
)
```

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
   - **Apply execution rules:** Read before write, follow project structure, guard dependencies, fix don't apologize
   - Execute the task
   - **Apply deviation rules** (see gsd-execution.instructions.md):
     - Auto-fix bugs, missing critical functionality, blockers
     - STOP and ask user on architectural changes
   - **Run tests** if test suite exists (auto-fix failures, max 3 attempts)
   - Commit changes (one atomic commit per task, never `git add .`)
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

1. **Perform 3-level artifact verification** (see gsd-verification.instructions.md):
   - Level 1: Files exist
   - Level 2: Files are substantive (not stubs)
   - Level 3: Files are wired (imported and used)
2. Use `/review` to check code quality
3. Verify: All tasks done, code works, tests pass
4. Update STATE.md: Status = 🟢 Verified or 🔴 Needs fixes

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

## gsd constitution

Set project principles and coding standards. Can be run standalone or as part of `gsd new-project`.
Overrides the **Default Coding Standards** section above with project-specific rules.

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► CONSTITUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Use ask_user to gather project principles:**

1. Ask about **coding standards**:
   - Options: "Strict (linting, formatting, types)", "Moderate (types optional)", "Relaxed (move fast)"

2. Ask about **testing philosophy**:
   - Options: "TDD (tests first)", "Test after implementation", "Critical paths only", "No tests yet"

3. Ask about **architecture style**:
   - Options: "Monolith", "Modular monolith", "Microservices", "Whatever fits"

4. Ask about **key constraints** as free text if needed (performance targets, browser support, accessibility).

**Create `.planning/CONSTITUTION.md`** with:
- Tech stack decisions (from questioning or prior context)
- Coding standards and conventions
- Testing approach
- Architectural principles and constraints
- Any non-negotiable rules

**All subsequent gsd commands reference CONSTITUTION.md** for consistent decision-making.

---

## gsd debug [issue]

Scientific debugging with persistent state. See gsd-debugging.instructions.md for full methodology.

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► DEBUGGING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

1. Create or load `.planning/debug/{issue-slug}.md` (persistent debug state)
2. If loading existing: show current status, hypotheses, evidence log
3. Gather symptoms from user via ask_user
4. Follow scientific method: observe → hypothesize → test → conclude
5. Avoid cognitive biases (confirmation, anchoring, availability, sunk cost)
6. Use 7 investigation techniques as needed
7. Update debug file after every significant finding
8. When resolved: present fix, move debug file to `.planning/debug/resolved/`

---

## gsd pause

Save current work state for later resumption.

1. Read current STATE.md
2. Record in `.planning/.continue-here`:
   - Current phase and task
   - Git branch name
   - Uncommitted changes (if any)
   - Last action performed
   - Suggested next step
3. Update STATE.md: Status = ⏸️ Paused

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► PAUSED
 Resume with: gsd resume
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## gsd resume

Resume from saved state.

1. Read STATE.md and `.planning/.continue-here`
2. If no `.continue-here` exists, read STATE.md for last known position

Display current state and ask via ask_user:
```
ask_user(
  question: "━━━ GSD ► RESUMING ━━━\n\nLast action: [from state]\nCurrent phase: [phase]\nNext step: [suggestion]\n\nWhat would you like to do?",
  options: ["Continue where I left off", "Start fresh on current phase", "Show progress first"]
)
```

If "Continue" → execute the suggested next step.
If "Start fresh" → re-plan current phase.
If "Show progress" → run gsd progress.

---

## gsd add-feature [description]

Add a feature to an existing GSD project. This is the **brownfield equivalent** of `gsd new-project` — the project exists, `.planning/` has history.

**🛑 DO NOT WRITE CODE. This is a planning command.**

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► ADD FEATURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 1: Load Context

Read existing project state:
- `.planning/PROJECT.md` — what exists already
- `.planning/ROADMAP.md` — current phases
- `.planning/REQUIREMENTS.md` — existing requirements
- `.planning/STATE.md` — current progress

Find the highest existing phase number (including decimals) so new phases continue from there.

### Step 2: Lightweight Questioning (2-3 questions)

**Use ask_user to gather feature context:**

1. Ask about **feature scope**:
   - Options: "Small (1-2 phases)", "Medium (3-4 phases)", "Large (5+ phases, consider gsd new-milestone)"

2. Ask about **research**:
   - Options: "Research best practices first", "I know what I need"

3. If research selected: do quick web search, display key findings.

### Step 3: Define New Requirements

Build new requirements based on answers + description.

**🚨 CRITICAL: Include requirements IN the ask_user question text.**

Continue REQ-ID numbering from existing REQUIREMENTS.md. Use same category format.

**Call ask_user with the NEW requirements EMBEDDED in the question:**
```
ask_user(
  question: "━━━ GSD ► NEW REQUIREMENTS ━━━\n\nExisting: REQ-001 through REQ-007\n\nNew requirements for [feature]:\n- REQ-008: [requirement]\n- REQ-009: [requirement]\n- REQ-010: [requirement]\n\nOut of Scope:\n- [item]\n\nDoes this look right?",
  options: ["Yes, continue", "No, make changes"]
)
```

### Step 4: Define New Phases

Build new phases that continue numbering from the last existing phase.

**Phase numbering rule:** If last phase is 6, new phases start at 7. Never renumber existing phases.

**🚨 CRITICAL: Include phases IN the ask_user question text.**

**Call ask_user with the NEW phases EMBEDDED in the question:**
```
ask_user(
  question: "━━━ GSD ► NEW PHASES ━━━\n\nExisting phases: 1-6\n\nNew phases for [feature]:\n\nPhase 7: [Name]\n- [deliverable]\nReqs: REQ-008, REQ-009\n\nPhase 8: [Name]\n- [deliverable]\nReqs: REQ-010\n\nDoes this work?",
  options: ["Yes, create", "No, adjust"]
)
```

### Step 5: Update Files

**Append** to existing files (never overwrite existing content):

1. **REQUIREMENTS.md** — Append new requirements under a new section heading for this feature
2. **ROADMAP.md** — Append new phase entries after the last existing phase
3. **STATE.md** — Update with:
   - Under "Roadmap Evolution": `Feature added: [description] (Phases N-M)`
   - Update "Next Phase" reference if appropriate
4. **PROJECT.md** — Add feature to current milestone goals if milestone section exists

### Step 6: Done

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► FEATURE ADDED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feature: [description]
New requirements: REQ-008 through REQ-010
New phases: 7-8
```

**Use ask_user with options:**
- Question: "Feature added. What next?"
- Options: "Plan the first new phase", "See progress", "I'm done for now"

If "Plan the first new phase" → run `gsd plan-phase N` with first new phase number.

---

## gsd add-phase [description]

Append a new phase to the end of the current roadmap.

**Use for:** Planned work discovered during execution that belongs at the end.

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► ADD PHASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

1. **Parse description** from user input. If empty, ask for it.

2. **Load ROADMAP.md** — find the highest integer phase number (ignore decimals like 3.1, 3.2).

3. **Calculate next phase number:** highest integer + 1. Format as two-digit (e.g., `07`).

4. **Generate slug:** Convert description to kebab-case (e.g., "Add authentication" → `add-authentication`).

5. **Create phase directory:** `.planning/phases/{NN}-{slug}/`

6. **Append to ROADMAP.md** (after last phase, before any `---` separator):
   ```
   ### Phase {N}: {Description}

   **Goal:** [To be planned]
   **Depends on:** Phase {N-1}

   Plans:
   - [ ] TBD (run gsd plan-phase {N} to break down)
   ```

7. **Update STATE.md** — Under "Roadmap Evolution" add: `Phase {N} added: {description}`

8. **Show completion:**
   ```
   Phase {N} added: {description}
   Directory: .planning/phases/{NN}-{slug}/
   
   Next: gsd plan-phase {N}
   ```

**Anti-patterns:**
- Don't modify existing phases
- Don't use decimal numbering (that's `gsd insert-phase`)
- Don't create plans yet (that's `gsd plan-phase`)

---

## gsd insert-phase [after] [description]

Insert an urgent phase using decimal numbering. Preserves the logical sequence of planned phases.

**Use for:** Urgent work discovered mid-milestone that must happen between existing phases.

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► INSERT PHASE (URGENT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

1. **Parse arguments:**
   - First argument: integer phase number to insert after
   - Rest: phase description
   - Example: `gsd insert-phase 3 Fix critical auth bug`

2. **Verify target phase** exists in ROADMAP.md. If not found, list available phases.

3. **Find existing decimals** after that phase (e.g., 3.1, 3.2). Calculate next decimal:
   - No decimals exist → 3.1
   - 3.1 exists → 3.2
   - 3.1, 3.2 exist → 3.3

4. **Generate slug:** kebab-case from description.

5. **Create phase directory:** `.planning/phases/{N.M}-{slug}/`

6. **Insert into ROADMAP.md** immediately after target phase's content, with `(INSERTED)` marker:
   ```
   ### Phase {N.M}: {Description} (INSERTED)

   **Goal:** [Urgent work — to be planned]
   **Depends on:** Phase {N}

   Plans:
   - [ ] TBD (run gsd plan-phase {N.M} to break down)
   ```

7. **Update STATE.md** — Under "Roadmap Evolution" add: `Phase {N.M} inserted after Phase {N}: {description} (URGENT)`

8. **Show completion:**
   ```
   Phase {N.M} inserted (URGENT): {description}
   Directory: .planning/phases/{N.M}-{slug}/
   
   Next: gsd plan-phase {N.M}
   ```

**Anti-patterns:**
- Don't use for end-of-roadmap work (use `gsd add-phase`)
- Don't renumber existing phases
- Don't modify the target phase's content

---

## gsd new-milestone [name]

Start a new milestone cycle. This is the **full cycle** for existing projects: questioning → research → requirements → roadmap.

**Phase numbering continues** from previous milestone (never resets to 1).

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► NEW MILESTONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 1: Load Context

Read project state:
- `.planning/PROJECT.md` — validated requirements, history
- `.planning/ROADMAP.md` — current phases, what shipped
- `.planning/STATE.md` — pending todos, blockers
- `.planning/milestones/` — previous milestone archives

### Step 2: Gather Milestone Goals

Present what shipped in the last milestone, then ask:

**Use ask_user:**
```
ask_user(
  question: "What do you want to build next for this milestone?",
  options: []  // free text input
)
```

Follow up with clarifying questions as needed (2-3 max).

### Step 3: Determine Version

Parse last version from milestones directory or PROJECT.md.

**Use ask_user:**
```
ask_user(
  question: "Milestone version?",
  options: ["v{X.Y+1} (minor)", "v{X+1}.0 (major)", "Custom"]
)
```

### Step 4: Update PROJECT.md

Add/update:
```markdown
## Current Milestone: v{X.Y} {Name}

**Goal:** [One sentence]

**Target features:**
- [Feature 1]
- [Feature 2]
```

### Step 5: Research (optional)

**Use ask_user:**
```
ask_user(
  question: "Research best practices for the new features before defining requirements?",
  options: ["Yes, research first", "No, skip to requirements"]
)
```

If yes: Do web search focused on NEW features only (not re-researching existing capabilities). Display key findings.

### Step 6: Define Requirements

Build requirements for this milestone's new features:
- Continue REQ-ID numbering from previous milestone
- Present by category with multi-select for scoping
- Track deferred items as "Future Requirements"

**🚨 CRITICAL: Include requirements IN the ask_user question text.**

Create `.planning/REQUIREMENTS.md` with milestone-scoped requirements.

### Step 7: Create Roadmap

**Phase numbering continues** from previous milestone. If v1.0 ended at Phase 6, v1.1 starts at Phase 7.

Build phase structure from requirements. Each requirement maps to exactly one phase.

**🚨 CRITICAL: Include roadmap IN the ask_user question text.**

Update `.planning/ROADMAP.md` — append new phases (keep completed phases collapsed).

### Step 8: Update STATE.md

```markdown
## Current Position

Phase: Not started (defining requirements)
Status: Milestone v{X.Y} started
Last activity: [today]
```

### Step 9: Done

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► MILESTONE INITIALIZED ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Milestone: v{X.Y} {Name}
Requirements: {count}
Phases: {N} through {M}
```

**Use ask_user with options:**
- Question: "Milestone initialized. What next?"
- Options: "Plan the first phase", "I'll do it later"

If "Plan the first phase" → run `gsd plan-phase {N}`.

---

## gsd complete-milestone [version]

Archive a completed milestone, create git tag, and prepare for next.

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► COMPLETE MILESTONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 1: Verify Readiness

Read `.planning/ROADMAP.md` and check that all phases in the milestone have completed plans (SUMMARY.md exists).

Present milestone stats:
```
Milestone v{version}:
- Phases completed: {N}
- Requirements fulfilled: {N}/{total}
- Timeline: {start} → {end}
```

**Use ask_user:**
```
ask_user(
  question: "Ready to archive milestone v{version}?",
  options: ["Yes, archive it", "No, not ready yet"]
)
```

### Step 2: Archive Roadmap

Create `.planning/milestones/v{version}-ROADMAP.md`:
- Copy all phase details from ROADMAP.md for this milestone
- Include accomplishments extracted from phase SUMMARY.md files

Update ROADMAP.md — collapse this milestone to a one-line summary:
```markdown
<details>
<summary>v{version}: {milestone name} — {phase count} phases ✓</summary>

See `.planning/milestones/v{version}-ROADMAP.md` for full details.
</details>
```

### Step 3: Archive Requirements

Create `.planning/milestones/v{version}-REQUIREMENTS.md`:
- Copy all requirements with checkboxes checked (✅)
- Note requirement outcomes (validated, adjusted, dropped)

Delete `.planning/REQUIREMENTS.md` — it will be recreated fresh by `gsd new-milestone`.

### Step 4: Update PROJECT.md

Add shipped milestone to history:
```markdown
## Shipped

### v{version}: {Name}
Key accomplishments:
- [accomplishment 1]
- [accomplishment 2]
```

### Step 5: Git Tag

```bash
git add .planning/
git commit -m "chore: archive milestone v{version}"
git tag -a v{version} -m "{milestone summary}"
```

**Use ask_user:**
```
ask_user(
  question: "Push tag v{version} to remote?",
  options: ["Yes, push", "No, keep local"]
)
```

### Step 6: Done

Display:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 GSD ► MILESTONE COMPLETE ✓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Archived: .planning/milestones/v{version}-ROADMAP.md
           .planning/milestones/v{version}-REQUIREMENTS.md
Tagged: v{version}
```

**Use ask_user with options:**
- Question: "Milestone complete. What next?"
- Options: "Start new milestone", "I'm done for now"

If "Start new milestone" → run `gsd new-milestone`.

---

## File Structure

```
.planning/
├── CONSTITUTION.md         # Project principles & standards
├── PROJECT.md              # Vision
├── REQUIREMENTS.md         # Scoped requirements (current milestone)
├── ROADMAP.md              # Phases (all milestones, completed ones collapsed)
├── STATE.md                # Current state (update often!)
├── .continue-here          # Resume marker (gsd pause/resume)
├── debug/                  # Active debug sessions
│   └── resolved/           # Archived resolved issues
├── milestones/             # Archived milestone artifacts
│   ├── v1.0-ROADMAP.md     # Archived roadmap for v1.0
│   └── v1.0-REQUIREMENTS.md # Archived requirements for v1.0
└── phases/
    └── 01-foundation/
        ├── 01-01-PLAN.md
        ├── 01-01-SUMMARY.md
        └── 01-VERIFICATION.md
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
