/**
 * Example: Input 12.5 kg → Output in kg (no conversion)
 *
 * Mass only supports kg as the single unit.
 * Shows the most basic case: input and output in the same unit.
 * Useful for equipment mass schedules.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 12.5,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.MASS,
  unit: UNIT_TOKENS.KILOGRAM,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input kg → Output kg ===");
console.log("Input : 12.5 kg");
console.log("Display:", value.input.formatForDisplay()); // "12.5 kg"
console.log("Edit  :", value.input.formatForEdit());       // "12.5"
