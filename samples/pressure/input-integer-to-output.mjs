/**
 * Example: Integer input 1500 kPa → Output in kPa
 *
 * The library supports integer values stored as whole numbers
 * (no decimal places) via VALUE_TYPES.NUMBER.
 * Useful for discrete test pressure values.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 1500,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.PRESSURE,
  unit: UNIT_TOKENS.KILOPASCAL,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILOPASCAL,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output kPa ===");
console.log("Input : 1500 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "1500 kPa"
console.log("Edit  :", value.input.formatForEdit());       // "1500"
