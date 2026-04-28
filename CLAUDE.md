@.github/copilot-instructions.md
@.claude/agents/index.md
@memory/MEMORY.md
@memory/library-conformance-checklist.md

## Running tests

**🚨 CRITICAL: Vitest 4.x requires PowerShell on Windows.**  
Never use `cmd.exe` — it causes a silent `TypeError: Cannot read properties of undefined (reading 'config')` that looks like a code bug but is purely a shell incompatibility.

```powershell
npm run test                # all 27 test files, 463 tests
npm run test:visual         # visual tests only
npm run test:coverage       # with coverage
npx vitest run <file>       # single file
```

## Responses

- Keep responses short and direct
- No emojis unless explicitly requested
- No trailing summaries of what was just done
