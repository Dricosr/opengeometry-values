import { describe, expect, it } from "vitest";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { convertValue } from "../../src/core/convert-value.mjs";

describe("convertValue", () => {
  it("converts values across mathjs units", () => {
    expect(convertValue({
      value: 2000,
      fromUnit: MATHJS_STRINGS.MILLIMETER,
      toUnit: MATHJS_STRINGS.METER
    })).toBe(2);
  });

  it("returns the input value when no unit conversion is needed", () => {
    expect(convertValue({ value: 10, fromUnit: null, toUnit: MATHJS_STRINGS.METER })).toBe(10);
    expect(convertValue({ value: 10, fromUnit: MATHJS_STRINGS.METER, toUnit: MATHJS_STRINGS.METER })).toBe(10);
  });
});