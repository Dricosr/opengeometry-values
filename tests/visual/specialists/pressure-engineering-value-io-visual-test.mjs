import { UNIT_TOKENS } from "../../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class PressureEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 250000,
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.PASCAL,
        outputUnit: UNIT_TOKENS.KILOPASCAL,
        precision: 0
      },
      {
        value: 2.5,
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.BAR,
        outputUnit: UNIT_TOKENS.KILOPASCAL,
        precision: 0
      },
      {
        value: 2.5,
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.MEGAPASCAL,
        outputUnit: UNIT_TOKENS.BAR,
        precision: 0
      },
      {
        value: "=1 MPa + 500 kPa",
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.MEGAPASCAL,
        outputUnit: UNIT_TOKENS.MEGAPASCAL,
        precision: 2
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 250000, unit: "Pa" },
        internal: "250000 Pa",
        outputs: {
          display: "250 kPa",
          edit: "250"
        }
      },
      {
        input: { value: 2.5, unit: "bar" },
        internal: "250000 Pa",
        outputs: {
          display: "250 kPa",
          edit: "250"
        }
      },
      {
        input: { value: 2.5, unit: "MPa" },
        internal: "2500000 Pa",
        outputs: {
          display: "25 bar",
          edit: "25"
        }
      },
      {
        input: { value: "=1 MPa + 500 kPa", unit: "MPa" },
        internal: "1500000 Pa",
        outputs: {
          display: "1.50 MPa",
          edit: "=1 MPa + 500 kPa"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "250k",
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.PASCAL
      },
      {
        value: 250000,
        quantity: QUANTITY_TYPES.PRESSURE,
        unit: UNIT_TOKENS.METER
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "250k", unit: "Pa" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 250k"
      },
      {
        input: { value: 250000, unit: "m" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: m"
      }
    ];
  }
}