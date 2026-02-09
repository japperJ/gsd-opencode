#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { spawnSync } = require("child_process");

// Colors
const cyan = "\x1b[36m";
const green = "\x1b[32m";
const yellow = "\x1b[33m";
const dim = "\x1b[2m";
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

  ${white}for GitHub Copilot CLI${reset}

  Get Shit Done ${dim}v${pkg.version}${reset}
  Native integration with Copilot CLI features
  (/plan, /review, /delegate + GSD workflow)

`;

// Parse args
const args = process.argv.slice(2);
const hasMinimal = args.includes("--minimal") || args.includes("-m");
const hasPro = args.includes("--pro") || args.includes("-p");
const hasFull = args.includes("--full") || args.includes("-f");
const hasLegacy = args.includes("--legacy");
const hasHelp = args.includes("--help") || args.includes("-h");
const hasYes = args.includes("-y") || args.includes("--yes");

console.log(banner);

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx gsd-copilot-cli [options]

  ${yellow}Options:${reset}
    ${cyan}-m, --minimal${reset}  Install only AGENTS.md (recommended)
    ${cyan}-p, --pro${reset}      Install AGENTS.md + advanced instruction files
    ${cyan}-f, --full${reset}     Install all files (Pro + hooks)
    ${cyan}--legacy${reset}       Install old copilot-instructions.md (for older CLI versions)
    ${cyan}-y, --yes${reset}      Skip confirmation prompt
    ${cyan}-h, --help${reset}     Show this help message

  ${yellow}Files created:${reset}

    ${cyan}Minimal (default):${reset}
    └── AGENTS.md                              Primary GSD instructions

    ${cyan}Pro:${reset}
    ├── AGENTS.md                              Primary GSD instructions
    └── .github/instructions/
        ├── gsd-planning.instructions.md       Path-specific for .planning/**
        ├── gsd-verification.instructions.md   3-level artifact verification
        ├── gsd-execution.instructions.md      Deviation rules + auto-test
        └── gsd-debugging.instructions.md      Scientific debugging

    ${cyan}Full:${reset}
    ├── (everything in Pro)
    └── .github/hooks/
        └── gsd-hooks.json                     Workflow automation hooks

  ${yellow}Native CLI integration:${reset}
    GSD now leverages Copilot CLI's built-in features:
    - ${cyan}/plan${reset}      Used by 'gsd plan-phase' for structured planning
    - ${cyan}/review${reset}    Used by 'gsd verify-work' for verification
    - ${cyan}/delegate${reset}  Used by 'gsd delegate-task' for async work

  ${yellow}How to use after install:${reset}
    1. Start Copilot CLI: ${cyan}copilot${reset}
    2. Say GSD commands conversationally:
       - "gsd new-project" — Initialize project
       - "gsd plan-phase 1" — Plan using native /plan
       - "gsd execute-phase 1" — Execute with commits
       - "gsd help" — Show all commands
  `);
  process.exit(0);
}

/**
 * Ensure directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Copy file with existence check
 */
function copyFile(src, dest, description) {
  const destExists = fs.existsSync(dest);
  
  if (destExists) {
    const srcContent = fs.readFileSync(src, "utf8");
    const destContent = fs.readFileSync(dest, "utf8");
    
    if (srcContent === destContent) {
      console.log(`  ${dim}○${reset} ${description} (unchanged)`);
      return false;
    }
    
    // Check if it's a GSD file we can update
    if (destContent.includes("GSD") || destContent.includes("Get Shit Done")) {
      fs.writeFileSync(dest, srcContent);
      console.log(`  ${green}✓${reset} Updated ${description}`);
      return true;
    } else {
      // Append GSD to existing file
      const combined = destContent + "\n\n---\n\n" + srcContent;
      fs.writeFileSync(dest, combined);
      console.log(`  ${green}✓${reset} Appended GSD to ${description}`);
      return true;
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`  ${green}✓${reset} Created ${description}`);
    return true;
  }
}

