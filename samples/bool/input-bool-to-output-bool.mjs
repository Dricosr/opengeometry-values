/**
 * Example: Input boolean true/false → Output with Open/Closed labels
 *
 * The library accepts boolean values as "true"/"false", "yes"/"no",
 * or "1"/"0". The output renders the corresponding label pair
 * (e.g. "Open" / "Closed") based on the booleanLabelKey in the Output.
 * Useful for equipment status, valve positions, and binary sensor readings.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";
import { BOOLEAN_LABEL_PRESETS } from "../../src/constants/boolean-label-catalog.mjs";

const value = createValue({
  value: "true",
  valueType: VALUE_TYPES.BOOLEAN,
  quantity: QUANTITY_TYPES.BOOL,
  unit: UNIT_TOKENS.BOOL,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.BOOL,
    precision: 0,
    showUnit: false,
    booleanLabels: BOOLEAN_LABEL_PRESETS.OPEN_CLOSED
  })
});

console.log("=== Input boolean → Output Open/Closed labels ===");
console.log('Input : "true"');
console.log("Display:", value.input.formatForDisplay()); // "Open"
console.log("Edit  :", value.input.formatForEdit());       // "1"
