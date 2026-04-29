# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `FractionalInchOutput` model: specialized output for fractional inch display following ANSI/ASME Y14.5 standards, with configurable suffix modes (`SYMBOL`, `CODE`, `NONE`, `CUSTOM`) and separator types (`SPACE`, `HYPHEN`) via dedicated catalogs
- `FractionalInchFormatter`: converts decimal inch values to fractional inch strings using power-of-2 denominators (2, 4, 8, 16, 32, 64, 128) with automatic fraction reduction
- `FractionalSeparatorCatalog` and `FractionalInchDenominatorCatalog` in `fractional-inch-catalog.mjs`: centralized catalogs for separator types (`space`, `hyphen`) and denominator precision levels (`construction`, `precision`, `machining`, `fine`)
- `SEPARATORS` and `FRACTION_DENOMINATORS` exports from `fractional-inch-catalog.mjs` for use across the library
- `FractionalInchDefaultCatalog` with sensible defaults (`maxDenominator: 64`, `separator: "space"`, `suffixMode: "symbol"`, `unitCode: "in"`)
- Diameter presets (`length:diameter-mm`, `length:diameter-cm`, `length:diameter-in`, `length:diameter-ft`) with `⌀ ` prefix in `length-presets.mjs`
- Diameter parameter samples (`length:diameter-mm`, `length:diameter-cm`, `length:diameter-in`, `length:diameter-ft`) in `length-samples.mjs`
- Temperature, time, and volume parameter samples with full unit coverage
- Sample `samples/length/input-mm-to-output-fractional-in.mjs`: demonstrates mm input converted to fractional inches with all suffix modes and separator types

### Changed

- Output preset catalog split into per-quantity files (`src/presets/length-presets.mjs`, `area-presets.mjs`, `volume-presets.mjs`, `angle-presets.mjs`, `temperature-presets.mjs`, `mass-presets.mjs`, `force-presets.mjs`, `pressure-presets.mjs`, `time-presets.mjs`, `ratio-presets.mjs`). A shared `src/presets/create-preset.mjs` helper is extracted so each file reuses the same freeze pattern. Public exports unchanged (`OUTPUT_PRESETS`, `outputPresetCatalog`, `OutputPresetCatalog`).

- Parameter sample catalog split into per-quantity files (`src/samples/length-samples.mjs`, `area-samples.mjs`, `volume-samples.mjs`, `angle-samples.mjs`, `temperature-samples.mjs`, `mass-samples.mjs`, `force-samples.mjs`, `pressure-samples.mjs`, `time-samples.mjs`, `ratio-samples.mjs`). A shared `src/samples/create-sample.mjs` helper is extracted so each file reuses the same freeze pattern. Coverage expanded to include all supported units and both value types (`float` and `integer`) per quantity, plus the three formula input forms (`formula-embedded-units`, `formula-plain`, `inline-unit`) in every applicable quantity. Public exports unchanged (`PARAMETER_SAMPLES`, `parameterSampleCatalog`, `ParameterSampleCatalog`).

- **Breaking:** `mathjs-string-catalog.mjs` renamed to `unit-token-catalog.mjs`. All exported symbols replaced with no backward-compat aliases: `MATHJS_STRINGS` → `UNIT_TOKENS`, `MathJsStringCatalog` → `UnitTokenCatalog`, `mathJsStringCatalog` → `unitTokenCatalog`. The internal constant `MATHJS_STRING_ENTRIES` is now `UNIT_TOKEN_ENTRIES`.
- `domain-string-catalog.mjs` removed; `domain-catalog.mjs` is now the single source of truth. All internal imports migrated from `DOMAIN_STRINGS` to `DOMAIN`. The deprecated symbols `DOMAIN_STRINGS`, `domainStringCatalog`, and `DomainStringCatalog` are re-exported as aliases from `domain-catalog.mjs` and remain available in the public API for backward compatibility.
- `FractionalInchFormatter` and `FractionalInchOutput` now import `SEPARATORS` from `fractional-inch-catalog.mjs` instead of using raw string literals for separator values
- `suffix-mode-catalog.mjs` removed; `output-suffix-modes.mjs` is now the single source of truth for suffix mode constants
- `src/index.mjs` exports updated: removed `suffixModeCatalog` and `SuffixModeCatalog` references, added `FractionalInchOutput` and `FractionalInchFormatter` exports

### Fixed

- `FormulaParser`: standalone `min` unit token (e.g. `=1 h + 30 min`) conflicted with mathjs's `min()` function and caused evaluation errors - now normalized to `minute` before evaluation; `min()` function calls are unaffected
- `resolveUnitInput` in `create-value.mjs`: error messages from the unit input parser leaked into `ValueInputError`, breaking the consistent `invalid_numeric_value` contract - now always uses the internal fallback message

### Removed

- `formatForComposition` and `formatForFriendlyValue` from `ValueInput` - both delegated identically to `formatDisplay`, making them redundant aliases with no distinct behavior
- `formatComposition` and `formatFriendlyValue` from `Output` for the same reason
- `composition` and `friendly` keys from the `createValuePreview` response payload
- `suffix-mode-catalog.mjs` file (consolidated into `output-suffix-modes.mjs`)

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
