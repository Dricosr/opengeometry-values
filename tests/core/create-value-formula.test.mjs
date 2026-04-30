import { describe, expect, it } from "vitest";
import { DOMAIN } from "../../src/constants/domain-catalog.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue, tryCreateValue } from "../../src/core/create-value.mjs";
import { ValueInputError } from "../../src/core/errors/value-input-error.mjs";
import { Output } from "../../src/core/models/output.mjs";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function make(value, unit, quantity = QUANTITY_TYPES.LENGTH, valueType = VALUE_TYPES.NUMBER) {
  return createValue({ value, unit, quantity, valueType });
}

function editIn(value, unit, quantity = QUANTITY_TYPES.LENGTH) {
  const output = new Output({ unit, showUnit: false });
  const v = createValue({ value, unit: unit, quantity, valueType: VALUE_TYPES.NUMBER, output });
  return v.input.formatForEdit();
}

function editInDifferent(inputValue, inputUnit, editUnit, quantity = QUANTITY_TYPES.LENGTH) {
  const v = createValue({ value: inputValue, unit: inputUnit, quantity, valueType: VALUE_TYPES.NUMBER });
  const output = new Output({ unit: editUnit, showUnit: false });
  const withOutput = createValue({
    value: inputValue, unit: inputUnit, quantity, valueType: VALUE_TYPES.NUMBER, output
  });
  return withOutput.input.formatForEdit();
}

// ─────────────────────────────────────────────────────────────────────────────
// Plain number input - unchanged behavior
// ─────────────────────────────────────────────────────────────────────────────

