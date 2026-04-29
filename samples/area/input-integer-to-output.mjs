/**
 * Example: Integer input 48 m² → Output in m²
 *
 * The library supports VALUE_TYPES.INTEGER for values that must be
 * stored as whole numbers (no decimal places).
 * Useful for grid-aligned areas that are always discrete.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 48,
  valueType: VALUE_TYPES.INTEGER,
  quantity: QUANTITY_TYPES.AREA,
  unit: UNIT_TOKENS.SQUARE_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.SQUARE_METER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output m² ===");
console.log("Input : 48 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "48 m²"
console.log("Edit  :", value.input.formatForEdit());       // "48"
