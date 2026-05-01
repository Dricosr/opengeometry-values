/**
 * Example: Input formula "=4 m * 0.8 m * 0.3 m" → Output in m³
 *
 * The library accepts mathematical expressions with embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for computing volume from L × W × H directly in the input.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=4 m * 0.8 m * 0.3 m",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.VOLUME,
  unit: UNIT_TOKENS.CUBIC_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.CUBIC_METER,
    precision: 2,
    showUnit: true
  })
});

console.log("=== Input formula → Output m³ ===");
console.log('Input : "=4 m * 0.8 m * 0.3 m"');
console.log("Display:", value.input.formatForDisplay()); // "0.96 m³"
console.log("Edit  :", value.input.formatForEdit());       // "=4 m * 0.8 m * 0.3 m"
