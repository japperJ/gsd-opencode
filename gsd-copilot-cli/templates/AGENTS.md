# GSD — Get Shit Done

A spec-driven development workflow for GitHub Copilot CLI.

## Quick Reference

| Say this... | What happens |
|-------------|--------------|
| `gsd help` | Show all commands |
| `gsd new-project` | Initialize project (questioning → research → requirements → roadmap) |
| `gsd plan-phase 1` | Plan phase 1 using native `/plan` |
| `gsd execute-phase 1` | Execute all plans in phase 1 |
| `gsd verify-work 1` | Verify with native `/review` |
| `gsd progress` | Show current status and next action |
| `gsd quick [task]` | Execute small ad-hoc task |

---

## Core Workflow

```
gsd new-project → gsd plan-phase 1 → gsd execute-phase 1 → verify → repeat
```

---

## Command: gsd help

Display this quick reference and explain the GSD methodology.

---

## Command: gsd new-project

Initialize a new project with the GSD workflow.

### Phase 1: Deep Questioning

Ask questions until you fully understand:
- What is the user building?
- Who is it for?
- What problem does it solve?
- What are the constraints?
- What technology decisions have been made?

Continue asking follow-up questions. Don't proceed until clarity is achieved.

### Phase 2: Research (if needed)

If the domain is unfamiliar or complex:
- Research best practices
- Find relevant libraries/frameworks
- Understand architectural patterns
- Document findings

### Phase 3: Requirements Extraction

Create `.planning/REQUIREMENTS.md` with:

```markdown
# Requirements

## V1 (Must Have)
- REQ-001: [requirement]
- REQ-002: [requirement]

## V2 (Nice to Have)  
- REQ-101: [requirement]

## Out of Scope
- [explicitly excluded items]
```

### Phase 4: Roadmap Creation

Create `.planning/ROADMAP.md` with phases:

```markdown
# Roadmap

## Phase 1: Foundation
Status: NOT_STARTED
- [key deliverable]
- [key deliverable]

## Phase 2: Core Features
Status: NOT_STARTED
Depends on: Phase 1
- [key deliverable]
```

### Phase 5: State Initialization

Create `.planning/STATE.md`:

```markdown
# Project State

## Current Phase
Phase 1: Foundation

## Status
🟡 Planning

## Last Action
Project initialized

## Next Action
Run `gsd plan-phase 1`

## Blockers
None

## Decisions Made
- [any decisions from questioning]
```

### Phase 6: Project Summary

Create `.planning/PROJECT.md` with the project vision and key decisions.

---

## Command: gsd plan-phase N

Plan phase N using Copilot's native planning capabilities.

### Workflow

1. **Read the roadmap**: Check `.planning/ROADMAP.md` for phase N details

2. **Research the phase**: Understand what's needed for this phase

3. **Use native planning**: Execute:
   ```
   /plan Implement phase N: [phase name and deliverables from roadmap]
   ```

4. **Save the plan**: Copy the plan to `.planning/phases/0N-name/0N-01-PLAN.md`

5. **Update state**: Update `.planning/STATE.md` with:
   - Current phase
   - Status: 🟡 Planned
   - Next action: `gsd execute-phase N`

### Plan File Structure

```
.planning/phases/
├── 01-foundation/
│   ├── 01-RESEARCH.md      # Research notes (if any)
│   ├── 01-01-PLAN.md       # First plan
│   └── 01-01-SUMMARY.md    # Created after execution
```

---

## Command: gsd execute-phase N

Execute all plans in phase N.

### Workflow

1. **Find plans**: List files matching `.planning/phases/0N-*/0N-*-PLAN.md`

2. **For each plan**:
   - Read the plan
   - Execute each task sequentially
   - Commit after each logical unit of work
   - Create summary in `0N-XX-SUMMARY.md`

