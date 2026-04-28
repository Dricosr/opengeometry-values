import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { quantityProfileRegistry } from "../../src/core/quantities/quantity-profile-registry.mjs";

describe("quantityProfileRegistry", () => {
  it("returns specialist profiles for the main engineering quantities", () => {
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.LENGTH).getInternalUnit()).toBe(UNIT_TOKENS.METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.AREA).getInternalUnit()).toBe(UNIT_TOKENS.SQUARE_METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.VOLUME).getInternalUnit()).toBe(UNIT_TOKENS.CUBIC_METER);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.ANGLE).getInternalUnit()).toBe(UNIT_TOKENS.RADIAN);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TEMPERATURE).getInternalUnit()).toBe(UNIT_TOKENS.DEGREE_CELSIUS);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.MASS).getInternalUnit()).toBe(UNIT_TOKENS.KILOGRAM);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.FORCE).getInternalUnit()).toBe(UNIT_TOKENS.NEWTON);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.PRESSURE).getInternalUnit()).toBe(UNIT_TOKENS.PASCAL);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TIME).getInternalUnit()).toBe(UNIT_TOKENS.SECOND);
  });

  it("exposes supported engineering units per quantity", () => {
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.LENGTH).supportsUnit(UNIT_TOKENS.INCH)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.AREA).supportsUnit(UNIT_TOKENS.SQUARE_CENTIMETER)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.VOLUME).supportsUnit(UNIT_TOKENS.CUBIC_INCH)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.ANGLE).supportsUnit(UNIT_TOKENS.DEGREE)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TEMPERATURE).supportsUnit(UNIT_TOKENS.DEGREE_FAHRENHEIT)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.MASS).supportsUnit(UNIT_TOKENS.KILOGRAM)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.FORCE).supportsUnit(UNIT_TOKENS.KILONEWTON)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.PRESSURE).supportsUnit(UNIT_TOKENS.KILOPASCAL)).toBe(true);
    expect(quantityProfileRegistry.getProfile(QUANTITY_TYPES.TIME).supportsUnit(UNIT_TOKENS.HOUR)).toBe(true);
  });
});