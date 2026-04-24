import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { quantityProfileRegistry } from "../core/quantities/quantity-profile-registry.mjs";
import { QUANTITY_TYPES } from "./quantity-types.mjs";

const INTERNAL_UNIT_ENTRIES = Object.freeze(
  Object.values(QUANTITY_TYPES).reduce((entries, quantity) => {
    entries[quantity] = quantityProfileRegistry.getProfile(quantity)?.getInternalUnit() ?? null;
    return entries;
  }, {})
);

export class InternalUnitCatalog extends ReadOnlyCatalog {
  constructor() {
    super(INTERNAL_UNIT_ENTRIES);
  }
}

export const internalUnitCatalog = new InternalUnitCatalog();
export const INTERNAL_UNITS = internalUnitCatalog.all();