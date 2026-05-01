/**
 * Example: Input "3500N" (inline unit) → Output in N
 *
 * The library accepts values with inline units (e.g. "3500N").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "3500N",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.FORCE,
  unit: UNIT_TOKENS.NEWTON,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.NEWTON,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output N ===");
console.log('Input : "3500N"');
console.log("Display:", value.input.formatForDisplay()); // "3500 N"
console.log("Edit  :", value.input.formatForEdit());       // "3500"
