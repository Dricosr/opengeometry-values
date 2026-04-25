import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class VolumeEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 3000,
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.CUBIC_CENTIMETER,
        outputUnit: MATHJS_STRINGS.CUBIC_CENTIMETER,
        precision: 0
      },
      {
        value: 0.003,
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.CUBIC_METER,
        outputUnit: MATHJS_STRINGS.CUBIC_CENTIMETER,
        precision: 0
      },
      {
        value: 50000,
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.LITER,
        outputUnit: MATHJS_STRINGS.LITER,
        precision: 0
      },
      {
        value: 18.75,
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.CUBIC_METER,
        outputUnit: MATHJS_STRINGS.LITER,
        precision: 0
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 3000, unit: "cm^3" },
        internal: "0.003 m^3",
        outputs: {
          display: "3000 cm^3",
          edit: "3000"
        }
      },
      {
        input: { value: 0.003, unit: "m^3" },
        internal: "0.003 m^3",
        outputs: {
          display: "3000 cm^3",
          edit: "3000"
        }
      },
      {
        input: { value: 50000, unit: "L" },
        internal: "50 m^3",
        outputs: {
          display: "50000 L",
          edit: "50000"
        }
      },
      {
        input: { value: 18.75, unit: "m^3" },
        internal: "18.75 m^3",
        outputs: {
          display: "18750 L",
          edit: "18750"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "3,000",
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.CUBIC_CENTIMETER
      },
      {
        value: 3000,
        quantity: QUANTITY_TYPES.VOLUME,
        unit: MATHJS_STRINGS.SQUARE_CENTIMETER
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "3,000", unit: "cm^3" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 3,000"
      },
      {
        input: { value: 3000, unit: "cm^2" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: cm^2"
      }
    ];
  }
}