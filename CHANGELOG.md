# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [gsd-copilot-cli v0.4.0] - 2026-02-09

Project lifecycle management: add features, manage phases, and milestone versioning.

### Added
- **Model hints** — Each command includes a 💡 Model recommendation (Strong/Mid-tier/Any) so users can switch models via `/model` for optimal cost vs quality per task
- **`gsd add-feature [description]`** — Add a feature to an existing GSD project with lightweight questioning (2-3 questions), appends new requirements and phases without overwriting existing content
- **`gsd add-phase [description]`** — Append a new phase to end of current roadmap, auto-calculates next integer phase number, creates phase directory
- **`gsd insert-phase [after] [description]`** — Insert urgent phase using decimal numbering (e.g., 3.1, 3.2) between existing phases, preserves logical sequence
- **`gsd new-milestone [name]`** — Start new milestone cycle with full questioning → research → requirements → roadmap flow, phase numbering continues from previous milestone
- **`gsd complete-milestone [version]`** — Archive completed milestone (roadmap + requirements) to `.planning/milestones/`, create git tag, collapse completed phases in ROADMAP.md
- Milestone archival directory `.planning/milestones/` with `v{X.Y}-ROADMAP.md` and `v{X.Y}-REQUIREMENTS.md` archives
- Phase numbering rules: integers for planned work, decimals for urgent insertions, never resets across milestones

### Changed
- AGENTS.md template expanded with 5 new command definitions (~500 lines added)
- Commands table updated from 12 to 17 entries across all documentation files
- File structure diagrams updated to include `milestones/` directory
- REQUIREMENTS.md now labeled as "current milestone" scoped (archived per milestone)
- ROADMAP.md now supports collapsed milestone entries via `<details>` tags
- Core Workflow section in README.md expanded with "Adding to Existing Projects" and "Milestone Lifecycle" subsections

## [gsd-copilot-cli v0.3.1] - 2026-02-09

Installer improvements and documentation fixes.

### Added
- **`--yolo` / `-Y` flag** — Auto-approve all tool execution in Copilot CLI (npx, npm, shell commands run without confirmation)
- Interactive YOLO prompt during install when flag not set via CLI
- `--yolo` documented in help text, CLI Options, and README

### Changed
- Install paths now use relative `gsd-opencode/gsd-copilot-cli/bin/install.js` (clone into project directory)
- Git clone URL updated to `https://github.com/japperJ/gsd-opencode`
- Help text usage line changed from `npx gsd-copilot-cli` to `node gsd-opencode/...`
- package.json repository URL updated to `japperJ/gsd-opencode`

### Fixed
- Removed `~/gsd-opencode` and `$HOME/gsd-opencode` paths that didn't work on Windows
- Removed `/path/to/gsd-opencode` placeholder paths that users tried to use literally
- CLAUDE.md file structure now includes `CONSTITUTION.md` and `debug/` directory
- CLAUDE.md repo structure now includes `CLAUDE.md` entry

## [gsd-copilot-cli v0.3.0] - 2026-02-06

Enhanced workflow with features from competitive research (SpecKit, oh-my-opencode, Aider, PIV-SpecKit, Claude Task Master).

### Added
- **`gsd constitution`** — Set project principles, coding standards, and architectural constraints (inspired by SpecKit)
- **`gsd debug [issue]`** — Scientific debugging with persistent state, hypothesis testing, cognitive bias awareness, and 7 investigation techniques
- **`gsd pause` / `gsd resume`** — Session management with `.planning/.continue-here` marker
- **3-level artifact verification** for `gsd verify-work` — checks files are Existing, Substantive (not stubs), and Wired (imported/used)
- **Planner-checker loop** for `gsd plan-phase` — self-validates plans across 6 dimensions before presenting to user (max 3 iterations)
- **Deviation rules** for `gsd execute-phase` — 4-tier system: auto-fix bugs, add missing critical functionality, fix blockers, STOP on architectural changes
- **Auto-test loop** for `gsd execute-phase` — runs tests after each task, auto-fixes failures (max 3 attempts)
- **Atomic commit protocol** — one commit per task with structured messages, never `git add .`
- **Pro install tier** (`--pro`) — AGENTS.md + all instruction files without experimental hooks
- New instruction files: `gsd-verification.instructions.md`, `gsd-execution.instructions.md`, `gsd-debugging.instructions.md`

