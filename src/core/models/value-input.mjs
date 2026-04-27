import { createReferenceId } from "../base/create-reference-id.mjs";

export class ValueInput {
    constructor({ id, value, unit, quantity, internal, output, formulaHasEmbeddedUnits = false }) {
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