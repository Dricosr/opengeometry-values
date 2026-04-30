import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const VALUE_TYPE_ENTRIES = Object.freeze({
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean"
});

export class ValueTypeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(VALUE_TYPE_ENTRIES);
  }
}

export const valueTypeCatalog = new ValueTypeCatalog();
export const VALUE_TYPES = valueTypeCatalog.all();