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

  ${white}for GitHub Copilot CLI${reset}

  Get Shit Done ${dim}v${pkg.version}${reset}
  A meta-prompting system for spec-driven development
  (conversational commands - no slash commands needed)

`;

// Parse args
const args = process.argv.slice(2);
const hasGlobal = args.includes("--global") || args.includes("-g");
const hasLocal = args.includes("--local") || args.includes("-l");
const hasHelp = args.includes("--help") || args.includes("-h");

console.log(banner);

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx gsd-copilot-cli [options]

  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}   Install to current directory (copilot-instructions.md)
    ${cyan}-l, --local${reset}    Same as --global (for compatibility)
    ${cyan}-h, --help${reset}     Show this help message

  ${yellow}What this does:${reset}
    Creates/updates copilot-instructions.md in the current directory
    with the GSD meta-prompting system.

  ${yellow}How to use after install:${reset}
    Run \`copilot\` to start GitHub Copilot CLI, then say:
    - "gsd new-project" to initialize
    - "gsd plan-phase 1" to plan
    - "gsd execute-phase 1" to execute
    - "gsd help" for all commands

  ${yellow}Note:${reset}
    Unlike Claude Code or OpenCode, GitHub Copilot CLI doesn't support
    custom slash commands. GSD commands are invoked conversationally.
  `);
  process.exit(0);
}

/**
 * Install copilot-instructions.md to the current directory
 */
function install() {
  const srcDir = path.join(__dirname, "..");
  const srcFile = path.join(srcDir, "copilot-instructions.md");
  const destFile = path.join(process.cwd(), "copilot-instructions.md");

  // Check if source file exists
  if (!fs.existsSync(srcFile)) {
    console.error(`  ${yellow}Error: copilot-instructions.md not found in package${reset}`);
    process.exit(1);
  }

  // Check if destination already exists
  if (fs.existsSync(destFile)) {
    console.log(`  ${yellow}copilot-instructions.md already exists.${reset}`);
    
    // Read both files to check if they're different
    const srcContent = fs.readFileSync(srcFile, "utf8");
    const destContent = fs.readFileSync(destFile, "utf8");
    
    if (srcContent === destContent) {
      console.log(`  ${green}✓${reset} Already up to date (v${pkg.version})`);
      showUsage();
      return;
    }
    
    // Files are different - check if dest has GSD header
    if (destContent.includes("# GSD — Get Shit Done")) {
      console.log(`  Updating to v${pkg.version}...`);
      fs.writeFileSync(destFile, srcContent);
      console.log(`  ${green}✓${reset} Updated copilot-instructions.md`);
    } else {
      // Destination has custom content - append GSD
      console.log(`  Appending GSD to existing instructions...`);
      const combined = destContent + "\n\n---\n\n" + srcContent;
      fs.writeFileSync(destFile, combined);
      console.log(`  ${green}✓${reset} Appended GSD to copilot-instructions.md`);
    }
  } else {
    // Create new file
    fs.copyFileSync(srcFile, destFile);
    console.log(`  ${green}✓${reset} Created copilot-instructions.md`);
  }

  // Create VERSION file in .planning if it exists
  const planningDir = path.join(process.cwd(), ".planning");
  if (fs.existsSync(planningDir)) {
    fs.writeFileSync(path.join(planningDir, "gsd-version.txt"), `v${pkg.version}`);
    console.log(`  ${green}✓${reset} Updated GSD version in .planning/`);
  }

  showUsage();
}

function showUsage() {
  console.log(`
  ${green}Done!${reset} GSD is now available in this project.

  ${yellow}How to use:${reset}

  1. Start Copilot CLI:
     ${cyan}copilot${reset}

  2. Say any GSD command conversationally:
     ${dim}"gsd new-project"${reset}      Initialize a new project
     ${dim}"gsd plan-phase 1"${reset}     Plan phase 1
     ${dim}"gsd execute-phase 1"${reset}  Execute phase 1
     ${dim}"gsd progress"${reset}         Check current status
     ${dim}"gsd help"${reset}             Show all commands

  ${yellow}Note:${reset} These are conversational commands, not slash commands.
  Copilot CLI will read copilot-instructions.md and understand the GSD workflow.
  `);
}

/**
 * Prompt for confirmation
 */
function promptInstall() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const destPath = path.join(process.cwd(), "copilot-instructions.md");
  const exists = fs.existsSync(destPath);

  console.log(`  ${yellow}This will ${exists ? "update" : "create"} copilot-instructions.md${reset}`);
  console.log(`  ${dim}Location: ${destPath}${reset}\n`);

  rl.question(`  Proceed? ${dim}[Y/n]${reset}: `, (answer) => {
    rl.close();
    const choice = answer.trim().toLowerCase() || "y";
    if (choice === "y" || choice === "yes") {
      install();
    } else {
      console.log(`  ${dim}Cancelled.${reset}`);
    }
  });
}

// Main
if (hasGlobal || hasLocal) {
  install();
} else {
  promptInstall();
}
