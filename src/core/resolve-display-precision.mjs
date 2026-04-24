import { BASE_VALUES } from "../constants/base-value-catalog.mjs";
import { displayPrecisionService } from "./get-max-display-precision.mjs";

export class DisplayPrecisionResolver {
  constructor(precisionService = displayPrecisionService) {
    this.precisionService = precisionService;
  }

  resolve(quantity, displayUnit, requestedPrecision) {
    const maxPrecision = this.precisionService.getMaxPrecision(quantity, displayUnit);

    if (maxPrecision === null) {
      return requestedPrecision ?? BASE_VALUES.DEFAULT_DISPLAY_PRECISION;
    }

    if (requestedPrecision === undefined || requestedPrecision === null) {
      return maxPrecision;
    }

    return Math.min(requestedPrecision, maxPrecision);
  }
}

export const displayPrecisionResolver = new DisplayPrecisionResolver();

export const resolveDisplayPrecision = (quantity, displayUnit, requestedPrecision) => displayPrecisionResolver.resolve(quantity, displayUnit, requestedPrecision);