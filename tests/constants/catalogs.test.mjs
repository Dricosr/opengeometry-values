import { describe, expect, it } from "vitest";
import { UNIT_TOKENS, unitTokenCatalog, UnitTokenCatalog } from "../../src/constants/unit-token-catalog.mjs";
import { INTERNAL_RESOLUTION } from "../../src/constants/internal-resolution.mjs";
import { INTERNAL_UNITS } from "../../src/constants/internal-units.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { UNIT_SYMBOLS } from "../../src/constants/unit-symbols.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

describe("catalog specialists", () => {
  it("reuses mathjs strings across internal units and UI symbols", () => {
    expect(INTERNAL_UNITS[QUANTITY_TYPES.LENGTH]).toBe(UNIT_TOKENS.METER);
    expect(INTERNAL_UNITS[QUANTITY_TYPES.AREA]).toBe(UNIT_TOKENS.SQUARE_METER);
    expect(UNIT_SYMBOLS[UNIT_TOKENS.INCH]).toBe("in");
    expect(UNIT_SYMBOLS[UNIT_TOKENS.DEGREE_CELSIUS]).toBe("°C");
  });

  it("exposes frozen domain enumerations", () => {
    expect(VALUE_TYPES.NUMBER).toBe("number");
    expect(QUANTITY_TYPES.PRESSURE).toBe("pressure");
    expect(Object.isFrozen(VALUE_TYPES)).toBe(true);
    expect(Object.isFrozen(QUANTITY_TYPES)).toBe(true);
  });

  it("keeps the current length internal resolution in meters", () => {
    expect(INTERNAL_RESOLUTION[QUANTITY_TYPES.LENGTH]).toEqual({
      unit: UNIT_TOKENS.METER,
      step: 0.000001
    });
  });

  it("provides specialist catalog lookup helpers", () => {
    expect(unitTokenCatalog.has("MILLIMETER")).toBe(true);
    expect(unitTokenCatalog.get("MILLIMETER")).toBe(UNIT_TOKENS.MILLIMETER);
  });
});