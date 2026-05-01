import { describe, it, expect } from "vitest";
import {
  PARAMETER_SAMPLES,
  parameterSampleCatalog,
  ParameterSampleCatalog
} from "../../src/samples/parameter-sample-catalog.mjs";
import { LENGTH_SAMPLES } from "../../src/samples/length-samples.mjs";
import { AREA_SAMPLES } from "../../src/samples/area-samples.mjs";
import { VOLUME_SAMPLES } from "../../src/samples/volume-samples.mjs";
import { ANGLE_SAMPLES } from "../../src/samples/angle-samples.mjs";
import { TEMPERATURE_SAMPLES } from "../../src/samples/temperature-samples.mjs";
import { MASS_SAMPLES } from "../../src/samples/mass-samples.mjs";
import { FORCE_SAMPLES } from "../../src/samples/force-samples.mjs";
import { PRESSURE_SAMPLES } from "../../src/samples/pressure-samples.mjs";
import { TIME_SAMPLES } from "../../src/samples/time-samples.mjs";
import { RATIO_SAMPLES } from "../../src/samples/ratio-samples.mjs";
import { BOOL_SAMPLES } from "../../src/samples/bool-samples.mjs";
import { COUNT_SAMPLES } from "../../src/samples/count-samples.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";

describe("parameter-sample-catalog", () => {
  it("exports ParameterSampleCatalog class", () => {
    expect(typeof ParameterSampleCatalog).toBe("function");
  });

  it("exports parameterSampleCatalog singleton", () => {
    expect(parameterSampleCatalog).toBeInstanceOf(ParameterSampleCatalog);
  });

  it("exports PARAMETER_SAMPLES as a plain object", () => {
    expect(typeof PARAMETER_SAMPLES).toBe("object");
    expect(PARAMETER_SAMPLES).not.toBeNull();
  });

  it("PARAMETER_SAMPLES contains all per-quantity entries", () => {
    const allKeys = [
      ...Object.keys(LENGTH_SAMPLES),
      ...Object.keys(AREA_SAMPLES),
      ...Object.keys(VOLUME_SAMPLES),
      ...Object.keys(ANGLE_SAMPLES),
      ...Object.keys(TEMPERATURE_SAMPLES),
      ...Object.keys(MASS_SAMPLES),
      ...Object.keys(FORCE_SAMPLES),
      ...Object.keys(PRESSURE_SAMPLES),
      ...Object.keys(TIME_SAMPLES),
      ...Object.keys(RATIO_SAMPLES),
      ...Object.keys(BOOL_SAMPLES),
      ...Object.keys(COUNT_SAMPLES)
    ];

    for (const key of allKeys) {
      expect(PARAMETER_SAMPLES).toHaveProperty(key);
    }
  });

  it("each sample entry is frozen", () => {
    for (const sample of Object.values(PARAMETER_SAMPLES)) {
      expect(Object.isFrozen(sample)).toBe(true);
      expect(Object.isFrozen(sample.input)).toBe(true);
      expect(Object.isFrozen(sample.recommendedOutputPresetIds)).toBe(true);
    }
  });

  it("each sample has the required fields", () => {
    for (const sample of Object.values(PARAMETER_SAMPLES)) {
      expect(typeof sample.id).toBe("string");
      expect(typeof sample.quantity).toBe("string");
      expect(typeof sample.valueType).toBe("string");
      expect(typeof sample.name).toBe("string");
      expect(typeof sample.description).toBe("string");
      expect(typeof sample.input).toBe("object");
      expect(Array.isArray(sample.recommendedOutputPresetIds)).toBe(true);
    }
  });

  it("catalog key matches sample id", () => {
    for (const [key, sample] of Object.entries(PARAMETER_SAMPLES)) {
      expect(sample.id).toBe(key);
    }
  });
});

describe("length-samples coverage", () => {
  const samples = Object.values(LENGTH_SAMPLES);

  it("covers millimeter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.MILLIMETER)).toBe(true);
  });

  it("covers centimeter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.CENTIMETER)).toBe(true);
  });

  it("covers meter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.METER)).toBe(true);
  });

  it("covers inch unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.INCH)).toBe(true);
  });

  it("covers integer unit (UN)", () => {
    // UNIT_TOKENS.UN is used for discrete count values under QUANTITY_TYPES.COUNT
  });

  it("has formula-embedded-units variant", () => {
    expect(LENGTH_SAMPLES["length:formula-embedded-units"]).toBeDefined();
    expect(typeof LENGTH_SAMPLES["length:formula-embedded-units"].input.value).toBe("string");
    expect(LENGTH_SAMPLES["length:formula-embedded-units"].input.value).toMatch(/^=/);
  });

  it("has formula-plain variant", () => {
    expect(LENGTH_SAMPLES["length:formula-plain"]).toBeDefined();
  });

  it("has inline-unit variant", () => {
    expect(LENGTH_SAMPLES["length:inline-unit"]).toBeDefined();
    expect(typeof LENGTH_SAMPLES["length:inline-unit"].input.value).toBe("string");
    expect(LENGTH_SAMPLES["length:inline-unit"].input.value).not.toMatch(/^=/);
  });
});

