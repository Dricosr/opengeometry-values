import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const BASE_VALUE_ENTRIES = Object.freeze({
  DEFAULT_DISPLAY_PRECISION: 2,
  DECIMAL_SCAN_PRECISION: 12
});

export class BaseValueCatalog extends ReadOnlyCatalog {
  constructor() {
    super(BASE_VALUE_ENTRIES);
  }
}

export const baseValueCatalog = new BaseValueCatalog();
export const BASE_VALUES = baseValueCatalog.all();