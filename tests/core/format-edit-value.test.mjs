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
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });

    expect(formatEditValue(value, {
      unit: UNIT_TOKENS.MILLIMETER,
      precision: 4
    })).toBe("2002.000");
  });

  it("returns plain text for non-numeric values", () => {
    const value = createValue({
      value: false,
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.NONE
    });

    expect(formatEditValue(value)).toBe("false");
  });
});