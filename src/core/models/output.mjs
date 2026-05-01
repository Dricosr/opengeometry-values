import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { unitTokenCatalog } from "../../constants/unit-token-catalog.mjs";

import { BOOLEAN_LABEL_PRESETS } from "../../constants/boolean-label-catalog.mjs";
import { DOMAIN } from "../../constants/domain-catalog.mjs";
import { BASE_VALUES } from "../../constants/base-value-catalog.mjs";
import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { createReferenceId } from "../base/create-reference-id.mjs";

import { baseNumericValueFormatter } from "../formatters/base-numeric-value-formatter.mjs";
import { displayPrecisionService } from "../get-max-display-precision.mjs";
import { CustomOutputAffix } from "./custom-output-affix.mjs";
import { EmptyOutputAffix } from "./empty-output-affix.mjs";
import { OutputAffix } from "./output-affix.mjs";
import { UnitCodeOutputAffix } from "./unit-code-output-affix.mjs";
import { UnitSymbolOutputAffix } from "./unit-symbol-output-affix.mjs";

export class Output {
  constructor({ id, unit, precision, prefix, suffix, showUnit = true, booleanLabels }) {
    if (unit !== undefined && unit !== null) {
      assertCatalogValue(unit, unitTokenCatalog, "UNIT_TOKENS");
    }

    this.id = createReferenceId("output", id);

    this.unit = unit;

    this.precision = precision;
    this.showUnit = showUnit;
    this.prefix = this.resolvePrefixAffix(prefix);
    this.suffix = this.resolveInitialSuffixAffix(suffix, unit, showUnit);
    this.booleanLabels = booleanLabels ?? null;

    Object.freeze(this);
  }

  formatDisplay(input, options = {}) {
    return this.withOverrides(options).composeFormattedValue(input, true);
  }

  formatEdit(input, options = {}) {
    // Boolean edit: always return "0" or "1"
    const outputUnit = options.unit ?? this.unit;
    if (outputUnit === UNIT_TOKENS.BOOL) {
      return input.internal.value ? "1" : "0";
    }

    if (typeof input.value === "string" && input.value.startsWith("=")) {
      // Formulas with embedded units are always self-contained - return as-is
      if (input.formulaHasEmbeddedUnits) {
        return input.value;
      }

      // Dimensionless formula: append original unit when editing in a different unit
      const editUnit = options.unit ?? this.unit;

      if (input.unit && editUnit !== input.unit) {
        return `${input.value} ${input.unit}`;
      }

      return input.value;
    }

    const editUnit = options.unit ?? this.unit;
    const editPrecision = this.resolveEditPrecision(input, editUnit, options.precision);

    return this.withOverrides({
      ...options,
      precision: editPrecision,
      showUnit: false,
      suffix: new EmptyOutputAffix()
    }).composeFormattedValue(input, false);
  }

  /**
   * Resolves the precision to use when formatting a value for edit.
   * When the edit unit differs from the input unit, we need enough
   * precision to preserve the converted value's information content,
   * avoiding truncation that would cause information loss in the cycle.
   *
   * @param {object} input - The ValueInput instance
   * @param {string} editUnit - The target edit unit
   * @param {number|undefined} requestedPrecision - User-requested precision override
   * @returns {number|undefined} The precision to use for edit formatting
   */
  resolveEditPrecision(input, editUnit, requestedPrecision) {
    // If no unit conversion is happening (edit unit matches input unit),
    // use the requested precision as-is - no risk of information loss
    if (!editUnit || !input.unit || editUnit === input.unit) {
      return requestedPrecision;
    }

    // Calculate the converted value to determine needed decimal places
    const rawConvertedValue = baseNumericValueFormatter.converter.convert({
      value: input.internal.value,
      fromUnit: input.internal.unit,
      toUnit: editUnit
    });

    // Stabilize the converted value to avoid floating-point artifacts
    // (e.g., 90.00000000000593 instead of 90 when converting rad to deg)
    const convertedValue = Number(rawConvertedValue.toFixed(BASE_VALUES.DECIMAL_SCAN_PRECISION));

    // Count how many decimal places the stabilized converted value has
    const valueDecimalPlaces = this.countDecimalPlaces(convertedValue);

    // Get the raw max precision from the quantity's resolution (null = no resolution)
    const maxPrecision = displayPrecisionService.getMaxPrecision(input.quantity, editUnit);

    // The base precision (user-requested or this output's default)
    const basePrecision = requestedPrecision ?? this.precision;

    // Calculate safe precision:
    // - At least enough to show the converted value without truncation
    // - At least the base precision (if specified)
    // - At most the max precision for the unit (if available)
    let safePrecision;

    if (basePrecision !== undefined && basePrecision !== null) {
      safePrecision = Math.max(valueDecimalPlaces, basePrecision);
    } else if (maxPrecision !== null && maxPrecision !== undefined) {
      // When no precision is specified and unit conversion occurs,
      // use the max precision for the unit to avoid information loss
      safePrecision = Math.max(valueDecimalPlaces, maxPrecision);
    } else {
      safePrecision = valueDecimalPlaces;
    }

    // Cap at max precision for the unit (when resolution exists)
    if (maxPrecision !== null && maxPrecision !== undefined) {
      return Math.min(safePrecision, maxPrecision);
    }

    return safePrecision;
  }

  /**
   * Counts the number of decimal places in a number, handling floating-point
   * artifacts by using a reasonable precision ceiling.
   *
   * Values that are effectively integers (within floating-point tolerance
   * of a whole number) are treated as having 0 decimal places.
   */
  countDecimalPlaces(value) {
    if (!isFinite(value)) {
      return 0;
    }

    // Check if the value is effectively an integer (within floating-point tolerance)
    // This handles cases like 90.00000000000593 which should be treated as 90
    const roundedToInteger = Math.round(value);
    if (Math.abs(value - roundedToInteger) < 1e-10) {
      return 0;
    }

    // Use DECIMAL_SCAN_PRECISION to avoid floating-point artifacts
    // (e.g., 90.000000000006.toFixed(15) reveals binary noise as "90.000000000005997")
    const text = value.toFixed(BASE_VALUES.DECIMAL_SCAN_PRECISION).replace(/0+$/u, "").replace(/\.$/u, "");
    const dotIndex = text.indexOf(".");

    if (dotIndex === -1) {
      return 0;
    }

    return text.length - dotIndex - 1;
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
      showUnit: resolvedShowUnit,
      booleanLabels: options.booleanLabels ?? this.booleanLabels
    });
  }

  composeFormattedValue(input, includeAffixes) {
    const outputUnit = this.unit ?? input.internal.unit;

    // Boolean path: use labels for display, "0"/"1" for edit
    if (this.unit === UNIT_TOKENS.BOOL) {
      const raw = !!input.internal.value;

      if (!includeAffixes) {
        return raw ? "1" : "0"; // edit
      }

      const labels = this.booleanLabels ?? BOOLEAN_LABEL_PRESETS.YES_NO;
      return raw ? labels["1"] : labels["0"];
    }

    if (typeof input.internal.value !== "number") {
      return String(input.internal.value ?? "");
    }

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

    if (this.suffix.type === OUTPUT_AFFIX_TYPES.UNIT_SYMBOL && suffixText === "°") {
      return suffixText;
    }

    if (this.suffix.type === OUTPUT_AFFIX_TYPES.UNIT_CODE || this.suffix.type === OUTPUT_AFFIX_TYPES.UNIT_SYMBOL) {
      return `${DOMAIN.SPACE}${suffixText}`;
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

    if (!showUnit || !unit) {
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

    if (!showUnit || !unit) {
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