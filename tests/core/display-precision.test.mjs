import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { getMaxDisplayPrecision } from "../../src/core/get-max-display-precision.mjs";
import { resolveDisplayPrecision } from "../../src/core/resolve-display-precision.mjs";

describe("display precision services", () => {
  it("derives the max precision from the internal resolution per display unit", () => {
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.METER)).toBe(4);
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.CENTIMETER)).toBe(2);
    expect(getMaxDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.MILLIMETER)).toBe(1);
  });

  it("caps requested precision against the internal resolution", () => {
    expect(resolveDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.MILLIMETER, 3)).toBe(1);
    expect(resolveDisplayPrecision(QUANTITY_TYPES.LENGTH, MATHJS_STRINGS.METER)).toBe(4);
    expect(resolveDisplayPrecision(QUANTITY_TYPES.ANGLE, MATHJS_STRINGS.DEGREE, null)).toBe(2);
  });
});