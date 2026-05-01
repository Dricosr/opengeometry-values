/**
 * Example: Input formula "=250 / 300 * 100" → Output in %
 *
 * The library accepts plain numeric formulas (without embedded units).
 * The result is evaluated and converted to the output unit.
 * Useful for computing percentages from raw numbers.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=250 / 300 * 100",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.RATIO,
  unit: UNIT_TOKENS.PERCENT,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.PERCENT,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input formula → Output % ===");
console.log('Input : "=250 / 300 * 100"');
console.log("Display:", value.input.formatForDisplay()); // "83.3 %"
console.log("Edit  :", value.input.formatForEdit());       // "=250 / 300 * 100"
