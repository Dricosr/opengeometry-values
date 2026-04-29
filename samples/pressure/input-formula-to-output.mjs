/**
 * Example: Input formula "=1.6 MPa + 0.5 bar" → Output in MPa
 *
 * The library accepts mathematical expressions with mixed embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for computing combined pressure ratings.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=1.6 MPa + 0.5 bar",
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.PRESSURE,
  unit: UNIT_TOKENS.MEGAPASCAL,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MEGAPASCAL,
    precision: 2,
    showUnit: true
  })
});

console.log("=== Input formula → Output MPa ===");
console.log('Input : "=1.6 MPa + 0.5 bar"');
console.log("Display:", value.input.formatForDisplay()); // "1.65 MPa"
console.log("Edit  :", value.input.formatForEdit());       // "=1.6 MPa + 0.5 bar"
