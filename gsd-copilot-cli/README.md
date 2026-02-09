# GSD for GitHub Copilot CLI

**Spec-driven development with native Copilot CLI integration**

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## Installation

> **Note:** Package not yet published to npm. Clone the repo first, then run from your project directory:

```bash
# From your project directory:
git clone https://github.com/japperJ/gsd-opencode
node gsd-opencode/gsd-copilot-cli/bin/install.js
```

Choose your installation mode:
1. **Minimal** (recommended) — `AGENTS.md` only
2. **Pro** — `AGENTS.md` + path-specific instruction files (no hooks)
3. **Full** — `AGENTS.md` + instructions + hooks (experimental)
4. **Legacy** — `copilot-instructions.md` (v0.1 style)

> **Note:** Pro and Full installs use newer Copilot CLI features (path-specific instructions, hooks) that may behave inconsistently. Start with Minimal unless you want the extra features.

---

## Quick Start

```bash
# Install (from your project directory)
node gsd-opencode/gsd-copilot-cli/bin/install.js --minimal

# Start Copilot CLI
copilot

# Say GSD commands conversationally
> gsd new-project
> gsd plan-phase 1
> gsd execute-phase 1
```

> **Recommended model:** Claude Sonnet 4.5 or higher. Smaller models may hallucinate shell commands instead of using proper file tools.

---

## Native CLI Integration

GSD v0.3 leverages Copilot CLI's built-in features:

| GSD Command | Uses Native | Benefit |
|-------------|-------------|---------|
| `gsd plan-phase N` | `/plan` | Structured plans with checkboxes |
| `gsd verify-work N` | `/review` | Code review with criteria |
| `gsd delegate-task` | `/delegate` | Async work via coding agent |

---

## Commands

| Say this... | What happens |
|-------------|--------------|
| `gsd new-project` | Questioning → research → requirements → roadmap |
| `gsd plan-phase 1` | Create structured plan using `/plan` |
| `gsd execute-phase 1` | Execute tasks with atomic commits + auto-test |
| `gsd verify-work 1` | 3-level verification + `/review` |
| `gsd constitution` | Set project principles and standards |
| `gsd debug [issue]` | Scientific debugging with persistent state |
| `gsd pause` / `resume` | Save/restore work state |
| `gsd progress` | Show current status |
| `gsd delegate-task` | Offload to `/delegate` |
| `gsd quick [task]` | Small ad-hoc task |
| `gsd help` | Show commands |

---

## Files Created

**Minimal install:**
```
AGENTS.md                              # Primary GSD instructions
```

**Pro install:**
```
AGENTS.md
.github/
└── instructions/
    ├── gsd-planning.instructions.md       # Planning workflow
    ├── gsd-verification.instructions.md   # 3-level verification
    ├── gsd-execution.instructions.md      # Deviation rules + auto-test
    └── gsd-debugging.instructions.md      # Scientific debugging
```

**Full install:**
```
AGENTS.md
.github/
├── instructions/
│   ├── gsd-planning.instructions.md
│   ├── gsd-verification.instructions.md
│   ├── gsd-execution.instructions.md
│   └── gsd-debugging.instructions.md
└── hooks/
    └── gsd-hooks.json                 # Workflow automation
```

---

## CLI Options

```bash
node gsd-opencode/gsd-copilot-cli/bin/install.js --help

Options:
  -m, --minimal  Install AGENTS.md only (recommended)
  -p, --pro      Install AGENTS.md + instruction files
  -f, --full     Install all files (AGENTS.md + .github/ + hooks)
  --legacy       Install copilot-instructions.md (v0.1)
  -y, --yes      Skip confirmation
  -h, --help     Show help
```

---

## Native Features to Learn

| Feature | Description |
|---------|-------------|
| `/plan` | Built-in planning with checkboxes |
| `/review` | Code review agent |
| `/delegate` | Async work in cloud |
| `/context` | Token usage visualization |
| `/compact` | Summarize conversation |
| `Shift+Tab` | Toggle plan mode |
| `@filename` | Include file in context |

---

## File Structure After `gsd new-project`

```
your-project/
├── AGENTS.md              # GSD workflow
└── .planning/
    ├── PROJECT.md         # Vision
    ├── REQUIREMENTS.md    # REQ-XXX scoped
    ├── ROADMAP.md         # Phases
    ├── CONSTITUTION.md    # Project principles (optional)
    ├── STATE.md           # Current state
    └── phases/
        └── 01-foundation/
            ├── 01-01-PLAN.md
            └── 01-01-SUMMARY.md
```

---

## Documentation

- [Full README](https://github.com/japperJ/gsd-opencode)
- [CLI Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [Adding Custom Instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)
- [Using Hooks](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-hooks)

---

## License

MIT License
