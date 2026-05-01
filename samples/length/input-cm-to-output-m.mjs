/**
 * Example: Input 600 cm → Output in meters
 *
 * Converts centimeters to meters (÷100).
 * Useful for displaying floor plan measurements in meters.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 600,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.CENTIMETER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.METER,
    precision: 2,
    showUnit: true
  })
});

console.log("=== Input cm → Output m ===");
console.log("Input : 600 cm");
console.log("Display:", value.input.formatForDisplay()); // "6.00 m"
console.log("Edit  :", value.input.formatForEdit());       // "6.00"
