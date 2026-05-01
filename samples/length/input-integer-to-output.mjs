/**
 * Example: Integer input 3000 mm → Output in mm
 *
 * The library supports integer values stored as whole numbers
 * (no decimal places) via VALUE_TYPES.NUMBER.
 * Useful for measurements that are always discrete (e.g. pin count, grid).
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 3000,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input integer → Output mm ===");
console.log("Input : 3000 (integer)");
console.log("Display:", value.input.formatForDisplay()); // "3000 mm"
console.log("Edit  :", value.input.formatForEdit());       // "3000"
