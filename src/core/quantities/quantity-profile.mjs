import { BASE_VALUES } from "../../constants/base-value-catalog.mjs";

export class QuantityProfile {
  constructor({ quantityType, internalUnit = null, resolution = null, supportedUnits = [] }) {
    this.quantityType = quantityType;
    this.internalUnit = internalUnit;
    this.resolution = resolution;
    this.supportedUnits = Object.freeze([...supportedUnits]);

    Object.freeze(this);
  }

  getQuantityType() {
    return this.quantityType;
  }

  getInternalUnit() {
    return this.internalUnit;
  }

  getResolution() {
    return this.resolution;
  }

  getSupportedUnits() {
    return this.supportedUnits;
  }

  supportsUnit(unitName) {
    return this.supportedUnits.includes(unitName);
  }

  normalizeNumericValue(value, inputUnit, converter, resolutionApplier) {
    const internalUnit = this.getInternalUnit();

    if (!internalUnit || !inputUnit) {
      return {
        value: this.stabilizeNumericValue(value),
        unit: inputUnit
      };
    }

    const convertedValue = converter.convert({
      value,
      fromUnit: inputUnit,
      toUnit: internalUnit
    });

    const stabilizedConvertedValue = this.stabilizeNumericValue(convertedValue);

    return {
      value: resolutionApplier.apply(stabilizedConvertedValue, this.getQuantityType()),
      unit: internalUnit
    };
  }

  stabilizeNumericValue(value) {
    if (typeof value !== "number") {
      return value;
    }

    return Number(value.toFixed(BASE_VALUES.DECIMAL_SCAN_PRECISION));
  }
}