---
applyTo: "**"
---

# GSD Execution — Deviation Rules, Auto-Test, Planner-Checker, Commits

These rules apply during `gsd execute-phase` and `gsd plan-phase`.

---

## Deviation Rules (During Execution)

While executing tasks, you WILL discover work not in the plan. This is normal. Apply these rules automatically and track all deviations.

### Rule 1: Auto-Fix Bugs

**Trigger:** Code doesn't work as intended (broken behavior, errors, logic errors).
**Action:** Fix immediately, track for summary.
**Examples:** Wrong queries, inverted conditions, type errors, null pointer exceptions, broken validation, security vulnerabilities, race conditions.
**No permission needed.** Bugs must be fixed.

### Rule 2: Auto-Add Missing Critical Functionality

**Trigger:** Code is missing essential features for correctness, security, or basic operation.
**Action:** Add immediately, track for summary.
**Examples:** Missing error handling, no input validation, missing null checks, no auth on protected routes, missing authorization, no CSRF protection, no rate limiting, missing DB indexes, no error logging.
**No permission needed.** These are requirements for correctness, not features.

### Rule 3: Auto-Fix Blocking Issues

**Trigger:** Something prevents completing the current task.
**Action:** Fix immediately to unblock, track for summary.
**Examples:** Missing dependency, wrong types, broken imports, missing env var, DB connection error, build config error, missing file, circular dependency.
**No permission needed.** Can't complete task without fixing the blocker.

### Rule 4: STOP on Architectural Changes

**Trigger:** Fix/addition requires significant structural modification.
**Action:** STOP, present to user via ask_user, wait for decision.
**Examples:** New database table, major schema changes, new service layer, switching libraries/frameworks, changing auth approach, new infrastructure, API contract changes.

**Use ask_user:**
```
ask_user(
  question: "━━━ GSD ► ARCHITECTURAL DECISION ━━━\n\n[What was found]\n[Proposed change]\n[Why it's needed]\n[Impact]\n[Alternatives]",
  options: ["Approve change", "Use alternative", "Skip for now"]
)
```

**User decision required.** These changes affect system design.

### Rule Priority

1. If Rule 4 applies → STOP and ask user
2. If Rules 1-3 apply → Fix automatically, track for summary
3. If genuinely unsure → Apply Rule 4 (ask user)

---

## Auto-Test Loop (After Each Task)

After completing each task during `gsd execute-phase`:

1. **Detect test runner:** Check for `package.json` scripts (`test`, `lint`), `pytest`, `go test`, etc.
2. **Run tests:** Execute the project's test suite
3. **If tests pass:** Mark task complete, proceed
4. **If tests fail:** Fix the failing tests (max 3 attempts)
   - Attempt 1: Fix the obvious issue
   - Attempt 2: Re-read the test expectations, fix implementation
   - Attempt 3: If still failing, ask user via ask_user
5. **Run lint** if available: Auto-fix lint issues
6. **Only mark task complete when tests pass**

If no test suite exists, skip this step and proceed.

---

## Atomic Commit Protocol

One commit per task. Never use `git add .` or `git add -A`.

**Format:** `{type}({phase}-{plan}): {description}`

**Types:** feat, fix, test, refactor, perf, docs, style, chore

**Process:**
1. Identify modified files with `git status --short`
2. Stage only task-related files by name
3. Craft commit message with type and description
4. Record commit hash for summary

---

## Planner-Checker Loop (During Planning)

After creating a plan in `gsd plan-phase`, self-verify across 6 dimensions before presenting to user:

### Dimension 1: Requirement Coverage
Every phase requirement from ROADMAP.md must have at least one task addressing it.
**Red flags:** Requirement with zero tasks, vague task covering multiple requirements.

### Dimension 2: Task Completeness
Each task must have: what files to modify, what action to take, how to verify, and done criteria.
**Red flags:** Missing verification criteria, vague actions like "implement auth."

### Dimension 3: Dependency Correctness
Tasks must be ordered correctly. No circular dependencies.
**Red flags:** Task references a file created by a later task.

### Dimension 4: Wiring Planned
Artifacts must be connected, not just created in isolation.
**Red flags:** Component created but no task wires it to a page. API route created but no task calls it from frontend.

### Dimension 5: Scope Sanity
Plans should have 2-5 tasks. More than 5 tasks means the plan should be split.
**Red flags:** 6+ tasks in one plan, 15+ files touched.

### Dimension 6: Verifiability
Every task must have clear, testable done criteria.
**Red flags:** "Make it work" or "implement feature" without specific acceptance criteria.

**If issues found:** Revise the plan and re-check (max 3 iterations). Then present to user.

---

## Checkpoint Protocol

Three checkpoint types during execution:

| Type | Frequency | Use |
|------|-----------|-----|
| `human-verify` | 90% of checkpoints | User checks visual/functional result after automation |
| `decision` | 9% of checkpoints | Implementation choice needs user input |
| `human-action` | 1% of checkpoints | Truly unavoidable manual step (auth, 2FA, email link) |

When hitting an authentication gate (401, 403, "Not authenticated"):
- This is NOT a failure — auth gates are normal
- Present via ask_user with exact steps the user needs to take
- Wait for user to complete authentication
- Verify auth succeeded, then continue
