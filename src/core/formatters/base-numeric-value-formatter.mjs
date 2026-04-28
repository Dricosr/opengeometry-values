import { format } from "../mathjs-api.mjs";
import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";
import { displayPrecisionResolver } from "../resolve-display-precision.mjs";
import { unitConverter } from "../convert-value.mjs";

export class BaseNumericValueFormatter {
  constructor(converter = unitConverter, precisionResolver = displayPrecisionResolver) {
    this.converter = converter;
    this.precisionResolver = precisionResolver;
  }

  formatNumber(ogValue, displayUnit, requestedPrecision) {
    const convertedValue = this.converter.convert({
      value: ogValue.internal.value,
      fromUnit: ogValue.internal.unit,
      toUnit: displayUnit
    });

    const precision = this.precisionResolver.resolve(
      ogValue.quantity,
      displayUnit,
      requestedPrecision
    );

    return format(convertedValue, {
      notation: UNIT_TOKENS.FIXED_NOTATION,
      precision
    });
  }
}

export const baseNumericValueFormatter = new BaseNumericValueFormatter();
