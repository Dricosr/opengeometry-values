/**
 * Example: Input "2400cm^2" (inline unit) → Output in cm²
 *
 * The library accepts values with inline units (e.g. "2400cm^2").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "2400cm^2",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.AREA,
  unit: UNIT_TOKENS.SQUARE_CENTIMETER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.SQUARE_CENTIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output cm² ===");
console.log('Input : "2400cm^2"');
console.log("Display:", value.input.formatForDisplay()); // "2400 cm²"
console.log("Edit  :", value.input.formatForEdit());       // "2400"
