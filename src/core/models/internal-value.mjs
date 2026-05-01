import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { unitTokenCatalog } from "../../constants/unit-token-catalog.mjs";

export class InternalValue {
  constructor({ value, unit }) {
    assertCatalogValue(unit, unitTokenCatalog, "UNIT_TOKENS");

    this.value = value;

    if (unit !== undefined) {
      this.unit = unit;
    }

    Object.freeze(this);
  }
}


