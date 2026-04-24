import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDirectory = process.cwd();

const SHARED_RULE_LINE = "@.github/copilot-instructions.md";
const SHARED_MEMORY_LINE = "@memory/MEMORY.md";

const AGENT_MIRRORS = Object.freeze([
  Object.freeze({
    name: "implement",
    copilotPath: ".github/agents/implement.agent.md",
    claudePath: ".claude/agents/implement.md"
  }),
  Object.freeze({
    name: "test",
    copilotPath: ".github/agents/test.agent.md",
    claudePath: ".claude/agents/test.md"
  }),
  Object.freeze({
    name: "naming-reviewer",
    copilotPath: ".github/agents/naming-reviewer.agent.md",
    claudePath: ".claude/agents/naming-reviewer.md"
  }),
  Object.freeze({
    name: "jsdoc-documentor",
    copilotPath: ".github/agents/jsdoc-documentor.agent.md",
    claudePath: ".claude/agents/jsdoc-documentor.md"
  })
]);

const PROMPT_MIRRORS = Object.freeze([
  Object.freeze({
    name: "document-module",
    copilotPath: ".github/prompts/document-module.prompt.md",
    claudePath: ".claude/commands/document-module.md",
    requiredText: "jsdoc-documentor"
  }),
  Object.freeze({
    name: "review-naming",
    copilotPath: ".github/prompts/review-naming.prompt.md",
    claudePath: ".claude/commands/review-naming.md",
    requiredText: "naming-reviewer"
  })
]);

const readText = (relativePath) => {
  const absolutePath = path.join(rootDirectory, relativePath);
  return readFileSync(absolutePath, "utf8");
};

const listMarkdownBaseNames = (relativeDirectory) => {
  const absoluteDirectory = path.join(rootDirectory, relativeDirectory);

  return readdirSync(absoluteDirectory)
    .filter((entryName) => statSync(path.join(absoluteDirectory, entryName)).isFile())
    .filter((entryName) => entryName.endsWith(".md"))
    .map((entryName) => entryName.replace(/\.prompt\.md$/u, "").replace(/\.agent\.md$/u, "").replace(/\.md$/u, ""))
    .sort();
};

const parseFrontmatter = (text, relativePath) => {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/u);

  if (!match) {
    throw new Error(`Missing YAML frontmatter in ${relativePath}`);
  }

  const values = new Map();

  for (const rawLine of match[1].split(/\r?\n/u)) {
    const trimmedLine = rawLine.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    let value = trimmedLine.slice(separatorIndex + 1).trim();

    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    values.set(key, value);
  }

  return values;
};

const failures = [];

const expect = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

const expectIncludes = (text, expectedText, relativePath) => {
  expect(text.includes(expectedText), `${relativePath} must include: ${expectedText}`);
};

const compareFrontmatterField = (mirror, fieldName) => {
  const copilotText = readText(mirror.copilotPath);
  const claudeText = readText(mirror.claudePath);
  const copilotFrontmatter = parseFrontmatter(copilotText, mirror.copilotPath);
  const claudeFrontmatter = parseFrontmatter(claudeText, mirror.claudePath);
  const copilotValue = copilotFrontmatter.get(fieldName);
  const claudeValue = claudeFrontmatter.get(fieldName);

  expect(copilotValue === claudeValue, `${mirror.name}: ${fieldName} differs between ${mirror.copilotPath} and ${mirror.claudePath}`);
};

const expectedAgentNames = AGENT_MIRRORS.map((mirror) => mirror.name).sort();
const copilotAgentNames = listMarkdownBaseNames(".github/agents");
const claudeAgentNames = listMarkdownBaseNames(".claude/agents").filter((name) => name !== "index");
const expectedPromptNames = PROMPT_MIRRORS.map((mirror) => mirror.name).sort();
const copilotPromptNames = listMarkdownBaseNames(".github/prompts");
const claudeCommandNames = listMarkdownBaseNames(".claude/commands");

expect(JSON.stringify(copilotAgentNames) === JSON.stringify(expectedAgentNames), ".github/agents contents do not match the expected mirrored agent set");
expect(JSON.stringify(claudeAgentNames) === JSON.stringify(expectedAgentNames), ".claude/agents contents do not match the expected mirrored agent set");
expect(JSON.stringify(copilotPromptNames) === JSON.stringify(expectedPromptNames), ".github/prompts contents do not match the expected mirrored prompt set");
expect(JSON.stringify(claudeCommandNames) === JSON.stringify(expectedPromptNames), ".claude/commands contents do not match the expected mirrored command set");

for (const mirror of AGENT_MIRRORS) {
  compareFrontmatterField(mirror, "name");
  compareFrontmatterField(mirror, "description");
}

for (const mirror of PROMPT_MIRRORS) {
  const copilotText = readText(mirror.copilotPath);
  const claudeText = readText(mirror.claudePath);
  const copilotFrontmatter = parseFrontmatter(copilotText, mirror.copilotPath);

  expect(copilotFrontmatter.get("agent") === mirror.requiredText, `${mirror.copilotPath} must target the ${mirror.requiredText} agent`);
  expectIncludes(claudeText, mirror.requiredText, mirror.claudePath);
}

const claudeRootText = readText("CLAUDE.md");
const copilotInstructionsText = readText(".github/copilot-instructions.md");
const memoryIndexText = readText("memory/MEMORY.md");

expectIncludes(claudeRootText, SHARED_RULE_LINE, "CLAUDE.md");
expectIncludes(claudeRootText, SHARED_MEMORY_LINE, "CLAUDE.md");
expectIncludes(copilotInstructionsText, "Keep `.github/agents/*.agent.md` and `.claude/agents/*.md` with matching names semantically aligned", ".github/copilot-instructions.md");
expectIncludes(copilotInstructionsText, "Keep `.github/prompts/*.prompt.md` mirrored in `.claude/commands/*.md` when the workflow should be available in both Copilot and Claude", ".github/copilot-instructions.md");
expectIncludes(memoryIndexText, "This folder mirrors shared repository guidance.", "memory/MEMORY.md");

if (failures.length > 0) {
  console.error("Customization sync check failed:\n");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exitCode = 1;
} else {
  console.log("Customization sync check passed.");
}