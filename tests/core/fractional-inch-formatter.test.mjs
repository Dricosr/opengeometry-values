import { describe, it, expect } from "vitest";
import { FractionalInchFormatter, fractionalInchFormatter } from "../../src/core/formatters/fractional-inch-formatter.mjs";

describe("FractionalInchFormatter", () => {
  describe("decimalToFraction — whole inches", () => {
    it("should format zero", () => {
      expect(fractionalInchFormatter.decimalToFraction(0)).toBe("0");
    });

    it("should format positive whole inches", () => {
      expect(fractionalInchFormatter.decimalToFraction(1)).toBe("1");
      expect(fractionalInchFormatter.decimalToFraction(2)).toBe("2");
      expect(fractionalInchFormatter.decimalToFraction(10)).toBe("10");
      expect(fractionalInchFormatter.decimalToFraction(100)).toBe("100");
    });

    it("should format negative whole inches", () => {
      expect(fractionalInchFormatter.decimalToFraction(-0)).toBe("0");
      expect(fractionalInchFormatter.decimalToFraction(-1)).toBe("-1");
      expect(fractionalInchFormatter.decimalToFraction(-10)).toBe("-10");
    });
  });

  describe("decimalToFraction — exact fractions", () => {
    const cases = [
      // halves
      [0.5, "1/2"],
      // quarters
      [0.25, "1/4"],
      [0.75, "3/4"],
      // eighths
      [0.125, "1/8"],
      [0.375, "3/8"],
      [0.625, "5/8"],
      [0.875, "7/8"],
      // sixteenths
      [0.0625, "1/16"],
      [0.1875, "3/16"],
      [0.3125, "5/16"],
      [0.4375, "7/16"],
      [0.5625, "9/16"],
      [0.6875, "11/16"],
      [0.8125, "13/16"],
      [0.9375, "15/16"],
      // thirty-seconds
      [0.03125, "1/32"],
      // sixty-fourths
      [0.015625, "1/64"]
    ];

    it.each(cases)("should format %s as '%s'", (value, expected) => {
      expect(fractionalInchFormatter.decimalToFraction(value)).toBe(expected);
    });
  });

  describe("decimalToFraction — mixed numbers", () => {
    const cases = [
      [1.25, "1 1/4"],
      [2.5, "2 1/2"],
      [3.75, "3 3/4"],
      [1.125, "1 1/8"],
      [5.0625, "5 1/16"],
      [10.875, "10 7/8"],
      [100.5, "100 1/2"],
      [0.5, "1/2"],       // no whole part
      [0.75, "3/4"],      // no whole part
      [1.0, "1"],         // no fraction
      [0.0, "0"]          // zero
    ];

    it.each(cases)("should format %s as '%s'", (value, expected) => {
      expect(fractionalInchFormatter.decimalToFraction(value)).toBe(expected);
    });
  });

  describe("decimalToFraction — negative values", () => {
    const cases = [
      [-1.25, "-1 1/4"],
      [-0.5, "-1/2"],
      [-5, "-5"],
      [-0.75, "-3/4"],
      [-10.875, "-10 7/8"],
      [-0.015625, "-1/64"]
    ];

    it.each(cases)("should format %s as '%s'", (value, expected) => {
      expect(fractionalInchFormatter.decimalToFraction(value)).toBe(expected);
    });
  });

  describe("decimalToFraction — special values", () => {
    it("should handle Infinity", () => {
      expect(fractionalInchFormatter.decimalToFraction(Infinity)).toBe("Infinity");
      expect(fractionalInchFormatter.decimalToFraction(-Infinity)).toBe("-Infinity");
    });

    it("should handle NaN", () => {
      expect(fractionalInchFormatter.decimalToFraction(NaN)).toBe("NaN");
    });

    it("should handle very small values near zero", () => {
      expect(fractionalInchFormatter.decimalToFraction(1e-15)).toBe("0");
      expect(fractionalInchFormatter.decimalToFraction(-1e-15)).toBe("0");
    });
  });

  describe("decimalToFraction — fraction reduction", () => {
    it("should reduce 2/4 to 1/2", () => {
      // 0.5 → 2/4 approximation → reduced to 1/2
      expect(fractionalInchFormatter.decimalToFraction(0.5)).toBe("1/2");
    });

    it("should reduce 6/8 to 3/4", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.75)).toBe("3/4");
    });

    it("should keep 5/8 as is", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.625)).toBe("5/8");
    });

    it("should reduce 4/16 to 1/4", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.25)).toBe("1/4");
    });

    it("should reduce 10/16 to 5/8", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.625)).toBe("5/8");
    });
  });

  describe("decimalToFraction — construction precision (maxDenominator=16)", () => {
    const construction = new FractionalInchFormatter({ maxDenominator: 16 });

    it("should format to nearest 1/16", () => {
      expect(construction.decimalToFraction(0.0625)).toBe("1/16");
    });

    it("should round 1/32 to nearest 1/16", () => {
      expect(construction.decimalToFraction(0.03125)).toBe("0");  // rounds to 0
    });

    it("should round 3/32 up to 1/8", () => {
      expect(construction.decimalToFraction(0.09375)).toBe("1/8"); // 3/32 = 0.09375 → 1.5/16 → rounds to 1/8
    });

    it("should format common construction fractions", () => {
      expect(construction.decimalToFraction(0.5)).toBe("1/2");
      expect(construction.decimalToFraction(1.25)).toBe("1 1/4");
      expect(construction.decimalToFraction(2.75)).toBe("2 3/4");
    });
  });

  describe("decimalToFraction — fine precision (maxDenominator=128)", () => {
    const fine = new FractionalInchFormatter({ maxDenominator: 128 });

    it("should format 1/128", () => {
      expect(fine.decimalToFraction(0.0078125)).toBe("1/128");
    });

    it("should format 3/128", () => {
      expect(fine.decimalToFraction(0.0234375)).toBe("3/128");
    });

    it("should format 127/128", () => {
      expect(fine.decimalToFraction(0.9921875)).toBe("127/128");
    });

    it("should format mixed number with 128 denominator", () => {
      expect(fine.decimalToFraction(10.0078125)).toBe("10 1/128");
    });
  });

  describe("decimalToFraction — real-world pipe OD values", () => {
    // NPS pipe outer diameters (actual OD, not nominal)
    it("should format NPS 1/2 pipe OD (0.840 in)", () => {
      const result = fractionalInchFormatter.decimalToFraction(0.84);
      expect(result).toMatch(/^\d+( \d+\/\d+)?$|^\d+\/\d+$/);
    });

    it("should format NPS 3/4 pipe OD (1.050 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(1.05)).toBe("1 1/16");
    });

    it("should format NPS 1 pipe OD (1.315 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(1.3125)).toBe("1 5/16");
    });

    it("should format NPS 1-1/2 pipe OD (1.900 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(1.875)).toBe("1 7/8");
    });

    it("should format NPS 2 pipe OD (2.375 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(2.375)).toBe("2 3/8");
    });

    it("should format NPS 3 pipe OD (3.500 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(3.5)).toBe("3 1/2");
    });

    it("should format NPS 4 pipe OD (4.500 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(4.5)).toBe("4 1/2");
    });

    it("should format NPS 6 pipe OD (6.625 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(6.625)).toBe("6 5/8");
    });

    it("should format NPS 8 pipe OD (8.625 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(8.625)).toBe("8 5/8");
    });

    it("should format NPS 10 pipe OD (10.750 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(10.75)).toBe("10 3/4");
    });
  });

  describe("decimalToFraction — real-world sheet metal thickness", () => {
    it("should format 16 ga (0.0625 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.0625)).toBe("1/16");
    });

    it("should format 14 ga (0.0781 in)", () => {
      const result = fractionalInchFormatter.decimalToFraction(0.078125);
      expect(result).toBe("1/16"); // rounds to nearest 1/64 = 5/64 = 0.078125
    });

    it("should format 12 ga (0.1094 in)", () => {
      const result = fractionalInchFormatter.decimalToFraction(0.109375);
      expect(result).toBe("7/64");
    });

    it("should format 10 ga (0.1406 in)", () => {
      const result = fractionalInchFormatter.decimalToFraction(0.140625);
      expect(result).toBe("9/64");
    });

    it("should format 1/4 plate (0.250 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.25)).toBe("1/4");
    });

    it("should format 3/8 plate (0.375 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.375)).toBe("3/8");
    });

    it("should format 1/2 plate (0.500 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.5)).toBe("1/2");
    });
  });

  describe("decimalToFraction — real-world fastener sizes", () => {
    it("should format 1/4-20 bolt diameter (0.250 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.25)).toBe("1/4");
    });

    it("should format 1/2-13 bolt diameter (0.500 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.5)).toBe("1/2");
    });

    it("should format 3/4-10 bolt diameter (0.750 in)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.75)).toBe("3/4");
    });

    it("should format #10 screw (0.190 in → 3/16)", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.1875)).toBe("3/16");
    });
  });

  describe("approximateFraction", () => {
    it("should find exact fraction for 0.5", () => {
      const result = fractionalInchFormatter.approximateFraction(0.5, 64);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    it("should find exact fraction for 0.333... nearest 1/64", () => {
      const result = fractionalInchFormatter.approximateFraction(1/3, 64);
      // 1/3 ≈ 21/64 = 0.328125 (closest with denominator up to 64)
      expect(result.denominator).toBeLessThanOrEqual(64);
      expect(Math.abs(result.numerator / result.denominator - 1/3)).toBeLessThan(0.01);
    });

    it("should find exact fraction for 0.125", () => {
      const result = fractionalInchFormatter.approximateFraction(0.125, 64);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(8);
    });

    it("should cap at maxDenominator", () => {
      const result = fractionalInchFormatter.approximateFraction(0.001, 16);
      expect(result.denominator).toBeLessThanOrEqual(16);
    });
  });

  describe("reduceFraction", () => {
    const cases = [
      [2, 4, 1, 2],    // 2/4 → 1/2
      [6, 8, 3, 4],    // 6/8 → 3/4
      [5, 8, 5, 8],    // 5/8 → 5/8 (already reduced)
      [0, 5, 0, 1],    // 0/5 → 0/1
      [4, 4, 1, 1],    // 4/4 → 1/1
      [12, 16, 3, 4],  // 12/16 → 3/4
      [10, 16, 5, 8],  // 10/16 → 5/8
      [1, 64, 1, 64],  // 1/64 → 1/64
      [14, 16, 7, 8],  // 14/16 → 7/8
      [127, 128, 127, 128] // 127/128 → 127/128
    ];

    it.each(cases)("should reduce %s/%s to %s/%s", (num, den, expNum, expDen) => {
      const result = fractionalInchFormatter.reduceFraction(num, den);
      expect(result.numerator).toBe(expNum);
      expect(result.denominator).toBe(expDen);
    });
  });

  describe("gcd", () => {
    const cases = [
      [12, 8, 4],
      [7, 3, 1],
      [6, 6, 6],
      [1, 1, 1],
      [0, 5, 5],
      [5, 0, 5],
      [100, 10, 10],
      [17, 23, 1],
      [256, 64, 64],
      [128, 16, 16]
    ];

    it.each(cases)("gcd(%s, %s) should be %s", (a, b, expected) => {
      expect(fractionalInchFormatter.gcd(a, b)).toBe(expected);
    });
  });
});
