# Contributing

Thank you for your interest in contributing to opengeometry-values.

## Requirements

- Node.js >= 24
- npm >= 10

## Setup

```bash
git clone https://github.com/opengeometry/opengeometry-values.git
cd opengeometry-values
npm install
```

## Running tests

```bash
npm test
```

Watch mode during development:

```bash
npm run test:watch
```

## Code conventions

- All source files use `.mjs` and ES Module syntax (`import`/`export`)
- No CommonJS (`require`, `module.exports`)
- No TypeScript — plain JavaScript only
- No build step — source is shipped as-is
- Only `.` is accepted as the decimal separator in numeric input

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add resolveDisplayPrecision for angle quantity
fix: correct rounding in applyInternalResolution
docs: update README quick start example
test: add coverage for formatEditValue with mm unit
```

## Pull requests

- One concern per PR
- Include tests for any new behavior
- Update `CHANGELOG.md` under `[Unreleased]`
- Keep the diff focused — no unrelated cleanup

## Reporting issues

Open an issue at [github.com/opengeometry/opengeometry-values/issues](https://github.com/opengeometry/opengeometry-values/issues) with a minimal reproduction.
