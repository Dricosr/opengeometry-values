/**
 * Example: Input "1 1/4" in → Output in mm
 *
 * The library accepts fractional inch input (e.g. "1 1/4", "1/2", "3/8")
 * and automatically converts to the corresponding decimal value.
 * Useful for interpreting user input in imperial format.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "1 1/4",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.INCH,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input fractional inch → Output mm ===");
console.log('Input : "1 1/4" in');
console.log("Display:", value.input.formatForDisplay()); // "31.8 mm"
console.log("Edit  :", value.input.formatForEdit());       // "31.8"
