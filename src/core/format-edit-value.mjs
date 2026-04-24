import { baseNumericValueFormatter } from "./formatters/base-numeric-value-formatter.mjs";

export class EditValueFormatter {
  constructor(numericFormatter = baseNumericValueFormatter) {
    this.numericFormatter = numericFormatter;
  }

  format(ogValue, options = {}) {
    if (ogValue?.input?.formatForEdit) {
      return ogValue.input.formatForEdit(options);
    }

    if (typeof ogValue.internal.value !== "number") {
      return String(ogValue.internal.value ?? "");
    }

    const editUnit = options.unit ?? ogValue.internal.unit;
    return this.numericFormatter.formatNumber(ogValue, editUnit, options.precision);
  }
}

export const editValueFormatter = new EditValueFormatter();

export const formatEditValue = (ogValue, options) => editValueFormatter.format(ogValue, options);