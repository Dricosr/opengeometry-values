/**
 * Example: Input 2.4 m³ → Output in liters
 *
 * Converts cubic meters to liters (×1000).
 * Useful for tank capacities and fluid volumes.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 2.4,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.VOLUME,
  unit: UNIT_TOKENS.CUBIC_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.LITER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input m³ → Output L ===");
console.log("Input : 2.4 m³");
console.log("Display:", value.input.formatForDisplay()); // "2400 L"
console.log("Edit  :", value.input.formatForEdit());       // "2400"
