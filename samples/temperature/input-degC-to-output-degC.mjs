/**
 * Example: Input 22°C → Output in °C (no conversion)
 *
 * Shows the most basic case: input and output in the same unit.
 * Useful when you just want to display the temperature without conversion.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 22,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.TEMPERATURE,
  unit: UNIT_TOKENS.DEGREE_CELSIUS,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input °C → Output °C ===");
console.log("Input : 22°C");
console.log("Display:", value.input.formatForDisplay()); // "22 °C"
console.log("Edit  :", value.input.formatForEdit());       // "22"
