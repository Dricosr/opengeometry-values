import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { quantityProfileRegistry } from "../core/quantities/quantity-profile-registry.mjs";
import { QUANTITY_TYPES } from "./quantity-types.mjs";

const INTERNAL_RESOLUTION_ENTRIES = Object.freeze(
  Object.values(QUANTITY_TYPES).reduce((entries, quantity) => {
    entries[quantity] = quantityProfileRegistry.getProfile(quantity)?.getResolution() ?? null;
    return entries;
  }, {})
);

export class InternalResolutionCatalog extends ReadOnlyCatalog {
  constructor() {
    super(INTERNAL_RESOLUTION_ENTRIES);
  }
}

export const internalResolutionCatalog = new InternalResolutionCatalog();
export const INTERNAL_RESOLUTION = internalResolutionCatalog.all();