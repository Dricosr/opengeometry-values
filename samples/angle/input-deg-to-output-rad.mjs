/**
 * Example: Input 30° → Output in radians
 *
 * Converts degrees to radians (×π/180).
 * Useful for industrial geometry and calculation traces.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 30,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.ANGLE,
  unit: UNIT_TOKENS.DEGREE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.RADIAN,
    precision: 3,
    showUnit: true
  })
});

console.log("=== Input deg → Output rad ===");
console.log("Input : 30°");
console.log("Display:", value.input.formatForDisplay()); // "0.524 rad"
console.log("Edit  :", value.input.formatForEdit());       // "0.524"
