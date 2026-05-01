/**
 * Example: Input formula "=22 + 8" → Output in °C
 *
 * The library accepts plain numeric formulas (without embedded units).
 * The result is evaluated and converted to the output unit.
 * Useful for computing temperature differences.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=22 + 8",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.TEMPERATURE,
  unit: UNIT_TOKENS.DEGREE_CELSIUS,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input formula → Output °C ===");
console.log('Input : "=22 + 8"');
console.log("Display:", value.input.formatForDisplay()); // "30 °C"
console.log("Edit  :", value.input.formatForEdit());       // "=22 + 8"
