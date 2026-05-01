/**
 * Example: Input "85percent" (inline unit) → Output in %
 *
 * The library accepts values with inline units (e.g. "85percent").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "85percent",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.RATIO,
  unit: UNIT_TOKENS.PERCENT,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.PERCENT,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output % ===");
console.log('Input : "85percent"');
console.log("Display:", value.input.formatForDisplay()); // "85 %"
console.log("Edit  :", value.input.formatForEdit());       // "85"
