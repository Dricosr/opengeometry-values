import { UNIT_TOKENS } from "../../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class ForceEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 1500,
        quantity: QUANTITY_TYPES.FORCE,
        unit: UNIT_TOKENS.NEWTON,
        outputUnit: UNIT_TOKENS.KILONEWTON,
        precision: 1
      },
      {
        value: 2.5,
        quantity: QUANTITY_TYPES.FORCE,
        unit: UNIT_TOKENS.KILONEWTON,
        outputUnit: UNIT_TOKENS.NEWTON,
        precision: 0
      },
      {
        value: "=1 kN + 500 N",
        quantity: QUANTITY_TYPES.FORCE,
        unit: UNIT_TOKENS.KILONEWTON,
        outputUnit: UNIT_TOKENS.KILONEWTON,
        precision: 1
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 1500, unit: "N" },
        internal: "1500 N",
        outputs: {
          display: "1.5 kN",
          edit: "1.5"
        }
      },
      {
        input: { value: 2.5, unit: "kN" },
        internal: "2500 N",
        outputs: {
          display: "2500 N",
          edit: "2500"
        }
      },
      {
        input: { value: "=1 kN + 500 N", unit: "kN" },
        internal: "1500 N",
        outputs: {
          display: "1.5 kN",
          edit: "=1 kN + 500 N"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "1.5k",
        quantity: QUANTITY_TYPES.FORCE,
        unit: UNIT_TOKENS.NEWTON
      },
      {
        value: 1500,
        quantity: QUANTITY_TYPES.FORCE,
        unit: UNIT_TOKENS.PASCAL
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "1.5k", unit: "N" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: 1.5k"
      },
      {
        input: { value: 1500, unit: "Pa" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: Pa"
      }
    ];
  }
}