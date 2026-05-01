import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { valueTypeCatalog } from "../../constants/value-types.mjs";
import { quantityTypeCatalog } from "../../constants/quantity-types.mjs";

export class IForgeEdpValue {
  constructor({ valueType, quantity, input, internal }) {
    assertCatalogValue(valueType, valueTypeCatalog, "VALUE_TYPES");
    assertCatalogValue(quantity, quantityTypeCatalog, "QUANTITY_TYPES");

    this.valueType = valueType;
    this.quantity = quantity;
    this.input = input;
    this.internal = internal;

    Object.freeze(this);
  }
}