3. **Update state** after each task:
   - Status: 🟢 In Progress
   - Last action: [what was done]
   - Next action: [what's next]

4. **On completion**:
   - Update ROADMAP.md phase status to COMPLETED
   - Update STATE.md with next phase

### Commit Guidelines

- Commit after each atomic task
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`
- Reference plan: `feat: add user auth (01-01-PLAN task 3)`

---

## Command: gsd verify-work N

Verify completed work for phase N.

### Workflow

1. **Use native review**: Execute:
   ```
   /review Check phase N implementation against the plan in .planning/phases/0N-*
   ```

2. **Verification checklist**:
   - [ ] All plan tasks completed
   - [ ] Code compiles/runs
   - [ ] Tests pass (if applicable)
   - [ ] No obvious bugs
   - [ ] Documentation updated (if needed)

3. **Update state**:
   - If passed: Status 🟢 Verified
   - If issues: Status 🔴 Needs fixes, document in Blockers

---

## Command: gsd progress

Show current project status.

### Workflow

1. **Read STATE.md**: Display current state

2. **Show progress**:
   ```
   ═══════════════════════════════════════
   📊 GSD PROGRESS
   ═══════════════════════════════════════
   
   Current Phase: [from STATE.md]
   Status: [emoji + status]
   
   Last Action: [from STATE.md]
   Next Action: [from STATE.md]
   
   Blockers: [from STATE.md or "None"]
   ═══════════════════════════════════════
   ```

3. **Suggest next action**: Based on status, suggest the appropriate command

---

## Command: gsd quick [task]

Execute a small ad-hoc task outside the normal flow.

### Rules

1. **Keep it small**: Should be completable in one session
2. **No planning files needed**: Direct execution
3. **Still commit**: Use proper commit message
4. **Update state if relevant**: Note in STATE.md if it affects the project

### Example

```
gsd quick add eslint configuration
```

---

## Command: gsd delegate-task [description]

Delegate work to run asynchronously using Copilot coding agent.

### Workflow

Execute native command:
```
/delegate [description]
```

Use for:
- Tangential tasks that don't need immediate attention
- Documentation updates
- Refactoring separate modules
- Tasks in other repositories

---

## State Management

### Always Update STATE.md After:

- Completing any task
- Encountering a blocker
- Making architectural decisions
- Discovering new requirements
- Changing plans

### Status Emoji Guide

| Emoji | Meaning |
|-------|---------|
| 🟢 | Completed / On Track |
| 🟡 | In Progress / Planned |
| 🔴 | Blocked / Needs Attention |
| ⚪ | Not Started |

---

## File Structure Reference

```
.planning/
├── PROJECT.md              # Project vision
├── REQUIREMENTS.md         # Scoped requirements (REQ-XXX)
├── ROADMAP.md             # Phase breakdown
├── STATE.md               # Current state (update frequently!)
├── config.json            # Optional workflow config
└── phases/
    ├── 01-foundation/
    │   ├── 01-RESEARCH.md
    │   ├── 01-01-PLAN.md
    │   └── 01-01-SUMMARY.md
    └── 02-features/
        └── ...
```

---

## Tips for Best Results

1. **Keep sessions focused**: Use `/clear` between unrelated tasks
2. **Use plan mode**: Press `Shift+Tab` or `/plan` for complex work
3. **Reference files**: Use `@filename` to include context
4. **Monitor context**: Use `/context` to check token usage
5. **Review changes**: Use `/diff` to see what changed
6. **Delegate wisely**: Use `/delegate` for async work

---

## Integration with Native Features

This workflow is designed to work WITH Copilot CLI's native capabilities:

- **`/plan`** — Used by `gsd plan-phase` for structured planning
- **`/review`** — Used by `gsd verify-work` for verification
- **`/delegate`** — Used by `gsd delegate-task` for async work
- **`/session plan`** — View current session plan
- **`/context`** — Monitor context window usage
- **`/diff`** — Review changes before committing
