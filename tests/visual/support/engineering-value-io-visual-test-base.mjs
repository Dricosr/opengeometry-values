import { VALUE_TYPES } from "../../../src/constants/value-types.mjs";
import { createValue } from "../../../src/core/create-value.mjs";
import { Output } from "../../../src/core/models/output.mjs";
import { tryCreateValue } from "../../../src/core/create-value.mjs";

export class EngineeringValueIoVisualTestBase {
  renderPreview({
    value,
    quantity,
    unit,
    outputUnit,
    precision = 0
  }) {
    const output = new Output({
      unit: outputUnit,
      precision,
      showUnit: outputUnit !== undefined
    });

    const createdValue = createValue({
      value,
      valueType: VALUE_TYPES.FLOAT,
      quantity,
      unit,
      output
    });

    return {
      input: this.renderInput({ value, unit }),
      internal: createdValue.input.internal.unit ? `${createdValue.input.internal.value} ${createdValue.input.internal.unit}` : String(createdValue.input.internal.value),
      outputs: {
        display: createdValue.input.formatForDisplay(),
        edit: createdValue.input.formatForEdit()
      }
    };
  }

  renderPreviews() {
    return this.getScenarios().map((scenario) => this.renderPreview(scenario));
  }

  renderInvalidPreview({
    value,
    quantity,
    unit,
    valueType = VALUE_TYPES.FLOAT
  }) {
    const result = tryCreateValue({
      value,
      valueType,
      quantity,
      unit
    });

    if (result.ok) {
      throw new Error(`Expected invalid input preview for ${value}.`);
    }

    return {
      input: this.renderInput({ value, unit }),
      errorCode: result.error.code,
      errorField: result.error.field,
      errorMessage: result.error.message
    };
  }

  renderInvalidPreviews() {
    return this.getInvalidScenarios().map((scenario) => this.renderInvalidPreview(scenario));
  }

  renderInput({ value, unit }) {
    if (unit === undefined) {
      return { value };
    }

    return {
      value,
      unit
    };
  }

  getScenarios() {
    throw new Error("Specialist visual test classes must implement getScenarios().");
  }

  getExpectedPreviews() {
    throw new Error("Specialist visual test classes must implement getExpectedPreviews().");
  }

  getInvalidScenarios() {
    return [];
  }

  getExpectedInvalidPreviews() {
    return [];
  }
}