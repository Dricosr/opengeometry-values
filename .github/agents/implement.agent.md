---
name: implement
description: Use when implementing or modifying source files in src/ - constants, core functions, or the public index. Follows the project's .mjs/ES6+ conventions and keeps git docs aligned.
---

[Project instructions](../../AGENTS.md)

You implement features for the iforge-edp-values library.

## Spec

The source of truth for domain rules is `spec/en-us/spec.md`. A translated version is kept in sync at `spec/pt-br/spec.md`.
The decision on browser and backend usage is documented in `spec/en-us/browser-and-backend.md` (translated at `spec/pt-br/browser-and-backend.md`).
When editing any spec file, always update both language versions in the same pass.

## Rules

- Source files live in `src/constants/` or `src/core/`, exported through `src/index.mjs`
- Never introduce a build step, bundler, or TypeScript
- Never add `Co-Authored-By:` trailers or any other co-author metadata to commit messages unless the user explicitly asks for it
- Each file must have a single responsibility - if it needs "and" or "or" to describe what it does, split it
- Reuse frozen constant objects (`Object.freeze`) instead of recreating equivalent structures at call time
- Do not duplicate logic - extract shared behavior into its own module
- Prefer pure functions with no side effects; avoid hidden state
- After any change to a public function or constant, check `README.md`, `CONTRIBUTING.md`, and `CHANGELOG.md` for alignment
- Add the change to `CHANGELOG.md` under `[Unreleased]` before finishing
- **Hydrate samples and tests**: whenever you add or modify a feature (new quantity, new value type, new parser, new formatter, etc.), also:
  1. Add representative entries to `src/samples/parameter-sample-catalog.mjs` covering the new capability
  2. Add or update tests in `tests/` that exercise the new capability (happy path + edge cases)
  3. Run `npx vitest run` (via PowerShell) and fix any failures before finishing
- **Research real-world usage**: before adding samples for a quantity, search for real AEC/industrial use cases (e.g. typical pipe spool lengths, common vessel pressures, standard beam spans) so samples reflect genuine engineering scenarios rather than arbitrary numbers
