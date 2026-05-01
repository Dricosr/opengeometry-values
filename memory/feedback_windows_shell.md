---
name: Windows shell compatibility for Vitest
description: Vitest 4.x fails under cmd.exe on Windows - always use PowerShell or bash
type: feedback
---

**Vitest 4.x does NOT work under cmd.exe on Windows.**  
Always use PowerShell or bash. This is not optional.

**Symptom:** `TypeError: Cannot read properties of undefined (reading 'config')` on every test file, including a minimal `describe("x", () => { it("works", () => expect(1).toBe(1)) })`. Zero tests execute. The error appears on the `describe` call - but the real cause is the shell, not the code.

**Root cause:** Vite/Vitest 4.x internals depend on shell features that `cmd.exe` doesn't provide. Even basic `import` resolution fails silently.

**Rule:** Never use `cmd.exe` to run `npm test`, `vitest`, or any Vite-based tool in this project. Always use PowerShell (`powershell`, `pwsh`) or a Unix-compatible shell (Git Bash, WSL bash).

**How to enforce:**  
- In VS Code, set PowerShell as the default terminal profile (Ctrl+Shift+P → "Terminal: Select Default Profile" → "Windows PowerShell").  
- When programmatically spawning test commands (CI, scripts, agents), explicitly pass `shell: "powershell.exe"` or `shell: "pwsh"`.  
- When using Cline/Claude, all `execute_command` calls that invoke vitest must use a `powershell -Command "..."` wrapper.
