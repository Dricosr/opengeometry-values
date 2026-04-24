# Project instructions

## Language

- All code, comments, variable names, and documentation must be in **English (en-US)**
- Commit messages, PR descriptions, issue templates, and changelog entries in English

## File conventions

- Always use `.mjs` extension for JavaScript source files
- Always use ES6+ syntax: `import`/`export`, arrow functions, `const`/`let`, optional chaining, etc.
- No CommonJS (`require`, `module.exports`)
- No TypeScript — plain JavaScript only
- No build step — source is shipped as-is
- Always import dependencies by their package name (bare specifier) — never by relative path into `node_modules/`

## Dependencies

- Pin **exact versions** in `package.json` — no `^` or `~` prefixes
- Check the latest published version before adding or updating a dependency
- Node.js minimum version must track the current stable release (currently 24)

## Consistency rule

- When editing constants, core functions, or any public API, verify that `README.md`, `CONTRIBUTING.md`, and `CHANGELOG.md` are still aligned with the changes
- If a function is added, removed, or renamed, update all affected documentation in the same pass

## Decimal separator

- Only `.` is accepted as the decimal separator in numeric input — never `,`
- Thousands separators are not supported

## Code design

- Each file must have a single, clearly defined responsibility — if a file needs a conjunction ("and", "or") to describe what it does, it should be split
- Keep files small and focused; prefer many small files over one large file that does several things
- Reuse frozen constant objects (`Object.freeze`) instead of recreating equivalent structures at call time
- Do not duplicate logic across files — extract shared behavior into its own module in `src/core/` or `src/constants/`
- Prefer pure functions with no side effects; avoid hidden state
- Do not add features, abstractions, or generalization beyond what the current task requires

## Testing

- Tests live in `tests/`, mirroring the `src/` structure
- Test files use `.mjs` and are named `<module-name>.test.mjs`
- Use Vitest as the test runner
- Every public function must have tests covering the happy path and relevant edge cases

## Customization sync

- Keep `.github/agents/*.agent.md` and `.claude/agents/*.md` with matching names semantically aligned
- Keep `.github/prompts/*.prompt.md` mirrored in `.claude/commands/*.md` when the workflow should be available in both Copilot and Claude
- Keep `memory/MEMORY.md` and the files it indexes aligned with these shared project rules when they change
