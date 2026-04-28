import { describe, expect, it } from "vitest";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { convertValue } from "../../src/core/convert-value.mjs";

describe("convertValue", () => {
  it("converts values across mathjs units", () => {
    expect(convertValue({
      value: 2000,
      fromUnit: UNIT_TOKENS.MILLIMETER,
      toUnit: UNIT_TOKENS.METER
    })).toBe(2);
  });

  it("returns the input value when no unit conversion is needed", () => {
    expect(convertValue({ value: 10, fromUnit: null, toUnit: UNIT_TOKENS.METER })).toBe(10);
    expect(convertValue({ value: 10, fromUnit: UNIT_TOKENS.METER, toUnit: UNIT_TOKENS.METER })).toBe(10);
  });
});