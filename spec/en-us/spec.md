# OpenGeometry Values

Library in **pure JavaScript**, using **`.mjs`** files, **ES Modules** standard, coupled with **Math.js** for unit conversion and numeric formatting.

Goal:

```txt
value + type + quantity + unit + original input + internal value + display
```

---

# 1. Math.js responsibilities

Math.js will be used for:

```txt
unit conversion
unit parsing and control
basic dimensional validation
numeric formatting
support for known physical units
```

Examples:

```js
import { unit, format } from "mathjs";

unit(2000, "mm").toNumber("m");
// 2

unit(90, "deg").toNumber("rad");
// 1.5707963267948966
```

---

# 2. OpenGeometry Values responsibilities

Our library handles what is specific to the system:

```txt
logical value type
technical quantity
internal unit per quantity
original user input
normalization to internal unit
internal resolution
maximum precision allowed in the UI
formatting for reading
formatting for editing
display rules
```

Math.js computes.
OpenGeometry defines the domain rules.

---

# 3. Stack

```json
{
  "type": "module",
  "dependencies": {
    "mathjs": "^14.0.0"
  }
}
```

All files:

```txt
.mjs
```

Imports:

```js
import { unit, format } from "mathjs";
```

---

# 4. Initial repo structure

```txt
opengeometry-values/
  package.json

  src/
    constants/
      value-types.mjs
      quantity-types.mjs
      internal-units.mjs
      internal-resolution.mjs
      unit-symbols.mjs

    core/
      create-value.mjs
      convert-value.mjs
      apply-internal-resolution.mjs
      get-max-display-precision.mjs
      resolve-display-precision.mjs
      format-display-value.mjs
      format-edit-value.mjs

    index.mjs
```

---

# 5. Value types

File:

```txt
src/constants/value-types.mjs
```

```js
export const VALUE_TYPES = Object.freeze({
  STRING: "string",
  INTEGER: "integer",
  FLOAT: "float",
  BOOLEAN: "boolean"
});
```

MVP:

```txt
string
integer
float
boolean
```

Future:

```txt
enum
date
formula
reference
json
```

---

# 6. Initial quantities

File:

```txt
src/constants/quantity-types.mjs
```

```js
export const QUANTITY_TYPES = Object.freeze({
  NONE: "none",
  LENGTH: "length",
  AREA: "area",
  VOLUME: "volume",
  ANGLE: "angle",
  TEMPERATURE: "temperature",
  MASS: "mass",
  FORCE: "force",
  PRESSURE: "pressure",
  TIME: "time",
  RATIO: "ratio"
});
```

MVP sufficient for engineering / CAD / piping.

---

# 7. Internal units

File:

```txt
src/constants/internal-units.mjs
```

```js
export const INTERNAL_UNITS = Object.freeze({
  none: null,

  length: "m",
  area: "m^2",
  volume: "m^3",

  angle: "rad",
  temperature: "degC",

  mass: "kg",
  force: "N",
  pressure: "Pa",
  time: "s",

  ratio: null
});
```

Decisions:

| Quantity    | Internal unit |
| ----------- | ------------: |
| Length      |           `m` |
| Area        |         `m^2` |
| Volume      |         `m^3` |
| Angle       |         `rad` |
| Temperature |        `degC` |
| Mass        |          `kg` |
| Force       |           `N` |
| Pressure    |          `Pa` |
| Time        |           `s` |

Important note:

```txt
Area = m²
Volume = m³
```

In Math.js we use:

```txt
m^2
m^3
```

In the UI we display:

```txt
m²
m³
```

---

# 8. Decimal separator

Defined rule:

```txt
Editable numeric inputs must use "." as the decimal separator.
Thousands separators must not be accepted in editable fields.
```

Accepted:

```txt
10
10.5
-10.5
0.25
2000.25
```

Not accepted:

```txt
10,5
1,000
1.000,25
2 000.25
```

Reason: avoids ambiguity in JavaScript, JSON, Math.js, formulas, APIs, and interoperability.

Base parser:

```js
export function parseNumber(text) {
  const value = String(text).trim();

  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    throw new Error(`Invalid numeric value: ${text}`);
  }

  return Number(value);
}
```

---

# 9. Internal resolution

The system is defined to resolve at most:

```txt
0.1 mm
```

Since length is stored internally in meters:

```txt
0.1 mm = 0.0001 m
```

File:

```txt
src/constants/internal-resolution.mjs
```

```js
export const INTERNAL_RESOLUTION = Object.freeze({
  length: {
    unit: "m",
    step: 0.0001
  },

  none: null,
  area: null,
  volume: null,
  angle: null,
  temperature: null,
  mass: null,
  force: null,
  pressure: null,
  time: null,
  ratio: null
});
```

