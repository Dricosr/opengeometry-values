import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class LengthEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 2000,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.MILLIMETER,
        outputUnit: MATHJS_STRINGS.MILLIMETER,
        precision: 0
      },
      {
        value: 2000,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.MILLIMETER,
        outputUnit: MATHJS_STRINGS.CENTIMETER,
        precision: 0
      },
      {
        value: 762,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.MILLIMETER,
        outputUnit: MATHJS_STRINGS.INCH,
        precision: 0
      },
      {
        value: 30,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.INCH,
        outputUnit: MATHJS_STRINGS.MILLIMETER,
        precision: 1
      },
      {
        value: "=4 m + 200 cm",
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.METER,
        outputUnit: MATHJS_STRINGS.CENTIMETER,
        precision: 0
      },
      {
        value: "=2*3",
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.METER,
        outputUnit: MATHJS_STRINGS.CENTIMETER,
        precision: 0
      },
      {
        value: "4000mm",
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.METER,
        outputUnit: MATHJS_STRINGS.CENTIMETER,
        precision: 0
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 2000, unit: "mm" },
        internal: "2 m",
        outputs: {
          display: "2000 mm",
          edit: "2000"
        }
      },
      {
        input: { value: 2000, unit: "mm" },
        internal: "2 m",
        outputs: {
          display: "200 cm",
          edit: "200"
        }
      },
      {
        input: { value: 762, unit: "mm" },
        internal: "0.762 m",
        outputs: {
          display: "30 in",
          edit: "30"
        }
      },
      {
        input: { value: 30, unit: "in" },
        internal: "0.762 m",
        outputs: {
          display: "762.0 mm",
          edit: "762.0"
        }
      },
      {
        input: { value: "=4 m + 200 cm", unit: "m" },
        internal: "6 m",
        outputs: {
          display: "600 cm",
          edit: "=4 m + 200 cm"
        }
      },
      {
        input: { value: "=2*3", unit: "m" },
        internal: "6 m",
        outputs: {
          display: "600 cm",
          edit: "=2*3 m"
        }
      },
      {
        input: { value: "4000mm", unit: "m" },
        internal: "4 m",
        outputs: {
          display: "400 cm",
          edit: "400"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "2,000",
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.MILLIMETER
      },
      {
        value: 2000,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: MATHJS_STRINGS.DEGREE
      },
      {
        value: 2000,
        quantity: QUANTITY_TYPES.LENGTH,
        unit: "foo"
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "2,000", unit: "mm" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 2,000"
      },
      {
        input: { value: 2000, unit: "deg" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: deg"
      },
      {
        input: { value: 2000, unit: "foo" },
        errorCode: "unknown_input_unit",
        errorField: "unit",
        errorMessage: "Unknown input unit: foo"
      }
    ];
  }
}