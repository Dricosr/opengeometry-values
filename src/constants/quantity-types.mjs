import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const QUANTITY_TYPE_ENTRIES = Object.freeze({
  NONE: "none",
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

export class QuantityTypeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(QUANTITY_TYPE_ENTRIES);
  }
}

export const quantityTypeCatalog = new QuantityTypeCatalog();
export const QUANTITY_TYPES = quantityTypeCatalog.all();