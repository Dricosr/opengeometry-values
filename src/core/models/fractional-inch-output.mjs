import { OUTPUT_SUFFIX_MODES } from "../../constants/output-suffix-modes.mjs";
import { SEPARATORS } from "../../constants/fractional-inch-catalog.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { DOMAIN } from "../../constants/domain-catalog.mjs";
import { createReferenceId } from "../base/create-reference-id.mjs";
import { FractionalInchFormatter, fractionalInchFormatter } from "../formatters/fractional-inch-formatter.mjs";
import { baseNumericValueFormatter } from "../formatters/base-numeric-value-formatter.mjs";
import { CustomOutputAffix } from "./custom-output-affix.mjs";
import { EmptyOutputAffix } from "./empty-output-affix.mjs";
import { OutputAffix } from "./output-affix.mjs";

/**
 * Specialized output for fractional inch display.
 *
 * Follows ANSI/ASME Y14.5 standards:
 * - Display: "1 1/4\"", "1/2\"", "3\""
 * - Edit: "1 1/4" (number only, without unit suffix - follows same rule)
 *
 * Supports all affix types:
 * - Prefix: any text (e.g., ⌀, custom)
 * - Suffix modes (use OUTPUT_SUFFIX_MODES catalog):
 *   - OUTPUT_SUFFIX_MODES.SYMBOL: " (double prime)
 *   - OUTPUT_SUFFIX_MODES.CODE: in
 *   - OUTPUT_SUFFIX_MODES.CUSTOM: user-defined
 *   - OUTPUT_SUFFIX_MODES.NONE: empty
 *
 * Separator between whole and fraction comes from the SEPARATORS catalog:
 *   - SEPARATORS.SPACE  (default): "1 1/4"
 *   - SEPARATORS.HYPHEN          : "1-1/4"
 */
export class FractionalInchOutput {
  /**
   * @param {Object} options
   * @param {string} options.id - Output identifier
   * @param {number} [options.precision] - Only used for edit mode decimal fallback
   * @param {OutputAffix} [options.prefix] - Prefix affix
   * @param {OutputAffix} [options.suffix] - Suffix affix
   * @param {boolean} [options.showUnit=true] - Whether to show the unit suffix
   * @param {string} [options.suffixMode=OUTPUT_SUFFIX_MODES.SYMBOL] - Suffix mode from OUTPUT_SUFFIX_MODES catalog (SYMBOL, CODE, CUSTOM, NONE)
   * @param {number} [options.maxDenominator=64] - Max denominator for fraction output
   * @param {string} [options.separator=SEPARATORS.SPACE] - Separator between whole and fraction (SEPARATORS.SPACE or SEPARATORS.HYPHEN)
   */
  constructor({
    id,
    precision,
    prefix,
    suffix,
    showUnit = true,
    suffixMode = OUTPUT_SUFFIX_MODES.SYMBOL,
    maxDenominator = 64,
    separator = SEPARATORS.SPACE
  } = {}) {
    this.id = createReferenceId("output", id);
    this.unit = "in";
    this.precision = precision;
    this.showUnit = showUnit;
    this.suffixMode = suffixMode;
    this.separator = separator;
    this.prefix = this.resolvePrefixAffix(prefix);
    this.suffix = this.resolveSuffixAffix(suffix, showUnit, suffixMode);
    this.formatter = new FractionalInchFormatter({
      maxDenominator,
      separator
    });

    Object.freeze(this);
  }

  /**
   * Formats the value for display including affixes.
   */
  formatDisplay(input, options = {}) {
    return this.withOverrides(options).composeFormattedValue(input, true);
  }

  /**
   * Formats the value for editing (number only, no unit suffix).
   */
  formatEdit(input, options = {}) {
    // For formula inputs, delegate to standard behavior
    if (typeof input.value === "string" && input.value.startsWith("=")) {
      if (input.formulaHasEmbeddedUnits) {
        return input.value;
      }
      const editUnit = options.unit ?? this.unit;
      if (input.unit && input.unit !== QUANTITY_TYPES.NONE && editUnit !== input.unit) {
        return `${input.value} ${input.unit}`;
      }
      return input.value;
    }

    return this.withOverrides({
      ...options,
      showUnit: false,
      suffix: new EmptyOutputAffix()
    }).composeFormattedValue(input, false);
  }

  /**
   * Returns a new instance with the given overrides applied.
   */
  withOverrides(options = {}) {
    const resolvedShowUnit = options.showUnit ?? this.showUnit;

    return new FractionalInchOutput({
      id: this.id,
      precision: options.precision ?? this.precision,
      prefix: this.resolveOverrideAffix(options.prefix, this.prefix),
      suffix: this.resolveOverrideSuffixAffix(options.suffix, this.unit, resolvedShowUnit),
      showUnit: resolvedShowUnit,
      suffixMode: options.suffixMode ?? this.suffixMode,
      maxDenominator: options.maxDenominator ?? this.formatter.maxDenominator,
      separator: this.separator
    });
  }

  /**
   * Composes the formatted value with or without affixes.
   */
  composeFormattedValue(input, includeAffixes) {
    if (typeof input.internal.value !== "number") {
      return String(input.internal.value ?? "");
    }

    const numericText = this.formatter.formatNumber(input, this.unit, this.precision);

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

    // Double prime goes directly without space (ANSI/ASME Y14.5)
    // e.g., "1 1/4\"" not "1 1/4 \""
    if (this.suffixMode === OUTPUT_SUFFIX_MODES.SYMBOL) {
      return suffixText;
    }

    // Code suffix uses a space before the unit (e.g., "1 1/4 in")
    if (this.suffixMode === OUTPUT_SUFFIX_MODES.CODE) {
      return `${DOMAIN.SPACE}${suffixText}`;
    }

    // Custom suffix follows the affix's own spacing
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

  resolveSuffixAffix(suffix, showUnit, suffixMode) {
    if (suffix instanceof OutputAffix) {
      return suffix;
    }

    if (suffix !== undefined && suffix !== null && suffix !== "") {
      return new CustomOutputAffix({
        characters: suffix
      });
    }

    if (!showUnit) {
      return new EmptyOutputAffix();
    }

    switch (suffixMode) {
      case OUTPUT_SUFFIX_MODES.NONE:
        return new EmptyOutputAffix();
      case OUTPUT_SUFFIX_MODES.CODE:
        return new CustomOutputAffix({ characters: "in" });
      case OUTPUT_SUFFIX_MODES.SYMBOL:
        return new CustomOutputAffix({ characters: "\"" });
      case OUTPUT_SUFFIX_MODES.CUSTOM:
        return new CustomOutputAffix({ characters: suffix ?? "" });
      default:
        return new CustomOutputAffix({ characters: "\"" });
    }
  }

  resolveOverrideAffix(overrideAffix, fallbackAffix) {
    if (overrideAffix === undefined) {
      return fallbackAffix;
    }

    return this.resolvePrefixAffix(overrideAffix);
  }

  resolveOverrideSuffixAffix(overrideAffix, unit, showUnit) {
    if (overrideAffix !== undefined) {
      return this.resolveSuffixAffix(overrideAffix, showUnit, this.suffixMode);
    }

    if (!showUnit) {
      return new EmptyOutputAffix();
    }

    return this.resolveSuffixAffix(undefined, showUnit, this.suffixMode);
  }
}
