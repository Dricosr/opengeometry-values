import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue } from "../../src/core/create-value.mjs";
import { formatDisplayValue } from "../../src/core/format-display-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { BOOLEAN_LABEL_PRESETS } from "../../src/constants/boolean-label-catalog.mjs";
import { UnitSymbolOutputAffix } from "../../src/core/models/unit-symbol-output-affix.mjs";

describe("formatDisplayValue", () => {
  it("formats display text with unit symbols and capped precision", () => {
    const value = createValue({
      value: 2002,
      valueType: VALUE_TYPES.NUMBER,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER
    });

    expect(formatDisplayValue(value, {
      unit: UNIT_TOKENS.METER,
      precision: 0
    })).toBe("2 m");
  });

  it("returns plain text for non-numeric values", () => {
    const value = createValue({
      value: "open",
      valueType: VALUE_TYPES.STRING
    });

    expect(formatDisplayValue(value)).toBe("open");
  });

  it("uses the output instance attached to input for visual formatting", () => {
    const value = createValue({
      value: 90,
      valueType: VALUE_TYPES.NUMBER,
      quantity: QUANTITY_TYPES.ANGLE,
      unit: UNIT_TOKENS.DEGREE,
      output: new Output({
        id: "output:angle:symbol",
        unit: UNIT_TOKENS.DEGREE,
        precision: 0,
        suffix: new UnitSymbolOutputAffix({
          id: "suffix:angle-symbol",
          unit: UNIT_TOKENS.DEGREE
        })
      })
    });

    expect(formatDisplayValue(value)).toBe("90°");
  });

  it("displays boolean true with OPEN_CLOSED labels as Open", () => {
    const value = createValue({
      value: "true",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    const output = new Output({
      unit: UNIT_TOKENS.BOOL,
      booleanLabels: BOOLEAN_LABEL_PRESETS.OPEN_CLOSED
    });

    expect(output.formatDisplay(value)).toBe("Open");
  });

  it("displays boolean false with OPEN_CLOSED labels as Closed", () => {
    const value = createValue({
      value: "false",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    const output = new Output({
      unit: UNIT_TOKENS.BOOL,
      booleanLabels: BOOLEAN_LABEL_PRESETS.OPEN_CLOSED
    });

    expect(output.formatDisplay(value)).toBe("Closed");
  });

  it("displays boolean with active/inactive labels", () => {
    const valueTrue = createValue({
      value: "true",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    const output = new Output({
      unit: UNIT_TOKENS.BOOL,
      booleanLabels: BOOLEAN_LABEL_PRESETS.ACTIVE_INACTIVE
    });

    expect(output.formatDisplay(valueTrue)).toBe("Active");

    const valueFalse = createValue({
      value: "false",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    expect(output.formatDisplay(valueFalse)).toBe("Inactive");
  });

  it("defaults to YES_NO labels when booleanLabels is not set", () => {
    const valueTrue = createValue({
      value: "1",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    const output = new Output({ unit: UNIT_TOKENS.BOOL });

    expect(output.formatDisplay(valueTrue)).toBe("Yes");

    const valueFalse = createValue({
      value: "0",
      valueType: VALUE_TYPES.BOOLEAN,
      quantity: QUANTITY_TYPES.BOOL
    });

    expect(output.formatDisplay(valueFalse)).toBe("No");
  });
});
