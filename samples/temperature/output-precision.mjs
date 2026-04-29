/**
 * Example: Precision control on temperature output
 *
 * Shows how different precision values affect formatting.
 * Useful for choosing the right precision for each annotation context.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = 22; // °C

function createWithPrecision(precision) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.FLOAT,
    quantity: QUANTITY_TYPES.TEMPERATURE,
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    output: new Output({
      id: "precision",
      unit: UNIT_TOKENS.KELVIN,
      precision,
      showUnit: true
    })
  });
}

console.log("=== Precision control (22°C → K) ===");
console.log("");

for (const p of [0, 1, 2, 3, 4]) {
  const v = createWithPrecision(p);
  console.log(`precision: ${p} → Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
