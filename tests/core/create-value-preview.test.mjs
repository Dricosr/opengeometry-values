import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { parameterSampleCatalog } from "../../src/samples/parameter-sample-catalog.mjs";
import { outputPresetCatalog } from "../../src/presets/output-preset-catalog.mjs";
import { createValuePreview } from "../../src/core/services/create-value-preview.mjs";

describe("createValuePreview", () => {
  it("creates interactive previews from parameter samples and output presets", () => {
    const preview = createValuePreview({
      parameter: parameterSampleCatalog.get("length:beam-span"),
      output: {
        presetId: "length:annotation-meter"
      }
    });

    expect(preview.parameter.quantity).toBe(QUANTITY_TYPES.LENGTH);
    expect(preview.internal).toEqual({
      value: 7.2,
      unit: MATHJS_STRINGS.METER
    });
    expect(preview.previews).toEqual({
      display: "7.200 m",
      composition: "7.200 m",
      friendly: "7.200 m",
      edit: "7.200"
    });
  });

  it("groups samples and presets by quantity for interactive UIs", () => {
    const sampleGroups = parameterSampleCatalog.groupByQuantity();
    const presetGroups = outputPresetCatalog.groupByQuantity();

    expect(sampleGroups[QUANTITY_TYPES.LENGTH].length).toBeGreaterThan(0);
    expect(sampleGroups[QUANTITY_TYPES.PRESSURE][0].input.unit).toBeDefined();
    expect(presetGroups[QUANTITY_TYPES.ANGLE].some((preset) => preset.id === "angle:annotation-symbol")).toBe(true);
  });
});