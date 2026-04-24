import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { DOMAIN_STRINGS } from "../../constants/domain-string-catalog.mjs";
import { createReferenceId } from "../base/create-reference-id.mjs";
import { baseNumericValueFormatter } from "../formatters/base-numeric-value-formatter.mjs";
import { CustomOutputAffix } from "./custom-output-affix.mjs";
import { EmptyOutputAffix } from "./empty-output-affix.mjs";
import { OutputAffix } from "./output-affix.mjs";
import { UnitCodeOutputAffix } from "./unit-code-output-affix.mjs";
import { UnitSymbolOutputAffix } from "./unit-symbol-output-affix.mjs";

export class Output {
  constructor({ id, unit, precision, prefix, suffix, showUnit = true }) {
    this.id = createReferenceId("output", id);
    this.unit = unit;
    this.precision = precision;
    this.showUnit = showUnit;
    this.prefix = this.resolvePrefixAffix(prefix);
    this.suffix = this.resolveInitialSuffixAffix(suffix, unit, showUnit);

    Object.freeze(this);
  }

  formatDisplay(input, options = {}) {
    return this.withOverrides(options).composeFormattedValue(input, true);
  }

  formatComposition(input, options = {}) {
    return this.formatDisplay(input, options);
  }

  formatFriendlyValue(input, options = {}) {
    return this.formatDisplay(input, options);
  }

  formatEdit(input, options = {}) {
    return this.withOverrides({
      ...options,
      showUnit: false,
      suffix: new EmptyOutputAffix()
    }).composeFormattedValue(input, false);
  }

  withOverrides(options = {}) {
    const resolvedUnit = options.unit ?? this.unit;
    const resolvedPrecision = options.precision ?? this.precision;
    const resolvedShowUnit = options.showUnit ?? this.showUnit;

    return new Output({
      id: this.id,
      unit: resolvedUnit,
      precision: resolvedPrecision,
      prefix: this.resolveOverrideAffix(options.prefix, this.prefix),
      suffix: this.resolveOverrideSuffixAffix(options.suffix, resolvedUnit, resolvedShowUnit),
      showUnit: resolvedShowUnit
    });
  }

  composeFormattedValue(input, includeAffixes) {
    if (typeof input.internal.value !== "number") {
      return String(input.internal.value ?? "");
    }

    const outputUnit = this.unit === QUANTITY_TYPES.NONE ? undefined : (this.unit ?? input.internal.unit);
    const numericText = baseNumericValueFormatter.formatNumber(input, outputUnit, this.precision);

    if (!includeAffixes) {
      return numericText;
    }

    return `${this.resolvePrefixText()}${numericText}${this.resolveSuffixText()}`;
  }

  resolvePrefixText() {
    return this.prefix.resolveText();
  }

  resolveSuffixText() {
    const suffixText = this.suffix.resolveText();

    if (!suffixText) {
      return "";
    }

    if (this.suffix.type === OUTPUT_AFFIX_TYPES.UNIT_CODE || this.suffix.type === OUTPUT_AFFIX_TYPES.UNIT_SYMBOL) {
      return `${DOMAIN_STRINGS.SPACE}${suffixText}`;
    }

    return suffixText;
  }

  resolvePrefixAffix(prefix) {
    if (prefix instanceof OutputAffix) {
      return prefix;
    }

    if (prefix === undefined || prefix === null || prefix === "") {
      return new EmptyOutputAffix();
    }

    return new CustomOutputAffix({
      characters: prefix
    });
  }

  resolveInitialSuffixAffix(suffix, unit, showUnit) {
    if (suffix instanceof OutputAffix) {
      return suffix;
    }

    if (suffix !== undefined && suffix !== null && suffix !== "") {
      return new CustomOutputAffix({
        characters: suffix
      });
    }

    if (!showUnit || !unit || unit === QUANTITY_TYPES.NONE) {
      return new EmptyOutputAffix();
    }

    return new UnitCodeOutputAffix({ unit });
  }

  resolveOverrideAffix(overrideAffix, fallbackAffix) {
    if (overrideAffix === undefined) {
      return fallbackAffix;
    }

    return this.resolvePrefixAffix(overrideAffix);
  }

  resolveOverrideSuffixAffix(overrideAffix, unit, showUnit) {
    if (overrideAffix !== undefined) {
      return this.resolveInitialSuffixAffix(overrideAffix, unit, showUnit);
    }

    if (!showUnit || !unit || unit === QUANTITY_TYPES.NONE) {
      return new EmptyOutputAffix();
    }

    if (this.suffix instanceof UnitCodeOutputAffix) {
      return new UnitCodeOutputAffix({
        id: this.suffix.id,
        unit
      });
    }

    if (this.suffix instanceof UnitSymbolOutputAffix) {
      return new UnitSymbolOutputAffix({
        id: this.suffix.id,
        unit
      });
    }

    if (this.suffix.type === OUTPUT_AFFIX_TYPES.NONE) {
      return new UnitCodeOutputAffix({ unit });
    }

    return this.suffix;
  }
}