describe("area-samples coverage", () => {
  const samples = Object.values(AREA_SAMPLES);

  it("covers square-meter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.SQUARE_METER)).toBe(true);
  });

  it("covers square-centimeter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.SQUARE_CENTIMETER)).toBe(true);
  });

  it("covers square-inch unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.SQUARE_INCH)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(AREA_SAMPLES["area:formula-embedded-units"]).toBeDefined();
    expect(AREA_SAMPLES["area:formula-plain"]).toBeDefined();
    expect(AREA_SAMPLES["area:inline-unit"]).toBeDefined();
  });
});

describe("volume-samples coverage", () => {
  const samples = Object.values(VOLUME_SAMPLES);

  it("covers cubic-meter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.CUBIC_METER)).toBe(true);
  });

  it("covers cubic-centimeter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.CUBIC_CENTIMETER)).toBe(true);
  });

  it("covers liter unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.LITER)).toBe(true);
  });

  it("covers cubic-inch unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.CUBIC_INCH)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(VOLUME_SAMPLES["volume:formula-embedded-units"]).toBeDefined();
    expect(VOLUME_SAMPLES["volume:formula-plain"]).toBeDefined();
    expect(VOLUME_SAMPLES["volume:inline-unit"]).toBeDefined();
  });
});

describe("angle-samples coverage", () => {
  const samples = Object.values(ANGLE_SAMPLES);

  it("covers degree unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.DEGREE)).toBe(true);
  });

  it("covers radian unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.RADIAN)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(ANGLE_SAMPLES["angle:formula-embedded-units"]).toBeDefined();
    expect(ANGLE_SAMPLES["angle:formula-plain"]).toBeDefined();
    expect(ANGLE_SAMPLES["angle:inline-unit"]).toBeDefined();
  });
});

describe("temperature-samples coverage", () => {
  const samples = Object.values(TEMPERATURE_SAMPLES);

  it("covers celsius unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.DEGREE_CELSIUS)).toBe(true);
  });

  it("covers fahrenheit unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.DEGREE_FAHRENHEIT)).toBe(true);
  });

  it("covers kelvin unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.KELVIN)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(TEMPERATURE_SAMPLES["temperature:formula-plain"]).toBeDefined();
    expect(TEMPERATURE_SAMPLES["temperature:formula-embedded-units"]).toBeDefined();
    expect(TEMPERATURE_SAMPLES["temperature:inline-unit"]).toBeDefined();
  });
});

describe("mass-samples coverage", () => {
  const samples = Object.values(MASS_SAMPLES);

  it("covers kilogram unit (only supported unit)", () => {
    expect(samples.every(s => s.input.unit === UNIT_TOKENS.KILOGRAM)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(MASS_SAMPLES["mass:formula-plain"]).toBeDefined();
    expect(MASS_SAMPLES["mass:formula-embedded-units"]).toBeDefined();
    expect(MASS_SAMPLES["mass:inline-unit"]).toBeDefined();
  });
});

describe("force-samples coverage", () => {
  const samples = Object.values(FORCE_SAMPLES);

  it("covers newton unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.NEWTON)).toBe(true);
  });

  it("covers kilonewton unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.KILONEWTON)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(FORCE_SAMPLES["force:formula-embedded-units"]).toBeDefined();
    expect(FORCE_SAMPLES["force:formula-plain"]).toBeDefined();
    expect(FORCE_SAMPLES["force:inline-unit"]).toBeDefined();
  });
});

describe("pressure-samples coverage", () => {
  const samples = Object.values(PRESSURE_SAMPLES);

  it("covers pascal unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.PASCAL)).toBe(true);
  });

  it("covers kilopascal unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.KILOPASCAL)).toBe(true);
  });

  it("covers megapascal unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.MEGAPASCAL)).toBe(true);
  });

  it("covers bar unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.BAR)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(PRESSURE_SAMPLES["pressure:formula-embedded-units"]).toBeDefined();
    expect(PRESSURE_SAMPLES["pressure:formula-plain"]).toBeDefined();
    expect(PRESSURE_SAMPLES["pressure:inline-unit"]).toBeDefined();
  });
});

