/**
 * Example: Integer input 22°C → Output in °C
 *
 * The library supports VALUE_TYPES.INTEGER for values that must be
 * stored as whole numbers (no decimal places).
 * Useful for setpoints that are always whole degrees.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 22,
  valueType: VALUE_TYPES.INTEGER,
  quantity: QUANTITY_TYPES.TEMPERATURE,
  unit: UNIT_TOKENS.DEGREE_CELSIUS,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output °C ===");
console.log("Input : 22 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "22 °C"
console.log("Edit  :", value.input.formatForEdit());       // "22"
