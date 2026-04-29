/**
 * Example: Input 22°C → Output in °F
 *
 * Converts Celsius to Fahrenheit (°C × 9/5 + 32).
 * Useful for HVAC coordination and US-facing views.
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
    unit: UNIT_TOKENS.DEGREE_FAHRENHEIT,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input °C → Output °F ===");
console.log("Input : 22°C");
console.log("Display:", value.input.formatForDisplay()); // "72 °F"
console.log("Edit  :", value.input.formatForEdit());       // "72"
