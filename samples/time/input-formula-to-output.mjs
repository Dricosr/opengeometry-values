/**
 * Example: Input formula "=3 days + 8 h" → Output in hours
 *
 * The library accepts mathematical expressions with mixed embedded units.
 * The result is evaluated and converted to the output unit.
 * Useful for computing total project durations.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: "=3 days + 8 h",
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.TIME,
  unit: UNIT_TOKENS.HOUR,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.HOUR,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input formula → Output h ===");
console.log('Input : "=3 days + 8 h"');
console.log("Display:", value.input.formatForDisplay()); // "80 h"
console.log("Edit  :", value.input.formatForEdit());       // "=3 days + 8 h"
