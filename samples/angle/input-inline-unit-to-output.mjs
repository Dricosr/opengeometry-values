/**
 * Example: Input "1.0472rad" (inline unit) → Output in rad
 *
 * The library accepts values with inline units (e.g. "1.0472rad").
 * The unit is extracted automatically, eliminating the need for a separate unit parameter.
 * Useful for data entry where the user types the unit together with the value.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "1.0472rad",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.ANGLE,
  unit: UNIT_TOKENS.RADIAN,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.RADIAN,
    precision: 3,
    showUnit: true
  })
});

console.log("=== Input inline unit → Output rad ===");
console.log('Input : "1.0472rad"');
console.log("Display:", value.input.formatForDisplay()); // "1.047 rad"
console.log("Edit  :", value.input.formatForEdit());       // "1.047"
