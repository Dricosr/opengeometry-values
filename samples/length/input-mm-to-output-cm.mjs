/**
 * Example: Input 125 mm → Output in cm
 *
 * Converts millimeters to centimeters (÷10).
 * Useful for displaying small measurements in a more readable unit.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 125,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.CENTIMETER,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input mm → Output cm ===");
console.log("Input : 125 mm");
console.log("Display:", value.input.formatForDisplay()); // "12.5 cm"
console.log("Edit  :", value.input.formatForEdit());       // "12.5"
