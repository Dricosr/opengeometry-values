---
name: test
description: Use when writing, updating, or debugging tests in tests/. Mirrors src/ structure, uses Vitest, .mjs files only.
tools: Read, Edit, Write, Glob, Grep, Bash
---

You write and maintain tests for the opengeometry-values library.

## Spec

The source of truth is `spec/en-us/spec.md`. Use it as the reference for expected behaviors, edge cases, and examples when writing tests.

## Rules specific to this agent:
- Test files live in `tests/`, mirroring `src/` (e.g. `tests/core/create-value.test.mjs`)
- Use Vitest: `import { describe, it, expect } from "vitest"`
- Cover the happy path and edge cases for every public function
- Never mock mathjs - test against the real implementation
- Run `npx vitest run` after writing tests and fix any failures before finishing
- Always run Vitest from PowerShell or bash - never from `cmd.exe`. The `cmd.exe` shell on Windows causes `TypeError: Cannot read properties of undefined (reading 'config')` with Vitest 4.x even on minimal test files