/**
 * Install minimal (AGENTS.md only)
 */
function installMinimal() {
  const templatesDir = path.join(__dirname, "..", "templates");
  const destDir = process.cwd();
  
  console.log(`  ${yellow}Installing AGENTS.md...${reset}\n`);
  
  copyFile(
    path.join(templatesDir, "AGENTS.md"),
    path.join(destDir, "AGENTS.md"),
    "AGENTS.md"
  );
  
  return true;
}

/**
 * Install pro (AGENTS.md + instruction files, no hooks)
 */
function installPro() {
  const templatesDir = path.join(__dirname, "..", "templates");
  const destDir = process.cwd();
  const instrDir = path.join(".github", "instructions");

  console.log(`  ${yellow}Installing GSD Pro files...${reset}\n`);

  // AGENTS.md
  copyFile(
    path.join(templatesDir, "AGENTS.md"),
    path.join(destDir, "AGENTS.md"),
    "AGENTS.md"
  );

  // .github/instructions/gsd-planning.instructions.md
  copyFile(
    path.join(templatesDir, instrDir, "gsd-planning.instructions.md"),
    path.join(destDir, instrDir, "gsd-planning.instructions.md"),
    ".github/instructions/gsd-planning.instructions.md"
  );

  // .github/instructions/gsd-verification.instructions.md
  copyFile(
    path.join(templatesDir, instrDir, "gsd-verification.instructions.md"),
    path.join(destDir, instrDir, "gsd-verification.instructions.md"),
    ".github/instructions/gsd-verification.instructions.md"
  );

  // .github/instructions/gsd-execution.instructions.md
  copyFile(
    path.join(templatesDir, instrDir, "gsd-execution.instructions.md"),
    path.join(destDir, instrDir, "gsd-execution.instructions.md"),
    ".github/instructions/gsd-execution.instructions.md"
  );

  // .github/instructions/gsd-debugging.instructions.md
  copyFile(
    path.join(templatesDir, instrDir, "gsd-debugging.instructions.md"),
    path.join(destDir, instrDir, "gsd-debugging.instructions.md"),
    ".github/instructions/gsd-debugging.instructions.md"
  );

  return true;
}

/**
 * Install full (all files)
 */
function installFull() {
  const templatesDir = path.join(__dirname, "..", "templates");
  const destDir = process.cwd();

  console.log(`  ${yellow}Installing GSD files...${reset}\n`);

  // Install all Pro files first
  installPro();

  // .github/hooks/gsd-hooks.json
  copyFile(
    path.join(templatesDir, ".github", "hooks", "gsd-hooks.json"),
    path.join(destDir, ".github", "hooks", "gsd-hooks.json"),
    ".github/hooks/gsd-hooks.json"
  );

  return true;
}

/**
 * Install legacy (copilot-instructions.md)
 */
function installLegacy() {
  const srcDir = path.join(__dirname, "..");
  const srcFile = path.join(srcDir, "copilot-instructions.md");
  const destFile = path.join(process.cwd(), "copilot-instructions.md");
  
  console.log(`  ${yellow}Installing legacy copilot-instructions.md...${reset}\n`);
  
  if (!fs.existsSync(srcFile)) {
    console.error(`  ${yellow}Error: copilot-instructions.md not found in package${reset}`);
    process.exit(1);
  }
  
  copyFile(srcFile, destFile, "copilot-instructions.md");
  return true;
}

/**
 * Show usage instructions
 */
