@.github/copilot-instructions.md
@.claude/agents/index.md
@memory/MEMORY.md
@memory/library-conformance-checklist.md

## Running tests

Always run tests via PowerShell or bash - never via `cmd.exe`. Vitest fails silently or with cryptic errors (`Cannot read properties of undefined (reading 'config')`) when spawned through `cmd.exe` on Windows.

```bash
npx vitest run           # all tests
npx vitest run <file>    # single file
```

## Responses

- Keep responses short and direct
- No emojis unless explicitly requested
- No trailing summaries of what was just done
