/**
 * Example: Input 120 min → Output in min (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the duration without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 120,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.TIME,
  unit: UNIT_TOKENS.MINUTE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MINUTE,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input min → Output min ===");
console.log("Input : 120 min");
console.log("Display:", value.input.formatForDisplay()); // "120 min"
console.log("Edit  :", value.input.formatForEdit());       // "120"
