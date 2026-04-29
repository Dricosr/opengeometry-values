/**
 * Example: Precision control on output
 *
 * Shows how different precision values affect formatting.
 * Useful for choosing the right precision for each annotation context.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = 125; // mm

function createWithPrecision(precision) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.FLOAT,
    quantity: QUANTITY_TYPES.LENGTH,
    unit: UNIT_TOKENS.MILLIMETER,
    output: new Output({
      id: "precision",
      unit: UNIT_TOKENS.METER,
      precision,
      showUnit: true
    })
  });
}

console.log("=== Precision control (125 mm → m) ===");
console.log("");

for (const p of [0, 1, 2, 3, 4]) {
  const v = createWithPrecision(p);
  console.log(`precision: ${p} → Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
