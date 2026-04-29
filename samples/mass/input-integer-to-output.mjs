/**
 * Example: Integer input 50 kg → Output in kg
 *
 * The library supports VALUE_TYPES.INTEGER for values that must be
 * stored as whole numbers (no decimal places).
 * Useful for discrete mass items like manhole covers.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 50,
  valueType: VALUE_TYPES.INTEGER,
  quantity: QUANTITY_TYPES.MASS,
  unit: UNIT_TOKENS.KILOGRAM,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output kg ===");
console.log("Input : 50 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "50 kg"
console.log("Edit  :", value.input.formatForEdit());       // "50"
