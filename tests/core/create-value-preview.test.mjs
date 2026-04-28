import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
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
      unit: UNIT_TOKENS.METER
    });
    expect(preview.previews).toEqual({
      display: "7.200 m",
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

  it("covers common AEC and industrial cases for each supported interactive quantity", () => {
    const sampleGroups = parameterSampleCatalog.groupByQuantity();
    const presetGroups = outputPresetCatalog.groupByQuantity();
    const coveredQuantities = [
      QUANTITY_TYPES.LENGTH,
      QUANTITY_TYPES.AREA,
      QUANTITY_TYPES.VOLUME,
      QUANTITY_TYPES.ANGLE,
      QUANTITY_TYPES.TEMPERATURE,
      QUANTITY_TYPES.MASS,
      QUANTITY_TYPES.FORCE,
      QUANTITY_TYPES.PRESSURE,
      QUANTITY_TYPES.TIME,
      QUANTITY_TYPES.RATIO
    ];

    for (const quantity of coveredQuantities) {
      expect(sampleGroups[quantity]?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(presetGroups[quantity]?.length ?? 0).toBeGreaterThanOrEqual(3);

      for (const sample of sampleGroups[quantity]) {
        expect(sample.recommendedOutputPresetIds.length).toBeGreaterThan(0);

        const preview = createValuePreview({
          parameter: sample,
          output: {
            presetId: sample.recommendedOutputPresetIds[0]
          }
        });

        expect(preview.parameter.quantity).toBe(quantity);
        expect(typeof preview.previews.display).toBe("string");
      }
    }
  });
});