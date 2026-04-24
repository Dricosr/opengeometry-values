import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue } from "../../src/core/create-value.mjs";
import { formatDisplayValue } from "../../src/core/format-display-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UnitSymbolOutputAffix } from "../../src/core/models/unit-symbol-output-affix.mjs";

describe("formatDisplayValue", () => {
  it("formats display text with unit symbols and capped precision", () => {
    const value = createValue({
      value: 2002,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: MATHJS_STRINGS.MILLIMETER
    });

    expect(formatDisplayValue(value, {
      unit: MATHJS_STRINGS.METER,
      precision: 0
    })).toBe("2 m");
  });

  it("returns plain text for non-numeric values", () => {
    const value = createValue({
      value: "open",
      valueType: VALUE_TYPES.STRING,
      quantity: QUANTITY_TYPES.NONE
    });

    expect(formatDisplayValue(value)).toBe("open");
  });

  it("uses the output instance attached to input for visual formatting", () => {
    const value = createValue({
      value: 90,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.ANGLE,
      unit: MATHJS_STRINGS.DEGREE,
      output: new Output({
        id: "output:angle:symbol",
        unit: MATHJS_STRINGS.DEGREE,
        precision: 0,
        suffix: new UnitSymbolOutputAffix({
          id: "suffix:angle-symbol",
          unit: MATHJS_STRINGS.DEGREE
        })
      })
    });

    expect(formatDisplayValue(value)).toBe("90 °");
  });
});