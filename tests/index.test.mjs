import { describe, expect, it } from "vitest";
import * as api from "../src/index.mjs";

describe("public index", () => {
  it("exports the documented public API functions", () => {
    expect(typeof api.createValue).toBe("function");
    expect(typeof api.convertValue).toBe("function");
    expect(typeof api.applyInternalResolution).toBe("function");
    expect(typeof api.getMaxDisplayPrecision).toBe("function");
    expect(typeof api.resolveDisplayPrecision).toBe("function");
    expect(typeof api.formatDisplayValue).toBe("function");
    expect(typeof api.formatEditValue).toBe("function");
    expect(typeof api.createValuePreview).toBe("function");
    expect(typeof api.buildOutput).toBe("function");
    expect(typeof api.Output).toBe("function");
    expect(typeof api.CustomOutputAffix).toBe("function");
    expect(typeof api.UnitSymbolOutputAffix).toBe("function");
    expect(api.OUTPUT_PRESETS["length:model-mm"].unit).toBe("mm");
    expect(api.PARAMETER_SAMPLES["length:wall-thickness"].input.unit).toBe("mm");
  });
});