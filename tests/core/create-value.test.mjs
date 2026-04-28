import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue, tryCreateValue } from "../../src/core/create-value.mjs";
import { ValueInputError } from "../../src/core/errors/value-input-error.mjs";
import { CustomOutputAffix } from "../../src/core/models/custom-output-affix.mjs";
import { Output } from "../../src/core/models/output.mjs";

describe("createValue", () => {
  it("preserves string values without numeric conversion", () => {
    const value = createValue({
      value: "pipe-A",
      valueType: VALUE_TYPES.STRING,
      quantity: QUANTITY_TYPES.NONE
    });

    expect(value.input.value).toBe("pipe-A");
    expect(value.input.unit).toBe(QUANTITY_TYPES.NONE);
    expect(typeof value.input.id).toBe("string");
    expect(value.input.internal).toBe(value.internal);
    expect(value.internal.value).toBe("pipe-A");
    expect(Object.isFrozen(value)).toBe(true);
  });

  it("parses boolean values using the specialist parser", () => {
    const value = createValue({
      value: "yes",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.NONE
    });

    expect(value.input.value).toBe(true);
    expect(value.input.unit).toBe(QUANTITY_TYPES.NONE);
    expect(typeof value.input.output.id).toBe("string");
    expect(value.internal.value).toBe(true);
  });

  it("normalizes numeric values into the internal unit and applies internal resolution", () => {
    const value = createValue({
      value: 2002,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });

    expect(value.input.value).toBe(2002);
    expect(value.input.unit).toBe(UNIT_TOKENS.MILLIMETER);
    expect(value.input.quantity).toBe(QUANTITY_TYPES.LENGTH);
    expect(value.input.internal).toBe(value.internal);
    expect(value.input.output.unit).toBe(UNIT_TOKENS.MILLIMETER);
    expect(value.internal).toEqual({ value: 2.002, unit: UNIT_TOKENS.METER });
  });

  it("attaches a typed output with affix ids to the input", () => {
    const output = new Output({
      id: "output:length:display",
      unit: UNIT_TOKENS.METER,
      precision: 0,
      prefix: new CustomOutputAffix({
        id: "prefix:approx",
        characters: "~ "
      }),
      suffix: new CustomOutputAffix({
        id: "suffix:custom-unit",
        characters: " m ref"
      })
    });

    const value = createValue({
      id: "input:length:primary",
      value: 2002,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER,
      output
    });

    expect(value.input.id).toBe("input:length:primary");
    expect(value.input.output.id).toBe("output:length:display");
    expect(value.input.output.prefix.id).toBe("prefix:approx");
    expect(value.input.output.suffix.id).toBe("suffix:custom-unit");
    expect(value.input.formatForDisplay()).toBe("~ 2 m ref");
  });

  it("rejects decimal values for integer type", () => {
    expect(() => createValue({
      value: 10.5,
      valueType: VALUE_TYPES.INTEGER,
      quantity: QUANTITY_TYPES.NONE
    })).toThrow("Invalid integer value");
  });

  it("returns a structured validation result for invalid numeric text", () => {
    const result = tryCreateValue({
      value: "10,5",
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });

    expect(result.ok).toBe(false);
    expect(result.error).toBeInstanceOf(ValueInputError);
    expect(result.error.toJSON()).toEqual({
      code: "invalid_numeric_value",
      field: "value",
      message: "Invalid numeric value: 10,5",
      value: "10,5",
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });
  });

  it("returns a structured validation result for unsupported known units", () => {
    const result = tryCreateValue({
      value: 90,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.DEGREE
    });

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("unsupported_input_unit");
    expect(result.error.field).toBe("unit");
    expect(result.error.message).toBe("Unsupported input unit: deg");
  });

  it("returns a structured validation result for unknown units", () => {
    const result = tryCreateValue({
      value: 90,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.ANGLE,
      unit: "foo"
    });

    expect(result.ok).toBe(false);
    expect(result.error.code).toBe("unknown_input_unit");
    expect(result.error.field).toBe("unit");
    expect(result.error.message).toBe("Unknown input unit: foo");
  });
});