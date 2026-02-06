#!/usr/bin/env node
// Bulk text replacement script for converting gsd-opencode → gsd-copilot-cli
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");

const replacements = [
  // Order matters - more specific patterns first
  ["@~/.config/opencode/", "@~/.claude/"],
  ["~/.config/opencode/", "~/.claude/"],
  ["./.opencode/", "./.claude/"],
  ["@gsd-opencode/", "@~/.claude/"],
  ["opencode/glm-4.7-free", "opus"],
  ["opencode/minimax-m2.1-free", "sonnet"],
  ["opencode/grok-code", "haiku"],
  ["opencode.json", "copilot-gsd.json"],
  ["npx gsd-opencode", "npx gsd-copilot-cli"],
  // Replace OpenCode in prose text
  ["OpenCode", "Copilot CLI"],
  // OpenCode-specific commands and URLs
  ["opencode models", "# Available models: opus, sonnet, haiku"],
  ['"$schema": "https://opencode.ai/config.json"', '"$schema": "copilot-gsd-config"'],
  ['prefixed with "opencode/"', 'available as'],
  ["To see only one provider's models: opencode models <provider>", "Available models: opus (strongest), sonnet (balanced), haiku (fastest)"],
  // Remaining specific references
  ["`opencode/claude-sonnet-4`", "`sonnet`, `opus`, `haiku`"],
  ["configure opencode agent models", "configure GSD agent model profiles"],
  ["npm view gsd-opencode", "npm view gsd-copilot-cli"],
  ["github.com/rokicool/gsd-opencode/blob/main/CHANGELOG.md", "CHANGELOG.md"],
  ["https://raw.githubusercontent.com/rokicool/gsd-opencode/main/CHANGELOG.md", "CHANGELOG.md"],
  // Co-Authored-By header
  ["Co-Authored-By: OpenCode Opus 4.5", "Co-Authored-By: Claude <noreply@anthropic.com>"],
];

// Regex replacements
const regexReplacements = [
  [/subagent_type="gsd-[^"]+"/g, 'subagent_type="general-purpose"'],
];

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalChanged = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      totalChanged += processDir(fullPath);
    } else if (entry.name.endsWith(".md")) {
      let content = fs.readFileSync(fullPath, "utf8");
      const original = content;

      // Apply string replacements
      for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
      }

      // Apply regex replacements
      for (const [regex, replace] of regexReplacements) {
        content = content.replace(regex, replace);
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log("Updated:", path.relative(rootDir, fullPath));
        totalChanged++;
      }
    }
  }

  return totalChanged;
}

// Process all relevant directories
const dirs = ["agents", "command", "get-shit-done"];
let total = 0;

for (const dir of dirs) {
  const dirPath = path.join(rootDir, dir);
  if (fs.existsSync(dirPath)) {
    total += processDir(dirPath);
  }
}

console.log(`\nDone. Updated ${total} files.`);