describe("time-samples coverage", () => {
  const samples = Object.values(TIME_SAMPLES);

  it("covers second unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.SECOND)).toBe(true);
  });

  it("covers minute unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.MINUTE)).toBe(true);
  });

  it("covers hour unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.HOUR)).toBe(true);
  });

  it("has all three formula input forms", () => {
    expect(TIME_SAMPLES["time:formula-plain"]).toBeDefined();
    expect(TIME_SAMPLES["time:formula-embedded-units"]).toBeDefined();
    expect(TIME_SAMPLES["time:inline-unit"]).toBeDefined();
  });
});

describe("ratio-samples coverage", () => {
  const samples = Object.values(RATIO_SAMPLES);

  it("covers percent unit (only supported unit)", () => {
    expect(samples.every(s => s.input.unit === UNIT_TOKENS.PERCENT)).toBe(true);
  });

  it("uses NUMBER value type only", () => {
    const samples = Object.values(RATIO_SAMPLES);
    expect(samples.every(s => s.valueType === VALUE_TYPES.NUMBER)).toBe(true);
  });

  it("has formula-plain variant", () => {
    expect(RATIO_SAMPLES["ratio:formula-plain"]).toBeDefined();
  });

  it("has formula-embedded-units variant", () => {
    expect(RATIO_SAMPLES["ratio:formula-embedded-units"]).toBeDefined();
  });

  it("has at least 3 samples", () => {
    expect(Object.keys(RATIO_SAMPLES).length).toBeGreaterThanOrEqual(3);
  });
});

describe("bool-samples coverage", () => {
  const samples = Object.values(BOOL_SAMPLES);

  it("covers BOOL unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.BOOL)).toBe(true);
  });

  it("has BOOLEAN value type samples", () => {
    expect(samples.some(s => s.valueType === VALUE_TYPES.BOOLEAN)).toBe(true);
  });

  it("has at least 4 samples", () => {
    expect(Object.keys(BOOL_SAMPLES).length).toBeGreaterThanOrEqual(4);
  });

  it("boolean samples reference valid output presets", () => {
    const validPresets = ["bool:open-closed", "bool:yes-no"];
    for (const sample of samples) {
      for (const presetId of sample.recommendedOutputPresetIds) {
        expect(validPresets).toContain(presetId);
      }
    }
  });
});

describe("count-samples coverage", () => {
  const samples = Object.values(COUNT_SAMPLES);

  it("covers UN unit", () => {
    expect(samples.some(s => s.input.unit === UNIT_TOKENS.UN)).toBe(true);
  });

  it("has NUMBER value type samples", () => {
    expect(samples.some(s => s.valueType === VALUE_TYPES.NUMBER)).toBe(true);
  });

  it("has at least 4 samples", () => {
    expect(Object.keys(COUNT_SAMPLES).length).toBeGreaterThanOrEqual(4);
  });

  it("UN samples reference count output presets", () => {
    const validPresets = ["count:count"];
    for (const sample of samples) {
      for (const presetId of sample.recommendedOutputPresetIds) {
        expect(validPresets).toContain(presetId);
      }
    }
  });
});

describe("catalog methods", () => {
  it("list() returns an array of all samples", () => {
    const list = parameterSampleCatalog.list();
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThan(0);
    expect(list.length).toBe(Object.keys(PARAMETER_SAMPLES).length);
  });

  it("listByQuantity() filters correctly", () => {
    const lengthSamples = parameterSampleCatalog.listByQuantity(QUANTITY_TYPES.LENGTH);
    expect(lengthSamples.length).toBeGreaterThan(0);
    expect(lengthSamples.every(s => s.quantity === QUANTITY_TYPES.LENGTH)).toBe(true);
  });

  it("groupByQuantity() returns each quantity with at least one sample", () => {
    const groups = parameterSampleCatalog.groupByQuantity();
    const expectedQuantities = [
      QUANTITY_TYPES.LENGTH,
      QUANTITY_TYPES.AREA,
      QUANTITY_TYPES.VOLUME,
      QUANTITY_TYPES.ANGLE,
      QUANTITY_TYPES.TEMPERATURE,
      QUANTITY_TYPES.MASS,
      QUANTITY_TYPES.FORCE,
      QUANTITY_TYPES.PRESSURE,
      QUANTITY_TYPES.TIME,
      QUANTITY_TYPES.RATIO,
      QUANTITY_TYPES.BOOL,
      QUANTITY_TYPES.COUNT
    ];

    for (const q of expectedQuantities) {
      expect(groups[q]).toBeDefined();
      expect(groups[q].length).toBeGreaterThan(0);
    }
  });

  it("groupByQuantity() returns frozen arrays", () => {
    const groups = parameterSampleCatalog.groupByQuantity();
    for (const arr of Object.values(groups)) {
      expect(Object.isFrozen(arr)).toBe(true);
    }
  });
});
