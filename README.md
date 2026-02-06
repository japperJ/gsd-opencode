<div align="left">

# GSD — Get Shit Done for GitHub Copilot CLI

**A meta-prompting, context engineering and spec-driven development system adapted for GitHub Copilot CLI**

Based on [gsd-opencode](https://github.com/rokicool/gsd-opencode) by TÂCHES & rokicool.

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## ⚠️ Important: No Slash Commands

**GitHub Copilot CLI does NOT support custom slash commands** (unlike Claude Code or OpenCode).

This adaptation uses **conversational commands** instead. You say "gsd new-project" rather than typing "/gsd-new-project".

---

## Quick Start

```bash
# Install in your project directory
npx gsd-copilot-cli

# Start Copilot CLI
copilot

# Say GSD commands conversationally:
> gsd new-project
> gsd plan-phase 1
> gsd execute-phase 1
```

That's it. Copilot CLI will read `copilot-instructions.md` and execute the GSD workflow.

---

## How It Works

The installer creates a `copilot-instructions.md` file in your project root. This file contains the full GSD methodology. When you say "gsd new-project", Copilot CLI reads these instructions and follows the workflow.

### Core Workflow

```
gsd new-project → gsd plan-phase 1 → gsd execute-phase 1 → repeat
```

### Available Commands (Conversational)

Say these to Copilot CLI:

| Say this... | What it does |
|-------------|--------------|
| `gsd new-project` | Initialize project (questioning → research → requirements → roadmap) |
| `gsd plan-phase 1` | Create detailed plan for phase 1 |
| `gsd execute-phase 1` | Execute all plans in phase 1 |
| `gsd verify-work 1` | Verify completed work |
| `gsd progress` | Show current status and next action |
| `gsd quick` | Execute small ad-hoc task |
| `gsd help` | Show all commands |

---

## What GSD Does

### 1. Initialize Project (`gsd new-project`)

The system will:
1. **Question** you until it understands what you're building
2. **Research** the domain (optional)
3. **Extract** requirements (v1 vs v2 vs out of scope)
4. **Create** roadmap with phases

**Creates:** `.planning/PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

### 2. Plan Phase (`gsd plan-phase 1`)

The system will:
1. Research how to implement this phase
2. Break it into atomic plans (2-3 tasks each)
3. Add verification criteria

**Creates:** `.planning/phases/01-xxx/01-01-PLAN.md`

### 3. Execute Phase (`gsd execute-phase 1`)

The system will:
1. Execute each task
2. Commit atomically after each task
3. Create summaries
4. Update state

**Creates:** `.planning/phases/01-xxx/01-01-SUMMARY.md`

### 4. Repeat

Continue through all phases until milestone complete.

---

## File Structure

```
your-project/
├── copilot-instructions.md   # GSD system (created by installer)
└── .planning/                 # Created during gsd new-project
    ├── PROJECT.md            # Project vision
    ├── REQUIREMENTS.md       # Scoped requirements with REQ-IDs
    ├── ROADMAP.md            # Phase breakdown
    ├── STATE.md              # Project memory
    ├── config.json           # Workflow settings
    └── phases/
        ├── 01-foundation/
        │   ├── 01-RESEARCH.md
        │   ├── 01-01-PLAN.md
        │   └── 01-01-SUMMARY.md
        └── 02-features/
            └── ...
```

---

## Comparison: Claude Code vs OpenCode vs Copilot CLI

| Feature | Claude Code | OpenCode | Copilot CLI |
|---------|-------------|----------|-------------|
| Commands | `/gsd-*` slash | `/gsd-*` slash | Conversational |
| Multi-agent | ✓ Task tool | ✓ Task tool | ✗ Single context |
| Model profiles | ✓ | ✓ | ✗ Uses current model |
| Custom agents | ✓ `.claude/agents/` | ✓ `.opencode/agents/` | ✗ Embedded in instructions |
| Parallel execution | ✓ | ✓ | ✗ Sequential |

### When to Use Which

| Use Case | Recommended |
|----------|-------------|
| Complex multi-phase projects | Claude Code or OpenCode |
| Large codebases | Claude Code or OpenCode |
| Quick projects / prototypes | Copilot CLI |
| Learning GSD methodology | Copilot CLI |
| Already using Copilot CLI | Copilot CLI |

**Key limitation:** Copilot CLI runs in a single context without multi-agent orchestration. Best for smaller projects or when you prefer conversational interaction.

---

## Repository Structure

```
Copilot-cli-GSD/
├── gsd-copilot-cli/          # The Copilot CLI adaptation (npm package)
│   ├── copilot-instructions.md   # Core GSD system
│   ├── bin/install.js            # Installer script
│   ├── package.json
│   └── README.md
├── gsd-opencode/             # Original OpenCode version (git submodule)
├── original/                  # Original TÂCHES version (git submodule)
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
node bin/install.js --local
```

---

## Credits

- **TÂCHES** — Original [Get Shit Done](https://github.com/glittercowboy/get-shit-done) for Claude Code
- **rokicool** — [gsd-opencode](https://github.com/rokicool/gsd-opencode) adaptation for OpenCode

---

## Troubleshooting

**"Copilot doesn't recognize GSD commands"**
- Make sure `copilot-instructions.md` exists in your project root
- Run `/init` in Copilot CLI if prompted
- Try rephrasing: "run the gsd new-project workflow"

**"Context getting too long"**
- Break into smaller phases
- Use `gsd quick` for ad-hoc tasks
- Start fresh context between phases

**"Commands don't work like Claude Code"**
- Copilot CLI doesn't have slash commands
- Use conversational triggers: "gsd help" instead of "/gsd-help"

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**GSD for GitHub Copilot CLI — spec-driven development, conversationally**

</div>
