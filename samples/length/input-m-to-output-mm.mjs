/**
 * Example: Input 7.2 m → Output in mm
 *
 * Converts meters to millimeters (×1000).
 * Useful for manufacturing details that require mm precision.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 7.2,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input m → Output mm ===");
console.log("Input : 7.2 m");
console.log("Display:", value.input.formatForDisplay()); // "7200 mm"
console.log("Edit  :", value.input.formatForEdit());       // "7200"
