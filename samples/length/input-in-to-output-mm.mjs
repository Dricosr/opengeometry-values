/**
 * Example: Input 2.5 in → Output in mm
 *
 * Converts decimal inches to millimeters (×25.4).
 * Useful for converting imperial measurements to metric.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 2.5,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.INCH,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input in → Output mm ===");
console.log("Input : 2.5 in");
console.log("Display:", value.input.formatForDisplay()); // "63.5 mm"
console.log("Edit  :", value.input.formatForEdit());       // "63.5"
