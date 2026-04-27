import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class MassEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 12.5,
        quantity: QUANTITY_TYPES.MASS,
        unit: MATHJS_STRINGS.KILOGRAM,
        outputUnit: MATHJS_STRINGS.KILOGRAM,
        precision: 1
      },
      {
        value: "=5 kg + 500 g",
        quantity: QUANTITY_TYPES.MASS,
        unit: MATHJS_STRINGS.KILOGRAM,
        outputUnit: MATHJS_STRINGS.KILOGRAM,
        precision: 2
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 12.5, unit: "kg" },
        internal: "12.5 kg",
        outputs: {
          display: "12.5 kg",
          edit: "12.5"
        }
      },
      {
        input: { value: "=5 kg + 500 g", unit: "kg" },
        internal: "5.5 kg",
        outputs: {
          display: "5.50 kg",
          edit: "=5 kg + 500 g"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "12,5",
        quantity: QUANTITY_TYPES.MASS,
        unit: MATHJS_STRINGS.KILOGRAM
      },
      {
        value: 12.5,
        quantity: QUANTITY_TYPES.MASS,
        unit: MATHJS_STRINGS.NEWTON
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "12,5", unit: "kg" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 12,5"
      },
      {
        input: { value: 12.5, unit: "N" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: N"
      }
    ];
  }
}