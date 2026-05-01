/**
 * Example: Integer input 50 m³ → Output in m³
 *
 * The library supports integer values stored as whole numbers
 * (no decimal places) via VALUE_TYPES.NUMBER.
 * Useful for discrete pour quantities that are always whole numbers.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 50,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.VOLUME,
  unit: UNIT_TOKENS.CUBIC_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.CUBIC_METER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output m³ ===");
console.log("Input : 50 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "50 m³"
console.log("Edit  :", value.input.formatForEdit());       // "50"
