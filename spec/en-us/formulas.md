# Formulas

A formula is a mathjs expression prefixed with `=` that is evaluated when a value is created. The result enters the normal pipeline: unit conversion, internal resolution, and type validation all apply.

---

## Input forms

There are three ways to provide a numeric input:

| Form | Example | Description |
| ---- | ------- | ----------- |
| Plain number | `200` | Literal number; unit comes from the UI parameter |
| Unit-embedded number | `4000mm` | Number with inline unit; inline unit wins over parameter |
| Formula | `=2*3` or `=4 m + 200 cm` | mathjs expression; may include inline units |

---

## Syntax

### Plain formula (dimensionless)

```txt
=<expression>
```

The expression evaluates to a plain number. The unit is taken from the UI parameter.

```txt
=2 + 3
=sqrt(3^2 + 4^2)
=2 * pi
=sin(pi / 6)
```

### Formula with embedded units

```txt
=<expression with mathjs unit tokens>
```

The expression carries units and mathjs resolves the unit arithmetic. The inline units take precedence over the parameter unit.

```txt
=4 m + 200 cm
=2 m^2 + 5000 cm^2
=1 m^3 + 500 L
=90 deg + 45 deg
=1 kN + 500 N
=1 MPa + 500 kPa
=1 h + 30 min
```

### Unit-embedded number (no `=`)

```txt
<number><unit>
```

A number immediately followed by a recognized unit token. No equals prefix. The inline unit wins over the parameter unit.

```txt
4000mm
2m
200cm
7h
500g
```

---

## How it works

### Plain formula

```txt
User types:        =sqrt(3^2 + 4^2)
Parameter unit:    m
Quantity:          length

Formula evaluates to: 5
System creates:
  input.value              = "=sqrt(3^2 + 4^2)"
  input.unit               = m
  input.formulaHasEmbeddedUnits = false
  internal.value           = 5
  internal.unit            = m
```

### Formula with embedded units

```txt
User types:        =4 m + 200 cm
Parameter unit:    m  (ignored - inline units win)
Quantity:          length

Formula evaluates to: 6 m  (mathjs unit result)
System creates:
  input.value              = "=4 m + 200 cm"
  input.unit               = m   (the internal unit)
  input.formulaHasEmbeddedUnits = true
  internal.value           = 6
  internal.unit            = m
```

### Unit-embedded number

```txt
User types:        4000mm
Parameter unit:    m  (ignored - inline unit wins)
Quantity:          length

System creates:
  input.value   = "4000mm"
  input.unit    = mm
  internal.value = 4
  internal.unit  = m
```

---

## Edit behavior

When the user later edits a value in a different unit, the edit text differs by input form:

| Input form | Original | Edit unit | Edit text |
| ---------- | -------- | --------- | --------- |
| Plain number | `200` in mm | m | `2` |
| Unit-embedded number | `4000mm` | m | `4` |
| Plain formula | `=2*3` in m | cm | `=2*3 m` |
| Formula with embedded units | `=4 m + 200 cm` | cm | `=4 m + 200 cm` |

Rules:
- **Formula with embedded units** - always returns the formula text as-is.
- **Plain formula** - appends the original unit when the edit unit differs from the original (`=2*3 m`). Returns formula text unchanged when the edit unit matches.
- **Plain number / unit-embedded number** - converts to the edit unit and returns the numeric text.

---

## Applicable value types

Formulas apply to numeric value types only:

| Value type | Accepts formula |
| ---------- | --------------- |
| `float`    | yes             |
| `integer`  | yes - result must be a whole number |
| `string`   | no              |
| `boolean`  | no              |

---

## Applicable quantities

All quantity types accept formulas. For embedded unit formulas, the units in the expression must be compatible with the quantity (e.g., a length quantity cannot use a temperature formula).

---

## Supported expressions

### Arithmetic operators

| Operator | Meaning        | Example        | Result |
| -------- | -------------- | -------------- | ------ |
| `+`      | addition       | `=2 + 3`       | `5`    |
| `-`      | subtraction    | `=10 - 4`      | `6`    |
| `*`      | multiplication | `=3 * 4`       | `12`   |
| `/`      | division       | `=10 / 4`      | `2.5`  |
| `^`      | exponentiation | `=2^10`        | `1024` |
| `-` (unary) | negation    | `=-5`          | `-5`   |

Parentheses `()` group sub-expressions and override precedence.

