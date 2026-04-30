/**
 * Example: Precision control on area output
 *
 * Shows how different precision values affect formatting.
 * Useful for choosing the right precision for each annotation context.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = 42.35; // m²

function createWithPrecision(precision) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.NUMBER,
    quantity: QUANTITY_TYPES.AREA,
    unit: UNIT_TOKENS.SQUARE_METER,
    output: new Output({
      id: "precision",
      unit: UNIT_TOKENS.SQUARE_METER,
      precision,
      showUnit: true
    })
  });
}

console.log("=== Precision control (42.35 m² → m²) ===");
console.log("");

for (const p of [0, 1, 2, 3, 4]) {
  const v = createWithPrecision(p);
  console.log(`precision: ${p} → Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
