import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { createReferenceId } from "../base/create-reference-id.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { quantityTypeCatalog } from "../../constants/quantity-types.mjs";
import { unitTokenCatalog } from "../../constants/unit-token-catalog.mjs";

export class ValueInput {
    constructor({ id, value, unit, quantity, internal, output, formulaHasEmbeddedUnits = false }) {
        if (unit !== undefined && unit !== null && unit !== QUANTITY_TYPES.NONE) {
            assertCatalogValue(unit, unitTokenCatalog, "UNIT_TOKENS");
        }
        assertCatalogValue(quantity, quantityTypeCatalog, "QUANTITY_TYPES");


        this.id = createReferenceId("input", id);
        this.value = value;
        this.unit = unit;
        this.quantity = quantity;
        this.internal = internal;
        this.output = output;
        this.formulaHasEmbeddedUnits = formulaHasEmbeddedUnits;
        Object.freeze(this);
    }


    formatForDisplay(options = {}) {
        return this.output.formatDisplay(this, options);
    }

    formatForEdit(options = {}) {
        return this.output.formatEdit(this, options);
    }
}