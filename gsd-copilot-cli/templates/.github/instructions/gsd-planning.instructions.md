---
applyTo: ".planning/**"
---

# GSD Planning Files

These are GSD (Get Shit Done) planning artifacts. Follow these rules when working with them.

## File Purposes

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `PROJECT.md` | Project vision and context | Rarely (only on major changes) |
| `REQUIREMENTS.md` | Scoped requirements with REQ-IDs | When requirements change |
| `ROADMAP.md` | Phase breakdown with statuses | After each phase completion |
| `STATE.md` | Project memory | **After every action** |

## STATE.md — Critical Rules

This is the project's memory. **Always update after**:
- Completing any task
- Encountering a blocker
- Making architectural decisions
- Discovering new requirements
- Starting/finishing any phase work

### Required Sections

```markdown
# Project State

## Current Phase
[Phase number and name]

## Status
[🟢/🟡/🔴/⚪] [status description]

## Last Action
[What was just completed]

## Next Action
[Suggested next step]

## Blockers
[List or "None"]

## Decisions Made
[Key decisions and rationale]
```

## REQUIREMENTS.md — Format

Requirements must have IDs for traceability:

```markdown
## V1 (Must Have)
- REQ-001: User can sign in with email
- REQ-002: Dashboard shows recent activity

## V2 (Nice to Have)
- REQ-101: Social login (Google, GitHub)

## Out of Scope
- Mobile app (future project)
```

## ROADMAP.md — Format

Phases must have clear status:

```markdown
## Phase 1: Foundation
Status: COMPLETED ✅
- Project setup
- Core data models

## Phase 2: Core Features  
Status: IN_PROGRESS 🟡
Depends on: Phase 1
- User authentication
- Dashboard

## Phase 3: Polish
Status: NOT_STARTED ⚪
Depends on: Phase 2
- Testing
- Documentation
```

### Valid Statuses
- `NOT_STARTED ⚪`
- `IN_PROGRESS 🟡`
- `COMPLETED ✅`
- `BLOCKED 🔴`

## PLAN.md Files — Format

Plans in `phases/NN-name/NN-XX-PLAN.md` must include:

```markdown
# Plan: [Name]

## Objective
[What this plan accomplishes]

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Verification Criteria
- [ ] Code compiles
- [ ] Tests pass
- [ ] [Specific criteria]

## Dependencies
- [Other plans or external deps]

## Estimated Complexity
[Low/Medium/High]

## Notes
[Any important context]
```

## SUMMARY.md Files — Format

Summaries in `phases/NN-name/NN-XX-SUMMARY.md`:

```markdown
# Summary: [Plan Name]

## Status
COMPLETED ✅

## Tasks Completed
- [x] Task 1 — [brief note]
- [x] Task 2 — [brief note]

## Commits
- `abc1234` feat: add user model
- `def5678` feat: add auth routes

## Issues Encountered
[Any problems and how they were resolved]

## Decisions Made
[Any decisions during implementation]

## Time Spent
[Approximate duration]
```

## Best Practices

1. **Be specific**: Use concrete details, not vague descriptions
2. **Link requirements**: Reference REQ-XXX when relevant
3. **Track decisions**: Document why, not just what
4. **Keep state current**: STATE.md should reflect reality at all times
5. **Atomic plans**: Each plan should be small enough to complete in one session
