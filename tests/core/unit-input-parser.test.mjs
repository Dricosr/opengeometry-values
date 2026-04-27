import { describe, it, expect } from "vitest";
import { UnitInputParser, unitInputParser } from "../../src/core/parsers/unit-input-parser.mjs";

describe("UnitInputParser", () => {
  describe("canParse", () => {
    it("returns true for number+unit without space", () => {
      expect(unitInputParser.canParse("2m")).toBe(true);
    });

    it("returns true for number+unit with space", () => {
      expect(unitInputParser.canParse("2 m")).toBe(true);
    });

    it("returns true for millimeters", () => {
      expect(unitInputParser.canParse("4000mm")).toBe(true);
    });

    it("returns true for compound unit m^2", () => {
      expect(unitInputParser.canParse("2 m^2")).toBe(true);
    });

    it("returns true for temperature unit", () => {
      expect(unitInputParser.canParse("100 degC")).toBe(true);
    });

    it("returns true for decimal number with unit", () => {
      expect(unitInputParser.canParse("2.5 kg")).toBe(true);
    });

    it("returns true for negative number with unit", () => {
      expect(unitInputParser.canParse("-5 degC")).toBe(true);
    });

    it("returns false for plain number", () => {
      expect(unitInputParser.canParse("200")).toBe(false);
    });

    it("returns false for plain decimal", () => {
      expect(unitInputParser.canParse("200.5")).toBe(false);
    });

    it("returns false for unknown unit", () => {
      expect(unitInputParser.canParse("200 foo")).toBe(false);
    });

    it("returns false for empty string", () => {
      expect(unitInputParser.canParse("")).toBe(false);
    });

    it("returns false for formula prefix", () => {
      expect(unitInputParser.canParse("=2m")).toBe(false);
    });
  });

  describe("parse", () => {
    describe("length", () => {
      it("parses 2m", () => {
        const result = unitInputParser.parse("2m");
        expect(result.value).toBe(2);
        expect(result.unit).toBe("m");
      });

      it("parses 4000mm", () => {
        const result = unitInputParser.parse("4000mm");
        expect(result.value).toBe(4000);
        expect(result.unit).toBe("mm");
      });

      it("parses 200 cm with space", () => {
        const result = unitInputParser.parse("200 cm");
        expect(result.value).toBe(200);
        expect(result.unit).toBe("cm");
      });

      it("parses decimal with unit", () => {
        const result = unitInputParser.parse("2.54 cm");
        expect(result.value).toBe(2.54);
        expect(result.unit).toBe("cm");
      });

      it("parses inches", () => {
        const result = unitInputParser.parse("30in");
        expect(result.value).toBe(30);
        expect(result.unit).toBe("in");
      });
    });

    describe("area", () => {
      it("parses m^2", () => {
        const result = unitInputParser.parse("2 m^2");
        expect(result.value).toBe(2);
        expect(result.unit).toBe("m^2");
      });

      it("parses cm^2", () => {
        const result = unitInputParser.parse("5000cm^2");
        expect(result.value).toBe(5000);
        expect(result.unit).toBe("cm^2");
      });
    });

    describe("volume", () => {
      it("parses m^3", () => {
        const result = unitInputParser.parse("1 m^3");
        expect(result.value).toBe(1);
        expect(result.unit).toBe("m^3");
      });

      it("parses liters", () => {
        const result = unitInputParser.parse("500 L");
        expect(result.value).toBe(500);
        expect(result.unit).toBe("L");
      });
    });

    describe("angle", () => {
      it("parses degrees", () => {
        const result = unitInputParser.parse("90deg");
        expect(result.value).toBe(90);
        expect(result.unit).toBe("deg");
      });

      it("parses radians", () => {
        const result = unitInputParser.parse("1.5708 rad");
        expect(result.value).toBe(1.5708);
        expect(result.unit).toBe("rad");
      });
    });

    describe("temperature", () => {
      it("parses degC", () => {
        const result = unitInputParser.parse("20 degC");
        expect(result.value).toBe(20);
        expect(result.unit).toBe("degC");
      });

      it("parses degF", () => {
        const result = unitInputParser.parse("100 degF");
        expect(result.value).toBe(100);
        expect(result.unit).toBe("degF");
      });

      it("parses Kelvin", () => {
        const result = unitInputParser.parse("273.15K");
        expect(result.value).toBe(273.15);
        expect(result.unit).toBe("K");
      });

      it("parses negative temperature", () => {
        const result = unitInputParser.parse("-10 degC");
        expect(result.value).toBe(-10);
        expect(result.unit).toBe("degC");
      });
    });

    describe("mass", () => {
      it("parses kg", () => {
        const result = unitInputParser.parse("5 kg");
        expect(result.value).toBe(5);
        expect(result.unit).toBe("kg");
      });
    });

    describe("force", () => {
      it("parses kN", () => {
        const result = unitInputParser.parse("1.5 kN");
        expect(result.value).toBe(1.5);
        expect(result.unit).toBe("kN");
      });

      it("parses N", () => {
        const result = unitInputParser.parse("500N");
        expect(result.value).toBe(500);
        expect(result.unit).toBe("N");
      });
    });

    describe("pressure", () => {
      it("parses bar", () => {
        const result = unitInputParser.parse("1bar");
        expect(result.value).toBe(1);
        expect(result.unit).toBe("bar");
      });

      it("parses kPa", () => {
        const result = unitInputParser.parse("250 kPa");
        expect(result.value).toBe(250);
        expect(result.unit).toBe("kPa");
      });

      it("parses MPa", () => {
        const result = unitInputParser.parse("50 MPa");
        expect(result.value).toBe(50);
        expect(result.unit).toBe("MPa");
      });
    });

    describe("time", () => {
      it("parses hours", () => {
        const result = unitInputParser.parse("1h");
        expect(result.value).toBe(1);
        expect(result.unit).toBe("h");
      });

      it("parses minutes", () => {
        const result = unitInputParser.parse("90 min");
        expect(result.value).toBe(90);
        expect(result.unit).toBe("min");
      });

      it("parses seconds", () => {
        const result = unitInputParser.parse("3600 s");
        expect(result.value).toBe(3600);
        expect(result.unit).toBe("s");
      });
    });

    describe("errors", () => {
      it("throws for plain number", () => {
        expect(() => unitInputParser.parse("200")).toThrow();
      });

      it("throws for unknown unit", () => {
        expect(() => unitInputParser.parse("200 foo")).toThrow();
      });

      it("throws for empty string", () => {
        expect(() => unitInputParser.parse("")).toThrow();
      });
    });
  });

  describe("custom instance", () => {
    it("can create a new UnitInputParser instance", () => {
      const parser = new UnitInputParser();
      const result = parser.parse("5 kg");
      expect(result.value).toBe(5);
      expect(result.unit).toBe("kg");
    });
  });
});
