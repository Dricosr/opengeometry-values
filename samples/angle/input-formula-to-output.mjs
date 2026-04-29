/**
 * Example: Input formula "=30 deg + 15 deg" → Output in degrees
 *
 * The library accepts mathematical expressions with embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for computing angle sums directly in the input.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=30 deg + 15 deg",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.ANGLE,
  unit: UNIT_TOKENS.DEGREE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input formula → Output deg ===");
console.log('Input : "=30 deg + 15 deg"');
console.log("Display:", value.input.formatForDisplay()); // "45 deg"
console.log("Edit  :", value.input.formatForEdit());       // "=30 deg + 15 deg"
