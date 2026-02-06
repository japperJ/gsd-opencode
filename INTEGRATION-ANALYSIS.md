# GSD Integration Analysis for GitHub Copilot CLI

## Executive Summary

Our current implementation uses a `copilot-instructions.md` file in the project root with conversational triggers. However, the GitHub Copilot CLI has evolved significantly and now includes:

1. **Native planning** (`/plan` command)
2. **Multiple instruction file locations** (`.github/copilot-instructions.md`, `AGENTS.md`, path-specific)
3. **Hooks system** for workflow automation
4. **Session management** with checkpoints and compaction

This document analyzes how to properly integrate GSD with these native features.

---

## Current GitHub Copilot CLI Features

### Custom Instructions (Discovery Order)

| Location | Scope | Notes |
|----------|-------|-------|
| `~/.copilot/copilot-instructions.md` | Global (all sessions) | Personal preferences |
| `.github/copilot-instructions.md` | Repository | Team standards |
| `.github/instructions/**/*.instructions.md` | Path-specific | With `applyTo` frontmatter |
| `AGENTS.md` (Git root or cwd) | Repository | Standard cross-tool format |
| `CLAUDE.md`, `GEMINI.md`, `CODEX.md` | Repository | Also supported |

### Built-in Commands Relevant to GSD

| Command | GSD Equivalent | Notes |
|---------|---------------|-------|
| `/plan` | `gsd plan-phase` | Built-in planning workflow |
| `/plan [prompt]` | - | Creates structured plan |
| Shift+Tab | - | Toggle plan mode |
| `/delegate` | - | Offload to coding agent |
| `/review` | `gsd verify-work` | Code review agent |
| `/session plan` | - | View current plan |
| `/session checkpoints` | - | View compaction history |
| `/compact` | - | Manual context compaction |
| `/context` | - | Token visualization |

### Hooks System (`.github/hooks/hooks.json`)

Available hook events:
- `sessionStart` — Run scripts when session begins
- `sessionEnd` — Run scripts when session ends  
- `userPromptSubmitted` — Run after each user prompt
- `preToolUse` — Run before tool execution
- `postToolUse` — Run after tool execution
- `errorOccurred` — Run on errors

---

## Integration Options

### Option A: AGENTS.md Standard (Recommended)

