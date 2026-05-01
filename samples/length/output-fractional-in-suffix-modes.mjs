/**
 * Example: Suffix modes for fractional inches
 *
 * FractionalInchOutput uses the OUTPUT_SUFFIX_MODES catalog to define
 * how the unit is displayed. Use the constants instead of raw strings:
 *
 *   - OUTPUT_SUFFIX_MODES.SYMBOL → " (double prime) - ANSI/ASME Y14.5 default
 *   - OUTPUT_SUFFIX_MODES.CODE   → "in"
 *   - OUTPUT_SUFFIX_MODES.NONE   → no unit
 *
 * Useful for tailoring the output to each discipline or client standard.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { FractionalInchOutput } from "../../src/core/models/fractional-inch-output.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../src/constants/output-suffix-modes.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = 125; // mm

function createWithSuffixMode(suffixMode, label) {
  const v = createValue({
    value: inputValue,
    valueType: VALUE_TYPES.NUMBER,
    quantity: QUANTITY_TYPES.LENGTH,
    unit: UNIT_TOKENS.MILLIMETER,
    output: new FractionalInchOutput({
      id: `suffix-${suffixMode}`,
      suffixMode
    })
  });

  console.log(`suffixMode: OUTPUT_SUFFIX_MODES.${label}`);
  console.log(`  Display: "${v.input.formatForDisplay()}"`);
  console.log(`  Edit  : "${v.input.formatForEdit()}"`);
  console.log("");
}

console.log("=== Suffix modes for fractional inches ===");
console.log("Input: 125 mm");
console.log("");

createWithSuffixMode(OUTPUT_SUFFIX_MODES.SYMBOL, "SYMBOL (double prime, ANSI default)");
createWithSuffixMode(OUTPUT_SUFFIX_MODES.CODE,   "CODE ('in' code)");
createWithSuffixMode(OUTPUT_SUFFIX_MODES.NONE,   "NONE (no unit)");