### Changed
- `gsd new-project` now includes optional Phase 4.5 (Constitution) for setting project standards
- `gsd plan-phase` reads CONSTITUTION.md for consistent decision-making
- `gsd execute-phase` applies deviation rules and runs tests automatically
- `gsd verify-work` performs 3-level verification before `/review`
- File structure updated with CONSTITUTION.md, debug/, and .continue-here
- Interactive install now has 4 options (Minimal, Pro, Full, Legacy)

### Fixed
- `writeFileSync` argument order bug in install.js (was `writeFileSync(content, path)`, now `writeFileSync(path, content)`)

## [gsd-copilot-cli v0.2.2] - 2026-02-06

Interactive selections and visual progress tracking.

### Added
- **Selectable options** — Use `ask_user` tool with arrow keys (↑↓) + Enter instead of typing responses
- **Visual workplan display** — Tasks shown with checkboxes that update during execution:
  ```
  - [x] Task 1 ✓
  - [→] Task 2 ← current
  - [ ] Task 3
  ```
- **Auto-continue between phases** — Workflow flows automatically after each user response
- **Better completion flow** — After verify, choose "Plan next phase" / "See progress" / "Done"
- **Progress command improvements** — Shows both phases and current task progress

### Changed
- All user prompts now use `ask_user` with selectable options
- Removed ambiguous "wait for confirmation" language
- Added explicit "→ AUTOMATICALLY continue to Phase N" instructions

## [gsd-copilot-cli v0.2.1] - 2026-02-06

Critical fix: AGENTS.md rewritten as directives instead of documentation.

### Fixed
- **gsd new-project now enforces questioning workflow** — CLI was skipping questioning and building immediately
- AGENTS.md completely rewritten with mandatory STOP gates
- Added explicit "DO NOT WRITE ANY CODE" instruction at top
- Added phase banners (GSD ► QUESTIONING, etc.)
- Added user confirmation gates before proceeding to next phase
- Added "ASK AT LEAST 3-5 QUESTIONS" explicit requirement

### Changed
- Instruction style changed from documentation ("here's how GSD works") to directives ("YOU MUST follow this workflow")
- Reduced file size by removing verbose explanations
- Clearer command structure

## [1.9.1] - 2026-01-23

Standardized command naming conventions and improved documentation formatting across project files.

### Fixed
- Renamed set-profile command to gsd-set-profile in gsd-opencode/command/gsd/set-profile.md for consistency with gsd-* naming convention
- Updated /gsd:whats-new to /gsd-whats-new in README.md to follow standardized command prefix format
- Added forbidden string check in assets/antipatterns.toml to prevent gsd-set-profile old naming pattern

### Changed
- Enhanced gsd-insert-phase command description in gsd-opencode/command/gsd/insert-phase.md for clarity on usage scenarios
- Improved code block formatting in gsd-opencode/command/gsd/set-profile.md with consistent blank line spacing
- Removed duplicate verification line in README.md for cleaner documentation

## [1.9.0] - 2026-01-21

Major upgrade introducing model profile system with quality/balanced/budget tiers, new quick mode for ad-hoc tasks, and comprehensive workflow agent configuration system.

### Added
- gsd-quick command for executing small, ad-hoc tasks with GSD guarantees but skipping optional agents
- gsd-set-profile command for switching model profiles (quality/balanced/budget)
- gsd-settings command for configuring workflow toggles and model profile interactively
- model-profiles.md reference documentation with profile definitions and resolution logic
- planning-config.md reference documentation for .planning/ directory configuration

