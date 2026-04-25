import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../src/constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { createValue } from "../../src/core/create-value.mjs";
import { outputBuilder } from "../../src/core/services/output-builder.mjs";

describe("outputBuilder", () => {
  it("builds output instances from BIM and AEC presets", () => {
    const built = outputBuilder.build({
      presetId: "angle:annotation-symbol"
    });

    const value = createValue({
      value: 90,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.ANGLE,
      unit: MATHJS_STRINGS.DEGREE,
      output: built.output
    });

    expect(built.config.unit).toBe(MATHJS_STRINGS.DEGREE);
    expect(built.config.suffixMode).toBe(OUTPUT_SUFFIX_MODES.SYMBOL);
    expect(value.input.formatForDisplay()).toBe("90°");
  });

  it("supports direct overrides for custom prefixes and suffixes", () => {
    const built = outputBuilder.build({
      unit: MATHJS_STRINGS.MEGAPASCAL,
      precision: 2,
      prefix: "~ ",
      suffix: " MPa(g)",
      suffixMode: OUTPUT_SUFFIX_MODES.CUSTOM,
      showUnit: true
    });

    const value = createValue({
      value: 250000,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.PRESSURE,
      unit: MATHJS_STRINGS.PASCAL,
      output: built.output
    });

    expect(value.input.formatForDisplay()).toBe("~ 0.25 MPa(g)");
  });

  it("fails fast for unknown output presets", () => {
    expect(() => outputBuilder.build({
      presetId: "pressure:unknown"
    })).toThrow("Unknown output preset");
  });
});