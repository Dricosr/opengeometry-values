/**
 * Example: Input formula "=8 m * 5 m" → Output in m²
 *
 * The library accepts mathematical expressions with embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for computing area from length × width directly in the input.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=8 m * 5 m",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.AREA,
  unit: UNIT_TOKENS.SQUARE_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.SQUARE_METER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input formula → Output m² ===");
console.log('Input : "=8 m * 5 m"');
console.log("Display:", value.input.formatForDisplay()); // "40 m²"
console.log("Edit  :", value.input.formatForEdit());       // "=8 m * 5 m"
