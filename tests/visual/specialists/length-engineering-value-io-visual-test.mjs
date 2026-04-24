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
          composition: "2000 mm",
          friendly: "2000 mm",
          edit: "2000"
        }
      },
      {
        input: { value: 2000, unit: "mm" },
        internal: "2 m",
        outputs: {
          display: "200 cm",
          composition: "200 cm",
          friendly: "200 cm",
          edit: "200"
        }
      },
      {
        input: { value: 762, unit: "mm" },
        internal: "0.762 m",
        outputs: {
          display: "30 in",
          composition: "30 in",
          friendly: "30 in",
          edit: "30"
        }
      },
      {
        input: { value: 30, unit: "in" },
        internal: "0.762 m",
        outputs: {
          display: "762.0 mm",
          composition: "762.0 mm",
          friendly: "762.0 mm",
          edit: "762.0"
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