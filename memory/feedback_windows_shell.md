---
name: Windows shell compatibility for Vitest
description: Vitest 4.x fails under cmd.exe on Windows - always use PowerShell or bash
type: feedback
---

Always run Vitest from PowerShell or bash, never from `cmd.exe`.

**Why:** `cmd.exe` on Windows has known incompatibilities with Vite/Vitest 4.x that cause `TypeError: Cannot read properties of undefined (reading 'config')` even on a minimal two-line test file. The error looks like a configuration or code problem but is caused entirely by the shell.

**How to apply:** Use `npx vitest run` or `npm test` from PowerShell. When spawning a subprocess to run tests (e.g. from an agent), ensure the shell is PowerShell (`pwsh` or `powershell`) or bash, not `cmd.exe`.
