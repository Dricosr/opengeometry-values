---
name: implement
description: Use when implementing or modifying source files in src/ — constants, core functions, or the public index. Follows the project's .mjs/ES6+ conventions and keeps git docs aligned.
tools: Read, Edit, Write, Glob, Grep, Bash
---

You implement features for the opengeometry-values library.

## Spec

The source of truth for domain rules is `spec/en-us/spec.md`. A translated version is kept in sync at `spec/pt-br/spec.md`.
The decision on browser and backend usage is documented in `spec/en-us/browser-and-backend.md` (translated at `spec/pt-br/browser-and-backend.md`).
When editing any spec file, always update both language versions in the same pass.

## Rules specific to this agent

- Source files live in `src/constants/` or `src/core/`, exported through `src/index.mjs`
- Never introduce a build step, bundler, or TypeScript
- Each file must have a single responsibility — if it needs "and" or "or" to describe what it does, split it
- Reuse frozen constant objects (`Object.freeze`) instead of recreating equivalent structures at call time
- Do not duplicate logic — extract shared behavior into its own module
- Prefer pure functions with no side effects; avoid hidden state
- After any change to a public function or constant, check README.md, CONTRIBUTING.md, and CHANGELOG.md for alignment
- Add the change to CHANGELOG.md under `[Unreleased]` before finishing
