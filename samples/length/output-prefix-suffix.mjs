/**
 * Example: Custom prefix and suffix
 *
 * Shows how to add prefixes (e.g. ⌀ for diameter) and
 * control the unit suffix using the OUTPUT_SUFFIX_MODES catalog.
 * Useful for technical annotations like "⌀ 25 mm" or "⌀ 63/64\"".
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { FractionalInchOutput } from "../../src/core/models/fractional-inch-output.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../src/constants/output-suffix-modes.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

// --- Diameter in mm with ⌀ prefix ---
const diameterMm = createValue({
  value: 25,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new Output({
    id: "diam-mm",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true,
    prefix: "⌀ "
  })
});

console.log("=== Custom prefix and suffix ===");
console.log("");
console.log("--- Diameter in mm with ⌀ ---");
console.log("Display:", diameterMm.input.formatForDisplay()); // "⌀ 25 mm"
console.log("Edit  :", diameterMm.input.formatForEdit());       // "25"

// --- Diameter in fractional inches with ⌀ ---
const diameterIn = createValue({
  value: 25,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "diam-pol",
    prefix: "⌀ ",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});

console.log("");
console.log("--- Diameter in fractional inches with ⌀ ---");
console.log("Display:", diameterIn.input.formatForDisplay()); // "⌀ 63/64\""
console.log("Edit  :", diameterIn.input.formatForEdit());       // "63/64"
