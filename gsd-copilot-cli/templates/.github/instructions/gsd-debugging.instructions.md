---
applyTo: "**"
---

# GSD Debugging — Scientific Method with Persistent State

When `gsd debug` is triggered, follow this systematic debugging methodology.

---

## Debug Session Management

**Create or load** `.planning/debug/{issue-slug}.md` for each debug session.
This file IS the debugging brain — it survives context resets and session restarts.

**Debug file format:**
```markdown
# Debug: {issue description}

## Status
INVESTIGATING | ROOT_CAUSE_FOUND | RESOLVED

## Current Focus
[Specific area being investigated]

## Known Facts
- [Observable fact 1]
- [Observable fact 2]

## Hypotheses
1. [H1] — Status: testing | eliminated | confirmed
   - Evidence for:
   - Evidence against:
2. [H2] — Status: testing | eliminated | confirmed

## Evidence Log
- [timestamp] [observation or test result]

## Eliminated Hypotheses
- [H-old] — Eliminated because [specific evidence]

## Root Cause
[Filled in when found]

## Fix Applied
[Filled in when fixed]
```

---

## Foundation Principles

1. **Treat your code as foreign** — Read it as if someone else wrote it
2. **Your mental model might be wrong** — Code behavior is truth; your model is a guess
3. **Prioritize code you touched** — Modified 100 lines? Those are prime suspects
4. **Embrace not knowing** — "I don't know" is a good state. "It must be X" is dangerous.

---

## Cognitive Biases to Avoid

| Bias | Trap | Antidote |
|------|------|----------|
| **Confirmation** | Only seek supporting evidence | "What would prove me wrong?" |
| **Anchoring** | First explanation becomes anchor | Generate 3+ hypotheses before investigating any |
| **Availability** | Recent bugs → assume similar cause | Treat each bug as novel |
| **Sunk Cost** | 2 hours on one path, keep going | Every 30 min: "Would I still take this path starting fresh?" |

---

## Hypothesis Testing

**Hypotheses must be falsifiable.** If you can't design a test to disprove it, it's not useful.

**Bad (unfalsifiable):**
- "Something is wrong with the state"
- "The timing is off"
- "There's a race condition somewhere"

**Good (falsifiable):**
- "User state resets because component remounts on route change"
- "API call completes after unmount, causing state update on unmounted component"
- "Two async operations modify same array without locking, causing data loss"

**For each hypothesis, design an experiment:**
1. **Prediction:** If H is true, I will observe X
2. **Test:** What to do to test this
3. **Success criteria:** What confirms? What refutes?
4. **Result:** Record what actually happened
5. **Conclusion:** Supports or refutes H?

**One hypothesis at a time.** If you change three things and it works, you don't know which one fixed it.

---

## 7 Investigation Techniques

### 1. Binary Search
**When:** Large codebase, long execution path.
**How:** Cut problem space in half. Add logging at midpoint. Determine which half has the bug. Repeat.

### 2. Rubber Duck
**When:** Stuck, confused, mental model doesn't match reality.
**How:** Explain the entire flow step by step. The point where you can't explain clearly is likely the bug.

### 3. Minimal Reproduction
**When:** Bug is intermittent or complex to trigger.
**How:** Strip everything until the bug disappears, then add back one thing at a time until it reappears.

### 4. Working Backwards
**When:** You know the symptom but not the cause.
**How:** Start from the error/wrong output. Trace backwards through the code: where did this value come from? Where was it set? What called that?

### 5. Differential Debugging
**When:** "It used to work."
**How:** What changed? Check git log, recent commits, dependency updates, config changes, environment differences.

### 6. Observability First
**When:** You're tempted to guess.
**How:** Add logging/breakpoints BEFORE forming hypotheses. Let the data tell you what's happening.

### 7. Comment Out Everything
**When:** Everything seems correct but it still fails.
**How:** Remove everything. Does the simplest version work? Add back code one section at a time until it breaks.

---

## When to Restart

Consider starting over when:
- **2+ hours** with no progress (you're tunnel-visioned)
- **3+ failed fixes** (your mental model is wrong)
- **Can't explain** the current behavior (don't add changes on top of confusion)
- **Fix works but you don't know why** (this isn't fixed, this is luck)

**Restart protocol:**
1. Write down what you know for certain
2. Write down what you've ruled out
3. List new hypotheses (different from before)
4. Begin fresh investigation

---

## Structured Returns

When debugging is complete, present results via ask_user:

```
ask_user(
  question: "━━━ GSD ► DEBUG RESULTS ━━━\n\nStatus: [ROOT_CAUSE_FOUND | RESOLVED | INCONCLUSIVE]\n\nRoot Cause: [description]\n\nFix: [what was changed]\n\nVerification: [how it was tested]\n\nWhat next?",
  options: ["Looks good", "Investigate further", "I'll handle it"]
)
```

Move resolved debug files to `.planning/debug/resolved/`.
