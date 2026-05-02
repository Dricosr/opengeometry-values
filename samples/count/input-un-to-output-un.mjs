/**
 * Example: Input unit count 12 → Output as "12 un"
 *
 * Shows the basic unit count case using UNIT_TOKENS.UN.
 * No unit conversion applies - UN is a dimensionless counter.
 * Useful for pipe spool counts, flange counts, valve tallies, etc.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 12,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.COUNT,
  unit: UNIT_TOKENS.UN,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.UN,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input UN → Output UN (no conversion) ===");
console.log("Input : 12 (unit count)");
console.log("Display:", value.input.formatForDisplay()); // "12 un"
console.log("Edit  :", value.input.formatForEdit());       // "12"