### Constants

| Name  | Value (approx.)    | Example      |
| ----- | ------------------ | ------------ |
| `pi`  | 3.14159265358979   | `=2 * pi`    |
| `e`   | 2.71828182845904   | `=exp(1)`    |
| `phi` | 1.61803398874989   | `=phi`       |

### General math functions

| Function          | Description                             | Example               |
| ----------------- | --------------------------------------- | --------------------- |
| `sqrt(x)`         | square root                             | `=sqrt(9)` → `3`      |
| `abs(x)`          | absolute value                          | `=abs(-7)` → `7`      |
| `ceil(x)`         | round up                                | `=ceil(4.2)` → `5`    |
| `floor(x)`        | round down                              | `=floor(4.9)` → `4`   |
| `round(x)`        | round to nearest integer                | `=round(4.5)` → `5`   |
| `exp(x)`          | e raised to the power x                 | `=exp(1)` → `2.718…`  |
| `log(x, base)`    | logarithm of x in given base            | `=log(100, 10)` → `2` |
| `log10(x)`        | base-10 logarithm                       | `=log10(1000)` → `3`  |
| `min(a, b, ...)`  | smallest of the arguments               | `=min(3, 1, 2)` → `1` |
| `max(a, b, ...)`  | largest of the arguments                | `=max(3, 1, 2)` → `3` |

### Trigonometric functions

All angles are in **radians**.

| Function       | Description                          | Example                    |
| -------------- | ------------------------------------ | -------------------------- |
| `sin(x)`       | sine                                 | `=sin(0)` → `0`            |
| `cos(x)`       | cosine                               | `=cos(0)` → `1`            |
| `tan(x)`       | tangent                              | `=tan(0)` → `0`            |
| `asin(x)`      | inverse sine                         | `=asin(1)` → `pi/2`        |
| `acos(x)`      | inverse cosine                       | `=acos(1)` → `0`           |
| `atan(x)`      | inverse tangent                      | `=atan(1)` → `pi/4`        |
| `atan2(y, x)`  | two-argument inverse tangent         | `=atan2(1, 1)` → `pi/4`    |

> To convert degrees to radians inside a formula: multiply by `pi / 180`.
> Example: `=sin(30 * pi / 180)` → `0.5`

---

## Known limitations

- **Temperature addition**: mathjs does not support adding two absolute temperatures. `=20 degC + 5 degC` is not valid. Use plain formulas for temperature arithmetic: `=20 + 5` with parameter unit `degC`.
- **`min` token**: the `min` unit (minute) conflicts with mathjs's `min()` function. The parser automatically replaces standalone `min` tokens with `minute` before evaluation, so `=1 h + 30 min` works as expected. `min()` function calls are unaffected.

---

## Error handling

A formula that cannot be evaluated, or whose result is incompatible with the quantity, produces a `ValueInputError`:

| Condition | Error code |
| --------- | ---------- |
| Empty expression | `invalid_formula_expression` |
| Undefined variable or function | `invalid_formula_expression` |
| Syntax error | `invalid_formula_expression` |
| Division by zero (Infinity) | `invalid_formula_expression` |
| Complex or non-finite result | `invalid_formula_expression` |
| Non-numeric result (no unit, not a number) | `invalid_formula_expression` |
| Embedded unit incompatible with quantity | `invalid_formula_expression` |
| `integer` value type with fractional result | `invalid_integer_value` |

---

## Full examples

```js
import { createValue } from "@dricosr/iforge-edp-values";

// Plain formula: Pythagorean hypotenuse
const hypotenuse = createValue({
  value: "=sqrt(3^2 + 4^2)",
  valueType: "float",
  quantity: "length",
  unit: "m"
});
// internal.value = 5, internal.unit = "m"

// Embedded unit formula: length addition
const beam = createValue({
  value: "=4 m + 200 cm",
  valueType: "float",
  quantity: "length",
  unit: "m"
});
// internal.value = 6, internal.unit = "m"

// Unit-embedded number: user typed mm inline
const slab = createValue({
  value: "4000mm",
  valueType: "float",
  quantity: "length",
  unit: "m"   // parameter unit - overridden by inline mm
});
// internal.value = 4, internal.unit = "m"

// Time formula
const duration = createValue({
  value: "=1 h + 30 min",
  valueType: "float",
  quantity: "time",
  unit: "h"
});
// internal.value = 5400, internal.unit = "s"
```
