/**
 * Example: Input "180degF" (inline unit) → Output in °F
 *
 * The library accepts values with inline units (e.g. "180degF").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "180degF",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.TEMPERATURE,
  unit: UNIT_TOKENS.DEGREE_FAHRENHEIT,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE_FAHRENHEIT,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output °F ===");
console.log('Input : "180degF"');
console.log("Display:", value.input.formatForDisplay()); // "180 °F"
console.log("Edit  :", value.input.formatForEdit());       // "180"
