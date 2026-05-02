import { BOOLEAN_LABEL_PRESETS } from "../../constants/boolean-label-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../constants/output-suffix-modes.mjs";
import { SEPARATORS } from "../../constants/fractional-inch-catalog.mjs";
import { outputPresetCatalog } from "../../presets/output-preset-catalog.mjs";
import { CustomOutputAffix } from "../models/custom-output-affix.mjs";
import { EmptyOutputAffix } from "../models/empty-output-affix.mjs";
import { FractionalInchOutput } from "../models/fractional-inch-output.mjs";
import { Output } from "../models/output.mjs";
import { UnitCodeOutputAffix } from "../models/unit-code-output-affix.mjs";
import { UnitSymbolOutputAffix } from "../models/unit-symbol-output-affix.mjs";

export class OutputBuilder {
  constructor(presetCatalog = outputPresetCatalog) {
    this.presetCatalog = presetCatalog;
  }

  resolve(configuration = {}) {
    const preset = this.resolvePreset(configuration.presetId);

    return Object.freeze({
      id: configuration.id ?? preset?.id,
      presetId: preset?.id ?? null,
      unit: configuration.unit ?? preset?.unit,
      precision: configuration.precision ?? preset?.precision,
      showUnit: configuration.showUnit ?? preset?.showUnit ?? true,
      prefix: configuration.prefix ?? preset?.prefix ?? "",
      suffix: configuration.suffix ?? preset?.suffix ?? "",
      suffixMode: configuration.suffixMode ?? preset?.suffixMode ?? OUTPUT_SUFFIX_MODES.CODE,
      booleanLabelKey: preset?.booleanLabelKey ?? null,
      outputType: preset?.outputType ?? null,
      maxDenominator: preset?.maxDenominator ?? null,
      separator: preset?.separator ?? null
    });
  }

  build(configuration = {}) {
    const resolved = this.resolve(configuration);

    if (resolved.outputType === "fractional-inch") {
      return Object.freeze({
        config: resolved,
        output: new FractionalInchOutput({
          id: resolved.id,
          precision: resolved.precision,
          prefix: resolved.prefix || undefined,
          showUnit: resolved.showUnit,
          suffixMode: resolved.suffixMode,
          maxDenominator: resolved.maxDenominator ?? 64,
          separator: resolved.separator ?? SEPARATORS.SPACE
        })
      });
    }

    const booleanLabels = resolved.booleanLabelKey
      ? BOOLEAN_LABEL_PRESETS[resolved.booleanLabelKey]
      : null;

    return Object.freeze({
      config: resolved,
      output: new Output({
        id: resolved.id,
        unit: resolved.unit,
        precision: resolved.precision,
        prefix: resolved.prefix,
        suffix: this.createSuffixAffix(resolved),
        showUnit: resolved.showUnit,
        booleanLabels
      })
    });
  }

  resolvePreset(presetId) {
    if (!presetId) {
      return null;
    }

    const preset = this.presetCatalog.get(presetId);

    if (!preset) {
      throw new Error(`Unknown output preset: ${presetId}`);
    }

    return preset;
  }

  createSuffixAffix({ unit, suffix, suffixMode, showUnit }) {
    if (!showUnit && suffixMode !== OUTPUT_SUFFIX_MODES.CUSTOM) {
      return new EmptyOutputAffix();
    }

    switch (suffixMode) {
      case OUTPUT_SUFFIX_MODES.NONE:
        return new EmptyOutputAffix();
      case OUTPUT_SUFFIX_MODES.CODE:
        return new UnitCodeOutputAffix({ unit });
      case OUTPUT_SUFFIX_MODES.SYMBOL:
        return new UnitSymbolOutputAffix({ unit });
      case OUTPUT_SUFFIX_MODES.CUSTOM:
        return new CustomOutputAffix({ characters: suffix });
      default:
        throw new Error(`Unsupported output suffix mode: ${suffixMode}`);
    }
  }
}

export const outputBuilder = new OutputBuilder();
export const buildOutput = (configuration) => outputBuilder.build(configuration);