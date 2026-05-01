/**
 * Example: Input 30° → Output in degrees (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the angle without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 30,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.ANGLE,
  unit: UNIT_TOKENS.DEGREE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input deg → Output deg ===");
console.log("Input : 30°");
console.log("Display:", value.input.formatForDisplay()); // "30 deg"
console.log("Edit  :", value.input.formatForEdit());       // "30"
