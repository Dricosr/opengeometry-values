import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const serviceDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(serviceDirectory, "../..");

const resolveCommand = () => process.platform === "win32" ? "npx.cmd" : "npx";

export const runVisualTests = () => new Promise((resolve) => {
  const child = spawn(resolveCommand(), ["vitest", "run", "tests/visual"], {
    cwd: repositoryRoot,
    stdio: ["ignore", "pipe", "pipe"]
  });

  let stdout = "";
  let stderr = "";

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });

  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  child.on("error", (error) => {
    resolve({
      ok: false,
      exitCode: 1,
      stdout,
      stderr: error.message
    });
  });

  child.on("close", (exitCode) => {
    resolve({
      ok: exitCode === 0,
      exitCode,
      stdout,
      stderr
    });
  });
});