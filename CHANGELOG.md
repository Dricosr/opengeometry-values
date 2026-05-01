# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `src/core/base/assert-catalog-value.mjs`: centralized validation helper that rejects values not present in a `ReadOnlyCatalog` — used by all base model constructors to fail fast on invalid catalog entries
- `ReadOnlyCatalog.prototype.hasValue(value)`: checks membership without returning the entry
- **Base model validation**: all constructors in `src/core/models/` now validate catalog parameters at the lowest level, throwing `TypeError` for invalid values:
  - `OutputAffix` — validates `type` against `outputAffixTypeCatalog`
  - `UnitCodeOutputAffix` — validates `unit` against `unitTokenCatalog`
  - `UnitSymbolOutputAffix` — validates `unit` against `unitTokenCatalog`
  - `IForgeEdpValue` — validates `valueType` and `quantity` against `valueTypeCatalog` and `quantityTypeCatalog`
  - `ValueInput` — validates `unit` (when not `QUANTITY_TYPES.NONE`) against `unitTokenCatalog`, and `quantity` against `quantityTypeCatalog`
  - `InternalValue` — validates `unit` against `unitTokenCatalog`
  - `Output` — validates `unit` (when not `QUANTITY_TYPES.NONE`) against `unitTokenCatalog`
  - `FractionalInchOutput` — validates `suffixMode` against `outputSuffixModeCatalog` and `separator` against `fractionalSeparatorCatalog`
- `VALUE_TYPES.BOOLEAN`: new value type for boolean/status parameters (on/off, open/closed, yes/no, 1/0) with `BOOLEAN_LABEL_PRESETS` catalog for label pair configuration

- `NONE_PRESETS`: output presets for `QUANTITY_TYPES.NONE` including boolean label presets (`none:yes-no`, `none:open-closed`, `none:active-inactive`, `none:enabled-disabled`, `none:included-excluded`, `none:valid-invalid`, `none:compliant-noncompliant`, `none:locked-unlocked`, `none:visible-hidden`, `none:reviewed-not-reviewed`, `none:approved-not-approved`, `none:required-not-required`, `none:applicable-not-applicable`) and unit count presets (`none:count`, `none:count-pcs`)
- `none-samples.mjs`: parameter samples for NONE quantity covering boolean status (valve, pump, breaker, damper) and unit counts (pipe spools, flanges, bolts, valves)
- `booleanTextParser`: specialist parser that normalizes boolean text inputs (`true`/`false`, `yes`/`no`, `1`/`0`, `on`/`off`, `active`/`inactive`, `enabled`/`disabled`, `open`/`closed`) to boolean values and rejects formula expressions
- `booleanLabelCatalog` / `BooleanLabelCatalog` / `BOOLEAN_LABEL_PRESETS`: catalog of boolean label pairs for display rendering (e.g. Yes/No, On/Off, Open/Closed, Active/Inactive)
- `booleanLabels` property on `Output` model: optional label pair override for boolean display rendering
- Unit count validation in `create-value.mjs`: rejects decimal values when `unit === UNIT_TOKENS.UN` with `"Invalid integer value"` error
- `FractionalInchOutput` model: specialized output for fractional inch display following ANSI/ASME Y14.5 standards, with configurable suffix modes (`SYMBOL`, `CODE`, `NONE`, `CUSTOM`) and separator types (`SPACE`, `HYPHEN`) via dedicated catalogs
- `FractionalInchFormatter`: converts decimal inch values to fractional inch strings using power-of-2 denominators (2, 4, 8, 16, 32, 64, 128) with automatic fraction reduction
- `FractionalSeparatorCatalog` and `FractionalInchDenominatorCatalog` in `fractional-inch-catalog.mjs`: centralized catalogs for separator types (`space`, `hyphen`) and denominator precision levels (`construction`, `precision`, `machining`, `fine`)
- `SEPARATORS` and `FRACTION_DENOMINATORS` exports from `fractional-inch-catalog.mjs` for use across the library
- `FractionalInchDefaultCatalog` with sensible defaults (`maxDenominator: 64`, `separator: "space"`, `suffixMode: "symbol"`, `unitCode: "in"`)
- Diameter presets (`length:diameter-mm`, `length:diameter-cm`, `length:diameter-in`, `length:diameter-ft`) with `⌀ ` prefix in `length-presets.mjs`
- Diameter parameter samples (`length:diameter-mm`, `length:diameter-cm`, `length:diameter-in`, `length:diameter-ft`) in `length-samples.mjs`
- Temperature, time, and volume parameter samples with full unit coverage
- Sample scripts in `samples/` directory: 70+ standalone runnable examples covering all quantities (length, area, volume, angle, temperature, mass, force, pressure, time, ratio) with unit conversion, formula input, inline unit, integer input, precision control, prefix/suffix, and fractional inch output scenarios
- Sample `samples/length/input-mm-to-output-fractional-in.mjs`: demonstrates mm input converted to fractional inches with all suffix modes and separator types
- `mathjs-api.mjs`: explicit contract file documenting the mathjs API surface used by the library, for browser consumers
- `spec/en-us/samples.md`: documentation for the samples directory structure and usage

### Changed

