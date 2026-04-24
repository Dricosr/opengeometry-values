import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { quantityProfileRegistry } from "../../src/core/quantities/quantity-profile-registry.mjs";

describe("quantityProfileRegistry", () => {
  it("returns specialist profiles for the main engineering quantities", () => {
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.LENGTH).getInternalUnit()).toBe(MATHJS_STRINGS.METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.AREA).getInternalUnit()).toBe(MATHJS_STRINGS.SQUARE_METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.VOLUME).getInternalUnit()).toBe(MATHJS_STRINGS.CUBIC_METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.ANGLE).getInternalUnit()).toBe(MATHJS_STRINGS.RADIAN);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TEMPERATURE).getInternalUnit()).toBe(MATHJS_STRINGS.DEGREE_CELSIUS);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.MASS).getInternalUnit()).toBe(MATHJS_STRINGS.KILOGRAM);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.FORCE).getInternalUnit()).toBe(MATHJS_STRINGS.NEWTON);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.PRESSURE).getInternalUnit()).toBe(MATHJS_STRINGS.PASCAL);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TIME).getInternalUnit()).toBe(MATHJS_STRINGS.SECOND);
  });

  it("exposes supported engineering units per quantity", () => {
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.LENGTH).supportsUnit(MATHJS_STRINGS.INCH)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.AREA).supportsUnit(MATHJS_STRINGS.SQUARE_CENTIMETER)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.VOLUME).supportsUnit(MATHJS_STRINGS.CUBIC_INCH)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.ANGLE).supportsUnit(MATHJS_STRINGS.DEGREE)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TEMPERATURE).supportsUnit(MATHJS_STRINGS.DEGREE_FAHRENHEIT)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.MASS).supportsUnit(MATHJS_STRINGS.KILOGRAM)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.FORCE).supportsUnit(MATHJS_STRINGS.KILONEWTON)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.PRESSURE).supportsUnit(MATHJS_STRINGS.KILOPASCAL)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TIME).supportsUnit(MATHJS_STRINGS.HOUR)).toBe(true);
  });
});