# iforge-edp-values

[![npm version](https://img.shields.io/npm/v/@dricosr/iforge-edp-values)](https://www.npmjs.com/package/@dricosr/iforge-edp-values)
[![license](https://img.shields.io/npm/l/@dricosr/iforge-edp-values)](./LICENSE)
[![node](https://img.shields.io/node/v/@dricosr/iforge-edp-values)](https://nodejs.org/)

Structured engineering values for AEC/industrial applications. Type-safe unit conversion, internal SI normalization, and UI-friendly formatting - built on [Math.js](https://mathjs.org/).

[Live demo](https://values.iforge.org/) · [Specification](./spec/en-us/spec.md) · [Changelog](./CHANGELOG.md)

## Features

- **12 engineering quantities**: length, area, volume, angle, temperature, mass, force, pressure, time, ratio, bool, and count
- **Automatic SI normalization**: every value converts to a stable internal unit (meters, radians, pascals…) regardless of input unit
- **Precision gating**: display precision is automatically capped by the domain's internal resolution (e.g. millimeter values never show more than 1 decimal place)
- **Fractional inch I/O**: full imperial support following ANSI/ASME Y14.5 - parse `"1 1/4"`, format `2.375 → "2 3/8"`, with four precision tiers (construction, precision, machining, fine)
- **BIM/AEC output presets**: curated presets for millimeter modeling, meter annotations, square-meter schedules, kilonewton structural loads, kilopascal HVAC, and more
- **Zero-dependency browser usage**: works in the browser via import maps - no CDN, no bundler
- **Pure ESM** (`.mjs`), tree-shakeable, no TypeScript

## Install

```bash
npm install @dricosr/iforge-edp-values
```

## Usage

```js
import { createValue, tryCreateValue, formatDisplayValue, formatEditValue } from "@dricosr/iforge-edp-values";

// Create a structured engineering value
const value = createValue({
  value: 2002,
  valueType: "number",
  quantity: "length",
  unit: "mm",
  output: { id: "beam-1", unit: "m", precision: 3 }
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(formatDisplayValue(value));
// "2.002 m"

console.log(formatEditValue(value, { unit: "mm", precision: 4 }));
// "2002.0"

// Validate user input
const result = tryCreateValue({
  value: "10,5",
  valueType: "number",
  quantity: "length",
  unit: "mm"
});

console.log(result);
// { ok: false, value: null, error: ValueInputError { code: "invalid_numeric_value", ... } }
```

### Fractional inches

```js
import { createValue, FractionalInchOutput, UNIT_TOKENS } from "@dricosr/iforge-edp-values";

const pipe = createValue({
  value: "1 1/4",
  valueType: "number",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "nps-1-1-4", prefix: "⌀ " })
});

console.log(pipe.input.formatForDisplay());  // '⌀ 1 1/4"'
console.log(pipe.input.formatForEdit());     // "1 1/4"
console.log(pipe.internal);                  // { value: 0.03175, unit: "m" }
```

### Output presets

```js
import { OUTPUT_PRESETS, PARAMETER_SAMPLES, createValuePreview } from "@dricosr/iforge-edp-values";

// Explore available presets
console.log(OUTPUT_PRESETS["pressure:hvac-kilopascal"].name);
// "HVAC Pressure (kPa)"

// Preview a parameter with a preset
const preview = createValuePreview({
  parameter: PARAMETER_SAMPLES["length:beam-span"],
  output: { presetId: "length:annotation-meter" }
});

console.log(preview.previews.display);
// "7.200 m"
```

## Supported quantities

| Quantity | Internal unit | Example inputs |
| --- | --- | --- |
| `length` | `m` | `mm`, `cm`, `m`, `in`, `ft` |
| `area` | `m^2` | `mm^2`, `cm^2`, `m^2` |
| `volume` | `m^3` | `mm^3`, `cm^3`, `m^3` |
| `angle` | `rad` | `deg`, `rad` |
| `temperature` | `degC` | `degC`, `degF`, `K` |
| `mass` | `kg` | `g`, `kg`, `lb` |
| `force` | `N` | `N`, `kN`, `lbf` |
| `pressure` | `Pa` | `Pa`, `kPa`, `bar`, `psi` |
| `time` | `s` | `s`, `min`, `h` |
| `ratio` | - | dimensionless |
| `bool` | - | `true` / `false` with configurable labels |
| `count` | - | discrete integer counts (`un`) |

Value types: `string`, `integer`, `float`, `boolean`.

## Documentation

- **[Specification](./spec/en-us/spec.md)** - domain rules: quantities, internal units, resolution limits, display constraints
- **[API Reference](#api-reference)** - all public exports with descriptions
- **[Fractional Inch Guide](#fractional-inch-io)** - imperial piping, sheet metal, fasteners, and construction
- **[Browser Usage](#browser-usage)** - import maps setup for zero-dependency browser loading

---

## API Reference

### Core functions

| Export | Description |
| --- | --- |
| `createValue(options)` | Parse input into a structured value with `input` and `internal` fields |
| `tryCreateValue(options)` | Safe parse returning `{ ok, value, error }` for UI validation |
| `createValuePreview(options)` | Build a preview payload (display + edit) from a sample parameter and output preset |
| `formatDisplayValue(value, options?)` | Human-readable string with unit and affixes |
| `formatEditValue(value, options?)` | Plain number string for input fields, precision-capped |
| `convertValue({ value, fromUnit, toUnit })` | Raw unit conversion via Math.js |

### Configuration classes

| Export | Description |
| --- | --- |
| `Output` | Output configuration: target unit, precision, prefix/suffix affixes |
| `CustomOutputAffix` | User-defined prefix or suffix character sequence |
| `FractionalInchOutput` | Drop-in `Output` replacement for fractional inch I/O |
| `FractionalInchParser` | Parse `"1 1/4"` → `1.25` with validation |
| `FractionalInchFormatter` | Format `1.25` → `"1 1/4"` with automatic reduction |

### Presets and samples

| Export | Description |
| --- | --- |
| `OUTPUT_PRESETS` | Curated BIM/AEC output presets by quantity |
| `PARAMETER_SAMPLES` | Realistic parameter samples grouped by quantity |
| `FRACTIONAL_INCH_DENOMINATORS` | Precision tier constants: `CONSTRUCTION`, `PRECISION`, `MACHINING`, `FINE` |

### Advanced (specialist classes)

For advanced composition, the package also exports: `ValueFactory`, `UnitConverter`, `InternalResolutionApplier`, `DisplayPrecisionService`, `DisplayPrecisionResolver`, `DisplayValueFormatter`, `EditValueFormatter`, `QuantityProfileRegistry`, and per-quantity profiles (`LengthQuantityProfile`, `AreaQuantityProfile`, …).

---

## Fractional inch I/O

The library provides specialized handling for fractional inches - the imperial standard for pipe diameters (NPS), sheet metal thickness, fastener sizes, lumber dimensions, and construction measurements. Follows **ANSI/ASME Y14.5** and **ISO 129-1**.

### Precision tiers

| Tier | Max denominator | Use case |
| --- | --- | --- |
| `CONSTRUCTION` | 1/16 | Piping, lumber, framing, valve sizes |
| `PRECISION` | 1/32 | Sheet metal, plate thickness |
| `MACHINING` | 1/64 | Machining, tooling, general fabrication |
| `FINE` | 1/128 | Tool & die, fine machining, metrology |

### Validation rules

- Denominator must be a power of 2 (2, 4, 8, 16, 32, 64, 128)
- Fraction must be proper (numerator < denominator)
- Only one fraction per input; accepts space (`1 1/4`), hyphen (`1-1/4`), or decimal (`1.25`)

### Real-world examples

| Domain | Input | Output |
| --- | --- | --- |
| NPS 2" pipe OD | `2.375` in | `⌀ 2 3/8"` |
| 16 ga sheet metal | `0.0625` in | `1/16"` |
| 1/4"-20 UNC fastener | `0.250` in | `1/4"` |
| 2×4 lumber (actual) | `1.5` in | `1 1/2"` |

---

## Browser usage

Works in the browser without a build step using [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap):

```html
<script type="importmap">
{
  "imports": {
    "mathjs": "/mathjs/index.js",
    "@dricosr/iforge-edp-values": "/iforge-edp-values/index.mjs"
  }
}
</script>

<script type="module">
  import { createValue, formatDisplayValue } from "@dricosr/iforge-edp-values"
</script>
```

Requires serving `mathjs/lib/esm` and the library's `src/` as static files from your Express server. See the [specification](./spec/en-us/spec.md) for full setup details.

---

## Build

```bash
git clone https://github.com/Dricosr/iforge-edp-values.git
cd iforge-edp-values
npm install
npm run build       # ESM + CJS + IIFE → dist/
```

## Test

```bash
npm test                # all tests (Vitest)
npm run test:visual     # visual I/O tests only
npm run test:coverage   # with coverage report
```

> **Windows users**: run Vitest from PowerShell or bash - `cmd.exe` has known incompatibilities with Vitest 4.x.

---

## Design principles

- Calculations always use `internal.value` (SI); user input is preserved but never used for computation
- Unit preference belongs to the UI or project config - not stored in the value
- Display precision is always capped by the quantity's internal resolution
- Small specialist classes with single responsibilities; shared constants in dedicated catalogs
- Quantity-specific behavior lives in specialist profiles, not generic conditionals

---

## Contributing

Contributions are welcome - bug reports, documentation improvements, new quantity profiles, and code changes. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and guidelines.

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating you agree to abide by its terms.

## License

[MIT](./LICENSE) - © 2026 Adriano Ribeiro
