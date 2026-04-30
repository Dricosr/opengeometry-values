/**
 * @fileoverview Standalone example: convert 125 mm input to fractional inch output.
 *
 * Demonstrates the full pipeline:
 *   1. Use `createValue` (from this library) to parse a 125 mm input
 *   2. Build a `FractionalInchOutput` to format the result
 *
 * Expected output (console):
 *   Display: 4 29/32"
 *   Edit:    4 29/32
 *
 * Because 125 mm ≈ 4.92126… in ≈ 4 59/64 in.
 * With maxDenominator=32 → rounds to 4 29/32 in.
 *
 * Run with: node src/samples/length/input-mm-to-output-fractional-inch.mjs
 */

import { createValue } from "../../core/create-value.mjs";
import { FractionalInchOutput } from "../../core/models/fractional-inch-output.mjs";
import { QUANTITY_TYPES } from "../../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../constants/value-types.mjs";
import { UNIT_TOKENS } from "../../constants/unit-token-catalog.mjs";

// ─── 1. Create the value from 125 mm ─────────────────────────────────
const value125mm = createValue({
  value: 125,
  unit: UNIT_TOKENS.MILLIMETER,
  valueType: VALUE_TYPES.NUMBER,
  quantity: QUANTITY_TYPES.LENGTH
});

// ─── 2. Build a FractionalInchOutput with denominator 32 ─────────────
const fractionalOutput = new FractionalInchOutput({
  id: "example:fractional-125mm",
  maxDenominator: 32,   // 32nds precision (construction/wood-framing grade)
  separator: "space",   // "4 29/32" (not "4-29/32")
  suffixMode: "symbol"  // trailing double prime: "4 29/32\""
});

// ─── 3. Format ───────────────────────────────────────────────────────
console.log("Display:", fractionalOutput.formatDisplay(value125mm));
console.log("Edit:  ", fractionalOutput.formatEdit(value125mm));
