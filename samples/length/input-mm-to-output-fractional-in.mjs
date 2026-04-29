/**
 * Example: Input mm → Output in fractional inches
 *
 * Converts millimeters to fractional inches in ANSI/ASME Y14.5 format.
 * Uses FractionalInchOutput instead of a regular Output.
 *
 * Suffix modes are defined by the OUTPUT_SUFFIX_MODES catalog:
 *   - OUTPUT_SUFFIX_MODES.SYMBOL → uses " (double prime) — ANSI default
 *   - OUTPUT_SUFFIX_MODES.CODE   → uses "in"
 *   - OUTPUT_SUFFIX_MODES.NONE   → no unit
 *
 * The separator between whole and fraction comes from the SEPARATORS catalog:
 *   - SEPARATORS.SPACE  (default): "1 1/4"
 *   - SEPARATORS.HYPHEN          : "1-1/4"
 */

import { createValue } from "../../src/core/create-value.mjs";
import { FractionalInchOutput } from "../../src/core/models/fractional-inch-output.mjs";
import { OUTPUT_SUFFIX_MODES } from "../../src/constants/output-suffix-modes.mjs";
import { SEPARATORS } from "../../src/constants/fractional-inch-catalog.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

// --- Symbol mode (default): uses " (double prime), space separator ---
// 31.75 mm = 1 1/4"
const symbolValue = createValue({
  value: 31.75,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "frac-inch-symbol",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL,
    separator: SEPARATORS.SPACE
  })
});

console.log("=== Input mm → Output fractional inches ===");
console.log("Input : 31.75 mm");
console.log("");
console.log("--- suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL (default), separator: SEPARATORS.SPACE ---");
console.log("Display:", symbolValue.input.formatForDisplay()); // "1 1/4\""
console.log("Edit  :", symbolValue.input.formatForEdit());       // "1 1/4"

// --- Code mode: uses "in", space separator ---
// 3.175 mm = 1/8"
const codeValue = createValue({
  value: 3.175,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "frac-inch-code",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE,
    separator: SEPARATORS.SPACE
  })
});

console.log("");
console.log("--- suffixMode: OUTPUT_SUFFIX_MODES.CODE, separator: SEPARATORS.SPACE ---");
console.log("Display:", codeValue.input.formatForDisplay()); // "1/8 in"
console.log("Edit  :", codeValue.input.formatForEdit());       // "1/8"

// --- No unit, space separator ---
// 63.5 mm = 2 1/2"
const noUnitValue = createValue({
  value: 63.5,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "frac-inch-none",
    suffixMode: OUTPUT_SUFFIX_MODES.NONE,
    separator: SEPARATORS.SPACE
  })
});

console.log("");
console.log("--- suffixMode: OUTPUT_SUFFIX_MODES.NONE, separator: SEPARATORS.SPACE ---");
console.log("Display:", noUnitValue.input.formatForDisplay()); // "2 1/2"
console.log("Edit  :", noUnitValue.input.formatForEdit());       // "2 1/2"

// --- Symbol mode with hyphen separator ---
// 31.75 mm = 1-1/4"
const hyphenValue = createValue({
  value: 31.75,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.LENGTH,
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({
    id: "frac-inch-hyphen",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL,
    separator: SEPARATORS.HYPHEN
  })
});

console.log("");
console.log("--- suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL, separator: SEPARATORS.HYPHEN ---");
console.log("Display:", hyphenValue.input.formatForDisplay()); // "1-1/4\""
console.log("Edit  :", hyphenValue.input.formatForEdit());       // "1-1/4"
