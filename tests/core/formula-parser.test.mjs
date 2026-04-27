import { describe, it, expect } from "vitest";
import { FormulaParser, formulaParser } from "../../src/core/parsers/formula-parser.mjs";

describe("FormulaParser", () => {
  describe("isFormula", () => {
    it("returns true when text starts with =", () => {
      expect(formulaParser.isFormula("=2 + 2")).toBe(true);
    });

    it("returns true for = followed by nothing", () => {
      expect(formulaParser.isFormula("=")).toBe(true);
    });

    it("returns false for plain number", () => {
      expect(formulaParser.isFormula("10.5")).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(formulaParser.isFormula("")).toBe(false);
    });

    it("returns false for non-string", () => {
      expect(formulaParser.isFormula(42)).toBe(false);
      expect(formulaParser.isFormula(null)).toBe(false);
      expect(formulaParser.isFormula(undefined)).toBe(false);
    });
  });

  describe("parse - plain number formulas", () => {
    describe("arithmetic", () => {
      it("adds two numbers", () => {
        expect(formulaParser.parse("=2 + 3")).toBe(5);
      });

      it("subtracts numbers", () => {
        expect(formulaParser.parse("=10 - 4")).toBe(6);
      });

      it("multiplies numbers", () => {
        expect(formulaParser.parse("=3 * 4")).toBe(12);
      });

      it("divides numbers", () => {
        expect(formulaParser.parse("=10 / 4")).toBe(2.5);
      });

      it("respects operator precedence", () => {
        expect(formulaParser.parse("=2 + 3 * 4")).toBe(14);
      });

      it("respects parentheses", () => {
        expect(formulaParser.parse("=(2 + 3) * 4")).toBe(20);
      });

      it("handles unary negation", () => {
        expect(formulaParser.parse("=-5")).toBe(-5);
      });

      it("handles exponentiation", () => {
        expect(formulaParser.parse("=2^10")).toBe(1024);
      });
    });

    describe("math functions", () => {
      it("evaluates sqrt", () => {
        expect(formulaParser.parse("=sqrt(4)")).toBe(2);
      });

      it("evaluates sqrt of non-perfect square", () => {
        expect(formulaParser.parse("=sqrt(2)")).toBeCloseTo(1.41421356, 6);
      });

      it("evaluates abs", () => {
        expect(formulaParser.parse("=abs(-7)")).toBe(7);
      });

      it("evaluates ceil", () => {
        expect(formulaParser.parse("=ceil(4.2)")).toBe(5);
      });

      it("evaluates floor", () => {
        expect(formulaParser.parse("=floor(4.9)")).toBe(4);
      });

      it("evaluates round", () => {
        expect(formulaParser.parse("=round(4.5)")).toBe(5);
      });

      it("evaluates log", () => {
        expect(formulaParser.parse("=log(100, 10)")).toBeCloseTo(2, 10);
      });

      it("evaluates log10", () => {
        expect(formulaParser.parse("=log10(1000)")).toBeCloseTo(3, 10);
      });

      it("evaluates exp", () => {
        expect(formulaParser.parse("=exp(1)")).toBeCloseTo(Math.E, 10);
      });

      it("evaluates min", () => {
        expect(formulaParser.parse("=min(3, 1, 2)")).toBe(1);
      });

      it("evaluates max", () => {
        expect(formulaParser.parse("=max(3, 1, 2)")).toBe(3);
      });
    });

    describe("trigonometric functions", () => {
      it("evaluates sin", () => {
        expect(formulaParser.parse("=sin(0)")).toBe(0);
      });

      it("evaluates cos", () => {
        expect(formulaParser.parse("=cos(0)")).toBe(1);
      });

      it("evaluates tan", () => {
        expect(formulaParser.parse("=tan(0)")).toBe(0);
      });

      it("evaluates asin", () => {
        expect(formulaParser.parse("=asin(1)")).toBeCloseTo(Math.PI / 2, 10);
      });

      it("evaluates acos", () => {
        expect(formulaParser.parse("=acos(1)")).toBeCloseTo(0, 10);
      });

      it("evaluates atan", () => {
        expect(formulaParser.parse("=atan(1)")).toBeCloseTo(Math.PI / 4, 10);
      });

      it("evaluates atan2", () => {
        expect(formulaParser.parse("=atan2(1, 1)")).toBeCloseTo(Math.PI / 4, 10);
      });
    });

    describe("constants", () => {
      it("evaluates pi", () => {
        expect(formulaParser.parse("=pi")).toBeCloseTo(Math.PI, 10);
      });

      it("evaluates e", () => {
        expect(formulaParser.parse("=e")).toBeCloseTo(Math.E, 10);
      });

      it("evaluates phi", () => {
        expect(formulaParser.parse("=phi")).toBeCloseTo(1.6180339887, 8);
      });

      it("uses pi in expression", () => {
        expect(formulaParser.parse("=2 * pi")).toBeCloseTo(2 * Math.PI, 10);
      });
    });

    describe("compound expressions", () => {
      it("evaluates Pythagorean theorem", () => {
        expect(formulaParser.parse("=sqrt(3^2 + 4^2)")).toBe(5);
      });

      it("evaluates nested functions", () => {
        expect(formulaParser.parse("=abs(floor(-4.7))")).toBe(5);
      });

      it("evaluates mixed arithmetic and functions", () => {
        expect(formulaParser.parse("=2 * sqrt(9) + 1")).toBe(7);
      });
    });

    describe("errors", () => {
      it("throws on empty formula", () => {
        expect(() => formulaParser.parse("=")).toThrow();
      });

      it("throws on whitespace-only expression", () => {
        expect(() => formulaParser.parse("=   ")).toThrow();
      });

      it("throws on invalid expression", () => {
        expect(() => formulaParser.parse("=2 + invalid")).toThrow();
      });

      it("throws on division by zero (Infinity)", () => {
        expect(() => formulaParser.parse("=1 / 0")).toThrow();
      });

      it("throws on NaN result", () => {
        expect(() => formulaParser.parse("=sqrt(-1)")).toThrow();
      });

      it("throws on syntax error", () => {
        expect(() => formulaParser.parse("=((2 + 3)")).toThrow();
      });

      it("throws on expression that returns a non-number (matrix)", () => {
        expect(() => formulaParser.parse("=[1, 2, 3]")).toThrow();
      });
    });
  });

  describe("parseWithUnit - embedded unit formulas", () => {
    describe("length", () => {
      it("returns hasEmbeddedUnits true for single unit expression", () => {
        const result = formulaParser.parseWithUnit("=4 m");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit).not.toBeNull();
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(4, 10);
      });

      it("resolves addition of mixed length units", () => {
        const result = formulaParser.parseWithUnit("=4m + 2cm");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(4.02, 10);
      });

      it("resolves mm to m conversion", () => {
        const result = formulaParser.parseWithUnit("=4000mm");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(4, 10);
      });

      it("resolves subtraction of length units", () => {
        const result = formulaParser.parseWithUnit("=1000mm - 5cm");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(0.95, 10);
      });

      it("resolves scalar multiplication", () => {
        const result = formulaParser.parseWithUnit("=2 * 3 m");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(6, 10);
      });

      it("resolves sqrt result multiplied by unit", () => {
        const result = formulaParser.parseWithUnit("=sqrt(4) m");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m")).toBeCloseTo(2, 10);
      });

      it("resolves sqrt result in mm", () => {
        const result = formulaParser.parseWithUnit("=sqrt(4) mm");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("mm")).toBeCloseTo(2, 10);
      });

      it("preserves cleanText as original formula", () => {
        const result = formulaParser.parseWithUnit("=4m + 2cm");
        expect(result.cleanText).toBe("=4m + 2cm");
      });
    });

    describe("area", () => {
      it("resolves m^2 expression", () => {
        const result = formulaParser.parseWithUnit("=2 m^2");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^2")).toBeCloseTo(2, 10);
      });

      it("resolves addition of area units", () => {
        const result = formulaParser.parseWithUnit("=1 m^2 + 5000 cm^2");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^2")).toBeCloseTo(1.5, 10);
      });

      it("resolves in^2 to m^2", () => {
        const result = formulaParser.parseWithUnit("=144 in^2");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^2")).toBeGreaterThan(0);
      });
    });

    describe("volume", () => {
      it("resolves m^3 expression", () => {
        const result = formulaParser.parseWithUnit("=2 m^3");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^3")).toBeCloseTo(2, 10);
      });

      it("resolves liters to m^3", () => {
        const result = formulaParser.parseWithUnit("=1000 L");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^3")).toBeCloseTo(1, 10);
      });

      it("resolves mixed volume addition", () => {
        const result = formulaParser.parseWithUnit("=1 m^3 + 500 L");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("m^3")).toBeCloseTo(1.5, 10);
      });
    });

    describe("angle", () => {
      it("resolves degree expression", () => {
        const result = formulaParser.parseWithUnit("=90 deg");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("rad")).toBeCloseTo(Math.PI / 2, 8);
      });

      it("resolves addition of degrees", () => {
        const result = formulaParser.parseWithUnit("=45 deg + 30 deg");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("rad")).toBeCloseTo(75 * Math.PI / 180, 8);
      });

      it("resolves scalar times deg", () => {
        const result = formulaParser.parseWithUnit("=2 deg * 2");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("deg")).toBeCloseTo(4, 10);
      });

      it("resolves rad expression", () => {
        const result = formulaParser.parseWithUnit("=pi rad");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("rad")).toBeCloseTo(Math.PI, 8);
      });
    });

    describe("temperature", () => {
      it("resolves degC expression", () => {
        const result = formulaParser.parseWithUnit("=20 degC");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("degC")).toBeCloseTo(20, 10);
      });

      it("converts degF to degC", () => {
        const result = formulaParser.parseWithUnit("=100 degF");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("degC")).toBeCloseTo(37.778, 2);
      });

      it("resolves Kelvin expression", () => {
        const result = formulaParser.parseWithUnit("=273.15 K");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("degC")).toBeCloseTo(0, 5);
      });
    });

    describe("mass", () => {
      it("resolves kg expression", () => {
        const result = formulaParser.parseWithUnit("=5 kg");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("kg")).toBeCloseTo(5, 10);
      });

      it("resolves addition of mass units", () => {
        const result = formulaParser.parseWithUnit("=5 kg + 500 g");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("kg")).toBeCloseTo(5.5, 10);
      });
    });

    describe("force", () => {
      it("resolves kN to N", () => {
        const result = formulaParser.parseWithUnit("=1 kN");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("N")).toBeCloseTo(1000, 10);
      });

      it("resolves addition of force units", () => {
        const result = formulaParser.parseWithUnit("=1 kN + 500 N");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("N")).toBeCloseTo(1500, 10);
      });
    });

    describe("pressure", () => {
      it("resolves bar to Pa", () => {
        const result = formulaParser.parseWithUnit("=1 bar");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("Pa")).toBeCloseTo(100000, 10);
      });

      it("resolves mixed pressure addition", () => {
        const result = formulaParser.parseWithUnit("=1 bar + 50 kPa");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("Pa")).toBeCloseTo(150000, 10);
      });
    });

    describe("time", () => {
      it("resolves hours to seconds", () => {
        const result = formulaParser.parseWithUnit("=1 h");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("s")).toBeCloseTo(3600, 10);
      });

      it("resolves hours and minutes", () => {
        const result = formulaParser.parseWithUnit("=1 h + 30 min");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("s")).toBeCloseTo(5400, 10);
      });

      it("resolves subtraction of time", () => {
        const result = formulaParser.parseWithUnit("=2 h - 15 min");
        expect(result.hasEmbeddedUnits).toBe(true);
        expect(result.mathjsUnit.toNumber("s")).toBeCloseTo(6300, 10);
      });
    });

    describe("plain number formulas (no embedded units)", () => {
      it("returns hasEmbeddedUnits false for pure arithmetic", () => {
        const result = formulaParser.parseWithUnit("=2 + 3");
        expect(result.hasEmbeddedUnits).toBe(false);
        expect(result.value).toBe(5);
        expect(result.mathjsUnit).toBeNull();
      });

      it("returns hasEmbeddedUnits false for pi constant", () => {
        const result = formulaParser.parseWithUnit("=pi");
        expect(result.hasEmbeddedUnits).toBe(false);
        expect(result.value).toBeCloseTo(Math.PI, 10);
      });

      it("returns hasEmbeddedUnits false for sqrt", () => {
        const result = formulaParser.parseWithUnit("=sqrt(4)");
        expect(result.hasEmbeddedUnits).toBe(false);
        expect(result.value).toBe(2);
      });

      it("preserves cleanText for plain formula", () => {
        const result = formulaParser.parseWithUnit("=sqrt(4)");
        expect(result.cleanText).toBe("=sqrt(4)");
      });
    });

    describe("errors", () => {
      it("throws on empty expression", () => {
        expect(() => formulaParser.parseWithUnit("=")).toThrow();
      });

      it("throws on invalid identifier", () => {
        expect(() => formulaParser.parseWithUnit("=2 + unknown")).toThrow();
      });

      it("throws on division by zero", () => {
        expect(() => formulaParser.parseWithUnit("=1 / 0")).toThrow();
      });

      it("throws on NaN result", () => {
        expect(() => formulaParser.parseWithUnit("=sqrt(-1)")).toThrow();
      });
    });
  });

  describe("extractTrailingUnit", () => {
    it("extracts a known unit at the end", () => {
      expect(formulaParser.extractTrailingUnit("2 + 3 m")).toEqual({ expression: "2 + 3", unit: "m" });
    });

    it("returns null unit when last token is not a unit", () => {
      expect(formulaParser.extractTrailingUnit("2 + pi")).toEqual({ expression: "2 + pi", unit: null });
    });

    it("returns null unit when no space present", () => {
      expect(formulaParser.extractTrailingUnit("sqrt(4)")).toEqual({ expression: "sqrt(4)", unit: null });
    });

    it("extracts compound unit like m^2", () => {
      const result = formulaParser.extractTrailingUnit("2 * 3 m^2");
      expect(result.unit).toBe("m^2");
      expect(result.expression).toBe("2 * 3");
    });
  });

  describe("custom instance", () => {
    it("can create a new FormulaParser instance", () => {
      const parser = new FormulaParser();
      expect(parser.parse("=6 * 7")).toBe(42);
    });
  });
});
