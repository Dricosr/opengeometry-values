# Library Conformance Checklist

Checklist for a cross-platform (Node.js + browser) ESM library like `iforge-edp-values`.
Before every major change, validate these items. Keep this file updated when adding new compliance requirements.

---

## 1. Package Configuration (`package.json`)

- [ ] **name, version, description** — correct and meaningful
- [ ] **type: "module"** — signals ESM to Node.js
- [ ] **main, module, browser, exports** — all four entry points defined:
  - `"main"` → CJS (`dist/index.cjs.js`)
  - `"module"` → ESM (`dist/index.esm.js`)
  - `"browser"` → IIFE (`dist/index.iife.min.js`)
  - `"exports"` → conditional (import/require/default)
- [ ] **files** — only `src/` and `dist/` (source maps included)
- [ ] **scripts** — `build`, `test`, `prepublishOnly` (which runs `test && build`)
- [ ] **peerDependencies** — correct `mathjs` range; `peerDependenciesMeta` marks it required
- [ ] **devDependencies** — exact versions, no `^` or `~`
- [ ] **engines** — `node >= 24.0.0` (latest stable)
- [ ] **publishConfig** — scoped registry (`@dricosr`), public access
- [ ] **repository, bugs, homepage** — valid GitHub URLs
- [ ] **keywords** — cover the domain (engineering, units, cad, mathjs, ESM)

---

## 2. Build System

- [ ] **ESM build** (`dist/index.esm.js`) — tree-shakeable, mathjs external
- [ ] **CJS build** (`dist/index.cjs.js`) — `exports: "named"`, mathjs external
- [ ] **IIFE build** (`dist/index.iife.min.js`) — self-contained, mathjs bundled and minified, for script tags
- [ ] **Source maps** — enabled for all three formats
- [ ] **Build runs clean** — `npm run build` exits 0 with no warnings
- [ ] **dist/ is gitignored** — added to `.gitignore`
- [ ] **dist/ is published** — included in `package.json` `"files"`

---

## 3. Backend Compatibility

- [ ] **Node.js import** — `import { createValue } from "@dricosr/iforge-edp-values"` resolves from `dist/`
- [ ] **Node.js require** — `const { createValue } = require("@dricosr/iforge-edp-values")` works via CJS build
- [ ] **mathjs peerDep resolves** — consumer's `node_modules` provides it; no bundle-time error
- [ ] **All source is .mjs** — no CommonJS, no TypeScript
- [ ] **Node engine constraint** — `>= 24.0.0` matches current stable

---

## 4. Browser Compatibility

- [ ] **IIFE via CDN** — `<script src="...index.iife.min.js">` exposes `window.IForgeEdpValues`
- [ ] **ESM via bundler** — Vite/Rollup/esbuild resolve `"module"` entry and tree-shake
- [ ] **No DOM APIs** — no `document`, `window`, `navigator`, `localStorage`
- [ ] **No Node.js APIs** — no `fs`, `path`, `process`, `Buffer`
- [ ] **Import map documented** — `spec/en-us/browser-and-backend.md` explains serving strategy
- [ ] **Only 4 mathjs symbols used** — `unit`, `format`, `evaluate`, `typeOf` — shimmable

---

## 5. API Surface (`src/index.mjs`)

- [ ] **Named exports only** — no default exports from the public index
- [ ] **Consistent naming**:
  - Classes: `PascalCase` (`ValueFactory`, `Output`, `FractionalInchParser`)
  - Singletons: `camelCase` (`valueFactory`, `outputBuilder`, `fractionalInchParser`)
  - Functions: `camelCase` (`createValue`, `parseFractionalInch`, `formatDisplayValue`)
  - Constants/catalogs: `UPPER_SNAKE_CASE` (`UNIT_TOKENS`, `QUANTITY_TYPES`, `OUTPUT_SUFFIX_MODES`)
  - Catalog instances: `camelCase` (`unitTokenCatalog`, `valueTypeCatalog`)
- [ ] **Error types exported** — e.g. `ValueInputError`, structured error codes
- [ ] **try* variants for validation** — `tryCreateValue` alongside `createValue` for UI-safe input handling
- [ ] **Duck typing supported** — custom Output, OutputAffix can be injected without class inheritance
- [ ] **All public symbols documented** — visible in README API section

---

## 6. Testing

