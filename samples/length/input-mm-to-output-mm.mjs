/**
 * Example: Input 125 mm → Output in mm (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the value without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 125,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input mm → Output mm ===");
console.log("Input : 125 mm");
console.log("Display:", value.input.formatForDisplay()); // "125 mm"
console.log("Edit  :", value.input.formatForEdit());       // "125"