function showUsage(mode) {
  const files = mode === "full"
    ? "AGENTS.md + .github/ files (instructions + hooks)"
    : mode === "pro"
    ? "AGENTS.md + .github/instructions/ files"
    : mode === "legacy"
    ? "copilot-instructions.md"
    : "AGENTS.md";
    
  console.log(`
  ${green}Done!${reset} GSD is now available in this project.

  ${yellow}Files installed:${reset} ${files}

  ${yellow}How to use:${reset}

  Say GSD commands conversationally:
     ${dim}"gsd new-project"${reset}      Initialize a new project
     ${dim}"gsd plan-phase 1"${reset}     Plan using native /plan
     ${dim}"gsd execute-phase 1"${reset}  Execute phase 1
     ${dim}"gsd verify-work 1"${reset}    Verify using native /review
     ${dim}"gsd constitution"${reset}     Set project principles
     ${dim}"gsd debug [issue]"${reset}    Debug with scientific method
     ${dim}"gsd pause / resume"${reset}   Save/restore work state
     ${dim}"gsd progress"${reset}         Check current status
     ${dim}"gsd help"${reset}             Show all commands

  ${yellow}Native integration:${reset}
  GSD leverages Copilot CLI's built-in features:
  - /plan, /review, /delegate work with GSD
  - Shift+Tab toggles plan mode
  - /context shows token usage

  ${yellow}Learn more:${reset}
  https://docs.github.com/en/copilot/how-tos/copilot-cli/cli-best-practices
  `);
}

/**
 * Launch Copilot CLI interactively
 * Uses spawnSync so copilot gets full exclusive terminal ownership
 */
function launchCopilot() {
  console.log(`  ${yellow}Starting Copilot CLI...${reset}\n`);
  const result = spawnSync("copilot", [], {
    stdio: "inherit",
    shell: true,
    cwd: process.cwd(),
    env: process.env,
  });
  if (result.error) {
    console.error(`  ${yellow}Could not start Copilot CLI:${reset} ${result.error.message}`);
    console.log(`  Run ${cyan}copilot${reset} manually to get started.\n`);
  }
  process.exit(result.status || 0);
}

/**
 * Main install function
 */
function install() {
  let mode = "minimal";
  
  if (hasFull) {
    mode = "full";
    installFull();
  } else if (hasPro) {
    mode = "pro";
    installPro();
  } else if (hasLegacy) {
    mode = "legacy";
    installLegacy();
  } else {
    installMinimal();
  }
  
  // Update version in .planning if it exists
  const planningDir = path.join(process.cwd(), ".planning");
  if (fs.existsSync(planningDir)) {
    fs.writeFileSync(path.join(planningDir, "gsd-version.txt"), `v${pkg.version}`);
    console.log(`  ${green}✓${reset} Updated GSD version in .planning/`);
  }
  
  showUsage(mode);
  launchCopilot();
}

/**
 * Prompt for install mode
 */
function promptInstall() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const agentsExists = fs.existsSync(path.join(process.cwd(), "AGENTS.md"));
  
  console.log(`  ${yellow}GSD Installation Options:${reset}

  ${cyan}1.${reset} Minimal (recommended) — AGENTS.md only
  ${cyan}2.${reset} Pro — AGENTS.md + advanced instruction files
  ${cyan}3.${reset} Full — Pro + hooks (experimental)
  ${cyan}4.${reset} Legacy — copilot-instructions.md (for older CLI versions)
  `);

  rl.question(`  Choice ${dim}[1/2/3/4]${reset}: `, (answer) => {
    rl.close();
    const choice = answer.trim() || "1";

    if (choice === "1") {
      installMinimal();
      showUsage("minimal");
      launchCopilot();
    } else if (choice === "2") {
      installPro();
      showUsage("pro");
      launchCopilot();
    } else if (choice === "3") {
      installFull();
      showUsage("full");
      launchCopilot();
    } else if (choice === "4") {
      installLegacy();
      showUsage("legacy");
      launchCopilot();
    } else {
      console.log(`  ${dim}Invalid choice. Cancelled.${reset}`);
    }
  });
}

// Main
if (hasMinimal || hasPro || hasFull || hasLegacy || hasYes) {
  install();
} else {
  promptInstall();
}
