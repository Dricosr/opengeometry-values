# iforge-edp-values

Structured engineering values for the iForge EDP ecosystem - type, quantity, unit, internal normalization, and UI-friendly formatting.

Built with pure JavaScript ES Modules (`.mjs`) and [Math.js](https://mathjs.org/) for unit conversion and numeric formatting.

The domain rules behind this library - quantities, internal units, resolution, and display constraints - are documented in the [specification](./spec/en-us/spec.md).

---

## What it does

Every value in iForge EDP carries more than a number:

```js
{
  valueType: "number",
  quantity: "length",

  input: {
    id: "input:length:beam-1",
    value: 2002,
    unit: "mm",

    internal: {
      value: 2.002,
      unit: "m"
    },

    output: {
      id: "output:length:beam-1",
      unit: "m"
    }
  },

  internal: {
    value: 2.002,
    unit: "m"
  }
}
```

The library handles:

- Parsing user input into a structured value
- Converting to a stable internal unit (meters, radians, pascals…)
- Applying internal resolution (e.g. 0.1 mm for length)
- Formatting for reading (`2 m`) and editing (`2002.0`)
- Resolving display precision against the system's internal resolution

The geometry engine always uses `internal.value`. The user always sees a unit-aware, precision-capped display.

---

## Install

```bash
npm install @dricosr/iforge-edp-values@alpha
```

The current release line is published on the public npm registry under the `alpha` dist-tag.

---

## Quick start

```js
import {
  OUTPUT_PRESETS,
  PARAMETER_SAMPLES,
  CustomOutputAffix,
  Output,
  createValuePreview,
  createValue,
  tryCreateValue,
  formatDisplayValue,
  formatEditValue
} from "@dricosr/iforge-edp-values";

const value = createValue({
  id: "input:length:beam-1",
  value: 2002,
  valueType: "number",
  quantity: "length",
  unit: "mm",
  output: new Output({
    id: "output:length:beam-1",
    unit: "m",
    precision: 0,
    prefix: new CustomOutputAffix({
      id: "prefix:length:beam-1",
      characters: "~ "
    })
  })
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(value.input.formatForDisplay());
// "~ 2 m"

console.log(formatEditValue(value, { unit: "mm", precision: 4 }));
// "2002.0"  - capped at 1 decimal because mm resolution is 0.1

const invalidValueResult = tryCreateValue({
  value: "10,5",
  valueType: "number",
  quantity: "length",
  unit: "mm"
});

console.log(invalidValueResult);
// {
//   ok: false,
//   value: null,
//   error: ValueInputError {
//     code: "invalid_numeric_value",
//     field: "value",
//     message: "Invalid numeric value: 10,5"
//   }
// }

const preview = createValuePreview({
  parameter: PARAMETER_SAMPLES["length:beam-span"],
  output: {
    presetId: "length:annotation-meter"
  }
});

console.log(OUTPUT_PRESETS["pressure:hvac-kilopascal"].name);
// "HVAC Pressure (kPa)"

console.log(preview.previews.display);
// "7.200 m"
```

---

## Supported value types

| Type        | Description    |
| ----------- | -------------- |
| `string`  | Free text      |
| `integer` | Whole number   |
| `float`   | Decimal number |
| `boolean` | true / false   |

---

## Supported quantities

| Quantity        | Internal unit |
| --------------- | ------------- |
| `length`      | `m`         |
| `area`        | `m^2`       |
| `volume`      | `m^3`       |
| `angle`       | `rad`       |
| `temperature` | `degC`      |
| `mass`        | `kg`        |
| `force`       | `N`         |
| `pressure`    | `Pa`        |
| `time`        | `s`         |
| `ratio`       | -             |
| `none`        | -             |

---

## API

### `createValue({ id, output, value, valueType, quantity, unit })`

Parses a value and unit pair and returns a structured value with `input` and `internal` fields.

### `tryCreateValue({ value, valueType, quantity, unit })`

Returns `{ ok: true, value, error: null }` on success, or `{ ok: false, value: null, error }` with a structured `ValueInputError` for UI-facing validation.

For numeric engineering fields, the library expects the UI to pass the number and unit separately. Inputs such as `90 mm` should be split before calling the library.

### `Output`

Represents the output configuration attached to an input, including `id`, target `unit`, `precision`, and typed `prefix` and `suffix` affixes.

### `OUTPUT_PRESETS`

Provides a curated mini library of BIM and AEC output presets for common engineering views such as millimeter modeling, meter annotations, square-meter schedules, cubic-meter takeoffs, kilonewton structural loads, kilopascal HVAC pressure, and hour-based durations.

### `PARAMETER_SAMPLES`

Provides parameter samples grouped by quantity so local tools and demos can bootstrap realistic scenarios such as wall thickness, beam span, slab area, concrete pour, roof pitch, room setpoint, anchor load, and fire-rating duration.

### `createValuePreview({ parameter, output })`

Builds a structured preview payload with normalized `internal` data plus `display` and `edit` outputs. Useful for inspectors, playgrounds, and interactive engineering editors.

### `CustomOutputAffix`

Represents a user-defined prefix or suffix and stores the exact character sequence informed by the user.

### `convertValue({ value, fromUnit, toUnit })`

Converts a raw number between units using Math.js.

### `formatDisplayValue(ogValue, options?)`

Returns a human-readable string. Options: `unit`, `precision`, `prefix`, `suffix`, `showUnit`.

### `formatEditValue(ogValue, options?)`

Returns a plain number string for input fields, without unit suffix, precision-capped.

For advanced composition, the package also exports the specialist classes behind this API, such as `ValueFactory`, `UnitConverter`, `InternalResolutionApplier`, `DisplayPrecisionService`, `DisplayPrecisionResolver`, `DisplayValueFormatter`, and `EditValueFormatter`.

The quantity layer is also exposed through specialist profiles, including `LengthQuantityProfile`, `AreaQuantityProfile`, `VolumeQuantityProfile`, `AngleQuantityProfile`, `TemperatureQuantityProfile`, `MassQuantityProfile`, `ForceQuantityProfile`, `PressureQuantityProfile`, `TimeQuantityProfile`, and `QuantityProfileRegistry`.

## Engineering I/O checks

High-level engineering I/O scenarios are covered by the specialist visual tests in `tests/visual/`.

Examples validated there include raw engineering inputs and outputs such as:

- `90 deg`
- `2000 mm`
- `200 cm`
- `30 in`
- `2.00 m^2`
- `3000 cm^3`
- `86 degF`
- `12.5 kg`
- `1.5 kN`
- `250 kPa`
- `2 h`
- Invalid inputs such as `ninety deg`, `2,000 mm`, `250k Pa`, and unknown units like `foo`

## Precision internals

### `applyInternalResolution(value, quantity)`

Rounds a value to the system's internal resolution for the given quantity.

### `getMaxDisplayPrecision(quantity, displayUnit)`

Returns the maximum number of decimal places the UI should show for a given unit.

### `resolveDisplayPrecision(quantity, displayUnit, requestedPrecision)`

Returns the effective precision, capped at the internal resolution limit.

---

## Decimal separator

Only `.` is accepted as the decimal separator. Thousands separators are not supported.

```
✓  2002
✓  200.25
✗  200,25
✗  2.000,25
```

This ensures compatibility with JavaScript, JSON, Math.js, and external APIs.

---

## Fractional inch I/O (imperial)

The library provides specialized handling for **fractional inches** - the imperial standard for pipe diameters (NPS), sheet metal thickness, fastener sizes, lumber dimensions, and construction measurements.

Fractional inch support follows **ANSI/ASME Y14.5** and **ISO 129-1** standards for dimensioning and tolerancing.

### Denominator categories

The fractional inch system supports four precision tiers - use the one that matches your domain:

| Category | Max denominator | Domain |
|---|---|---|
| `CONSTRUCTION` | 1/16 (16) | Piping, lumber, framing, valve sizes |
| `PRECISION` | 1/32 (32) | Sheet metal, plate thickness |
| `MACHINING` (default) | 1/64 (64) | Machining, tooling, general fabrication |
| `FINE` | 1/128 (128) | Tool & die, fine machining, metrology |

### Input formatting: `FractionalInchParser`

Parses fractional inch strings into decimal inches, with strict validation:

```js
import { FractionalInchParser, FRACTIONAL_INCH_DENOMINATORS } from "@dricosr/iforge-edp-values";

const parser = new FractionalInchParser({
  denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.MACHINING  // default
});

parser.parse("1 1/4");    // → 1.25   (mixed number, space)
parser.parse("1-1/4");    // → 1.25   (mixed number, hyphen)
parser.parse("1/2");      // → 0.5    (pure fraction)
parser.parse("3/4");      // → 0.75
parser.parse("2");        // → 2      (integer)
parser.parse("-1 1/4");   // → -1.25  (negative)
parser.parse("0");        // → 0
parser.parse("1.25");     // → 1.25   (decimal fallback)

parser.canParse("1 1/4"); // → true
parser.canParse("1/3");   // → false  (not power of 2)
```

**Validation rules enforced:**
- Denominator **must** be a power of 2 (2, 4, 8, 16, 32, 64, 128)
- Fraction **must** be proper (numerator < denominator)
- Numerator and denominator **must** be positive integers
- Denominator **must** not exceed the category limit
- Only **one** fraction per input (no `1/2 1/4`)
- Accepts space (`1 1/4`), hyphen (`1-1/4`), or decimal (`1.25`) interchangeably

```js
parser.parse("1/3");   // ❌ Error - denominator is not a power of 2
parser.parse("3/2");   // ❌ Error - improper fraction (numer >= denom)
parser.parse("1/0");   // ❌ Error - zero denominator
parser.parse("1/128"); // ❌ Error - exceeds machining max (64)
parser.parse("abc");   // ❌ Error - non-numeric
```

### Output formatting: `FractionalInchFormatter`

Converts decimal inch values back to fractional strings, with automatic reduction:

```js
import { FractionalInchFormatter } from "@dricosr/iforge-edp-values";

const formatter = new FractionalInchFormatter(); // default maxDenominator: 64

formatter.decimalToFraction(1.25);     // → "1 1/4"
formatter.decimalToFraction(0.5);      // → "1/2"
formatter.decimalToFraction(0.75);     // → "3/4"
formatter.decimalToFraction(2.375);    // → "2 3/8"     (NPS 2 pipe OD)
formatter.decimalToFraction(6.625);    // → "6 5/8"     (NPS 6 pipe OD)
formatter.decimalToFraction(0.0625);   // → "1/16"      (16 ga sheet)
formatter.decimalToFraction(0.1875);   // → "3/16"      (#10 screw)
formatter.decimalToFraction(-1.25);    // → "-1 1/4"
formatter.decimalToFraction(0);        // → "0"
```

**Custom precision (construction - max 1/16):**

```js
const construction = new FractionalInchFormatter({ maxDenominator: 16 });

construction.decimalToFraction(0.0625);   // → "1/16"
construction.decimalToFraction(0.03125);  // → "0"      (1/32 rounds to 0)
construction.decimalToFraction(0.09375);  // → "1/8"    (3/32 rounds up)
```

### Full I/O model: `FractionalInchOutput`

Integrates parsing + formatting + unit conversion into the standard `createValue` flow.
Accepts both **numeric** and **fractional string** inputs:

```js
import { createValue, FractionalInchOutput, UNIT_TOKENS, OUTPUT_SUFFIX_MODES } from "@dricosr/iforge-edp-values";

// === Input: string fraction ===
const pipe = createValue({
  value: "1 1/4",                          // ← fractional string input
  valueType: "number",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({
    id: "nps-1-1-4",
    prefix: "⌀ "                           // diameter prefix
  })
});

pipe.internal;            // { value: 0.03175, unit: "m" }   → 1.25 in = 0.03175 m
pipe.input.formatForDisplay();  // '⌀ 1 1/4"'
pipe.input.formatForEdit();     // "1 1/4"

// === Input: numeric decimal ===
const plate = createValue({
  value: 0.375,                            // ← numeric input
  valueType: "number",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({
    id: "3-8-plate"
  })
});

plate.input.formatForDisplay();   // '3/8"'
plate.input.formatForEdit();      // "3/8"

// === Input: metric, output: fractional inches ===
const metricPipe = createValue({
  value: 762,                              // 762 mm = 30 inches
  valueType: "number",
  quantity: "length",
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "metric-to-inches"
  })
});

metricPipe.input.formatForDisplay();  // '30"'
```

### Output configuration options

| Option | Values | Default | Description |
|---|---|---|---|
| `suffixMode` | `SYMBOL`, `CODE`, `NONE`, `CUSTOM` | `SYMBOL` | Unit suffix style |
| `showUnit` | `true`, `false` | `true` | Show/hide unit suffix entirely |
| `prefix` | `string` or `OutputAffix` | empty | Text prepended to value |
| `maxDenominator` | `16`, `32`, `64`, `128` | `64` | Maximum fraction denominator |

```js
// Suffix: code (in)
new FractionalInchOutput({ id: "test", suffixMode: OUTPUT_SUFFIX_MODES.CODE });
// → "1 1/4 in"

// Suffix: none
new FractionalInchOutput({ id: "test", suffixMode: OUTPUT_SUFFIX_MODES.NONE });
// → "1 1/4"

// Prefix: diameter symbol
new FractionalInchOutput({ id: "test", prefix: "⌀ " });
// → '⌀ 1 1/4"'
```

### Real-world examples

**NPS pipe outer diameters (OD):**

| NPS | OD (in) | Display |
|---|---|---|
| 1/2" | 0.840 | `⌀ 27/32"` |
| 3/4" | 1.050 | `⌀ 1 1/16"` |
| 1" | 1.315 | `⌀ 1 5/16"` |
| 1-1/2" | 1.900 | `⌀ 1 7/8"` |
| 2" | 2.375 | `⌀ 2 3/8"` |
| 4" | 4.500 | `⌀ 4 1/2"` |
| 6" | 6.625 | `⌀ 6 5/8"` |
| 10" | 10.750 | `⌀ 10 3/4"` |

**Sheet metal thickness (gauge → fraction):**

| Gauge | Thickness (in) | Display |
|---|---|---|
| 16 ga | 0.0625 | `1/16"` |
| 12 ga | 0.1094 | `7/64"` |
| 10 ga | 0.1406 | `9/64"` |
| 1/4" plate | 0.250 | `1/4"` |
| 3/8" plate | 0.375 | `3/8"` |

**Fasteners:**

| Size | Diameter (in) | Display |
|---|---|---|
| 1/4"-20 UNC | 0.250 | `1/4"` |
| 1/2"-13 UNC | 0.500 | `1/2"` |
| 3/4"-10 UNC | 0.750 | `3/4"` |

**Construction:**

| Material | Nominal (in) | Display |
|---|---|---|
| 2x4 lumber | 1.5 | `1 1/2"` |
| 4x4 lumber | 3.5 | `3 1/2"` |
| Stud spacing | 16 | `16"` |
| Joist spacing | 12 | `12"` |

### Architecture

Fractional inch handling adds three small, focused classes to the standard `createValue` pipeline:

```
FractionalInchParser      - parses "1 1/4" → 1.25 (with validation)
FractionalInchFormatter   - formats 1.25 → "1 1/4" (with reduction)
FractionalInchOutput      - orchestrates I/O, affixes, unit conversion
```

`FractionalInchOutput` is designed as a **duck-typed drop-in** for the standard `Output` class. It exposes the same `formatDisplay()` and `formatEdit()` contract expected by `createValue`. When an `output` parameter is passed to `createValue`, the system checks for duck-typing compatibility rather than requiring the exact `Output` class - so `FractionalInchOutput` works transparently.

**Key behaviors:**
- Internal storage is always in meters (SI), regardless of input unit
- Conversion to inches happens at formatting time
- `formatForEdit()` returns the fraction without unit suffix - ready for text input
- `formatForDisplay()` returns the fraction with the configured affix (prefix + suffix)
- Metric units (mm, cm, m) are accepted as input and converted automatically
- Round-trip guaranteed: `"1 1/4" → internal.meters → "1 1/4"` display

---

## Browser usage

The library works in the browser without a build step, using [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to resolve dependencies locally from your Express server.

**Required mathjs exports**

The library uses exactly four named exports from mathjs. Any shim or import map must expose all of them:

| Symbol | Purpose |
| ------ | ------- |
| `unit` | unit conversion, precision, input parsing |
| `format` | numeric display formatting |
| `evaluate` | formula evaluation |
| `typeOf` | formula result type detection |

The canonical source is [`src/core/mathjs-api.mjs`](src/core/mathjs-api.mjs). Adding a new mathjs symbol to the library requires updating that file first, making the contract change visible in diffs. Consumers can also import the object at runtime:

```js
import { mathjsApi } from "@dricosr/iforge-edp-values";
// mathjsApi: { evaluate, format, typeOf, unit }
```

**Express setup (in the consuming app):**

```js
// Serve mathjs ESM files and the library as static
app.use("/mathjs", express.static("node_modules/mathjs/lib/esm"))
app.use("/iforge-edp-values", express.static("node_modules/@dricosr/iforge-edp-values/src"))
```

**HTML:**

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

The browser loads `/mathjs/index.js` and resolves all of mathjs's internal relative imports (e.g. `./utils/is.js`) against `/mathjs/` automatically. No CDN, no bundler, no extra maintenance.

**Version sync:** mathjs version is controlled exclusively by `package.json`. After `npm install`, both Node.js and the browser use the same version from `node_modules/`.

---

## Design principles

- Geometry and calculations always use `internal.value`
- User input is preserved in `input` but never used for computation
- Unit preference belongs to the UI or project config, not to the value
- Display precision is always capped by internal resolution
- Small specialist classes own one responsibility each, with shared strings and base values centralized in dedicated catalogs
- Quantity-specific behavior lives in specialist profiles instead of being spread across generic conditionals

---

## Contributing

Contributions are welcome - bug reports, documentation improvements, new quantity profiles, and code changes. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and guidelines.

Please note that this project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By participating you agree to abide by its terms.

## Live demo

[og-values.runcod.es](https://og-values.runcod.es)

## Author

Adriano Ribeiro - [linkedin.com/in/dricosr](https://www.linkedin.com/in/dricosr/)

## License

[MIT](./LICENSE) - © 2026 Adriano Ribeiro
