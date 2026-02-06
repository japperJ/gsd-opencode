#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

// Colors
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const dim = "\x1b[2m";
const gray = "\x1b[90m";
const white = "\x1b[37m";
const reset = "\x1b[0m";

// Get version from package.json
const pkg = require("../package.json");

const banner = `
${cyan}   ██████╗ ███████╗██████╗
  ██╔════╝ ██╔════╝██╔══██╗
  ██║  ███╗███████╗██║  ██║
  ██║   ██║╚════██║██║  ██║
  ╚██████╔╝███████║██████╔╝
   ╚═════╝ ╚══════╝╚═════╝${reset}

                                   ${white}▄${reset}
  ${gray}█▀▀█${reset} ${gray}█▀▀█${reset} ${gray}█▀▀█${reset} ${gray}█▀▀▄${reset} ${white}█▀▀▀${reset} ${white}█▀▀█${reset} ${white}█▀▀█${reset} ${white}█▀▀█${reset}
  ${gray}█░░█${reset} ${gray}█░░█${reset} ${gray}█▀▀▀${reset} ${gray}█░░█${reset} ${white}█░░░${reset} ${white}█░░█${reset} ${white}█░░█${reset} ${white}█▀▀▀${reset}
  ${gray}▀▀▀▀${reset} ${gray}█▀▀▀${reset} ${gray}▀▀▀▀${reset} ${gray}▀  ▀${reset} ${white}▀▀▀▀${reset} ${white}▀▀▀▀${reset} ${white}▀▀▀▀${reset} ${white}▀▀▀▀${reset}

  Get Shit Done ${dim}v${pkg.version}${reset}
  A meta-prompting, context engineering and spec-driven
  development system for GitHub Copilot CLI / Claude Code
  (adapted from gsd-opencode by TÂCHES & rokicool)

`;

// Parse args
const args = process.argv.slice(2);
const hasGlobal = args.includes("--global") || args.includes("-g");
const hasLocal = args.includes("--local") || args.includes("-l");