For now, internal resolution is defined only for `length`.

Resolution may be defined later for:

```txt
angle
area
volume
pressure
temperature
```

But there is no reason to anticipate that now.

---

# 10. Apply internal resolution

File:

```txt
src/core/apply-internal-resolution.mjs
```

```js
import { INTERNAL_RESOLUTION } from "../constants/internal-resolution.mjs";

export function applyInternalResolution(value, quantity) {
  const resolution = INTERNAL_RESOLUTION[quantity];

  if (!resolution || typeof value !== "number") {
    return value;
  }

  return Math.round(value / resolution.step) * resolution.step;
}
```

Example:

```js
applyInternalResolution(2.123456, "length");
// 2.1235
```

That is:

```txt
2.123456 m becomes 2.1235 m
```

Equivalent to:

```txt
2123.456 mm becomes 2123.5 mm
```

---

# 11. Stored value model

Base structure:

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

This model preserves:

```txt
text typed by the user
typed value
typed unit
value converted to internal unit
internal unit used by the system
```

Important rule:

```txt
The UI may display the original input, but calculations, geometry, and interoperability must always use internal.
```

---

# 12. Create value from input

File:

```txt
src/core/create-value.mjs
```

```js
import { unit } from "mathjs";
import { INTERNAL_UNITS } from "../constants/internal-units.mjs";
import { applyInternalResolution } from "./apply-internal-resolution.mjs";

export function createValue({ text, valueType, quantity, inputUnit }) {
  if (valueType === "string") {
    return {
      valueType,
      quantity,
      input: { text, value: text },
      internal: { value: text }
    };
  }

  if (valueType === "boolean") {
    const value = parseBoolean(text);

    return {
      valueType,
      quantity,
      input: { text, value },
      internal: { value }
    };
  }

  const numericValue = parseNumber(text);
  const internalUnit = INTERNAL_UNITS[quantity];

  if (!internalUnit || !inputUnit) {
    return {
      valueType,
      quantity,
      input: { text, value: numericValue, unit: inputUnit },
      internal: { value: numericValue, unit: inputUnit }
    };
  }

  const convertedValue = unit(numericValue, inputUnit).toNumber(internalUnit);
  const internalValue = applyInternalResolution(convertedValue, quantity);

  return {
    valueType,
    quantity,
    input: { text, value: numericValue, unit: inputUnit },
    internal: { value: internalValue, unit: internalUnit }
  };
}

function parseNumber(text) {
  const value = String(text).trim();

  if (!/^-?\d+(\.\d+)?$/.test(value)) {
    throw new Error(`Invalid numeric value: ${text}`);
  }

  return Number(value);
}

function parseBoolean(text) {
  const value = String(text).trim().toLowerCase();

  return value === "true" || value === "yes" || value === "1";
}
```

---

# 13. Direct conversion

File:

```txt
src/core/convert-value.mjs
```

```js
import { unit } from "mathjs";

export function convertValue({ value, fromUnit, toUnit }) {
  if (!fromUnit || !toUnit || fromUnit === toUnit) {
    return value;
  }

  return unit(value, fromUnit).toNumber(toUnit);
}
```

Example:

```js
convertValue({
  value: 2000,
  fromUnit: "mm",
  toUnit: "m"
});
// 2
```

---

# 14. UI symbols

File:

```txt
src/constants/unit-symbols.mjs
```

```js
export const UNIT_SYMBOLS = Object.freeze({
  m: "m",
  cm: "cm",
  mm: "mm",

  "m^2": "m²",
  "m^3": "m³",

  rad: "rad",
  deg: "°",

  degC: "°C",
  degF: "°F",
  K: "K",

  kg: "kg",

  N: "N",
  kN: "kN",

  Pa: "Pa",
  kPa: "kPa",
  MPa: "MPa",
  bar: "bar",

  s: "s",
  min: "min",
  h: "h",

  percent: "%"
});
```

---

# 15. Maximum UI precision

The UI must not display or edit with more precision than the system stores.

For length:

```txt
internal resolution = 0.1 mm
```

Therefore:

| UI unit | Equivalent resolution | Max decimals |
| ------- | --------------------: | -----------: |
| `m`     |            `0.0001 m` |            4 |
| `cm`    |             `0.01 cm` |            2 |
| `mm`    |              `0.1 mm` |            1 |

File:

```txt
src/core/get-max-display-precision.mjs
```

```js
import { unit } from "mathjs";
import { INTERNAL_RESOLUTION } from "../constants/internal-resolution.mjs";

export function getMaxDisplayPrecision(quantity, displayUnit) {
  const resolution = INTERNAL_RESOLUTION[quantity];

  if (!resolution || !displayUnit) {
    return null;
  }

  const stepInDisplayUnit = unit(resolution.step, resolution.unit).toNumber(displayUnit);

  return countDecimals(stepInDisplayUnit);
}

function countDecimals(value) {
  const text = value.toFixed(12).replace(/0+$/, "");
  const dotIndex = text.indexOf(".");

  if (dotIndex === -1) {
    return 0;
  }

  return text.length - dotIndex - 1;
}
```

