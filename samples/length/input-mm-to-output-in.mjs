/**
 * Example: Input 125 mm → Output in decimal inches
 *
 * Converts millimeters to decimal inches (÷25.4).
 * Useful for coordination with suppliers or inch-based manufacturing.
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
    unit: UNIT_TOKENS.INCH,
    precision: 3,
    showUnit: true
  })
});

console.log("=== Input mm → Output in (decimal) ===");
console.log("Input : 125 mm");
console.log("Display:", value.input.formatForDisplay()); // "4.921 in"
console.log("Edit  :", value.input.formatForEdit());       // "4.921"
