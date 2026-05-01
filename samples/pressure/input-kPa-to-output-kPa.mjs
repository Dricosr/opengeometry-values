/**
 * Example: Input 250 kPa → Output in kPa (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the pressure without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 250,
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

console.log("=== Input kPa → Output kPa ===");
console.log("Input : 250 kPa");
console.log("Display:", value.input.formatForDisplay()); // "250 kPa"
console.log("Edit  :", value.input.formatForEdit());       // "250"
