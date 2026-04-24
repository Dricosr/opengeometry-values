import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class TimeEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 7200,
        quantity: QUANTITY_TYPES.TIME,
        unit: MATHJS_STRINGS.SECOND,
        outputUnit: MATHJS_STRINGS.HOUR,
        precision: 0
      },
      {
        value: 90,
        quantity: QUANTITY_TYPES.TIME,
        unit: MATHJS_STRINGS.MINUTE,
        outputUnit: MATHJS_STRINGS.HOUR,
        precision: 1
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 7200, unit: "s" },
        internal: "7200 s",
        outputs: {
          display: "2 h",
          composition: "2 h",
          friendly: "2 h",
          edit: "2"
        }
      },
      {
        input: { value: 90, unit: "min" },
        internal: "5400 s",
        outputs: {
          display: "1.5 h",
          composition: "1.5 h",
          friendly: "1.5 h",
          edit: "1.5"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "7h",
        quantity: QUANTITY_TYPES.TIME,
        unit: MATHJS_STRINGS.HOUR
      },
      {
        value: 7200,
        quantity: QUANTITY_TYPES.TIME,
        unit: MATHJS_STRINGS.KILOGRAM
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "7h", unit: "h" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 7h"
      },
      {
        input: { value: 7200, unit: "kg" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: kg"
      }
    ];
  }
}