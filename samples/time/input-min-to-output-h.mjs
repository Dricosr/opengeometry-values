/**
 * Example: Input 120 min → Output in hours
 *
 * Converts minutes to hours (÷60).
 * Useful for construction scheduling and duration estimates.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 120,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.TIME,
  unit: UNIT_TOKENS.MINUTE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.HOUR,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input min → Output h ===");
console.log("Input : 120 min");
console.log("Display:", value.input.formatForDisplay()); // "2 h"
console.log("Edit  :", value.input.formatForEdit());       // "2"
