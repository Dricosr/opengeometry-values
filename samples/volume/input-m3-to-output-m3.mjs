/**
 * Example: Input 2.4 m³ → Output in m³ (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the volume without conversion.
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
    unit: UNIT_TOKENS.CUBIC_METER,
    precision: 2,
    showUnit: true
  })
});

console.log("=== Input m³ → Output m³ ===");
console.log("Input : 2.4 m³");
console.log("Display:", value.input.formatForDisplay()); // "2.40 m³"
console.log("Edit  :", value.input.formatForEdit());       // "2.40"
