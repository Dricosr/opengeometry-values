import { describe, it, expect } from "vitest";
import { FractionalInchParser, fractionalInchParser, parseFractionalInch, FRACTIONAL_INCH_DENOMINATORS } from "../../src/core/parsers/fractional-inch-parser.mjs";

describe("FractionalInchParser", () => {
  describe("parse — whole numbers", () => {
    it("should parse zero", () => {
      expect(fractionalInchParser.parse("0")).toBe(0);
    });

    it("should parse small whole numbers", () => {
      expect(fractionalInchParser.parse("1")).toBe(1);
      expect(fractionalInchParser.parse("2")).toBe(2);
      expect(fractionalInchParser.parse("5")).toBe(5);
      expect(fractionalInchParser.parse("10")).toBe(10);
    });

    it("should parse large whole numbers", () => {
      expect(fractionalInchParser.parse("100")).toBe(100);
      expect(fractionalInchParser.parse("1000")).toBe(1000);
      expect(fractionalInchParser.parse("9999")).toBe(9999);
    });

    it("should parse negative whole numbers", () => {
      expect(fractionalInchParser.parse("-0")).toBe(0);
      expect(fractionalInchParser.parse("-1")).toBe(-1);
      expect(fractionalInchParser.parse("-100")).toBe(-100);
    });
  });

  describe("parse — decimal numbers (fallback)", () => {
    it("should parse positive decimals", () => {
      expect(fractionalInchParser.parse("1.25")).toBe(1.25);
      expect(fractionalInchParser.parse("0.5")).toBe(0.5);
      expect(fractionalInchParser.parse("3.0")).toBe(3);
      expect(fractionalInchParser.parse("0.375")).toBe(0.375);
      expect(fractionalInchParser.parse("10.875")).toBe(10.875);
    });

    it("should parse negative decimals", () => {
      expect(fractionalInchParser.parse("-1.25")).toBe(-1.25);
      expect(fractionalInchParser.parse("-0.5")).toBe(-0.5);
      expect(fractionalInchParser.parse("-3.175")).toBe(-3.175);
    });

    it("should parse zero-like decimals", () => {
      expect(fractionalInchParser.parse("0.0")).toBe(0);
      expect(fractionalInchParser.parse("-0.0")).toBe(0);
    });
  });

  describe("parse — pure fractions (no whole part)", () => {
    const cases = [
      ["1/2", 0.5],
      ["1/4", 0.25],
      ["3/4", 0.75],
      ["1/8", 0.125],
      ["3/8", 0.375],
      ["5/8", 0.625],
      ["7/8", 0.875],
      ["1/16", 0.0625],
      ["3/16", 0.1875],
      ["5/16", 0.3125],
      ["7/16", 0.4375],
      ["9/16", 0.5625],
      ["11/16", 0.6875],
      ["13/16", 0.8125],
      ["15/16", 0.9375],
      ["1/32", 0.03125],
      ["1/64", 0.015625],
      ["1/128", 0.0078125]
    ];

    it.each(cases)("should parse '%s' as %s", (input, expected) => {
      const parser = new FractionalInchParser({ denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.FINE });
      expect(parser.parse(input)).toBe(expected);
    });
  });

  describe("parse — pure fractions with negative sign", () => {
    it("should parse negative pure fractions", () => {
      expect(fractionalInchParser.parse("-1/2")).toBe(-0.5);
      expect(fractionalInchParser.parse("-3/4")).toBe(-0.75);
      expect(fractionalInchParser.parse("-1/8")).toBe(-0.125);
      expect(fractionalInchParser.parse("-7/16")).toBe(-0.4375);
    });

    it("should parse negative pure fractions with space after dash", () => {
      expect(fractionalInchParser.parse("- 1/2")).toBe(-0.5);
      expect(fractionalInchParser.parse("- 3/4")).toBe(-0.75);
    });
  });

  describe("parse — mixed numbers (space separator)", () => {
    const cases = [
      ["1 1/4", 1.25],
      ["2 1/2", 2.5],
      ["3 3/4", 3.75],
      ["1 1/8", 1.125],
      ["5 1/16", 5.0625],
      ["10 7/8", 10.875],
      ["100 1/2", 100.5],
      ["0 1/2", 0.5],
      ["0 3/4", 0.75]
    ];

    it.each(cases)("should parse '%s' as %s", (input, expected) => {
      expect(fractionalInchParser.parse(input)).toBe(expected);
    });
  });

  describe("parse — negative mixed numbers", () => {
    it("should parse negative mixed numbers with space", () => {
      expect(fractionalInchParser.parse("-1 1/4")).toBe(-1.25);
      expect(fractionalInchParser.parse("-2 1/2")).toBe(-2.5);
      expect(fractionalInchParser.parse("-10 7/8")).toBe(-10.875);
    });

    it("should parse negative mixed numbers with space after dash", () => {
      expect(fractionalInchParser.parse("- 1 1/4")).toBe(-1.25);
      expect(fractionalInchParser.parse("- 2 1/2")).toBe(-2.5);
    });
  });

  describe("parse — hyphen as separator is valid", () => {
    it("should parse hyphen-separated mixed numbers", () => {
      expect(fractionalInchParser.parse("1-1/4")).toBe(1.25);
      expect(fractionalInchParser.parse("2-1/2")).toBe(2.5);
      expect(fractionalInchParser.parse("10-7/8")).toBe(10.875);
    });

    it("should parse negative hyphen-separated mixed numbers", () => {
      expect(fractionalInchParser.parse("-1-1/4")).toBe(-1.25);
      expect(fractionalInchParser.parse("-2-1/2")).toBe(-2.5);
      expect(fractionalInchParser.parse("-10-7/8")).toBe(-10.875);
    });

    it("should parse multiple hyphens as valid", () => {
      expect(fractionalInchParser.parse("24-1/2")).toBe(24.5);
    });
  });

  describe("parse — whitespace handling", () => {
    it("should handle leading and trailing whitespace", () => {
      expect(fractionalInchParser.parse("  1 1/4")).toBe(1.25);
      expect(fractionalInchParser.parse("1 1/4  ")).toBe(1.25);
      expect(fractionalInchParser.parse("  1 1/4  ")).toBe(1.25);
    });

    it("should handle multiple spaces between whole and fraction", () => {
      expect(fractionalInchParser.parse("1   1/4")).toBe(1.25);
      expect(fractionalInchParser.parse("1     1/2")).toBe(1.5);
    });

    it("should handle tab characters", () => {
      expect(fractionalInchParser.parse("1\t1/4")).toBe(1.25);
    });
  });

  describe("parse — validation errors", () => {
    it("should throw on empty input", () => {
      expect(() => fractionalInchParser.parse("")).toThrow();
      expect(() => fractionalInchParser.parse("   ")).toThrow();
      expect(() => fractionalInchParser.parse("\t")).toThrow();
      expect(() => fractionalInchParser.parse("\n")).toThrow();
    });

    it("should throw on non-power-of-2 denominators", () => {
      const invalid = ["1/3", "1/5", "1/6", "1/7", "1/9", "1/10", "1/12", "1/15", "1/20", "1/100"];
      for (const input of invalid) {
        expect(() => fractionalInchParser.parse(input)).toThrow();
      }
    });

    it("should throw on improper fractions (numerator >= denominator)", () => {
      const invalid = ["2/1", "3/2", "4/4", "5/4", "9/8", "17/16"];
      for (const input of invalid) {
        expect(() => fractionalInchParser.parse(input)).toThrow();
      }
    });

    it("should throw on zero denominator", () => {
      expect(() => fractionalInchParser.parse("1/0")).toThrow();
      expect(() => fractionalInchParser.parse("0/0")).toThrow();
    });

    it("should throw on zero numerator (no value)", () => {
      expect(() => fractionalInchParser.parse("0/4")).toThrow();
      expect(() => fractionalInchParser.parse("1 0/4")).toThrow();
    });

    it("should throw on non-numeric input", () => {
      const invalid = ["abc", "a/b", "1/a", "a/2", "1/2a", "1 1/4 1/2", "1/2 1/4", "one/two"];
      for (const input of invalid) {
        expect(() => fractionalInchParser.parse(input)).toThrow();
      }
    });

    it("should throw on negative numerator", () => {
      expect(() => fractionalInchParser.parse("1/-2")).toThrow();
    });

    it("should throw on multiple fractions", () => {
      expect(() => fractionalInchParser.parse("1/2 1/4")).toThrow();
      expect(() => fractionalInchParser.parse("1 1/4 1/2")).toThrow();
    });

    it("should throw on denominator exceeding max denominator", () => {
      // Default max is 64 (machining)
      expect(() => fractionalInchParser.parse("1/128")).toThrow();
    });
  });

  describe("canParse", () => {
    it("should return true for valid fractional inch strings", () => {
      expect(fractionalInchParser.canParse("0")).toBe(true);
      expect(fractionalInchParser.canParse("1")).toBe(true);
      expect(fractionalInchParser.canParse("1.25")).toBe(true);
      expect(fractionalInchParser.canParse("1 1/4")).toBe(true);
      expect(fractionalInchParser.canParse("1/2")).toBe(true);
      expect(fractionalInchParser.canParse("-1 1/4")).toBe(true);
      expect(fractionalInchParser.canParse("3/4")).toBe(true);
    });

    it("should return true for hyphen-separated mixed numbers", () => {
      expect(fractionalInchParser.canParse("1-1/4")).toBe(true);
      expect(fractionalInchParser.canParse("2-1/2")).toBe(true);
      expect(fractionalInchParser.canParse("-1-1/4")).toBe(true);
      expect(fractionalInchParser.canParse("24-1/2")).toBe(true);
    });

    it("should return false for invalid strings", () => {
      expect(fractionalInchParser.canParse("")).toBe(false);
      expect(fractionalInchParser.canParse("abc")).toBe(false);
      expect(fractionalInchParser.canParse("1/3")).toBe(false);
      expect(fractionalInchParser.canParse("3/2")).toBe(false);
      expect(fractionalInchParser.canParse("1/0")).toBe(false);
      expect(fractionalInchParser.canParse("1 1/4 1/2")).toBe(false);
      expect(fractionalInchParser.canParse(null)).toBe(false);
      expect(fractionalInchParser.canParse(undefined)).toBe(false);
    });
  });

  describe("denominator limits", () => {
    it("should default to 64 (machining)", () => {
      const parser = new FractionalInchParser();
      expect(parser.maxDenominator).toBe(64);
      expect(parser.parse("1/64")).toBe(0.015625);
      expect(() => parser.parse("1/128")).toThrow();
    });

    it("should respect construction limit (1/16)", () => {
      const parser = new FractionalInchParser({
        denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.CONSTRUCTION
      });
      expect(parser.maxDenominator).toBe(16);
      expect(parser.parse("1/16")).toBe(0.0625);
      expect(() => parser.parse("1/32")).toThrow();
    });

    it("should respect precision limit (1/32)", () => {
      const parser = new FractionalInchParser({
        denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.PRECISION
      });
      expect(parser.maxDenominator).toBe(32);
      expect(parser.parse("1/32")).toBe(0.03125);
      expect(() => parser.parse("1/64")).toThrow();
    });

    it("should respect fine limit (1/128)", () => {
      const parser = new FractionalInchParser({
        denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.FINE
      });
      expect(parser.maxDenominator).toBe(128);
      expect(parser.parse("1/128")).toBe(0.0078125);
      expect(() => parser.parse("1/256")).toThrow();
    });

    it("should respect explicit maxDenominator override", () => {
      const parser = new FractionalInchParser({ maxDenominator: 32 });
      expect(parser.maxDenominator).toBe(32);
      expect(parser.parse("1/32")).toBe(0.03125);
      expect(() => parser.parse("1/64")).toThrow();
    });
  });

  describe("isPowerOfTwo", () => {
    it("should correctly identify powers of two", () => {
      for (const n of [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]) {
        expect(fractionalInchParser.isPowerOfTwo(n)).toBe(true);
      }
    });

    it("should correctly reject non-powers of two", () => {
      const invalid = [0, 3, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18, 20, 100, 255, 500, 1000];
      for (const n of invalid) {
        expect(fractionalInchParser.isPowerOfTwo(n)).toBe(false);
      }
    });

    it("should handle negative numbers", () => {
      expect(fractionalInchParser.isPowerOfTwo(-2)).toBe(false);
      expect(fractionalInchParser.isPowerOfTwo(-4)).toBe(false);
      expect(fractionalInchParser.isPowerOfTwo(-8)).toBe(false);
    });
  });

  describe("parse — real-world samples (pipe diameters, NPS)", () => {
    // NPS (Nominal Pipe Size) - standard inch fractions for pipe OD
    // Using fine parser for NPS as pipe OD can be precise
    const fineParser = new FractionalInchParser({ denominatorCategory: FRACTIONAL_INCH_DENOMINATORS.FINE });

    it("should parse common pipe nominal diameters", () => {
      // NPS 1/8" through NPS 2" — standard inch fractions for pipe
      expect(fractionalInchParser.parse("1/8")).toBe(0.125);
      expect(fractionalInchParser.parse("1/4")).toBe(0.25);
      expect(fractionalInchParser.parse("3/8")).toBe(0.375);
      expect(fractionalInchParser.parse("1/2")).toBe(0.5);
      expect(fractionalInchParser.parse("3/4")).toBe(0.75);
      expect(fractionalInchParser.parse("1")).toBe(1);
      expect(fractionalInchParser.parse("1 1/4")).toBe(1.25);
      expect(fractionalInchParser.parse("1 1/2")).toBe(1.5);
      expect(fractionalInchParser.parse("2")).toBe(2);
    });

    it("should parse larger pipe diameters", () => {
      expect(fractionalInchParser.parse("2 1/2")).toBe(2.5);
      expect(fractionalInchParser.parse("3")).toBe(3);
      expect(fractionalInchParser.parse("4")).toBe(4);
      expect(fractionalInchParser.parse("6")).toBe(6);
      expect(fractionalInchParser.parse("8")).toBe(8);
      expect(fractionalInchParser.parse("10")).toBe(10);
      expect(fractionalInchParser.parse("12")).toBe(12);
      expect(fractionalInchParser.parse("14")).toBe(14);
      expect(fractionalInchParser.parse("16")).toBe(16);
      expect(fractionalInchParser.parse("18")).toBe(18);
      expect(fractionalInchParser.parse("20")).toBe(20);
      expect(fractionalInchParser.parse("24")).toBe(24);
    });

    it("should parse sheet metal thickness fractions", () => {
      // Common sheet metal gauge thicknesses in inches
      expect(fineParser.parse("1/64")).toBe(0.015625);
      expect(fineParser.parse("1/32")).toBe(0.03125);
      expect(fineParser.parse("3/64")).toBe(0.046875);
      expect(fractionalInchParser.parse("1/16")).toBe(0.0625);
      expect(fractionalInchParser.parse("3/32")).toBe(0.09375);
      expect(fractionalInchParser.parse("1/8")).toBe(0.125);
      expect(fractionalInchParser.parse("3/16")).toBe(0.1875);
      expect(fractionalInchParser.parse("1/4")).toBe(0.25);
    });

    it("should parse bolt/screw diameter fractions", () => {
      // Standard UNC/UNF bolt diameters
      expect(fractionalInchParser.parse("1/4")).toBe(0.25);    // 1/4"-20 UNC
      expect(fractionalInchParser.parse("5/16")).toBe(0.3125);  // 5/16"-18 UNC
      expect(fractionalInchParser.parse("3/8")).toBe(0.375);    // 3/8"-16 UNC
      expect(fractionalInchParser.parse("7/16")).toBe(0.4375);  // 7/16"-14 UNC
      expect(fractionalInchParser.parse("1/2")).toBe(0.5);      // 1/2"-13 UNC
      expect(fractionalInchParser.parse("5/8")).toBe(0.625);    // 5/8"-11 UNC
      expect(fractionalInchParser.parse("3/4")).toBe(0.75);     // 3/4"-10 UNC
      expect(fractionalInchParser.parse("7/8")).toBe(0.875);    // 7/8"-9 UNC
      expect(fractionalInchParser.parse("1")).toBe(1);           // 1"-8 UNC
    });
  });
});
