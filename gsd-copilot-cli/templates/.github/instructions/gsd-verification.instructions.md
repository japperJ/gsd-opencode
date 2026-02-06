---
applyTo: "**"
---

# GSD Verification — 3-Level Artifact Verification

When `gsd verify-work` is triggered, perform artifact verification BEFORE using `/review`.

**Critical mindset:** Do NOT trust SUMMARY.md claims. SUMMARYs document what the AI SAID it did. You verify what ACTUALLY exists in the code. These often differ.

**Principle: Task completion ≠ Goal achievement.** A task "create chat component" can be marked complete when the component is a placeholder. Verify the GOAL was achieved, not just that files exist.

---

## Verification Process

### Step 1: Load Context

1. Read PLAN.md files for the phase being verified
2. Read ROADMAP.md for the phase goal
3. Extract what must be TRUE for the goal to be achieved

### Step 2: Three-Level Artifact Verification

For every file mentioned in PLAN.md or SUMMARY.md, verify at three levels:

#### Level 1: Existence

Check the file exists on disk. Result: `EXISTS` or `MISSING`.

#### Level 2: Substantive (Not a Stub)

Check the file contains real implementation:

**Minimum line counts by type:**
| Type | Min Lines |
|------|-----------|
| Component / Page | 15 |
| API route / endpoint | 10 |
| Hook / utility | 10 |
| Schema / types | 5 |
| Config | 3 |

**Stub patterns to detect (any = STUB):**
- `TODO`, `FIXME`, `HACK`, `PLACEHOLDER`
- `"not implemented"`, `"coming soon"`
- Empty function bodies (`{}` with no logic)
- Functions that only return `null`, `undefined`, `[]`, or `{}`
- Commented-out core logic
- `throw new Error("Not implemented")`

**Export check:** Components/hooks must have exports.

Result: `SUBSTANTIVE`, `STUB`, or `PARTIAL`.

#### Level 3: Wired (Connected to System)

Check the file is actually imported and used:

**Import check:** Is it imported by at least one other file?
**Usage check:** Is it actually called/rendered, not just imported?

**Wiring patterns to verify:**
- Component → rendered in a page or parent component
- API route → called by frontend or tested
- Hook → used in a component
- Utility → called somewhere
- Schema → used in validation or DB operations

Result: `WIRED`, `ORPHANED`, or `PARTIAL`.

### Step 3: Status Matrix

| Exists | Substantive | Wired | Final Status |
|--------|-------------|-------|-------------|
| Yes | Yes | Yes | VERIFIED |
| Yes | Yes | No | ORPHANED (warning) |
| Yes | No | -- | STUB (fail) |
| No | -- | -- | MISSING (fail) |

### Step 4: Anti-Pattern Scan

Scan non-planning source files for:
- `TODO` / `FIXME` comments (incomplete work)
- `console.log` debug statements left in
- Empty `catch` blocks (swallowed errors)
- Hardcoded credentials, API keys, or secrets
- Disabled tests (`skip`, `xit`, `xdescribe`)

### Step 5: Requirements Coverage

If REQUIREMENTS.md exists, verify every REQ-ID has at least one verified artifact.

### Step 6: Report

After artifact verification, use `/review` for code quality review.

**Present results using ask_user with verification embedded in question:**
```
ask_user(
  question: "━━━ GSD ► VERIFICATION RESULTS ━━━\n\nArtifacts:\n- [status] file1.tsx — [details]\n- [status] file2.ts — [details]\n\nAnti-patterns: [count] found\nRequirements coverage: [N/M]\n\nOverall: [PASSED | GAPS FOUND]\n\n[If gaps: list what needs fixing]",
  options: ["All good, continue", "Fix the gaps", "I'll handle manually"]
)
```

Save results to `.planning/phases/0N-name/0N-VERIFICATION.md`.