describe("createValue - plain number input (unchanged behavior)", () => {
  it("stores numeric input value and converts to internal unit", () => {
    const v = make(200, UNIT_TOKENS.CENTIMETER);
    expect(v.input.value).toBe(200);
    expect(v.input.unit).toBe("cm");
    expect(v.internal.value).toBeCloseTo(2, 10);
    expect(v.internal.unit).toBe("m");
    expect(v.input.formulaHasEmbeddedUnits).toBe(false);
  });

  it("edit in same unit returns converted number", () => {
    const v = make(200, UNIT_TOKENS.CENTIMETER);
    const edit = v.input.formatForEdit();
    expect(edit).toBe("200.0000");
  });

  it("edit in different unit still converts numerically", () => {
    const result = editInDifferent(200, UNIT_TOKENS.CENTIMETER, UNIT_TOKENS.MILLIMETER);
    expect(result).toBe("2000.000");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Unit-embedded numeric input ("2m", "4000mm")
// ─────────────────────────────────────────────────────────────────────────────

describe("createValue - unit-embedded numeric input", () => {
  it("parses 4000mm and converts to internal unit", () => {
    const v = make("4000mm", UNIT_TOKENS.MILLIMETER);
    expect(v.input.value).toBe("4000mm");
    expect(v.input.unit).toBe("mm");
    expect(v.internal.value).toBeCloseTo(4, 10);
    expect(v.internal.unit).toBe("m");
  });

  it("parses 2m and stores correctly", () => {
    const v = make("2m", UNIT_TOKENS.METER);
    expect(v.input.value).toBe("2m");
    expect(v.input.unit).toBe("m");
    expect(v.internal.value).toBeCloseTo(2, 10);
  });

  it("inline unit wins over parameter unit", () => {
    const v = createValue({
      value: "200cm",
      unit: UNIT_TOKENS.MILLIMETER,
      quantity: QUANTITY_TYPES.LENGTH,
      valueType: VALUE_TYPES.NUMBER
    });
    expect(v.input.unit).toBe("cm");
    expect(v.internal.value).toBeCloseTo(2, 10);
  });

  it("parses 1h for time quantity", () => {
    const v = createValue({ value: "1h", unit: UNIT_TOKENS.HOUR, quantity: QUANTITY_TYPES.TIME, valueType: VALUE_TYPES.NUMBER });
    expect(v.input.unit).toBe("h");
    expect(v.internal.value).toBeCloseTo(3600, 5);
    expect(v.internal.unit).toBe("s");
  });

  it("edit in different unit converts numerically (no formula suffix)", () => {
    const result = editInDifferent("200cm", UNIT_TOKENS.CENTIMETER, UNIT_TOKENS.MILLIMETER);
    expect(result).toBe("2000.000");
  });

  it("formulaHasEmbeddedUnits is false for unit input", () => {
    const v = make("4000mm", UNIT_TOKENS.MILLIMETER);
    expect(v.input.formulaHasEmbeddedUnits).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Formula - plain number (no embedded units)
// ─────────────────────────────────────────────────────────────────────────────

describe("createValue - formula with plain number result", () => {
  it("stores formula text in input.value and computes internal", () => {
    const v = make("=sqrt(4)", UNIT_TOKENS.METER);
    expect(v.input.value).toBe("=sqrt(4)");
    expect(v.input.unit).toBe("m");
    expect(v.internal.value).toBeCloseTo(2, 10);
    expect(v.input.formulaHasEmbeddedUnits).toBe(false);
  });

  it("evaluates formula with pi for angle", () => {
    const v = createValue({ value: "=pi", unit: UNIT_TOKENS.RADIAN, quantity: QUANTITY_TYPES.ANGLE, valueType: VALUE_TYPES.NUMBER });
    expect(v.input.value).toBe("=pi");
    expect(v.internal.value).toBeCloseTo(Math.PI, 8);
  });

  it("edit in same unit returns bare formula", () => {
    const v = createValue({
      value: "=sqrt(4)",
      unit: UNIT_TOKENS.METER,
      quantity: QUANTITY_TYPES.LENGTH,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.METER, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=sqrt(4)");
  });

  it("edit in different unit appends original unit to formula", () => {
    const v = createValue({
      value: "=sqrt(4)",
      unit: UNIT_TOKENS.CENTIMETER,
      quantity: QUANTITY_TYPES.LENGTH,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.MILLIMETER, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=sqrt(4) cm");
  });

  it("integer formula with whole-number result is accepted", () => {
    const v = createValue({ value: "=3 * 4", unit: UNIT_TOKENS.UN, quantity: QUANTITY_TYPES.NONE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBe(12);
  });

  it("integer formula with fractional result is rejected", () => {
    expect(() => createValue({ value: "=3.5", unit: UNIT_TOKENS.UN, quantity: QUANTITY_TYPES.NONE, valueType: VALUE_TYPES.NUMBER })).toThrow(ValueInputError);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Formula - embedded units (all quantities)
// ─────────────────────────────────────────────────────────────────────────────

describe("createValue - formula with embedded units - length", () => {
  it("resolves 4m + 2cm to 4.02 m", () => {
    const v = make("=4m + 2cm", UNIT_TOKENS.METER);
    expect(v.internal.value).toBeCloseTo(4.02, 10);
    expect(v.internal.unit).toBe("m");
    expect(v.input.formulaHasEmbeddedUnits).toBe(true);
  });

  it("resolves 1000mm + 5cm to 1.05 m", () => {
    const v = make("=1000mm + 5cm", UNIT_TOKENS.METER);
    expect(v.internal.value).toBeCloseTo(1.05, 10);
  });

  it("resolves 2 in + 3 mm", () => {
    const v = make("=2 in + 3 mm", UNIT_TOKENS.METER);
    expect(v.internal.value).toBeCloseTo(0.0508 + 0.003, 6);
  });

  it("resolves scalar multiplication: 2 * 3 m", () => {
    const v = make("=2 * 3 m", UNIT_TOKENS.METER);
    expect(v.internal.value).toBeCloseTo(6, 10);
  });

  it("resolves sqrt(4) m", () => {
    const v = make("=sqrt(4) m", UNIT_TOKENS.METER);
    expect(v.internal.value).toBeCloseTo(2, 10);
    expect(v.input.formulaHasEmbeddedUnits).toBe(true);
  });

  it("resolves sqrt(4) mm - converts to m", () => {
    const v = make("=sqrt(4) mm", UNIT_TOKENS.MILLIMETER);
    expect(v.internal.value).toBeCloseTo(0.002, 10);
  });

  it("edit always returns formula as-is regardless of output unit", () => {
    const v = createValue({
      value: "=4m + 2cm",
      unit: UNIT_TOKENS.METER,
      quantity: QUANTITY_TYPES.LENGTH,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.MILLIMETER, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=4m + 2cm");
  });
});

describe("createValue - formula with embedded units - area", () => {
  it("resolves 2 m^2", () => {
    const v = createValue({ value: "=2 m^2", unit: UNIT_TOKENS.SQUARE_METER, quantity: QUANTITY_TYPES.AREA, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(2, 10);
    expect(v.internal.unit).toBe("m^2");
  });

  it("resolves 1 m^2 + 5000 cm^2", () => {
    const v = createValue({ value: "=1 m^2 + 5000 cm^2", unit: UNIT_TOKENS.SQUARE_METER, quantity: QUANTITY_TYPES.AREA, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1.5, 10);
  });

  it("edit returns formula as-is", () => {
    const v = createValue({
      value: "=2 m^2",
      unit: UNIT_TOKENS.SQUARE_METER,
      quantity: QUANTITY_TYPES.AREA,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.SQUARE_CENTIMETER, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=2 m^2");
  });
});

describe("createValue - formula with embedded units - volume", () => {
  it("resolves 1 m^3", () => {
    const v = createValue({ value: "=1 m^3", unit: UNIT_TOKENS.CUBIC_METER, quantity: QUANTITY_TYPES.VOLUME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1, 10);
  });

  it("resolves 1000 L to 1 m^3", () => {
    const v = createValue({ value: "=1000 L", unit: UNIT_TOKENS.CUBIC_METER, quantity: QUANTITY_TYPES.VOLUME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1, 10);
  });

  it("resolves 1 m^3 + 500 L", () => {
    const v = createValue({ value: "=1 m^3 + 500 L", unit: UNIT_TOKENS.CUBIC_METER, quantity: QUANTITY_TYPES.VOLUME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1.5, 10);
  });
});

describe("createValue - formula with embedded units - angle", () => {
  it("resolves 90 deg to radians", () => {
    const v = createValue({ value: "=90 deg", unit: UNIT_TOKENS.RADIAN, quantity: QUANTITY_TYPES.ANGLE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(Math.PI / 2, 8);
  });

  it("resolves 45 deg + 30 deg", () => {
    const v = createValue({ value: "=45 deg + 30 deg", unit: UNIT_TOKENS.RADIAN, quantity: QUANTITY_TYPES.ANGLE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(75 * Math.PI / 180, 8);
  });

  it("resolves 2 deg * 2", () => {
    const v = createValue({ value: "=2 deg * 2", unit: UNIT_TOKENS.RADIAN, quantity: QUANTITY_TYPES.ANGLE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(4 * Math.PI / 180, 8);
  });

  it("resolves pi rad", () => {
    const v = createValue({ value: "=pi rad", unit: UNIT_TOKENS.RADIAN, quantity: QUANTITY_TYPES.ANGLE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(Math.PI, 8);
  });

  it("edit in deg returns formula as-is (embedded units)", () => {
    const v = createValue({
      value: "=45 deg + 30 deg",
      unit: UNIT_TOKENS.RADIAN,
      quantity: QUANTITY_TYPES.ANGLE,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.DEGREE, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=45 deg + 30 deg");
  });
});

describe("createValue - formula with embedded units - temperature", () => {
  it("resolves 100 degF to degC", () => {
    const v = createValue({ value: "=100 degF", unit: UNIT_TOKENS.DEGREE_CELSIUS, quantity: QUANTITY_TYPES.TEMPERATURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(37.778, 2);
  });

  it("resolves 273.15 K to degC", () => {
    const v = createValue({ value: "=273.15 K", unit: UNIT_TOKENS.DEGREE_CELSIUS, quantity: QUANTITY_TYPES.TEMPERATURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(0, 3);
  });

  it("resolves 20 degC", () => {
    const v = createValue({ value: "=20 degC", unit: UNIT_TOKENS.DEGREE_CELSIUS, quantity: QUANTITY_TYPES.TEMPERATURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(20, 10);
  });

  it("edit in degF returns formula as-is", () => {
    const v = createValue({
      value: "=100 degF",
      unit: UNIT_TOKENS.DEGREE_CELSIUS,
      quantity: QUANTITY_TYPES.TEMPERATURE,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.DEGREE_FAHRENHEIT, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=100 degF");
  });
});

describe("createValue - formula with embedded units - mass", () => {
  it("resolves 5 kg", () => {
    const v = createValue({ value: "=5 kg", unit: UNIT_TOKENS.KILOGRAM, quantity: QUANTITY_TYPES.MASS, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(5, 10);
  });

  it("resolves 5 kg + 500 g", () => {
    const v = createValue({ value: "=5 kg + 500 g", unit: UNIT_TOKENS.KILOGRAM, quantity: QUANTITY_TYPES.MASS, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(5.5, 10);
  });
});

describe("createValue - formula with embedded units - force", () => {
  it("resolves 1 kN to N", () => {
    const v = createValue({ value: "=1 kN", unit: UNIT_TOKENS.NEWTON, quantity: QUANTITY_TYPES.FORCE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1000, 10);
  });

  it("resolves 1 kN + 500 N", () => {
    const v = createValue({ value: "=1 kN + 500 N", unit: UNIT_TOKENS.NEWTON, quantity: QUANTITY_TYPES.FORCE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(1500, 10);
  });

  it("resolves 2.5 kN * 2", () => {
    const v = createValue({ value: "=2.5 kN * 2", unit: UNIT_TOKENS.NEWTON, quantity: QUANTITY_TYPES.FORCE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(5000, 10);
  });
});

describe("createValue - formula with embedded units - pressure", () => {
  it("resolves 1 bar to Pa", () => {
    const v = createValue({ value: "=1 bar", unit: UNIT_TOKENS.PASCAL, quantity: QUANTITY_TYPES.PRESSURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(100000, 10);
  });

  it("resolves 1 bar + 50 kPa", () => {
    const v = createValue({ value: "=1 bar + 50 kPa", unit: UNIT_TOKENS.PASCAL, quantity: QUANTITY_TYPES.PRESSURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(150000, 10);
  });

  it("resolves 250 MPa", () => {
    const v = createValue({ value: "=250 MPa", unit: UNIT_TOKENS.PASCAL, quantity: QUANTITY_TYPES.PRESSURE, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(250000000, 5);
  });
});

describe("createValue - formula with embedded units - time", () => {
  it("resolves 1 h to seconds", () => {
    const v = createValue({ value: "=1 h", unit: UNIT_TOKENS.SECOND, quantity: QUANTITY_TYPES.TIME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(3600, 5);
  });

  it("resolves 1 h + 30 min", () => {
    const v = createValue({ value: "=1 h + 30 min", unit: UNIT_TOKENS.SECOND, quantity: QUANTITY_TYPES.TIME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(5400, 5);
  });

  it("resolves 2 h - 15 min", () => {
    const v = createValue({ value: "=2 h - 15 min", unit: UNIT_TOKENS.SECOND, quantity: QUANTITY_TYPES.TIME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(6300, 5);
  });

  it("resolves 90 min", () => {
    const v = createValue({ value: "=90 min", unit: UNIT_TOKENS.SECOND, quantity: QUANTITY_TYPES.TIME, valueType: VALUE_TYPES.NUMBER });
    expect(v.internal.value).toBeCloseTo(5400, 5);
  });

  it("edit returns formula as-is", () => {
    const v = createValue({
      value: "=1 h + 30 min",
      unit: UNIT_TOKENS.SECOND,
      quantity: QUANTITY_TYPES.TIME,
      valueType: VALUE_TYPES.NUMBER,
      output: new Output({ unit: UNIT_TOKENS.MINUTE, showUnit: false })
    });
    expect(v.input.formatForEdit()).toBe("=1 h + 30 min");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Error cases
// ─────────────────────────────────────────────────────────────────────────────

describe("createValue - formula error cases", () => {
  it("throws invalid_formula_expression for invalid expression", () => {
    const result = tryCreateValue({ value: "=2 + invalid", unit: UNIT_TOKENS.METER, quantity: QUANTITY_TYPES.LENGTH, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION);
  });

  it("throws invalid_formula_expression for empty formula", () => {
    const result = tryCreateValue({ value: "=", unit: UNIT_TOKENS.METER, quantity: QUANTITY_TYPES.LENGTH, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION);
  });

  it("throws invalid_formula_expression for division by zero", () => {
    const result = tryCreateValue({ value: "=1 / 0", unit: QUANTITY_TYPES.NONE, quantity: QUANTITY_TYPES.NONE, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION);
  });

  it("throws invalid_formula_expression when embedded unit is incompatible with quantity", () => {
    const result = tryCreateValue({ value: "=4m + 2cm", unit: UNIT_TOKENS.SQUARE_METER, quantity: QUANTITY_TYPES.AREA, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION);
  });

  it("throws invalid_formula_expression for mixed incompatible units", () => {
    const result = tryCreateValue({ value: "=4m + 2 kg", unit: UNIT_TOKENS.METER, quantity: QUANTITY_TYPES.LENGTH, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION);
  });

  it("throws invalid_integer_value when formula result is fractional for UN unit", () => {
    const result = tryCreateValue({ value: "=3.5", unit: UNIT_TOKENS.UN, quantity: QUANTITY_TYPES.NONE, valueType: VALUE_TYPES.NUMBER });
    expect(result.ok).toBe(false);
    expect(result.error.code).toBe(DOMAIN.ERROR_CODE_INVALID_INTEGER_VALUE);
  });
});
