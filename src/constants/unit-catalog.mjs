import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const UNIT_ENTRIES = Object.freeze({
  METER: "m",
  CENTIMETER: "cm",
  MILLIMETER: "mm",
  INCH: "in",
  SQUARE_CENTIMETER: "cm^2",
  SQUARE_METER: "m^2",
  SQUARE_INCH: "in^2",
  CUBIC_CENTIMETER: "cm^3",
  CUBIC_METER: "m^3",
  CUBIC_INCH: "in^3",
  LITER: "L",
  RADIAN: "rad",
  DEGREE: "deg",
  DEGREE_CELSIUS: "degC",
  DEGREE_FAHRENHEIT: "degF",
  KELVIN: "K",
  KILOGRAM: "kg",
  NEWTON: "N",
  KILONEWTON: "kN",
  PASCAL: "Pa",
  KILOPASCAL: "kPa",
  MEGAPASCAL: "MPa",
  BAR: "bar",
  SECOND: "s",
  MINUTE: "min",
  HOUR: "h",
  PERCENT: "percent",
  FIXED_NOTATION: "fixed"
});

export class UnitCatalog extends ReadOnlyCatalog {
  constructor() {
    super(UNIT_ENTRIES);
  }
}

export const unitCatalog = new UnitCatalog();
export const UNITS = unitCatalog.all();
