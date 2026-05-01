import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue } from "../../src/core/create-value.mjs";
import { formatEditValue } from "../../src/core/format-edit-value.mjs";

describe("formatEditValue", () => {
  it("formats edit text without unit suffix and caps precision", () => {
    const value = createValue({
      value: 2002,
      valueType: VALUE_TYPES.NUMBER,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });

    expect(formatEditValue(value, {
      unit: UNIT_TOKENS.MILLIMETER,
      precision: 4
    })).toBe("2002.000");
  });

  it("returns 0/1 for boolean values in edit mode", () => {
    const valueFalse = createValue({
      value: "no",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    expect(formatEditValue(valueFalse, { unit: UNIT_TOKENS.BOOL })).toBe("0");

    const valueTrue = createValue({
      value: "yes",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    expect(formatEditValue(valueTrue, { unit: UNIT_TOKENS.BOOL })).toBe("1");
  });
});
