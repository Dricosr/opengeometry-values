import { unit } from "mathjs";
import { BASE_VALUES } from "../constants/base-value-catalog.mjs";
import { quantityProfileRegistry } from "./quantities/quantity-profile-registry.mjs";

export class DisplayPrecisionService {
  constructor(quantityProfiles = quantityProfileRegistry) {
    this.quantityProfiles = quantityProfiles;
  }

  getMaxPrecision(quantity, displayUnit) {
    const resolution = this.quantityProfiles.getProfile(quantity)?.getResolution() ?? null;

    if (!resolution || !displayUnit) {
      return null;
    }

    const stepInDisplayUnit = unit(resolution.step, resolution.unit).toNumber(displayUnit);
    return this.countDecimals(stepInDisplayUnit);
  }

  countDecimals(value) {
    const text = value.toFixed(BASE_VALUES.DECIMAL_SCAN_PRECISION).replace(/0+$/u, "").replace(/\.$/u, "");
    const dotIndex = text.indexOf(".");

    if (dotIndex === -1) {
      return 0;
    }

    return text.length - dotIndex - 1;
  }
}

export const displayPrecisionService = new DisplayPrecisionService();

export const getMaxDisplayPrecision = (quantity, displayUnit) => displayPrecisionService.getMaxPrecision(quantity, displayUnit);