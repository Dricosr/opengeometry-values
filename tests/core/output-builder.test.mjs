import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
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
      unit: UNIT_TOKENS.DEGREE,
      output: built.output
    });

    expect(built.config.unit).toBe(UNIT_TOKENS.DEGREE);
    expect(built.config.suffixMode).toBe(OUTPUT_SUFFIX_MODES.SYMBOL);
    expect(value.input.formatForDisplay()).toBe("90°");
  });

  it("supports direct overrides for custom prefixes and suffixes", () => {
    const built = outputBuilder.build({
      unit: UNIT_TOKENS.MEGAPASCAL,
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
      unit: UNIT_TOKENS.PASCAL,
      output: built.output
    });

    expect(value.input.formatForDisplay()).toBe("~ 0.25 MPa(g)");
  });

  it("builds diameter presets with the ⌀ prefix for pipe, bolt, and vessel callouts", () => {
    const builtMm = outputBuilder.build({
      presetId: "length:diameter-mm"
    });

    const valueMm = createValue({
      value: 168.3,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.MILLIMETER,
      output: builtMm.output
    });

    expect(builtMm.config.prefix).toBe("⌀ ");
    expect(valueMm.input.formatForDisplay()).toBe("⌀ 168 mm");

    const builtMeter = outputBuilder.build({
      presetId: "length:diameter-meter"
    });

    const valueMeter = createValue({
      value: 0.508,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.METER,
      output: builtMeter.output
    });

    expect(builtMeter.config.prefix).toBe("⌀ ");
    expect(valueMeter.input.formatForDisplay()).toBe("⌀ 0.508 m");

    const builtInch = outputBuilder.build({
      presetId: "length:diameter-inch"
    });

    const valueInch = createValue({
      value: 2.5,
      valueType: VALUE_TYPES.FLOAT,
      quantity: QUANTITY_TYPES.LENGTH,
      unit: UNIT_TOKENS.INCH,
      output: builtInch.output
    });

    expect(builtInch.config.prefix).toBe("⌀ ");
    expect(valueInch.input.formatForDisplay()).toBe("⌀ 2.50 in");
  });

  it("fails fast for unknown output presets", () => {
    expect(() => outputBuilder.build({
      presetId: "pressure:unknown"
    })).toThrow("Unknown output preset");
  });
});