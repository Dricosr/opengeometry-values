import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const QUANTITY_ENTRIES = Object.freeze({
  BOOL: "bool",
  COUNT: "count",
  LENGTH: "length",
  AREA: "area",
  VOLUME: "volume",
  ANGLE: "angle",
  TEMPERATURE: "temperature",
  MASS: "mass",
  FORCE: "force",
  PRESSURE: "pressure",
  TIME: "time",
  RATIO: "ratio"
});

export class QuantityCatalog extends ReadOnlyCatalog {
  constructor() {
    super(QUANTITY_ENTRIES);
  }
}

export const quantityCatalog = new QuantityCatalog();
export const QUANTITIES = quantityCatalog.all();
