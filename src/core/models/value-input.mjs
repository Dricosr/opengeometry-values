import { createReferenceId } from "../base/create-reference-id.mjs";

export class ValueInput {
    constructor({ id, value, unit, quantity, internal, output }) {
        this.id = createReferenceId("input", id);
        this.value = value;
        this.unit = unit;
        this.quantity = quantity;
        this.internal = internal;
        this.output = output;
        Object.freeze(this);
    }

    formatForDisplay(options = {}) {
        return this.output.formatDisplay(this, options);
    }

    formatForComposition(options = {}) {
        return this.output.formatComposition(this, options);
    }

    formatForFriendlyValue(options = {}) {
        return this.output.formatFriendlyValue(this, options);
    }

    formatForEdit(options = {}) {
        return this.output.formatEdit(this, options);
    }
}