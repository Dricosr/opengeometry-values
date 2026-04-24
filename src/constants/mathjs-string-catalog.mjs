import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const MATHJS_STRING_ENTRIES = Object.freeze({
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

export class MathJsStringCatalog extends ReadOnlyCatalog {
  constructor() {
    super(MATHJS_STRING_ENTRIES);
  }
}

export const mathJsStringCatalog = new MathJsStringCatalog();
export const MATHJS_STRINGS = mathJsStringCatalog.all();