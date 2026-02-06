<div align="left">

# GET SHIT DONE for GitHub Copilot CLI

**A meta-prompting system for spec-driven development with GitHub Copilot CLI**

Based on [gsd-opencode](https://github.com/rokicool/gsd-opencode) by TÂCHES & rokicool.

[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

---

## Important: How This Works

**GitHub Copilot CLI does NOT support custom slash commands** (unlike Claude Code or OpenCode).

This adaptation uses a different approach:
- GSD workflow is embedded in `copilot-instructions.md`
- Commands are invoked **conversationally** (e.g., "gsd new-project")
- Copilot CLI reads the instructions and follows the GSD methodology

---

## Quick Start

```bash
# Install in your project
npx gsd-copilot-cli

# Start Copilot CLI
copilot

# Say any GSD command conversationally:
> gsd new-project
```

That's it. Copilot CLI will read `copilot-instructions.md` and execute the GSD workflow.

---

## Commands

Instead of `/gsd-command`, you say "gsd command" conversationally:

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

## Workflow

```
gsd new-project → gsd plan-phase 1 → gsd execute-phase 1 → repeat
```

### 1. Initialize Project

```
> gsd new-project
```

The system will:
1. **Question** you until it understands what you're building
2. **Research** the domain (optional)
3. **Extract** requirements (v1 vs v2 vs out of scope)
4. **Create** roadmap with phases

**Creates:** `PROJECT.md`, `REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`

### 2. Plan Phase

```
> gsd plan-phase 1
```

The system will:
1. Research how to implement this phase
2. Break it into atomic plans (2-3 tasks each)
3. Add verification criteria

**Creates:** `phases/01-xxx/01-01-PLAN.md`

### 3. Execute Phase

```
> gsd execute-phase 1
```

The system will:
1. Execute each task
2. Commit atomically after each task
3. Create summaries
4. Update state

**Creates:** `phases/01-xxx/01-01-SUMMARY.md`

### 4. Repeat

Continue through all phases until milestone complete.

---

## File Structure

```
.planning/
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

## Differences from Claude Code / OpenCode Versions

| Feature | Claude Code | OpenCode | Copilot CLI |
|---------|-------------|----------|-------------|
| Slash commands | ✓ `/gsd-*` | ✓ `/gsd-*` | ✗ Conversational |
| Agent spawning | ✓ Task tool | ✓ Task tool | ✗ Single context |
| Model profiles | ✓ | ✓ | ✗ Uses current model |
| Custom agents | ✓ `.claude/agents/` | ✓ `.opencode/agents/` | ✗ In instructions |

**Key limitation:** Copilot CLI doesn't have multi-agent orchestration. All GSD workflows run in a single context. This means:
- Less parallelism
- More context pressure on complex phases
- Best for smaller projects or experienced users

---

## When to Use Which Version

| Use Case | Recommended |
|----------|-------------|
| Complex multi-phase projects | Claude Code or OpenCode |
| Large codebases | Claude Code or OpenCode |
| Quick projects / prototypes | Copilot CLI |
| Learning GSD methodology | Copilot CLI |
| Already using Copilot CLI | Copilot CLI |

---

## Troubleshooting

**"Copilot doesn't recognize GSD commands"**
- Make sure `copilot-instructions.md` exists in your project root
- Run `/init` in Copilot CLI to regenerate if needed
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

**GSD for Copilot CLI — spec-driven development without slash commands**

</div>