### Changed
- Updated all orchestrator commands (plan-phase, new-milestone, execute-phase, new-project, etc.) with model profile resolution
- Updated all agents with new tool specification format (Read, Write, Bash, Glob, Grep, webfetch, mcp__context7__*)
- Updated help.md command with quick mode documentation and enhanced feature descriptions
- Enhanced checkpoints.md reference with golden rules for OpenCode automation and dev server setup guidance
- Updated package.json version from 1.6.0 to 1.9.0

## [1.6.1] - 2026-01-19

Fixed repository URLs to point to gsd-opencode repository.

### Changed
- Updated GitHub repository URLs from rokicool/get-shit-done to rokicool/gsd-opencode in command/gsd/update.md and command/gsd/whats-new.md

## [1.6.0] - 2026-01-19

Catch up with original [Get-Shit-Done v1.6.4](https://github.com/glittercowboy/get-shit-done/blob/main/CHANGELOG.md#164---2026-01-17).
Complete restructuring with agent system, unified workflows, and enhanced project lifecycle management.

### Added
- New agent system with 10 specialized agents for planning, debugging, execution, integration checking, research, and verification
- gsd-update command to update GSD to latest version with changelog display
- gsd-whats-new command to see changes since installed version
- gsd-audit-milestone command for milestone auditing
- gsd-plan-milestone-gaps command for gap closure planning
- verify-phase workflow for phase verification
- diagnose-issues workflow for issue diagnosis
- UAT.md template for user acceptance testing
- user-setup.md template for user setup guidance
- verification-report.md template for structured verification reporting
- debug-subagent-prompt.md template for debugging subagent
- planner-subagent-prompt.md template for planner subagent
- requirements.md template for requirements documentation
- research-project templates (ARCHITECTURE, FEATURES, PITFALLS, STACK, SUMMARY)
- verification-patterns.md reference documentation
- ui-brand.md reference for UI branding guidelines
- VERSION file support for version tracking

### Changed
- new-project command: Complete overhaul with unified flow (questioning → research → requirements → roadmap)
- new-milestone command: Enhanced milestone creation with improved workflow
- execute-phase command: Improved execution workflow with better integration
- discuss-phase command: Enhanced discussion capabilities
- complete-milestone command: Improved milestone completion process
- verify-work command: Enhanced verification process with new reporting
- research-phase command: Improved research workflow
- map-codebase command: Better codebase mapping functionality
- debug command: Improved debugging workflow
- progress command: Enhanced progress tracking
- checkpoints.md: Expanded checkpoint documentation
- questioning.md: Enhanced questioning framework
- context.md template: Improved context template
- phase-prompt.md template: Enhanced phase prompt template
- roadmap.md template: Improved roadmap template
- state.md template: Enhanced state management template
- summary.md template: Improved summary template
- research.md template: Enhanced research template
- discovery.md template: Improved discovery template
- codebase templates: Improved architecture, concerns, conventions, structure, and testing templates
- install.js: Improved installation script
- package.json: Updated version from 1.4.4 to 1.6.0, added agents to files array

### Removed
- GSD-STYLE.md style guide
- .opencode/rules/references.md
- .opencode/rules/style.md
- .opencode/rules/templates.md
- .opencode/rules/workflows.md
- Commands: consider-issues, create-roadmap, discuss-milestone, execute-plan, plan-fix, status
- Reference documentation: debugging folder (debugging-mindset, hypothesis-testing, investigation-techniques, verification-patterns, when-to-research), plan-format, principles, research-pitfalls, scope-estimation
- Templates: agent-history.md, checkpoint-return.md, config.json, continuation-prompt.md, issues.md, milestone-context.md, subagent-task-prompt.md, uat-issues.md
- Workflows: create-milestone.md, create-roadmap.md, debug.md, discuss-milestone.md, plan-phase.md, research-phase.md, _archive/execute-phase.md
- Test output files: animal-facts.md, dad-jokes.md, random-numbers.md

## [1.5.2] - 2026-01-19