// Parse --config-dir argument
function parseConfigDirArg() {
  const configDirIndex = args.findIndex(
    (arg) => arg === "--config-dir" || arg === "-c",
  );
  if (configDirIndex !== -1) {
    const nextArg = args[configDirIndex + 1];
    if (!nextArg || nextArg.startsWith("-")) {
      console.error(`  ${yellow}--config-dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const configDirArg = args.find(
    (arg) => arg.startsWith("--config-dir=") || arg.startsWith("-c="),
  );
  if (configDirArg) {
    return configDirArg.split("=")[1];
  }
  return null;
}
const explicitConfigDir = parseConfigDirArg();
const hasHelp = args.includes("--help") || args.includes("-h");

console.log(banner);

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx gsd-copilot-cli [options]

  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}              Install globally (to ~/.claude directory)
    ${cyan}-l, --local${reset}               Install locally (to .claude in current directory)
    ${cyan}-c, --config-dir <path>${reset}   Specify custom config directory
    ${cyan}-h, --help${reset}                Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Install to default ~/.claude directory${reset}
    npx gsd-copilot-cli --global

    ${dim}# Install to custom config directory${reset}
    npx gsd-copilot-cli --global --config-dir ~/.my-claude

    ${dim}# Install to current project only${reset}
    npx gsd-copilot-cli --local

  ${yellow}Notes:${reset}
    Global install puts GSD commands in ~/.claude/commands/gsd/
    and agents/templates in ~/.claude/ subdirectories.
    Local install puts everything in .claude/ within the current project.
  `);
  process.exit(0);
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith("~/")) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursively copy directory, replacing paths in .md files
 */
function copyWithPathReplacement(srcDir, destDir, pathPrefix) {
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyWithPathReplacement(srcPath, destPath, pathPrefix);
    } else if (entry.name.endsWith(".md")) {
      let content = fs.readFileSync(srcPath, "utf8");

      // 1) @-references: @gsd-opencode/... → @<pathPrefix>...
      content = content.replace(/@gsd-opencode\//g, `@${pathPrefix}`);

      // 2) Plain repo-local paths: gsd-opencode/... → <pathPrefix>...
      content = content.replace(/\bgsd-opencode\//g, pathPrefix);

      // 3) Rewrite OpenCode paths → Claude Code paths
      content = content.replace(/~\/\.config\/opencode\//g, pathPrefix);
      content = content.replace(/\.\/\.opencode\//g, "./.claude/");

      // 4) Rewrite legacy Claude paths
      content = content.replace(/~\/\.claude\//g, pathPrefix);
      content = content.replace(/\.\/\.claude\//g, "./.claude/");

      // 5) Replace OpenCode-specific terminology
      content = content.replace(/\bOpenCode\b/g, "Copilot CLI");
      content = content.replace(/\bopencode\b/g, "copilot-cli");

      // 6) Replace subagent_type references for Claude Code compatibility
      // Claude Code only supports: Bash, general-purpose, Explore, Plan
      content = content.replace(
        /subagent_type="gsd-([^"]+)"/g,
        'subagent_type="general-purpose"'
      );

      // 7) Replace model references
      content = content.replace(/opencode\/glm-4\.7-free/g, "opus");
      content = content.replace(/opencode\/minimax-m2\.1-free/g, "sonnet");
      content = content.replace(/opencode\/grok-code/g, "haiku");

      // 8) Replace opencode.json references with copilot config
      content = content.replace(/\bopencode\.json\b/g, "copilot-gsd.json");

      fs.writeFileSync(destPath, content);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Install to the specified directory
 */
function install(isGlobal) {
  const src = path.join(__dirname, "..");
  const configDir = expandTilde(explicitConfigDir);
  const defaultGlobalDir =
    configDir || path.join(os.homedir(), ".claude");
  const claudeDir = isGlobal
    ? defaultGlobalDir
    : path.join(process.cwd(), ".claude");

  const locationLabel = isGlobal
    ? claudeDir.replace(os.homedir(), "~")
    : claudeDir.replace(process.cwd(), ".");

  // Path prefix for file references
  const pathPrefix = isGlobal
    ? configDir
      ? `${claudeDir}/`
      : "~/.claude/"
    : "./.claude/";

  function scanForUnresolvedTokens(destRoot) {
    const tokenRegex = /@gsd-opencode\/|\bgsd-opencode\/|~\/\.config\/opencode\//g;
    const maxHits = 10;
    const hits = [];

    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (hits.length >= maxHits) return;

        const filePath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(filePath);
          continue;
        }

        if (!entry.name.endsWith(".md")) continue;

        const content = fs.readFileSync(filePath, "utf8");
        tokenRegex.lastIndex = 0;
        if (!tokenRegex.test(content)) continue;

        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          tokenRegex.lastIndex = 0;
          if (tokenRegex.test(lines[i])) {
            hits.push({
              file: filePath,
              line: i + 1,
              snippet: lines[i].trim().slice(0, 200),
            });
            break;
          }
        }
      }
    }

    walk(destRoot);

    if (hits.length > 0) {
      console.log(
        `\n  ${yellow}Warning: unresolved path tokens found${reset}`,
      );
      console.log(
        `  ${yellow}These may cause commands to fail (file not found).${reset}`,
      );
      console.log(`  ${dim}Showing up to ${maxHits} matches:${reset}`);

      for (const hit of hits) {
        const displayPath = isGlobal
          ? hit.file.replace(os.homedir(), "~")
          : hit.file.replace(process.cwd(), ".");
        console.log(
          `  - ${displayPath}:${hit.line}\n    ${dim}${hit.snippet}${reset}`,
        );
      }

      console.log("");
    }
  }

  console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

  // Copy commands (renamed from command/gsd to commands/gsd for Claude Code convention)
  const commandsSrc = path.join(src, "commands");
  // Fall back to old directory name if commands/ doesn't exist yet
  const actualCommandsSrc = fs.existsSync(commandsSrc)
    ? commandsSrc
    : path.join(src, "command");
  const commandsDest = path.join(claudeDir, "commands", "gsd");
  // For Claude Code, commands go in commands/ directory
  const commandsSrcGsd = fs.existsSync(path.join(actualCommandsSrc, "gsd"))
    ? path.join(actualCommandsSrc, "gsd")
    : actualCommandsSrc;
  copyWithPathReplacement(commandsSrcGsd, commandsDest, pathPrefix);
  console.log(`  ${green}✓${reset} Installed commands/gsd`);

  // Copy agents (as prompt reference files)
  const agentsSrc = path.join(src, "agents");
  const agentsDest = path.join(claudeDir, "agents");
  copyWithPathReplacement(agentsSrc, agentsDest, pathPrefix);
  console.log(`  ${green}✓${reset} Installed agents`);

  // Copy get-shit-done (templates, references, workflows)
  const gsdSrc = path.join(src, "get-shit-done");
  const gsdDest = path.join(claudeDir, "get-shit-done");
  copyWithPathReplacement(gsdSrc, gsdDest, pathPrefix);
  console.log(`  ${green}✓${reset} Installed get-shit-done`);

  // Post-install diagnostic
  scanForUnresolvedTokens(claudeDir);

  // Create VERSION file
  fs.writeFileSync(path.join(gsdDest, "VERSION"), `v${pkg.version}`);
  console.log(`  ${green}✓${reset} Created VERSION file`);

  // Create CLAUDE.md if it doesn't exist (local install only)
  if (!isGlobal) {
    const claudeMdPath = path.join(process.cwd(), "CLAUDE.md");
    if (!fs.existsSync(claudeMdPath)) {
      const claudeMdContent = `# GSD — Get Shit Done

This project uses the GSD meta-prompting system for structured development.

## Available Commands

Run \`/gsd-help\` to see all available commands.

### Core Workflow
- \`/gsd-new-project\` — Initialize a new project
- \`/gsd-plan-phase [N]\` — Plan a phase
- \`/gsd-execute-phase [N]\` — Execute a phase
- \`/gsd-verify-work [N]\` — Verify completed work

### Quick Start
1. Run \`/gsd-new-project\` to initialize
2. Follow the guided workflow

## Agent System

GSD uses specialized agents spawned via the Task tool:
- **gsd-executor** — Executes plans with atomic commits
- **gsd-planner** — Creates executable phase plans
- **gsd-verifier** — Verifies deliverables against goals
- **gsd-debugger** — Diagnoses and fixes issues
- **gsd-phase-researcher** — Investigates domains before planning

Agent definitions are stored in \`.claude/agents/\` as prompt templates.
When spawning agents, use \`subagent_type="general-purpose"\` and include
the agent prompt content in the Task prompt.
`;
      fs.writeFileSync(claudeMdPath, claudeMdContent);
      console.log(`  ${green}✓${reset} Created CLAUDE.md`);
    }
  }

  console.log(`
  ${green}Done!${reset} Run ${cyan}/gsd-help${reset} to get started.

  ${dim}Note: Commands are in ${locationLabel}/commands/gsd/
  Agents are in ${locationLabel}/agents/
  Templates/workflows are in ${locationLabel}/get-shit-done/${reset}
  `);
}

/**
 * Prompt for install location
 */
function promptLocation() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const configDir = expandTilde(explicitConfigDir);
  const globalPath = configDir || path.join(os.homedir(), ".claude");
  const globalLabel = globalPath.replace(os.homedir(), "~");

  console.log(`  ${yellow}Where would you like to install?${reset}

  ${cyan}1${reset}) Global ${dim}(${globalLabel})${reset} - available in all projects
  ${cyan}2${reset}) Local  ${dim}(./.claude)${reset} - this project only
  `);

  rl.question(`  Choice ${dim}[1]${reset}: `, (answer) => {
    rl.close();
    const choice = answer.trim() || "1";
    const isGlobal = choice !== "2";
    install(isGlobal);
  });
}

// Main
if (hasGlobal && hasLocal) {
  console.error(`  ${yellow}Cannot specify both --global and --local${reset}`);
  process.exit(1);
} else if (explicitConfigDir && hasLocal) {
  console.error(`  ${yellow}Cannot use --config-dir with --local${reset}`);
  process.exit(1);
} else if (hasGlobal) {
  install(true);
} else if (hasLocal) {
  install(false);
} else {
  promptLocation();
}
