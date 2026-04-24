import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class AreaEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 20000,
        quantity: QUANTITY_TYPES.AREA,
        unit: MATHJS_STRINGS.SQUARE_CENTIMETER,
        outputUnit: MATHJS_STRINGS.SQUARE_METER,
        precision: 2
      },
      {
        value: 2,
        quantity: QUANTITY_TYPES.AREA,
        unit: MATHJS_STRINGS.SQUARE_METER,
        outputUnit: MATHJS_STRINGS.SQUARE_CENTIMETER,
        precision: 0
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 20000, unit: "cm^2" },
        internal: "2 m^2",
        outputs: {
          display: "2.00 m^2",
          composition: "2.00 m^2",
          friendly: "2.00 m^2",
          edit: "2.00"
        }
      },
      {
        input: { value: 2, unit: "m^2" },
        internal: "2 m^2",
        outputs: {
          display: "20000 cm^2",
          composition: "20000 cm^2",
          friendly: "20000 cm^2",
          edit: "20000"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "20 000",
        quantity: QUANTITY_TYPES.AREA,
        unit: MATHJS_STRINGS.SQUARE_CENTIMETER
      },
      {
        value: 20,
        quantity: QUANTITY_TYPES.AREA,
        unit: MATHJS_STRINGS.METER
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "20 000", unit: "cm^2" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 20 000"
      },
      {
        input: { value: 20, unit: "m" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: m"
      }
    ];
  }
}