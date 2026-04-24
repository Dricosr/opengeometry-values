import { MATHJS_STRINGS } from "../../../src/constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../../../src/constants/quantity-types.mjs";
import { EngineeringValueIoVisualTestBase } from "../support/engineering-value-io-visual-test-base.mjs";

export class AngleEngineeringValueIoVisualTest extends EngineeringValueIoVisualTestBase {
  getScenarios() {
    return [
      {
        value: 90,
        quantity: QUANTITY_TYPES.ANGLE,
        unit: MATHJS_STRINGS.DEGREE,
        outputUnit: MATHJS_STRINGS.DEGREE,
        precision: 0
      },
      {
        value: 1.570796326795,
        quantity: QUANTITY_TYPES.ANGLE,
        unit: MATHJS_STRINGS.RADIAN,
        outputUnit: MATHJS_STRINGS.DEGREE,
        precision: 0
      }
    ];
  }

  getExpectedPreviews() {
    return [
      {
        input: { value: 90, unit: "deg" },
        internal: "1.570796326795 rad",
        outputs: {
          display: "90 deg",
          composition: "90 deg",
          friendly: "90 deg",
          edit: "90"
        }
      },
      {
        input: { value: 1.570796326795, unit: "rad" },
        internal: "1.570796326795 rad",
        outputs: {
          display: "90 deg",
          composition: "90 deg",
          friendly: "90 deg",
          edit: "90"
        }
      }
    ];
  }

  getInvalidScenarios() {
    return [
      {
        value: "ninety",
        quantity: QUANTITY_TYPES.ANGLE,
        unit: MATHJS_STRINGS.DEGREE
      },
      {
        value: 90,
        quantity: QUANTITY_TYPES.ANGLE,
        unit: MATHJS_STRINGS.METER
      },
      {
        value: 90,
        quantity: QUANTITY_TYPES.ANGLE,
        unit: "foo"
      }
    ];
  }

  getExpectedInvalidPreviews() {
    return [
      {
        input: { value: "ninety", unit: "deg" },
        errorCode: "invalid_numeric_value",
        errorField: "value",
        errorMessage: "Invalid numeric value: ninety"
      },
      {
        input: { value: 90, unit: "m" },
        errorCode: "unsupported_input_unit",
        errorField: "unit",
        errorMessage: "Unsupported input unit: m"
      },
      {
        input: { value: 90, unit: "foo" },
        errorCode: "unknown_input_unit",
        errorField: "unit",
        errorMessage: "Unknown input unit: foo"
      }
    ];
  }
}