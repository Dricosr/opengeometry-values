/**
 * Example: Input "4000mm" (inline unit) → Output in cm
 *
 * The library accepts values with inline units (e.g. "4000mm").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "4000mm",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.CENTIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output cm ===");
console.log('Input : "4000mm"');
console.log("Display:", value.input.formatForDisplay()); // "400 cm"
console.log("Edit  :", value.input.formatForEdit());       // "400"
