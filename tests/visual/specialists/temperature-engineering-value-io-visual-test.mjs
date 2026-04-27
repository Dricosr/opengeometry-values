import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class TemperatureEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 30,
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.DEGREE_CELSIUS,
        outputUnit: MATHJS_STRINGS.DEGREE_FAHRENHEIT,
        precision: 0
      },
      {
        value: 32,
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.DEGREE_FAHRENHEIT,
        outputUnit: MATHJS_STRINGS.DEGREE_CELSIUS,
        precision: 0
      },
      {
        value: 273.15,
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.KELVIN,
        outputUnit: MATHJS_STRINGS.DEGREE_CELSIUS,
        precision: 0
      },
      {
        value: "=100 - 32",
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.DEGREE_FAHRENHEIT,
        outputUnit: MATHJS_STRINGS.DEGREE_CELSIUS,
        precision: 0
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 30, unit: "degC" },
        internal: "30 degC",
        outputs: {
          display: "86 degF",
          edit: "86"
        }
      },
      {
        input: { value: 32, unit: "degF" },
        internal: "0 degC",
        outputs: {
          display: "0 degC",
          edit: "0"
        }
      },
      {
        input: { value: 273.15, unit: "K" },
        internal: "0 degC",
        outputs: {
          display: "0 degC",
          edit: "0"
        }
      },
      {
        input: { value: "=100 - 32", unit: "degF" },
        internal: "20 degC",
        outputs: {
          display: "20 degC",
          edit: "=100 - 32 degF"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "30C",
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.DEGREE_CELSIUS
      },
      {
        value: 30,
        quantity: QUANTITY_TYPES.TEMPERATURE,
        unit: MATHJS_STRINGS.METER
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "30C", unit: "degC" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: C"
      },
      {
        input: { value: 30, unit: "m" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: m"
      }
    ];
  }
}