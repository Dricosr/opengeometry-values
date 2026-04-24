# opengeometry-values

Structured engineering values for the OpenGeometry ecosystem — type, quantity, unit, internal normalization, and UI-friendly formatting.

Built with pure JavaScript ES Modules (`.mjs`) and [Math.js](https://mathjs.org/) for unit conversion and numeric formatting.

---

## What it does

Every value in OpenGeometry carries more than a number:

```js
{
  valueType: "float",
  quantity: "length",

  input: {
    text: "2002",
    value: 2002,
    unit: "mm"
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
  createValue,
  formatDisplayValue,
  formatEditValue
} from "opengeometry-values";

const value = createValue({
  text: "2002",
  valueType: "float",
  quantity: "length",
  inputUnit: "mm"
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(formatDisplayValue(value, { unit: "m", precision: 0 }));
// "2 m"

console.log(formatEditValue(value, { unit: "mm", precision: 4 }));
// "2002.0"  — capped at 1 decimal because mm resolution is 0.1
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
| `ratio`       | —             |
| `none`        | —             |

---

## API

### `createValue({ text, valueType, quantity, inputUnit })`

Parses user input and returns a structured value with `input` and `internal` fields.

### `convertValue({ value, fromUnit, toUnit })`

Converts a raw number between units using Math.js.

### `formatDisplayValue(ogValue, options?)`

Returns a human-readable string. Options: `unit`, `precision`, `prefix`, `suffix`, `showUnit`.

### `formatEditValue(ogValue, options?)`

Returns a plain number string for input fields, without unit suffix, precision-capped.

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

---

## License

[MIT](./LICENSE) — © 2026 Adriano Ribeiro
