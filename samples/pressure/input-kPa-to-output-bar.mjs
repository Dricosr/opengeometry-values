/**
 * Example: Input 250 kPa → Output in bar
 *
 * Converts kilopascals to bar (÷100).
 * Useful for piping and pump coordination.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 250,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.PRESSURE,
  unit: UNIT_TOKENS.KILOPASCAL,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.BAR,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input kPa → Output bar ===");
console.log("Input : 250 kPa");
console.log("Display:", value.input.formatForDisplay()); // "2.5 bar"
console.log("Edit  :", value.input.formatForEdit());       // "2.5"
