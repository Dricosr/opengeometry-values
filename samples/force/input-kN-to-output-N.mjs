/**
 * Example: Input 18 kN → Output in N
 *
 * Converts kilonewtons to newtons (×1000).
 * Useful for equipment-level force details.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 18,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.FORCE,
  unit: UNIT_TOKENS.KILONEWTON,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.NEWTON,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input kN → Output N ===");
console.log("Input : 18 kN");
console.log("Display:", value.input.formatForDisplay()); // "18000 N"
console.log("Edit  :", value.input.formatForEdit());       // "18000"
