/**
 * Example: Input "520kg" (inline unit) → Output in kg
 *
 * The library accepts values with inline units (e.g. "520kg").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "520kg",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.MASS,
  unit: UNIT_TOKENS.KILOGRAM,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output kg ===");
console.log('Input : "520kg"');
console.log("Display:", value.input.formatForDisplay()); // "520 kg"
console.log("Edit  :", value.input.formatForEdit());       // "520"