- [ ] **Vitest runs from PowerShell** — `npx vitest run` passes (known: fails under cmd.exe on Windows)
- [ ] **Unit tests per module** — parser, formatter, output, converter, precision, value creation
- [ ] **Visual tests** — `npm run test:visual` covers all quantities with real-world scenarios
- [ ] **Coverage** — `npm run test:coverage` generates meaningful % (affirms isolation is intended)
- [ ] **Manual verification script** — `tests/manual-verify-exports.mjs` validates all exports are accessible
- [ ] **Tests are portable** — no platform-specific assumptions; isolated runs
- [ ] **Edge cases covered** — zero, negative, invalid input, boundary values, type coercion

---

## 7. Documentation

- [ ] **README** — installation, quick start, full API reference with examples, architecture, tables
- [ ] **CONTRIBUTING.md** — setup, conventions, PR flow, commit message format
- [ ] **CHANGELOG.md** — Keep a Changelog format, `[Unreleased]` section updated on every public API change
- [ ] **SECURITY.md** — reporting process, supported versions
- [ ] **CODE_OF_CONDUCT.md** — Contributor Covenant or similar
- [ ] **LICENSE** — MIT with correct year and copyright holder
- [ ] **Spec documents** — `spec/en-us/`, `spec/pt-br/` with domain rules and architecture decisions
- [ ] **Publishing guide** — `docs/publishing.md` with step-by-step CLI instructions
- [ ] **Browser integration guide** — `spec/en-us/browser-and-backend.md` with import maps and Express setup
- [ ] **Full API documented** — every public function, class, constant, and catalog has a description in README

---

## 8. Code Quality

- [ ] **Modular structure** — `src/constants/`, `src/core/`, `src/presets/`, `src/samples/`, `tests/`
- [ ] **Read-only catalogs** — catalog entries are `Object.freeze()`'d, collections are read-only
- [ ] **Dependency injection** — ValueFactory accepts parsers, converters, resolvers as constructor options
- [ ] **Input validation** — strict number parsing (dot-only), denominator power-of-2 check, proper fraction enforcement
- [ ] **No magic strings** — all domain strings go through `domain-string-catalog.mjs`
- [ ] **No implicit conversions** — value `String` and `Number` are treated as distinct input forms
- [ ] **Consistent error codes** — `invalid_numeric_value`, `invalid_formula_expression`, etc.
- [ ] **ESLint-ready** — no syntactic issues (consider adding `.eslintrc` config)
- [ ] **No dead code** — no unused imports, no commented-out logic, no console.log in production

---

## 9. Git & CI

- [ ] **.gitignore** — ignores node_modules, dist, coverage, .DS_Store, Thumbs.db
- [ ] **.npmrc** — scoped registry for `@dricosr`
- [ ] **GitHub Actions** — `.github/workflows/` with CI that runs tests + build
- [ ] **Conventional commits** — enforced in contributing guide (`feat:`, `fix:`, `docs:`, `test:`)
- [ ] **CHANGELOG updated** — every PR adds entry under `[Unreleased]`
- [ ] **Semantic versioning** — breaking API changes → major; additions → minor; fixes → patch

---

## 10. Security

- [ ] **SECURITY.md exists** — with private reporting email and 72-hour acknowledgement target
- [ ] **Exact dependency versions** — no `^` or `~` in `dependencies` or `devDependencies`
- [ ] **No secrets committed** — no npm tokens, API keys, passwords
- [ ] **CI tokens are secrets** — GitHub Actions `NPM_TOKEN` uses repository secret, not hardcoded
- [ ] **Automation tokens** — IP-restricted for CI publishing

---

## 11. Agent & Developer Guidance

- [ ] **CLAUDE.md** — agent loading instructions + shell compatibility note
- [ ] **memory/*** — feedback and convention files for code style, git alignment, Windows shell
- [ ] **GitHub Copilot instructions** — `.github/copilot-instructions.md`
- [ ] **Claude Code agents** — `.claude/agents/` for implement, test, review, docs
- [ ] **Copilot agents** — `.github/agents/` (mirrored)
- [ ] **Prompt files** — `.github/prompts/` for review-naming, document-module
- [ ] **Sync verified** — `npm run check:customizations` validates mirrored files are in sync
- [ ] **This file** — `memory/library-conformance-checklist.md` loaded by agents at start of each task

---

## 12. Known Gaps (not yet addressed)

- No TypeScript definitions — JSDoc types only (intentional: maintain ESM-only simplicity)
- No bundle size budgets or size checks in CI — consider `size-limit` or `bundlesize`
- No automated browser tests (Playwright/Puppeteer) — IIFE and ESM bundle loading untested
- No performance benchmarks — unit conversion throughput not measured
- No ESLint/Prettier configuration — style enforced by convention only
- No integration testing with real mathjs versions — peerDep range tested only at install time

---

*Last updated: 2026-04-28*
