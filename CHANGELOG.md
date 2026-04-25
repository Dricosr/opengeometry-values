# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Removed

- `formatForComposition` and `formatForFriendlyValue` from `ValueInput` - both delegated identically to `formatDisplay`, making them redundant aliases with no distinct behavior
- `formatComposition` and `formatFriendlyValue` from `Output` for the same reason
- `composition` and `friendly` keys from the `createValuePreview` response payload

### Added

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
