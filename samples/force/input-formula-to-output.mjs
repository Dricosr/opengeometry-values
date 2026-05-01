/**
 * Example: Input formula "=125 kN + 42.5 kN" → Output in kN
 *
 * The library accepts mathematical expressions with embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for summing structural reactions.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=125 kN + 42.5 kN",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.FORCE,
  unit: UNIT_TOKENS.KILONEWTON,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILONEWTON,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input formula → Output kN ===");
console.log('Input : "=125 kN + 42.5 kN"');
console.log("Display:", value.input.formatForDisplay()); // "167.5 kN"
console.log("Edit  :", value.input.formatForEdit());       // "=125 kN + 42.5 kN"
