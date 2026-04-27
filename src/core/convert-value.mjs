import { unit } from "./mathjs-api.mjs";

export class UnitConverter {
  convert({ value, fromUnit, toUnit }) {
    if (!fromUnit || !toUnit || fromUnit === toUnit) {
      return value;
    }

    return unit(value, fromUnit).toNumber(toUnit);
  }

  isKnownUnit(unitName) {
    if (!unitName) {
      return false;
    }

    try {
      unit(1, unitName);
      return true;
    } catch {
      return false;
    }
  }
}

export const unitConverter = new UnitConverter();

export const convertValue = (options) => unitConverter.convert(options);