---

# 16. Resolve final precision

File:

```txt
src/core/resolve-display-precision.mjs
```

```js
import { getMaxDisplayPrecision } from "./get-max-display-precision.mjs";

export function resolveDisplayPrecision(quantity, displayUnit, requestedPrecision) {
  const maxPrecision = getMaxDisplayPrecision(quantity, displayUnit);

  if (maxPrecision === null) {
    return requestedPrecision ?? 2;
  }

  if (requestedPrecision === undefined || requestedPrecision === null) {
    return maxPrecision;
  }

  return Math.min(requestedPrecision, maxPrecision);
}
```

Example:

```js
resolveDisplayPrecision("length", "mm", 3);
// 1
```

Because the UI should not display:

```txt
2000.123 mm
```

If the system only guarantees:

```txt
2000.1 mm
```

---

# 17. Formatting for reading

Read mode is the user-friendly value.

Example:

```txt
2.002 m -> 2 m
```

File:

```txt
src/core/format-display-value.mjs
```

```js
import { format } from "mathjs";
import { UNIT_SYMBOLS } from "../constants/unit-symbols.mjs";
import { convertValue } from "./convert-value.mjs";
import { resolveDisplayPrecision } from "./resolve-display-precision.mjs";

export function formatDisplayValue(ogValue, options = {}) {
  const { internal, quantity } = ogValue;

  if (typeof internal.value !== "number") {
    return String(internal.value ?? "");
  }

  const displayUnit = options.unit ?? internal.unit;

  const displayValue = convertValue({
    value: internal.value,
    fromUnit: internal.unit,
    toUnit: displayUnit
  });

  const precision = resolveDisplayPrecision(
    quantity,
    displayUnit,
    options.precision
  );

  const text = format(displayValue, {
    notation: "fixed",
    precision
  });

  const prefix = options.prefix ?? "";
  const suffix = resolveSuffix(displayUnit, options);

  return `${prefix}${text}${suffix}`;
}

function resolveSuffix(unitName, options) {
  if (options.suffix !== undefined) {
    return options.suffix;
  }

  if (options.showUnit === false) {
    return "";
  }

  return ` ${UNIT_SYMBOLS[unitName] ?? unitName}`;
}
```

Usage:

```js
formatDisplayValue(value, {
  unit: "m",
  precision: 0
});
// "2 m"
```

---

# 18. Formatting for editing

Edit mode must not mix number with unit.

Correct:

```txt
2.002
```

Incorrect:

```txt
2.002 m
```

File:

```txt
src/core/format-edit-value.mjs
```

```js
import { format } from "mathjs";
import { convertValue } from "./convert-value.mjs";
import { resolveDisplayPrecision } from "./resolve-display-precision.mjs";

export function formatEditValue(ogValue, options = {}) {
  const { internal, quantity } = ogValue;

  if (typeof internal.value !== "number") {
    return String(internal.value ?? "");
  }

  const editUnit = options.unit ?? internal.unit;

  const editValue = convertValue({
    value: internal.value,
    fromUnit: internal.unit,
    toUnit: editUnit
  });

  const precision = resolveDisplayPrecision(
    quantity,
    editUnit,
    options.precision
  );

  return format(editValue, {
    notation: "fixed",
    precision
  });
}
```

Usage:

```js
formatEditValue(value, {
  unit: "cm",
  precision: 3
});
// for length, automatically capped by internal resolution
```

---

# 19. UI flow

## On input

```txt
User types: 2002
Current UI unit: mm
Quantity: length

System creates:
input.value = 2002
input.unit = mm
internal.value = 2.002
internal.unit = m
```

## On display

```txt
System reads internal
converts to display unit
applies allowed precision
applies prefix/suffix
shows user-friendly value
```

## On edit

```txt
System reads internal
converts to current UI unit
applies maximum allowed precision
shows only the number in the input
```

The unit must appear in the label, select, or adornment of the field.

---

# 20. Family property

Example:

```js
const outsideDiameterProperty = {
  id: "outsideDiameter",
  name: "Outside Diameter",
  valueType: "float",
  quantity: "length",

  defaultInputUnit: "mm",

  display: {
    unit: "mm",
    precision: 1,
    editPrecision: 1
  }
};
```

Creating a value:

```js
const value = createValue({
  text: "200.25",
  valueType: outsideDiameterProperty.valueType,
  quantity: outsideDiameterProperty.quantity,
  inputUnit: outsideDiameterProperty.defaultInputUnit
});
```

