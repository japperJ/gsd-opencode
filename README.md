# GSD — Get Shit Done for GitHub Copilot CLI

**A spec-driven development workflow with native Copilot CLI integration**

Based on [gsd-opencode](https://github.com/rokicool/gsd-opencode) by TÂCHES & rokicool.

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## What's New in v0.3.0

**Enhanced workflow with best features from the ecosystem**

- **`gsd constitution`** — Set project principles and coding standards (inspired by [SpecKit](https://github.com/github/spec-kit))
- **`gsd debug`** — Scientific debugging with persistent state, hypothesis testing, and 7 investigation techniques
- **`gsd pause` / `gsd resume`** — Session management across context resets
- **3-level verification** — Checks artifacts are Existing, Substantive (not stubs), and Wired (imported/used)
- **Planner-checker loop** — Plans self-validated across 6 dimensions before execution
- **Deviation rules** — Auto-fix bugs/blockers, STOP on architectural changes
- **Auto-test loop** — Runs tests after each task, auto-fixes failures
- **Pro install tier** (`--pro`) — Instruction files without experimental hooks

### Previous Versions

- **v0.2.2** — Selectable options with arrow keys, visual workplan with live checkboxes, auto-continue between phases
- **v0.2.1** — Questioning workflow enforced with STOP gates, phase banners, 3-5 questions minimum
- **v0.2.0** — Native Copilot CLI integration (`/plan`, `/review`, `/delegate`)

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/rokicool/Copilot-cli-GSD.git

# Go to your project directory
cd your-project

# Install GSD (replace <path-to-clone> with actual clone location)
node <path-to-clone>/gsd-copilot-cli/bin/install.js --minimal

# Start Copilot CLI
copilot

# Say GSD commands conversationally:
> gsd new-project
> gsd plan-phase 1
> gsd execute-phase 1
```

> **Recommended model:** Claude Sonnet 4.5 or higher. Smaller models may hallucinate shell commands instead of using proper file tools. Use `/model` to check/switch models.

**Future:** Once published to npm, you'll be able to run `npx gsd-copilot-cli`.

---

## How It Works

GSD uses the **AGENTS.md standard** — the cross-tool format recognized by Copilot CLI, Claude Code, and others.

```
your-project/
├── AGENTS.md                          # Primary GSD instructions
└── .github/                           # (Full install only)
    ├── instructions/
    │   └── gsd-planning.instructions.md  # Path-specific for .planning/**
    └── hooks/
        └── gsd-hooks.json             # Workflow automation
```

### Instruction Discovery Order

Copilot CLI reads instructions in this order:

1. `~/.copilot/copilot-instructions.md` — Global (all sessions)
2. `.github/copilot-instructions.md` — Repository-wide
3. `.github/instructions/**/*.instructions.md` — Path-specific
4. `AGENTS.md` (Git root or cwd) — **← GSD uses this**
5. `CLAUDE.md`, `GEMINI.md`, `CODEX.md` — Also supported

---

## Available Commands

| Say this... | What happens | Native feature used |
|-------------|--------------|---------------------|
| `gsd new-project` | Questioning → research → requirements → roadmap | Custom workflow |
| `gsd plan-phase 1` | Research phase, then create structured plan | `/plan` |
| `gsd execute-phase 1` | Execute tasks with atomic commits + auto-test | File editing |
| `gsd verify-work 1` | 3-level artifact verification + code review | `/review` |
| `gsd constitution` | Set project principles and coding standards | Custom workflow |
| `gsd debug [issue]` | Scientific debugging with persistent state | Custom workflow |
| `gsd pause` / `resume` | Save/restore work state across sessions | Custom workflow |
| `gsd delegate-task` | Offload work to async coding agent | `/delegate` |
| `gsd progress` | Show current status and next action | File reading |
| `gsd quick [task]` | Execute small ad-hoc task | Direct execution |
| `gsd help` | Show all commands | - |

---

## Core Workflow

```
gsd new-project → gsd plan-phase 1 → gsd execute-phase 1 → gsd verify-work 1 → repeat
     ↓
  (optional: gsd constitution — can also run anytime)
```

**Note:** `gsd constitution` is **optional**. During `gsd new-project` you're asked if you want to set project principles. You can skip it and run `gsd constitution` later anytime.

### 1. Initialize Project (`gsd new-project`)

1. **Deep questioning** until the project is understood
2. **Research** the domain (optional)
3. **Extract** requirements (v1 vs v2 vs out of scope)
4. **Create** roadmap with phases

**Creates:** `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

### 2. Plan Phase (`gsd plan-phase 1`)

Uses Copilot CLI''s native `/plan` command:

1. Reads phase requirements from `ROADMAP.md`
2. Researches implementation approach
3. Executes `/plan` to create structured plan with checkboxes
4. Saves to `.planning/phases/01-name/01-01-PLAN.md`

### 3. Execute Phase (`gsd execute-phase 1`)

1. Reads each plan file
2. Executes tasks sequentially
3. Commits atomically after each task
4. Creates summary in `SUMMARY.md`
5. Updates `STATE.md`

### 4. Verify Work (`gsd verify-work 1`)

Uses Copilot CLI''s native `/review` command with GSD-specific criteria.

---

## Native CLI Features You Should Know

| Feature | What it does | When to use |
|---------|--------------|-------------|
| `/plan` | Creates implementation plan with checkboxes | Complex features |
| `/review` | Analyzes code changes | Before merging |
| `/delegate` | Offloads to cloud coding agent | Async/parallel work |
| `/context` | Shows token usage | Monitor context |
| `/compact` | Summarizes conversation | Long sessions |
| `/session plan` | View current plan | Check progress |
| `Shift+Tab` | Toggle plan mode | Complex work |
| `@filename` | Include file in context | Reference code |

---

## File Structure

After `gsd new-project`:

```
your-project/
├── AGENTS.md                  # GSD workflow instructions
└── .planning/
    ├── CONSTITUTION.md       # Project principles & standards
    ├── PROJECT.md            # Project vision
    ├── REQUIREMENTS.md       # Scoped requirements (REQ-XXX)
    ├── ROADMAP.md            # Phase breakdown with statuses
    ├── STATE.md              # Project memory (update frequently!)
    ├── debug/                # Debug sessions (gsd debug)
    └── phases/
        ├── 01-foundation/
        │   ├── 01-RESEARCH.md
        │   ├── 01-01-PLAN.md
        │   ├── 01-01-SUMMARY.md
        │   └── 01-VERIFICATION.md
        └── 02-features/
            └── ...
```

---

## Installation Options

> **Note:** Package not yet published to npm. Use the local install method below.

```bash
# First, clone the repo (if you haven't)
git clone https://github.com/rokicool/Copilot-cli-GSD.git

# Then from your project directory:

# Interactive (prompts for choice)
node <path-to-clone>/gsd-copilot-cli/bin/install.js

# Minimal — AGENTS.md only (recommended)
node <path-to-clone>/gsd-copilot-cli/bin/install.js --minimal

# Pro — AGENTS.md + advanced instruction files (verification, execution, debugging)
node <path-to-clone>/gsd-copilot-cli/bin/install.js --pro

# Full — Pro + hooks (experimental)
node <path-to-clone>/gsd-copilot-cli/bin/install.js --full

# Legacy — copilot-instructions.md (v0.1 compatibility)
node <path-to-clone>/gsd-copilot-cli/bin/install.js --legacy
```

**Future:** Once published to npm, you'll be able to use `npx gsd-copilot-cli`.

### Installation Tiers Explained

**Minimal** — Single-file setup
- Copies only `AGENTS.md` with the entire GSD workflow
- Copilot CLI reads this one file to understand all commands
- Lightest weight, works everywhere Copilot CLI is installed
- Recommended for getting started

**Pro** — Modular instructions (recommended for sustained work)
- Copies `AGENTS.md` (same as Minimal)
- PLUS 4 modular instruction files in `.github/instructions/`
- Each file handles one area: planning, verification, execution, debugging
- Copilot CLI **auto-loads** these files based on path patterns (no manual intervention)
- Benefit: Keeps AGENTS.md lean (486 lines instead of bloated) while providing full feature set
- Best balance of features and efficiency

**Full** — Pro + workflow automation (experimental)
- Same as Pro
- PLUS `gsd-hooks.json` for automatic triggers
- Hooks can run commands on Copilot CLI events (e.g., "when user says X, run Y first")
- Marked experimental because hook behavior varies across Copilot CLI versions
- Only use if you want to experiment with automation

**Legacy** — v0.1 compatibility
- Single file `copilot-instructions.md` in repo root
- Old instruction format that Copilot CLI still recognizes
- Provided for backwards compatibility with older setups

### What Each Option Creates

**Minimal (recommended):**
```
└── AGENTS.md
```

**Pro:**
```
├── AGENTS.md
└── .github/instructions/
    ├── gsd-planning.instructions.md       # Path-specific for .planning/**
    ├── gsd-verification.instructions.md   # 3-level artifact verification
    ├── gsd-execution.instructions.md      # Deviation rules + auto-test
    └── gsd-debugging.instructions.md      # Scientific debugging
```

**Full:** *Experimental — hooks may behave inconsistently*
```
├── (everything in Pro)
└── .github/hooks/
    └── gsd-hooks.json                     # Session start/post-tool hooks
```

**Legacy:**
```
└── copilot-instructions.md
```

---

## Comparison: GSD Implementations

| Feature | Claude Code | OpenCode | Copilot CLI |
|---------|-------------|----------|-------------|
| Commands | `/gsd-*` slash | `/gsd-*` slash | Conversational |
| Multi-agent | ✓ Task tool | ✓ Task tool | ✗ Single context |
| Native planning | ✗ | ✗ | ✓ `/plan` built-in |
| Native review | ✗ | ✗ | ✓ `/review` built-in |
| Delegation | ✗ | ✗ | ✓ `/delegate` built-in |
| Path-specific | ✗ | ✗ | ✓ `.instructions.md` files |
| Hooks | ✗ | ✗ | ✓ `.github/hooks/` |

### When to Use Which

| Use Case | Recommended |
|----------|-------------|
| Complex multi-agent orchestration | Claude Code or OpenCode |
| Native planning + review + delegation | **Copilot CLI** |
| Path-specific instructions | **Copilot CLI** |
| Workflow hooks/automation | **Copilot CLI** |
| Already using Copilot CLI | **Copilot CLI** |

---

## Repository Structure

```
Copilot-cli-GSD/
├── gsd-copilot-cli/          # The npm package
│   ├── templates/
│   │   ├── AGENTS.md                              # Core GSD workflow
│   │   └── .github/
│   │       ├── instructions/
│   │       │   ├── gsd-planning.instructions.md   # Path-specific
│   │       │   ├── gsd-verification.instructions.md # 3-level verification
│   │       │   ├── gsd-execution.instructions.md  # Deviation rules
│   │       │   └── gsd-debugging.instructions.md  # Scientific debugger
│   │       └── hooks/
│   │           └── gsd-hooks.json                 # Automation
│   ├── copilot-instructions.md                    # Legacy format
│   ├── bin/install.js
│   └── package.json
├── gsd-opencode/             # Original OpenCode version (submodule)
├── original/                  # Original TÂCHES version (submodule)
├── INTEGRATION-ANALYSIS.md   # Detailed analysis of CLI features
├── CLAUDE.md                 # Project instructions
└── README.md                 # This file
```

---

## Development

### Cloning with Submodules

```bash
git clone https://github.com/[your-username]/Copilot-cli-GSD.git
cd Copilot-cli-GSD
git submodule update --init --recursive
```

### Testing Locally

```bash
cd gsd-copilot-cli
node bin/install.js --minimal
```

---

## Troubleshooting

**"Copilot doesn''t recognize GSD commands"**
- Ensure `AGENTS.md` exists in project root
- Try `/init` to reload instructions
- Rephrase: "run the gsd new-project workflow"

**"Context getting too long"**
- Use `/compact` to summarize
- Use `/context` to check usage
- Start fresh with `/clear`

**"Native /plan doesn''t match GSD format"**
- GSD plan-phase uses /plan internally but saves to `.planning/` format
- The workflow adapts native output to GSD structure

**"Hooks not running"**
- Hooks must be in `.github/hooks/` directory
- Check JSON syntax: `cat .github/hooks/gsd-hooks.json | jq .`
- Hooks only run with `--full` installation

---

## Credits

- **TÂCHES** — Original [Get Shit Done](https://github.com/glittercowboy/get-shit-done) for Claude Code
- **rokicool** — [gsd-opencode](https://github.com/rokicool/gsd-opencode) adaptation for OpenCode
- **GitHub** — Copilot CLI native features (`/plan`, `/review`, `/delegate`)

**v0.3.0 inspired by:**
- [SpecKit](https://github.com/github/spec-kit) — Constitution concept, spec-driven philosophy
- [oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode) — Persistence patterns, session management
- [Aider](https://github.com/paul-gauthier/aider) — Auto-test loop, repo-map awareness
- [PIV-SpecKit](https://github.com/galando/piv-speckit) — Adaptive learning, auto-prime context

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Further Reading

- [Copilot CLI Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [Adding Custom Instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)
- [Using Hooks](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-hooks)
- [AGENTS.md Standard](https://github.com/openai/agents.md)

---

<div align="center">

**GSD for GitHub Copilot CLI — native integration, spec-driven development**

</div>