- **valueTypes collapse**: removed `VALUE_TYPES.FLOAT` and `VALUE_TYPES.INTEGER`; consolidated to just `VALUE_TYPES.NUMBER` and `VALUE_TYPES.STRING`. All samples, tests, and documentation updated to use `VALUE_TYPES.NUMBER` in place of `FLOAT`/`INTEGER`.
- **Rebrand**: package renamed from `opengeometry-values` to `@dricosr/iforge-edp-values`; class `OpenGeometryValue` renamed to `IForgeEdpValue`; IIFE global `OpenGeometryValues` → `IForgeEdpValues`; all brand references updated across docs, specs, agents, and memory files
- Output preset catalog split into per-quantity files (`src/presets/length-presets.mjs`, `area-presets.mjs`, `volume-presets.mjs`, `angle-presets.mjs`, `temperature-presets.mjs`, `mass-presets.mjs`, `force-presets.mjs`, `pressure-presets.mjs`, `time-presets.mjs`, `ratio-presets.mjs`). A shared `src/presets/create-preset.mjs` helper is extracted so each file reuses the same freeze pattern. Public exports unchanged (`OUTPUT_PRESETS`, `outputPresetCatalog`, `OutputPresetCatalog`).
- Parameter sample catalog split into per-quantity files (`src/samples/length-samples.mjs`, `area-samples.mjs`, `volume-samples.mjs`, `angle-samples.mjs`, `temperature-samples.mjs`, `mass-samples.mjs`, `force-samples.mjs`, `pressure-samples.mjs`, `time-samples.mjs`, `ratio-samples.mjs`). A shared `src/samples/create-sample.mjs` helper is extracted so each file reuses the same freeze pattern. Coverage expanded to include all supported units and both value types (`float` and `integer`) per quantity, plus the three formula input forms (`formula-embedded-units`, `formula-plain`, `inline-unit`) in every applicable quantity. Public exports unchanged (`PARAMETER_SAMPLES`, `parameterSampleCatalog`, `ParameterSampleCatalog`).
- **Breaking:** `mathjs-string-catalog.mjs` renamed to `unit-token-catalog.mjs`. All exported symbols replaced with no backward-compat aliases: `MATHJS_STRINGS` → `UNIT_TOKENS`, `MathJsStringCatalog` → `UnitTokenCatalog`, `mathJsStringCatalog` → `unitTokenCatalog`. The internal constant `MATHJS_STRING_ENTRIES` is now `UNIT_TOKEN_ENTRIES`.
- `domain-string-catalog.mjs` removed; `domain-catalog.mjs` is now the single source of truth. All internal imports migrated from `DOMAIN_STRINGS` to `DOMAIN`. The deprecated symbols `DOMAIN_STRINGS`, `domainStringCatalog`, and `DomainStringCatalog` are re-exported as aliases from `domain-catalog.mjs` and remain available in the public API for backward compatibility.
- `FractionalInchFormatter` and `FractionalInchOutput` now import `SEPARATORS` from `fractional-inch-catalog.mjs` instead of using raw string literals for separator values
- `suffix-mode-catalog.mjs` removed; `output-suffix-modes.mjs` is now the single source of truth for suffix mode constants
- `src/index.mjs` exports updated: removed `suffixModeCatalog` and `SuffixModeCatalog` references, added `FractionalInchOutput` and `FractionalInchFormatter` exports
- `create-value.mjs` refactored: dispatch logic reorganized by `valueType` (STRING, BOOLEAN, NUMBER) instead of by unit; boolean path uses `booleanTextParser`; unit count (UN) path validates integer-only
- `FractionalInchFormatter` and `FractionalInchOutput` improved: ANSI/ASME Y14.5 rounding conventions enforced (round to nearest denominator, not floor); precision handling enhanced for edge cases near whole numbers
- `FractionalInchParser` enhanced: stricter validation for malformed fractional inch strings
- `Output` model: added optional `booleanLabels` property for boolean display label pair configuration
- `createValuePreview` service: updated to handle boolean value type display
- `README.md`: improved table formatting for supported value types and quantities; added live demo link and author LinkedIn; added Contributing section linking CONTRIBUTING.md and CODE_OF_CONDUCT.md; aligned with current lib state and added cross-references to spec
- `spec/en-us/spec.md` and `spec/pt-br/spec.md`: aligned with current library state — updated mathjs version, file tree description, value model, createValue API, UNIT_SYMBOLS table, export list, full example; marked MVP as delivered with additions beyond original scope
- `CONTRIBUTING.md`: added warm intro, contribution types, link to CoC
- `CODE_OF_CONDUCT.md`: added Scope section and progressive enforcement actions
- Agent instructions: enhanced descriptions, added customization sync checks, forbid co-author trailers
- `memory/MEMORY.md` and `memory/feedback_code_conventions.md`: added coding standards documentation
- `.claude/settings.local.json`: cleaned up NPM_TOKEN and permissions list; added version retrieval commands

### Fixed

- `FormulaParser`: standalone `min` unit token (e.g. `=1 h + 30 min`) conflicted with mathjs's `min()` function and caused evaluation errors — now normalized to `minute` before evaluation; `min()` function calls are unaffected
- `resolveUnitInput` in `create-value.mjs`: error messages from the unit input parser leaked into `ValueInputError`, breaking the consistent `invalid_numeric_value` contract — now always uses the internal fallback message
- `booleanTextParser`: now rejects formula expressions (strings starting with `=`) with `ValueInputError` code `"invalid_formula_expression"` instead of silently returning `true`
- `none-samples.mjs`: `recommendedOutputPresetIds` corrected to match actual preset IDs in `none-presets.mjs` (e.g. `none:open-closed` instead of `none:boolean-on-off`, `none:count` instead of `none:unit-count`)
- Punctuation standardized across documentation files for consistency
- Orphaned test file `e` accidentally saved in project root removed

### Removed

- `formatForComposition` and `formatForFriendlyValue` from `ValueInput` — both delegated identically to `formatDisplay`, making them redundant aliases with no distinct behavior
- `formatComposition` and `formatFriendlyValue` from `Output` for the same reason
- `composition` and `friendly` keys from the `createValuePreview` response payload
- `suffix-mode-catalog.mjs` file (consolidated into `output-suffix-modes.mjs`)
- `scripts/check-customizations.mjs`: removed as no longer needed

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
