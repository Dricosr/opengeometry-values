import { describe, it, expect } from "vitest";
import { FractionalInchOutput } from "../../src/core/models/fractional-inch-output.mjs";
import { createValue } from "../../src/core/create-value.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { MATHJS_STRINGS } from "../../src/constants/mathjs-string-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../src/constants/output-suffix-modes.mjs";

describe("FractionalInchOutput", () => {
  describe("constructor", () => {
    it("should create with default options", () => {
      const output = new FractionalInchOutput({ id: "test" });
      expect(output.unit).toBe("in");
      expect(output.showUnit).toBe(true);
      expect(output.suffixMode).toBe(OUTPUT_SUFFIX_MODES.SYMBOL);
      expect(output.prefix.resolveText()).toBe("");
    });

    it("should create with custom suffix mode (code)", () => {
      const output = new FractionalInchOutput({
        id: "test",
        suffixMode: OUTPUT_SUFFIX_MODES.CODE
      });
      expect(output.suffix.resolveText()).toBe("in");
    });

    it("should create with custom suffix mode (none)", () => {
      const output = new FractionalInchOutput({
        id: "test",
        suffixMode: OUTPUT_SUFFIX_MODES.NONE
      });
      expect(output.suffix.resolveText()).toBe("");
    });

    it("should create with showUnit=false", () => {
      const output = new FractionalInchOutput({
        id: "test",
        showUnit: false
      });
      expect(output.suffix.resolveText()).toBe("");
    });

    it("should create with custom prefix", () => {
      const output = new FractionalInchOutput({
        id: "test",
        prefix: "⌀ "
      });
      expect(output.prefix.resolveText()).toBe("⌀ ");
    });

    it("should create with custom maxDenominator", () => {
      const output = new FractionalInchOutput({
        id: "test",
        maxDenominator: 128
      });
      expect(output.formatter.maxDenominator).toBe(128);
    });
  });

  describe("formatDisplay — pipe diameters (NPS)", () => {
    it("should display NPS 1/2 as 1/2\"", () => {
      const ogValue = createValue({
        value: 0.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "nps-1-2", prefix: "⌀ " })
      });
      expect(ogValue.input.formatForDisplay()).toBe('⌀ 1/2"');
    });

    it("should display NPS 1 1/4 as 1 1/4\"", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "nps-1-1-4", prefix: "⌀ " })
      });
      expect(ogValue.input.formatForDisplay()).toBe('⌀ 1 1/4"');
    });

    it("should display NPS 4 pipe (4.5 in OD) as 4 1/2\"", () => {
      const ogValue = createValue({
        value: 4.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "nps-4" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('4 1/2"');
    });

    it("should display NPS 6 pipe (6.625 in OD) as 6 5/8\"", () => {
      const ogValue = createValue({
        value: 6.625,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "nps-6" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('6 5/8"');
    });
  });

  describe("formatDisplay — sheet metal thickness", () => {
    it("should display 1/16 in plate thickness", () => {
      const ogValue = createValue({
        value: 0.0625,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "plate" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1/16"');
    });

    it("should display 1/8 in plate thickness", () => {
      const ogValue = createValue({
        value: 0.125,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "plate" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1/8"');
    });

    it("should display 3/8 in plate thickness", () => {
      const ogValue = createValue({
        value: 0.375,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "plate" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('3/8"');
    });
  });

  describe("formatDisplay — suffix modes", () => {
    it("should display with double prime (default)", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1 1/4"');
    });

    it("should display with code suffix (in)", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({
          id: "test",
          suffixMode: OUTPUT_SUFFIX_MODES.CODE
        })
      });
      expect(ogValue.input.formatForDisplay()).toBe("1 1/4 in");
    });

    it("should display without suffix (none)", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({
          id: "test",
          suffixMode: OUTPUT_SUFFIX_MODES.NONE
        })
      });
      expect(ogValue.input.formatForDisplay()).toBe("1 1/4");
    });

    it("should display with showUnit=false", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({
          id: "test",
          showUnit: false
        })
      });
      expect(ogValue.input.formatForDisplay()).toBe("1 1/4");
    });
  });

  describe("formatDisplay — prefixes", () => {
    it("should display with diameter prefix (⌀ )", () => {
      const ogValue = createValue({
        value: 0.375,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({
          id: "test",
          prefix: "⌀ "
        })
      });
      expect(ogValue.input.formatForDisplay()).toBe('⌀ 3/8"');
    });

    it("should display with custom prefix", () => {
      const ogValue = createValue({
        value: 1.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({
          id: "test",
          prefix: "≈ "
        })
      });
      expect(ogValue.input.formatForDisplay()).toBe('≈ 1 1/2"');
    });

    it("should display without prefix", () => {
      const ogValue = createValue({
        value: 2,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('2"');
    });
  });

  describe("formatDisplay — unit conversion", () => {
    it("should display millimeter input converted to fractional inches", () => {
      const ogValue = createValue({
        value: 762,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.MILLIMETER,
        output: new FractionalInchOutput({ id: "test" })
      });
      // 762 mm = 30 inches
      expect(ogValue.input.formatForDisplay()).toBe('30"');
    });

    it("should display centimeter input converted to fractional inches", () => {
      const ogValue = createValue({
        value: 5.08,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.CENTIMETER,
        output: new FractionalInchOutput({ id: "test" })
      });
      // 5.08 cm = 2 inches
      expect(ogValue.input.formatForDisplay()).toBe('2"');
    });

    it("should display meter input converted to fractional inches", () => {
      const ogValue = createValue({
        value: 1,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.METER,
        output: new FractionalInchOutput({ id: "test" })
      });
      // 1 m = 39.3701 inches → 39 3/8 (approximately)
      expect(ogValue.input.formatForDisplay()).toMatch(/^39 \d+\/\d+"$/);
    });
  });

  describe("formatDisplay — various decimal inputs", () => {
    it("should display 3.175 in as fraction", () => {
      const ogValue = createValue({
        value: 3.175,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // 3.175 = 3 1/8" (approximately)
      expect(ogValue.input.formatForDisplay()).toMatch(/^3 \d+\/\d+"$/);
    });

    it("should display 0.1875 in as 3/16\"", () => {
      const ogValue = createValue({
        value: 0.1875,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('3/16"');
    });

    it("should display 0.65625 in as 21/32\"", () => {
      const ogValue = createValue({
        value: 0.65625,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('21/32"');
    });
  });

  describe("formatEdit", () => {
    it("should edit without suffix", () => {
      const ogValue = createValue({
        value: 1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForEdit()).toBe("1 1/4");
    });

    it("should edit whole inches without suffix", () => {
      const ogValue = createValue({
        value: 2,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForEdit()).toBe("2");
    });

    it("should edit fractions without suffix", () => {
      const ogValue = createValue({
        value: 0.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForEdit()).toBe("1/2");
    });

    it("should edit negative values without suffix", () => {
      const ogValue = createValue({
        value: -1.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.formatForEdit()).toBe("-1 1/4");
    });
  });

  describe("input fractional parsing", () => {
    it("should create value from fractional inch string input", () => {
      const ogValue = createValue({
        value: "1 1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 1.25 in = 0.03175 m
      expect(ogValue.internal.value).toBeCloseTo(0.03175, 5);
      expect(ogValue.input.unit).toBe(MATHJS_STRINGS.INCH);
    });

    it("should reject hyphen-separated fractional inch input", () => {
      // Hyphens in input are not valid separators — they are reserved for negative sign
      expect(() => createValue({
        value: "1-1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      })).toThrow();
    });

    it("should create value from pure fraction input", () => {
      const ogValue = createValue({
        value: "1/2",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 0.5 in = 0.0127 m
      expect(ogValue.internal.value).toBeCloseTo(0.0127, 5);
    });

    it("should create value from eighths input", () => {
      const ogValue = createValue({
        value: "3/8",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 0.375 in = 0.009525 m
      expect(ogValue.internal.value).toBeCloseTo(0.009525, 6);
    });

    it("should create value from sixteenths input", () => {
      const ogValue = createValue({
        value: "7/16",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 0.4375 in = 0.0111125 m
      expect(ogValue.internal.value).toBeCloseTo(0.0111125, 6);
    });

    it("should create value from large mixed number input", () => {
      const ogValue = createValue({
        value: "24 1/2",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 24.5 in = 0.6223 m
      expect(ogValue.internal.value).toBeCloseTo(0.6223, 4);
    });

    it("should reject hyphenated input (hyphens are for negative sign only)", () => {
      // Hyphen is not a valid separator in fractional input
      expect(() => createValue({
        value: "1-1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      })).toThrow();
    });

    it("should preserve fractional input as input value", () => {
      const ogValue = createValue({
        value: "1 1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.input.value).toBe("1 1/4");
    });

    it("should reject hyphen-separated input", () => {
      expect(() => createValue({
        value: "1-1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      })).toThrow();
    });
  });

  describe("fractional input round-trip (string → internal → display)", () => {
    it("should round-trip '1 1/4' input through internal meters and back to display", () => {
      const ogValue = createValue({
        value: "1 1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal is in meters: 1.25 in = 0.03175 m
      expect(ogValue.internal.unit).toBe(MATHJS_STRINGS.METER);
      expect(ogValue.internal.value).toBe(0.03175);
      // Format back should give fractional display
      expect(ogValue.input.formatForDisplay()).toBe('1 1/4"');
    });

    it("should round-trip '1/2' input through internal meters and back to display", () => {
      const ogValue = createValue({
        value: "1/2",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      expect(ogValue.internal.value).toBeCloseTo(0.5 * 0.0254, 10);
      expect(ogValue.input.formatForDisplay()).toBe('1/2"');
    });

    it("should reject hyphen input (not a valid separator)", () => {
      // Hyphen is not a valid separator in fractional inch notation
      // Only spaces between whole and fraction are accepted
      expect(() => createValue({
        value: "1-1/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      })).toThrow();
    });

    it("should round-trip '3/4' input", () => {
      const ogValue = createValue({
        value: "3/4",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test" })
      });
      // Internal value is stored in meters: 0.75 in
      expect(ogValue.internal.value).toBeCloseTo(0.75 * 0.0254, 10);
      expect(ogValue.input.formatForDisplay()).toBe('3/4"');
    });
  });

  describe("formatDisplay — construction precision (maxDenominator=16)", () => {
    it("should round 0.03125 to nearest 1/16", () => {
      const ogValue = createValue({
        value: 0.03125,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test", maxDenominator: 16 })
      });
      // 1/32 = 0.03125 is exactly halfway between 0 and 1/16.
      // Rounding to nearest 1/16 with quantization through meters gives 1/16.
      expect(ogValue.input.formatForDisplay()).toBe('1/16"');
    });

    it("should show 0.0625 as 1/16\" with construction precision", () => {
      const ogValue = createValue({
        value: 0.0625,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "test", maxDenominator: 16 })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1/16"');
    });
  });

  describe("error handling", () => {
    it("should reject invalid fraction input (non-power-of-2 denominator)", () => {
      expect(() => createValue({
        value: "1/3",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH
      })).toThrow();
    });

    it("should reject improper fraction input", () => {
      expect(() => createValue({
        value: "3/2",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH
      })).toThrow();
    });

    it("should reject non-numeric input", () => {
      expect(() => createValue({
        value: "abc",
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH
      })).toThrow();
    });
  });

  describe("formatDisplay — real-world construction samples", () => {
    it("should display 2x4 lumber nominal (1.5 in) as 1 1/2\"", () => {
      const ogValue = createValue({
        value: 1.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "lumber" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1 1/2"');
    });

    it("should display 4x4 lumber nominal (3.5 in) as 3 1/2\"", () => {
      const ogValue = createValue({
        value: 3.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "lumber" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('3 1/2"');
    });

    it("should display standard stud spacing (16 in)", () => {
      const ogValue = createValue({
        value: 16,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "framing" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('16"');
    });

    it("should display standard joist spacing (12 in)", () => {
      const ogValue = createValue({
        value: 12,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "framing" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('12"');
    });
  });

  describe("formatDisplay — fastener samples", () => {
    it("should display 1/4-20 bolt diameter", () => {
      const ogValue = createValue({
        value: 0.25,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "bolt" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('1/4"');
    });

    it("should display bolt length 2 1/2", () => {
      const ogValue = createValue({
        value: 2.5,
        valueType: VALUE_TYPES.FLOAT,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        output: new FractionalInchOutput({ id: "bolt-length" })
      });
      expect(ogValue.input.formatForDisplay()).toBe('2 1/2"');
    });
  });
});
