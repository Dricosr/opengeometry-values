/**
 * Example: Input 18 kN → Output in kN (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the force without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 18,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.FORCE,
  unit: UNIT_TOKENS.KILONEWTON,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILONEWTON,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input kN → Output kN ===");
console.log("Input : 18 kN");
console.log("Display:", value.input.formatForDisplay()); // "18.0 kN"
console.log("Edit  :", value.input.formatForEdit());       // "18.0"
