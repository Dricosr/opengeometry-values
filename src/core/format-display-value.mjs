import { DOMAIN_STRINGS } from "../constants/domain-string-catalog.mjs";
import { unitSymbolCatalog } from "../constants/unit-symbols.mjs";
import { baseNumericValueFormatter } from "./formatters/base-numeric-value-formatter.mjs";

export class DisplayValueFormatter {
  constructor(numericFormatter = baseNumericValueFormatter, symbolCatalog = unitSymbolCatalog) {
    this.numericFormatter = numericFormatter;
    this.symbolCatalog = symbolCatalog;
  }

  format(ogValue, options = {}) {
    if (ogValue?.input?.formatForDisplay) {
      return ogValue.input.formatForDisplay(options);
    }

    if (typeof ogValue.internal.value !== "number") {
      return String(ogValue.internal.value ?? "");
    }

    const displayUnit = options.unit ?? ogValue.internal.unit;
    const text = this.numericFormatter.formatNumber(ogValue, displayUnit, options.precision);
    const prefix = options.prefix ?? "";
    const suffix = this.resolveSuffix(displayUnit, options);

    return `${prefix}${text}${suffix}`;
  }

  resolveSuffix(unitName, options) {
    if (options.suffix !== undefined) {
      return options.suffix;
    }

    if (options.showUnit === false) {
      return "";
    }

    return `${DOMAIN_STRINGS.SPACE}${this.symbolCatalog.get(unitName) ?? unitName}`;
  }
}

export const displayValueFormatter = new DisplayValueFormatter();

export const formatDisplayValue = (ogValue, options) => displayValueFormatter.format(ogValue, options);