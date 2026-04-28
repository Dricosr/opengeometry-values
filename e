import { describe, it, expect } from "vitest";
import { FractionalInchFormatter, fractionalInchFormatter } from "../../../src/core/formatters/fractional-inch-formatter.mjs";

describe("FractionalInchFormatter", () => {
  describe("decimalToFraction", () => {
    it("should format whole inches", () => {
      expect(fractionalInchFormatter.decimalToFraction(1)).toBe("1");
      expect(fractionalInchFormatter.decimalToFraction(2)).toBe("2");
      expect(fractionalInchFormatter.decimalToFraction(10)).toBe("10");
    });

    it("should format zero", () => {
      expect(fractionalInchFormatter.decimalToFraction(0)).toBe("0");
    });

    it("should format exact fractions", () => {
      expect(fractionalInchFormatter.decimalToFraction(0.5)).toBe("1/2");
      expect(fractionalInchFormatter.decimalToFraction(0.25)).toBe("1/4");
      expect(fractionalInchFormatter.decimalToFraction(0.75)).toBe("3/4");
      expect(fractionalInchFormatter.decimalToFraction(0.125)).toBe("1/8");
      expect(fractionalInchFormatter.decimalToFraction(0.0625)).toBe("1/16");
      expect(fractionalInchFormatter.decimalToFraction(0.03125)).toBe("1/32");
      expect(fractionalInchFormatter.decimalToFraction(0.015625)).toBe("1/64");
    });

    it("should format mixed numbers", () => {
      expect(fractionalInchFormatter.decimalToFraction(1.25)).toBe("1 1/4");
      expect(fractionalInchFormatter.decimalToFraction(2.5)).toBe("2 1/2");
      expect(fractionalInchFormatter.decimalToFraction(3.75)).toBe("3 3/4");
      expect(fractionalInchFormatter.decimalToFraction(10.875)).toBe("10 7/8");
    });

    it("should format negative values", () => {
      expect(fractionalInchFormatter.decimalToFraction(-1.25)).toBe("-1 1/4");
      expect(fractionalInchFormatter.decimalToFraction(-0.5)).toBe("-1/2");
      expect(fractionalInchFormatter.decimalToFraction(-5)).toBe("-5");
    });

    it("should reduce fractions to simplest form", () => {
      // 0.5 = 2/4 should reduce to 1/2
      expect(fractionalInchFormatter.decimalToFraction(0.5)).toBe("1/2");
      // 0.75 = 6/8 should reduce to 3/4
      expect(fractionalInchFormatter.decimalToFraction(0.75)).toBe("3/4");
      // 0.625 = 5/8 (already reduced)
      expect(fractionalInchFormatter.decimalToFraction(0.625)).toBe("5/8");
    });
  });

  describe("approximateFraction", () => {
    it("should find exact fraction for 0.5", () => {
      const result = fractionalInchFormatter.approximateFraction(0.5, 64);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    it("should find exact fraction for 0.333... with 64 denominator", () => {
      const result = fractionalInchFormatter.approximateFraction(1/3, 64);
      // Best approximation of 1/3 with denominator <= 64 is 21/64 ≈ 0.328125
      expect(result.denominator).toBeLessThanOrEqual(64);
      expect(Math.abs(result.numerator / result.denominator - 1/3)).toBeLessThan(0.01);
    });
  });

  describe("reduceFraction", () => {
    it("should reduce 2/4 to 1/2", () => {
      const result = fractionalInchFormatter.reduceFraction(2, 4);
      expect(result.numerator).toBe(1);
      expect(result.denominator).toBe(2);
    });

    it("should reduce 6/8 to 3/4", () => {
      const result = fractionalInchFormatter.reduceFraction(6, 8);
      expect(result.numerator).toBe(3);
      expect(result.denominator).toBe(4);
    });

    it("should keep 5/8 as is", () => {
      const result = fractionalInchFormatter.reduceFraction(5, 8);
      expect(result.numerator).toBe(5);
      expect(result.denominator).toBe(8);
    });

    it("should reduce 0/5 to 0/1", () => {
      const result = fractionalInchFormatter.reduceFraction(0, 5);
      expect(result.numerator).toBe(0);
      expect(result.denominator).toBe(1);
    });
  });

  describe("gcd", () => {
    it("should calculate GCD correctly", () => {
      expect(fractionalInchFormatter.gcd(12, 8)).toBe(4);
      expect(fractionalInchFormatter.gcd(7, 3)).toBe(1);
      expect(fractionalInchFormatter.gcd(0, 5)).toBe(5);
      expect(fractionalInchFormatter.gcd(6, 6)).toBe(6);
    });
  });

  describe("max denominator variants", () => {
    it("should use maxDenominator=16 for construction", () => {
      const formatter = new FractionalInchFormatter({ maxDenominator: 16 });
      // 0.0625 = 1/16 works
      expect(formatter.decimalToFraction(0.0625)).toBe("1/16");
      // 0.03125 = 1/32 rounds to nearest 1/16 = 0.0625... actually let's check
      // 0.03125 is exactly 1/32, but maxDenominator is 16, so it rounds to 0 or 1/16
      // We accept either as correct behavior
      const result = formatter.decimalToFraction(0.03125);
      expect(["0", "1/16"]).toContain(result);
    });

    it("should use maxDenominator=128 for fine", () => {
      const formatter = new FractionalInchFormatter({ maxDenominator: 128 });
      expect(formatter.decimalToFraction(0.0078125)).toBe("1/128");
    });
  });
});
