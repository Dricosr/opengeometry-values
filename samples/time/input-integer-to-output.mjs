/**
 * Example: Integer input 60 min → Output in min
 *
 * The library supports integer values stored as whole numbers
 * (no decimal places) via VALUE_TYPES.NUMBER.
 * Useful for discrete time intervals.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 60,
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

console.log("=== Input integer → Output min ===");
console.log("Input : 60 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "60 min"
console.log("Edit  :", value.input.formatForEdit());       // "60"
