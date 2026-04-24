import { VALUE_TYPES } from "../../constants/value-types.mjs";
import { createValue } from "../create-value.mjs";
import { outputBuilder } from "./output-builder.mjs";

export class ValuePreviewService {
  constructor({ valueCreator = createValue, builder = outputBuilder } = {}) {
    this.valueCreator = valueCreator;
    this.builder = builder;
  }

  create({ parameter, output } = {}) {
    const resolvedParameter = this.resolveParameter(parameter);
    const builtOutput = this.builder.build(output);
    const value = this.valueCreator({
      id: resolvedParameter.id,
      value: resolvedParameter.input.value,
      valueType: resolvedParameter.valueType,
      quantity: resolvedParameter.quantity,
      unit: resolvedParameter.input.unit,
      output: builtOutput.output
    });

    return Object.freeze({
      parameter: resolvedParameter,
      internal: Object.freeze({
        value: value.internal.value,
        unit: value.internal.unit ?? null
      }),
      output: builtOutput.config,
      previews: Object.freeze({
        display: value.input.formatForDisplay(),
        composition: value.input.formatForComposition(),
        friendly: value.input.formatForFriendlyValue(),
        edit: value.input.formatForEdit()
      })
    });
  }

  resolveParameter(parameter = {}) {
    return Object.freeze({
      id: parameter.id,
      name: parameter.name ?? parameter.id ?? "",
      quantity: parameter.quantity,
      valueType: parameter.valueType ?? VALUE_TYPES.FLOAT,
      input: Object.freeze({
        value: parameter?.input?.value,
        unit: parameter?.input?.unit
      })
    });
  }
}

export const valuePreviewService = new ValuePreviewService();
export const createValuePreview = (configuration) => valuePreviewService.create(configuration);