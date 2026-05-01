/**
 * Example: Input 85% → Output in % (no conversion)
 *
 * Ratio only supports percent as the single unit.
 * Shows the most basic case: input and output in the same unit.
 * Useful for displaying percentages like efficiency or slope.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 85,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.RATIO,
  unit: UNIT_TOKENS.PERCENT,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.PERCENT,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input % → Output % ===");
console.log("Input : 85%");
console.log("Display:", value.input.formatForDisplay()); // "85 %"
console.log("Edit  :", value.input.formatForEdit());       // "85"
