import { BASE_VALUES } from "../constants/base-value-catalog.mjs";
import { internalResolutionCatalog } from "../constants/internal-resolution.mjs";

export class InternalResolutionApplier {
  constructor(resolutionCatalog = internalResolutionCatalog) {
    this.resolutionCatalog = resolutionCatalog;
  }

  apply(value, quantity) {
    const resolution = this.resolutionCatalog.get(quantity);

    if (!resolution || typeof value !== "number") {
      return value;
    }

    const roundedValue = Math.round(value / resolution.step) * resolution.step;
    const decimals = this.countStepDecimals(resolution.step);

    return Number(roundedValue.toFixed(decimals));
  }

  countStepDecimals(step) {
    const text = step.toFixed(BASE_VALUES.DECIMAL_SCAN_PRECISION).replace(/0+$/u, "").replace(/\.$/u, "");
    const dotIndex = text.indexOf(".");

    if (dotIndex === -1) {
      return 0;
    }

    return text.length - dotIndex - 1;
  }
}

export const internalResolutionApplier = new InternalResolutionApplier();

export const applyInternalResolution = (value, quantity) => internalResolutionApplier.apply(value, quantity);