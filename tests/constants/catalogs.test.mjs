import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS, mathJsStringCatalog } from "../../src/constants/mathjs-string-catalog.mjs";
import { INTERNAL_RESOLUTION } from "../../src/constants/internal-resolution.mjs";
import { INTERNAL_UNITS } from "../../src/constants/internal-units.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { UNIT_SYMBOLS } from "../../src/constants/unit-symbols.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

describe("catalog specialists", () => {
  it("reuses mathjs strings across internal units and UI symbols", () => {
    expect(INTERNAL_UNITS[QUANTITY_TYPES.LENGTH]).toBe(MATHJS_STRINGS.METER);
    expect(INTERNAL_UNITS[QUANTITY_TYPES.AREA]).toBe(MATHJS_STRINGS.SQUARE_METER);
    expect(UNIT_SYMBOLS[MATHJS_STRINGS.INCH]).toBe("in");
    expect(UNIT_SYMBOLS[MATHJS_STRINGS.DEGREE_CELSIUS]).toBe("°C");
  });

  it("exposes frozen domain enumerations", () => {
    expect(VALUE_TYPES.FLOAT).toBe("float");
    expect(QUANTITY_TYPES.PRESSURE).toBe("pressure");
    expect(Object.isFrozen(VALUE_TYPES)).toBe(true);
    expect(Object.isFrozen(QUANTITY_TYPES)).toBe(true);
  });

  it("keeps the current length internal resolution in meters", () => {
    expect(INTERNAL_RESOLUTION[QUANTITY_TYPES.LENGTH]).toEqual({
      unit: MATHJS_STRINGS.METER,
      step: 0.000001
    });
  });

  it("provides specialist catalog lookup helpers", () => {
    expect(mathJsStringCatalog.has("MILLIMETER")).toBe(true);
    expect(mathJsStringCatalog.get("MILLIMETER")).toBe(MATHJS_STRINGS.MILLIMETER);
  });
});