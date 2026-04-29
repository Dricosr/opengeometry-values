/**
 * Example: Input formula "=4 m + 200 cm" → Output in cm
 *
 * The library accepts mathematical expressions with embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for summing measurements directly in the input.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=4 m + 200 cm",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.CENTIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input formula → Output cm ===");
console.log('Input : "=4 m + 200 cm"');
console.log("Display:", value.input.formatForDisplay()); // "600 cm"
console.log("Edit  :", value.input.formatForEdit());       // "=4 m + 200 cm"
