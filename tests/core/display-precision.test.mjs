import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { getMaxDisplayPrecision } from "../../src/core/get-max-display-precision.mjs";
import { resolveDisplayPrecision } from "../../src/core/resolve-display-precision.mjs";

describe("display precision services", () => {
  it("derives the max precision from the internal resolution per display unit", () => {
    // step = 0.000001 m → 6 decimal places in m, 4 in cm, 3 in mm
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.METER)).toBe(6);
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.CENTIMETER)).toBe(4);
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.MILLIMETER)).toBe(3);
  });

  it("caps requested precision against the internal resolution", () => {
    expect(resolveDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.MILLIMETER, 3)).toBe(3);
    expect(resolveDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.METER)).toBe(6);
    expect(resolveDisplayPrecision(QUANTITY_TYPES.ANGLE, MATHJS_STRINGS.DEGREE, null)).toBe(2);
  });
});
