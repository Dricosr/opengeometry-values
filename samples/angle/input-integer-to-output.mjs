/**
 * Example: Integer input 90° → Output in degrees
 *
 * The library supports integer values stored as whole numbers
 * (no decimal places) via VALUE_TYPES.NUMBER.
 * Useful for orthogonal angles that are always discrete.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 90,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.ANGLE,
  unit: UNIT_TOKENS.DEGREE,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.DEGREE,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output deg ===");
console.log("Input : 90 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "90 deg"
console.log("Edit  :", value.input.formatForEdit());       // "90"
