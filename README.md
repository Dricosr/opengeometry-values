# opengeometry-values

Structured engineering values for the OpenGeometry ecosystem - type, quantity, unit, internal normalization, and UI-friendly formatting.

Built with pure JavaScript ES Modules (`.mjs`) and [Math.js](https://mathjs.org/) for unit conversion and numeric formatting.

---

## What it does

Every value in OpenGeometry carries more than a number:

```js
{
  valueType: "float",
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
npm install opengeometry-values
```

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
} from "opengeometry-values";

const value = createValue({
  id: "input:length:beam-1",
  value: 2002,
  valueType: "float",
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
  valueType: "float",
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

| Type      | Description              |
| --------- | ------------------------ |
| `string`  | Free text                |
| `integer` | Whole number             |
| `float`   | Decimal number           |
| `boolean` | true / false             |

---

## Supported quantities

| Quantity      | Internal unit |
| ------------- | ------------- |
| `length`      | `m`           |
| `area`        | `m^2`         |
| `volume`      | `m^3`         |
| `angle`       | `rad`         |
| `temperature` | `degC`        |
| `mass`        | `kg`          |
| `force`       | `N`           |
| `pressure`    | `Pa`          |
| `time`        | `s`           |
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

Each `ValueInput` now stores its own `id`, the normalized `internal` value, and the attached `output` instance used to format display and edit strings.

## Local demo

Run the local Express demo to browse samples, tweak output presets, create interactive parameter previews, and trigger the visual suite from the browser:

```bash
npm run demo:start
```

For local development with automatic restart on changes in `src/` and `demo/`:

```bash
npm run demo:dev
```

Then open `http://localhost:4173`.

Useful commands:

- `npm run demo:dev` starts the local API with nodemon and auto-reload
- `npm run demo:start` starts the local API and interactive web page
- `npm run test:visual` runs the engineering visual suite directly

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

## Browser usage

The library works in the browser without a build step, using [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to resolve dependencies locally from your Express server.

**Express setup (in the consuming app):**

```js
// Serve mathjs ESM files and the library as static
app.use("/mathjs", express.static("node_modules/mathjs/lib/esm"))
app.use("/opengeometry-values", express.static("node_modules/opengeometry-values/src"))
```

**HTML:**

```html
<script type="importmap">
{
  "imports": {
    "mathjs": "/mathjs/index.js",
    "opengeometry-values": "/opengeometry-values/index.mjs"
  }
}
</script>

<script type="module">
  import { createValue, formatDisplayValue } from "opengeometry-values"
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

## License

[MIT](./LICENSE) - © 2026 Adriano Ribeiro