Use the [OpenAI AGENTS.md standard](https://github.com/openai/agents.md) format, which is:
- Cross-tool compatible (Claude, Gemini, Copilot)
- Recognized as "primary instructions" by Copilot CLI
- Already the format used by gsd-opencode

**File: `AGENTS.md`**
```markdown
# GSD — Get Shit Done

## Core Workflow
gsd new-project → gsd plan-phase → gsd execute-phase → repeat

## When user says "gsd new-project"
[workflow instructions]

## When user says "gsd plan-phase N"  
Use `/plan` to create implementation plan, then...
```

**Pros:**
- Industry standard format
- Works across tools
- Primary instruction priority

**Cons:**
- Less GitHub-specific

---

### Option B: .github/copilot-instructions.md

Use GitHub's native location for repository instructions.

**File: `.github/copilot-instructions.md`**
```markdown
## GSD Workflow

This repository uses the GSD (Get Shit Done) methodology...
```

**Pros:**
- GitHub-native location
- Clear repository scope
- Takes precedence in repo

**Cons:**
- GitHub-specific only

---

### Option C: Hybrid with Path-Specific Instructions

Combine AGENTS.md with path-specific instructions for planning files.

**Files:**
- `AGENTS.md` — Core GSD workflow
- `.github/instructions/planning.instructions.md` — For `.planning/**` files

**Example `.github/instructions/planning.instructions.md`:**
```yaml
---
applyTo: ".planning/**"
---

These files are GSD planning artifacts. When working with them:
- PROJECT.md defines the project vision
- REQUIREMENTS.md contains scoped requirements (REQ-XXX)
- ROADMAP.md defines phases and their order
- STATE.md is the project memory (update after each action)
```

**Pros:**
- Context-aware instructions
- Specialized handling for planning files
- Leverages native features

**Cons:**
- More complex setup

---

### Option D: Hooks-Enhanced Workflow

Add hooks to automate GSD workflow steps.

**File: `.github/hooks/hooks.json`**
```json
{
  "version": 1,
  "hooks": {
    "postToolUse": [
      {
        "type": "command",
        "bash": ".github/hooks/gsd-post-tool.sh",
        "cwd": ".",
        "timeoutSec": 30
      }
    ]
  }
}
```

**Use cases:**
- Auto-commit after task completion
- Update STATE.md automatically
- Generate summaries after execution

---

## Recommended Approach: A + C + D (Maximum Integration)

### 1. AGENTS.md as Primary Instructions

Contains the core GSD workflow, but **leverages native features**:

```markdown
# GSD — Get Shit Done

A spec-driven development workflow for GitHub Copilot CLI.

## Quick Start
- `gsd help` — Show available commands
- `gsd new-project` — Initialize project (questioning → research → requirements → roadmap)
- `gsd plan-phase N` — Plan phase N (uses `/plan` internally)
- `gsd execute-phase N` — Execute all plans in phase N
- `gsd progress` — Show current status

## Integration with Native Features

### Planning (gsd plan-phase)
This workflow uses Copilot's native `/plan` command:
1. Research the phase requirements
2. Use `/plan` to create structured implementation plan
3. Save plan to `.planning/phases/XX-name/XX-YY-PLAN.md`
4. Wait for user approval

### Verification (gsd verify-work)
Uses Copilot's native `/review` command with GSD-specific criteria.

[... full workflow details ...]
```

### 2. Path-Specific Instructions for Planning Files

**File: `.github/instructions/gsd-planning.instructions.md`**
```yaml
---
applyTo: ".planning/**"
---

# GSD Planning Files

These are GSD planning artifacts. Follow these rules:

## File Purposes
- `PROJECT.md` — Project vision and context
- `REQUIREMENTS.md` — Scoped requirements with REQ-IDs
- `ROADMAP.md` — Phase breakdown with statuses
- `STATE.md` — Project memory (update after every action)

## STATE.md Updates
Always update STATE.md after:
- Completing a task
- Encountering a blocker
- Making architectural decisions
- Discovering new requirements

## PLAN.md Format
Plans must include:
- [ ] Checkbox tasks
- Verification criteria
- Dependencies
- Estimated complexity
```

### 3. Hooks for Automation (Optional)

**File: `.github/hooks/gsd-hooks.json`**
```json
{
  "version": 1,
  "hooks": {
    "postToolUse": [
      {
        "type": "command", 
        "bash": "if [ -f .planning/STATE.md ]; then echo \"Remember to update STATE.md\"; fi",
        "timeoutSec": 5
      }
    ]
  }
}
```

---

## Comparison: Old vs New Approach

| Aspect | Old Approach | New Approach |
|--------|--------------|--------------|
| File location | `copilot-instructions.md` (root) | `AGENTS.md` + `.github/` |
| Planning | Custom "gsd plan-phase" workflow | Leverage native `/plan` |
| Verification | Custom instructions | Leverage native `/review` |
| Context | All-in-one file | Path-specific + modular |
| Automation | None | Hooks for workflow steps |
| Cross-tool | No | Yes (AGENTS.md standard) |

---

## Updated Installer Behavior

The installer should create:

```
your-project/
├── AGENTS.md                          # Primary GSD instructions
├── .github/
│   ├── copilot-instructions.md       # Repository-specific overrides (optional)
│   ├── instructions/
│   │   └── gsd-planning.instructions.md  # Path-specific for .planning/**
│   └── hooks/
│       └── gsd-hooks.json            # Workflow automation (optional)
└── .planning/                         # Created during gsd new-project
```

---

## Command Mapping (Native Integration)

| Say this... | What happens | Native features used |
|-------------|--------------|---------------------|
| `gsd new-project` | Run questioning → research → requirements → roadmap workflow | Custom workflow |
| `gsd plan-phase 1` | Research phase, then `/plan` to create structured plan | `/plan` command |
| `gsd execute-phase 1` | Execute tasks with commits | Native file editing |
| `gsd verify-work 1` | Run `/review` with GSD criteria | `/review` command |
| `gsd progress` | Read STATE.md and show status | File reading |
| `gsd delegate-task` | Use `/delegate` for async work | `/delegate` command |

---

## Implementation Checklist

- [ ] Create new `AGENTS.md` template leveraging native features
- [ ] Create `.github/instructions/gsd-planning.instructions.md` template
- [ ] Create optional `.github/hooks/gsd-hooks.json` template
- [ ] Update installer to create proper file structure
- [ ] Update README with new approach
- [ ] Add migration guide for existing users
- [ ] Test with actual Copilot CLI

---

## References

- [CLI Command Reference](https://docs.github.com/en/copilot/reference/cli-command-reference)
- [Adding Custom Instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)
- [Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [Using Hooks](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-hooks)
- [AGENTS.md Standard](https://github.com/openai/agents.md)
