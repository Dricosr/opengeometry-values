/**
 * Example: Precision control on unit count (UN) output
 *
 * Shows how different precision values affect formatting.
 * Since UN represents discrete counts, precision is typically 0.
 * Useful for confirming that non-zero precision still works
 * when counts need decimal display (e.g. averages).
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = 12; // un

function createWithPrecision(precision) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.NUMBER,
    quantity: QUANTITY_TYPES.NONE,
    unit: UNIT_TOKENS.UN,
    output: new Output({
      id: "precision",
      unit: UNIT_TOKENS.UN,
      precision,
      showUnit: true
    })
  });
}

console.log("=== Precision control (12 un → un) ===");
console.log("");

for (const p of [0, 1, 2, 3]) {
  const v = createWithPrecision(p);
  console.log(`precision: ${p} → Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
