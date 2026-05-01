/**
 * Example: Input formula "=12.5 + 48.3 + 520" → Output in kg
 *
 * The library accepts plain numeric formulas (without embedded units).
 * The result is evaluated and converted to the output unit.
 * Useful for summing equipment masses.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=12.5 + 48.3 + 520",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.MASS,
  unit: UNIT_TOKENS.KILOGRAM,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 1,
    showUnit: true
  })
});

console.log("=== Input formula → Output kg ===");
console.log('Input : "=12.5 + 48.3 + 520"');
console.log("Display:", value.input.formatForDisplay()); // "580.8 kg"
console.log("Edit  :", value.input.formatForEdit());       // "=12.5 + 48.3 + 520"
