# Contributing

Thank you for your interest in contributing to opengeometry-values. Contributions of all kinds are welcome: bug reports, documentation improvements, new quantity profiles, test coverage, and code changes.

Please read and follow the [Code of Conduct](./CODE_OF_CONDUCT.md) in all interactions.

## Ways to contribute

- **Report a bug** - open an issue with a minimal reproduction
- **Suggest a feature** - open an issue describing the use case and expected behavior
- **Improve documentation** - fix typos, clarify examples, or expand the README
- **Write tests** - increase coverage for existing behavior
- **Implement a fix or feature** - pick an open issue or propose your own

## Requirements

- Node.js >= 24
- npm >= 10

## Setup

```bash
git clone https://github.com/Dricosr/opengeometry-values.git
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

Validate Copilot and Claude customization sync:

```bash
npm run check:customizations
```

## Code conventions

- All source files use `.mjs` and ES Module syntax (`import`/`export`)
- No CommonJS (`require`, `module.exports`)
- No TypeScript - plain JavaScript only
- No build step - source is shipped as-is
- Only `.` is accepted as the decimal separator in numeric input
- Numeric value creation uses separate `value` and `unit` fields - never concatenate them into a single text payload like `"90 mm"`

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
- Run `npm run check:customizations` when editing `.github/`, `.claude/`, or `memory/`
- Run `npm run test:visual` after changing engineering samples or output presets
- Keep the diff focused - no unrelated cleanup

## Reporting issues

Open an issue at [github.com/Dricosr/opengeometry-values/issues](https://github.com/Dricosr/opengeometry-values/issues) with a minimal reproduction.
