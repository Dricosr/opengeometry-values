# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Formula input with embedded units: formulas can now include mathjs unit tokens directly (e.g. `"=4 m + 200 cm"`, `"=1 h + 30 min"`, `"=1 kN + 500 N"`). The mathjs unit arithmetic is resolved at parse time; the result is converted to the quantity's internal unit. The flag `formulaHasEmbeddedUnits` is stored on `ValueInput` and controls edit behavior.
- Unit-embedded numeric input: a string like `"4000mm"` or `"7h"` (number + recognized unit, no `=`) is now a valid input form. The inline unit wins over the parameter unit. Parsed by the new `UnitInputParser`.
- `UnitInputParser` class, `unitInputParser` singleton, and `parseUnitInput` function exported from `src/index.mjs`
- `formulaHasEmbeddedUnits` field on `ValueInput` (default `false`); `true` when the input was a formula whose expression carried mathjs unit tokens
- Edit behavior for plain formulas: when the output unit differs from the formula's original unit, `formatEdit` appends the original unit to the formula text (e.g. `"=2*3 m"`). Formulas with embedded units always return the formula as-is.
- Formula input support: numeric values can now be entered as mathjs expressions prefixed with `=` (e.g. `"=sqrt(3^2 + 4^2)"`, `"=2 * pi"`). The original formula text is preserved in `input.value`; the evaluated number enters the standard pipeline (unit conversion, internal resolution, type validation). Applies to `float` and `integer` value types across all quantities. Invalid or non-finite results throw `ValueInputError` with code `invalid_formula_expression`.
- `FormulaParser` class, `formulaParser` singleton, and `parseFormula` function exported from `src/index.mjs`
- `ERROR_CODE_INVALID_FORMULA_EXPRESSION` and `ERROR_INVALID_FORMULA_EXPRESSION_PREFIX` added to `domain-string-catalog.mjs`
- `spec/en-us/formulas.md` and `spec/pt-br/formulas.md` — full expression reference covering all input forms, arithmetic operators, math functions, trigonometric functions, constants, embedded unit formulas, edit behavior, error conditions, and known limitations
- `vitest.config.mjs` added to the project root: sets `isolate: false` and `maxWorkers: 1`, reducing test suite runtime from ~8s to ~2s
- Visual test specialists (`length`, `area`, `volume`, `angle`, `temperature`, `mass`, `force`, `pressure`, `time`) hydrated with embedded unit formula scenarios, plain formula scenarios, and unit-embedded numeric input scenarios
- Windows shell compatibility note added to `CLAUDE.md`, `.claude/agents/test.md`, `.github/agents/test.agent.md`, `.github/copilot-instructions.md`, and `memory/feedback_windows_shell.md`: Vitest 4.x fails under `cmd.exe` on Windows; always use PowerShell or bash
- Version `0.1.0-alpha.1` tag in `package.json`
- Liter (`L`) as a supported volume unit: added `LITER` to `mathjs-string-catalog.mjs`, `unit-symbols.mjs`, `VolumeQuantityProfile`, a `volume:tank-liter` output preset, a `volume:storage-tank-liter` parameter sample, and two liter visual test scenarios
- Reusable parameter samples grouped by quantity and a curated output preset mini library for common engineering views
- Public preview helpers for building interactive UIs: `createValuePreview`, `buildOutput`, `OUTPUT_PRESETS`, and `PARAMETER_SAMPLES`
- Customization sync check for mirrored Copilot, Claude, and memory guidance files
- Initial class-oriented implementation for values, catalogs, parsing, conversion, precision resolution, and formatting in `src/`
- Vitest coverage for constants, value creation, conversion, precision, formatting, and the public index
- Specialist quantity profiles for `length`, `area`, `volume`, `angle`, `temperature`, `mass`, `force`, `pressure`, and `time`, wired into normalization and precision decisions
- Visual engineering I/O tests covering raw user-facing value flows such as `90 deg`, `2000 mm`, `200 cm`, `30 in`, `12.5 kg`, `1.5 kN`, `250 kPa`, `2 h`, and temperature conversion
- Structured `tryCreateValue` validation results for UI-facing input rejection, including numeric and unit errors
- Expanded specialist visual tests with valid multi-unit scenarios and invalid input cases for engineering UIs
- Public value creation input is now structurally `{ value, unit }`, and `ValueInput` no longer stores raw text
- `Output` and typed affix models with ids, so each `ValueInput` now stores normalized internal data together with its display configuration

### Build

- Rollup build system added: `npm run build` generates three distribution formats in `dist/`
  - `dist/index.esm.js` — ES module, tree-shakeable, mathjs kept external (~85 KB)
  - `dist/index.cjs.js` — CommonJS, mathjs kept external (~88 KB)
  - `dist/index.iife.min.js` — self-contained IIFE, mathjs bundled and minified (~687 KB), for CDN and direct `<script>` use
- `package.json` exports updated: `"import"` → ESM build, `"require"` → CJS build, `"browser"` → IIFE build
- `mathjs` declared as `peerDependency` (required, `>=15.0.0`) in addition to `dependencies`
- `dist/` added to `.gitignore`; `dist/` added to `files` so built artifacts are included in the npm package
- `prepublishOnly` script runs tests then build automatically before every `npm publish`
- `.github/workflows/release.yml` — GitHub Actions workflow that runs tests, builds, and publishes to npm on every GitHub Release
- New dev dependencies: `rollup 4.60.2`, `@rollup/plugin-node-resolve 16.0.3`, `@rollup/plugin-commonjs 29.0.2`, `@rollup/plugin-terser 1.0.0`

### Fixed

- `FormulaParser`: standalone `min` unit token (e.g. `=1 h + 30 min`) conflicted with mathjs's `min()` function and caused evaluation errors — now normalized to `minute` before evaluation; `min()` function calls are unaffected
- `resolveUnitInput` in `create-value.mjs`: error messages from the unit input parser leaked into `ValueInputError`, breaking the consistent `invalid_numeric_value` contract — now always uses the internal fallback message

### Removed

- `formatForComposition` and `formatForFriendlyValue` from `ValueInput` - both delegated identically to `formatDisplay`, making them redundant aliases with no distinct behavior
- `formatComposition` and `formatFriendlyValue` from `Output` for the same reason
- `composition` and `friendly` keys from the `createValuePreview` response payload

### Changed

- Improved agent and prompt discovery text for Copilot and Claude customization files
- Package distribution is now published as `@dricosr/opengeometry-values` on the public npm registry, with the scoped package registry, publish access, and README install instructions aligned to the `alpha` release flow

## [0.1.0] - 2026-04-24

### Added

- Project scaffold: `package.json`, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`
- Spec in English and Portuguese: `spec/en-us/spec.md`, `spec/pt-br/spec.md`
- Browser and backend architecture decision: `spec/en-us/browser-and-backend.md`, `spec/pt-br/browser-and-backend.md`
- Agent instructions for Claude Code: `implement`, `test`, `naming-reviewer`, `jsdoc-documentor`
- Agent instructions for GitHub Copilot: `.github/agents/`
- Shared project instructions: `.github/copilot-instructions.md`
- Prompt files for Copilot: `review-naming`, `document-module`
- GitHub branch protection ruleset for `main`
- Issue and PR templates
