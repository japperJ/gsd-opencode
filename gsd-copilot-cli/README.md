# GSD for GitHub Copilot CLI

**Spec-driven development with native Copilot CLI integration**

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## Installation

> **Note:** Package not yet published to npm. Clone the repo first, then run from your project:

```bash
node /path/to/Copilot-cli-GSD/gsd-copilot-cli/bin/install.js
```

Choose your installation mode:
1. **Minimal** (recommended) — `AGENTS.md` only
2. **Full** — `AGENTS.md` + path-specific instructions + hooks ⚠️
3. **Legacy** — `copilot-instructions.md` (v0.1 style)

> ⚠️ **Note:** Full install uses newer Copilot CLI features (path-specific instructions, hooks) that may behave inconsistently. Start with Minimal unless you want to experiment.

---

## Quick Start

```bash
# Install (from your project directory)
node /path/to/Copilot-cli-GSD/gsd-copilot-cli/bin/install.js --minimal

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

GSD v0.2 leverages Copilot CLI''s built-in features:

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
| `gsd execute-phase 1` | Execute tasks with atomic commits |
| `gsd verify-work 1` | Verify using `/review` |
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

**Full install:**
```
AGENTS.md
.github/
├── instructions/
│   └── gsd-planning.instructions.md   # Path-specific for .planning/**
└── hooks/
    └── gsd-hooks.json                 # Workflow automation
```

---

## CLI Options

```bash
node /path/to/gsd-copilot-cli/bin/install.js --help

Options:
  -m, --minimal  Install AGENTS.md only (recommended)
  -f, --full     Install all files (AGENTS.md + .github/)
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
    ├── STATE.md           # Current state
    └── phases/
        └── 01-foundation/
            ├── 01-01-PLAN.md
            └── 01-01-SUMMARY.md
```

---

## Documentation

- [Full README](https://github.com/rokicool/Copilot-cli-GSD)
- [CLI Best Practices](https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices)
- [Adding Custom Instructions](https://docs.github.com/en/copilot/how-tos/copilot-cli/add-custom-instructions)
- [Using Hooks](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-hooks)

---

## License

MIT License
