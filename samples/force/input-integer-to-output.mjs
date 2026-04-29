/**
 * Example: Integer input 200 kN → Output in kN
 *
 * The library supports VALUE_TYPES.INTEGER for values that must be
 * stored as whole numbers (no decimal places).
 * Useful for discrete load table entries.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 200,
  valueType: VALUE_TYPES.INTEGER,
  quantity: QUANTITY_TYPES.FORCE,
  unit: UNIT_TOKENS.KILONEWTON,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILONEWTON,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output kN ===");
console.log("Input : 200 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "200 kN"
console.log("Edit  :", value.input.formatForEdit());       // "200"
