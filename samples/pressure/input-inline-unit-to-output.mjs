/**
 * Example: Input "8.5bar" (inline unit) → Output in bar
 *
 * The library accepts values with inline units (e.g. "8.5bar").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "8.5bar",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.PRESSURE,
  unit: UNIT_TOKENS.BAR,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.BAR,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output bar ===");
console.log('Input : "8.5bar"');
console.log("Display:", value.input.formatForDisplay()); // "8.5 bar"
console.log("Edit  :", value.input.formatForEdit());       // "8.5"