Internal result:

```js
{
  valueType: "float",
  quantity: "length",

  input: {
    text: "200.25",
    value: 200.25,
    unit: "mm"
  },

  internal: {
    value: 0.2003,
    unit: "m"
  }
}
```

Because `200.25 mm` rounds to `200.3 mm`, respecting the `0.1 mm` resolution.

---

# 21. Unit preference per user/project

UI preferences must not be stored inside each value.

Example:

```js
const unitPreferences = {
  length: "mm",
  area: "m^2",
  volume: "m^3",
  angle: "deg",
  temperature: "degC",
  pressure: "bar",
  force: "kN"
};
```

Display unit resolution order:

```txt
1. property-specific configuration
2. user preference
3. project preference
4. internal unit
```

---

# 22. Central export

File:

```txt
src/index.mjs
```

```js
export { VALUE_TYPES } from "./constants/value-types.mjs";
export { QUANTITY_TYPES } from "./constants/quantity-types.mjs";
export { INTERNAL_UNITS } from "./constants/internal-units.mjs";
export { INTERNAL_RESOLUTION } from "./constants/internal-resolution.mjs";
export { UNIT_SYMBOLS } from "./constants/unit-symbols.mjs";

export { createValue } from "./core/create-value.mjs";
export { convertValue } from "./core/convert-value.mjs";
export { applyInternalResolution } from "./core/apply-internal-resolution.mjs";
export { getMaxDisplayPrecision } from "./core/get-max-display-precision.mjs";
export { resolveDisplayPrecision } from "./core/resolve-display-precision.mjs";
export { formatDisplayValue } from "./core/format-display-value.mjs";
export { formatEditValue } from "./core/format-edit-value.mjs";
```

Usage:

```js
import {
  createValue,
  formatDisplayValue,
  formatEditValue
} from "./opengeometry-values/src/index.mjs";
```

---

# 23. Full example

```js
import {
  createValue,
  formatDisplayValue,
  formatEditValue
} from "./src/index.mjs";

const value = createValue({
  text: "2002",
  valueType: "float",
  quantity: "length",
  inputUnit: "mm"
});

console.log(value.internal);
// { value: 2.002, unit: "m" }

console.log(formatDisplayValue(value, {
  unit: "m",
  precision: 0
}));
// "2 m"

console.log(formatEditValue(value, {
  unit: "m",
  precision: 4
}));
// "2.0020"

console.log(formatEditValue(value, {
  unit: "mm",
  precision: 4
}));
// "2002.0"
```

The last call returns only one decimal place because, in `mm`, the maximum allowed is `1`.

---

# 24. Final module rules

Consolidated decisions:

```txt
1. The system uses pure JavaScript in .mjs ES6+ files.

2. Math.js will be used for unit conversion and calculation.

3. OpenGeometry Values defines the domain model.

4. Numeric values with a quantity must be stored with original input and internal value.

5. Internal length is stored in meters.

6. Internal angle is stored in radians.

7. Internal area is stored in m^2.

8. Internal volume is stored in m^3.

9. Initial temperature is stored in degC.

10. Internal pressure is stored in Pa.

11. Editable numeric input uses "." as the decimal separator.

12. Thousands separators are not accepted in the MVP.

13. Internal resolution for length is 0.1 mm.

14. The UI must not display or edit with more precision than the internal resolution.

15. Read mode may include suffix, prefix, and unit symbol.

16. Edit mode must show only the number.

17. Unit preference belongs to the UI/project/user, not to the stored value.

18. Calculations, geometry, and interoperability must always use internal.value.
```

---

# 25. MVP scope

Implement now:

```txt
value types:
string
integer
float
boolean

quantities:
none
length
area
volume
angle
temperature
mass
force
pressure
time
ratio

core:
createValue()
convertValue()
applyInternalResolution()
getMaxDisplayPrecision()
resolveDisplayPrecision()
formatDisplayValue()
formatEditValue()
```

Do not implement yet:

```txt
formulas
DMS for angle
enum
custom units
complex masks
numeric i18n
BigNumber
industry-specific units
normative catalogs
```

---

# 26. Architectural summary

```txt
Math.js
  unit, conversion, numeric formatting

opengeometry-values
  structured value, internal unit, internal resolution, domain rules

OpenGeometry UI
  unit preference, precision, prefix, suffix, read/edit mode

OpenGeometry Core
  geometry, families, constraints, catalogs, and interoperability using internal.value
```

The most important rule:

```txt
Never calculate geometry using the text typed by the user.
Always calculate using internal.value and internal.unit.
```

This plan keeps the module simple, predictable, compatible with `.mjs`, reuses Math.js, and already creates a healthy foundation for parametric families, catalogs, formulas, technical UI, and interoperability.
