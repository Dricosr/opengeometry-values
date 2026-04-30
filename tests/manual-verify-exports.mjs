/**
 * Manual verification script — checks that all fractional inch exports
 * are accessible from the public API and work as documented.
 *
 * Run via PowerShell or bash:
 *   node tests/manual-verify-exports.mjs
 */

import {
  FractionalInchParser,
  fractionalInchParser,
  parseFractionalInch,
  FRACTIONAL_INCH_DENOMINATORS,
  FractionalInchFormatter,
  fractionalInchFormatter,
  FractionalInchOutput,
  createValue,
  tryCreateValue,
  UNIT_TOKENS,
  OUTPUT_SUFFIX_MODES,
  CustomOutputAffix
} from "../src/index.mjs";

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    passed++;
    console.log("  PASS  " + label);
  } else {
    failed++;
    console.log("  FAIL  " + label);
  }
}

// ──────────────────────────────────────────────
console.log("\n1. Exports exist");
// ──────────────────────────────────────────────
assert(typeof FractionalInchParser === "function", "FractionalInchParser class");
assert(typeof fractionalInchParser === "object", "fractionalInchParser singleton");
assert(typeof parseFractionalInch === "function", "parseFractionalInch function");
assert(typeof FRACTIONAL_INCH_DENOMINATORS === "object", "FRACTIONAL_INCH_DENOMINATORS enum");
assert(typeof FractionalInchFormatter === "function", "FractionalInchFormatter class");
assert(typeof fractionalInchFormatter === "object", "fractionalInchFormatter singleton");
assert(typeof FractionalInchOutput === "function", "FractionalInchOutput class");

// ──────────────────────────────────────────────
console.log("\n2. FRACTIONAL_INCH_DENOMINATORS values");
// ──────────────────────────────────────────────
assert(FRACTIONAL_INCH_DENOMINATORS.CONSTRUCTION === "construction", "CONSTRUCTION enum");
assert(FRACTIONAL_INCH_DENOMINATORS.PRECISION === "precision", "PRECISION enum");
assert(FRACTIONAL_INCH_DENOMINATORS.MACHINING === "machining", "MACHINING enum");
assert(FRACTIONAL_INCH_DENOMINATORS.FINE === "fine", "FINE enum");

// ──────────────────────────────────────────────
console.log("\n3. FractionalInchParser");
// ──────────────────────────────────────────────
const parser = new FractionalInchParser();
assert(parser.parse("1 1/4") === 1.25, 'parse("1 1/4") === 1.25');
assert(parser.parse("1-1/4") === 1.25, 'parse("1-1/4") === 1.25');
assert(parser.parse("1/2") === 0.5, 'parse("1/2") === 0.5');
assert(parser.parse("3/4") === 0.75, 'parse("3/4") === 0.75');
assert(parser.parse("2") === 2, 'parse("2") === 2');
assert(parser.parse("-1 1/4") === -1.25, 'parse("-1 1/4") === -1.25');
assert(parser.parse("0") === 0, 'parse("0") === 0');
assert(parser.parse("1.25") === 1.25, 'parse("1.25") === 1.25');
assert(parser.canParse("1 1/4") === true, 'canParse("1 1/4") === true');
assert(parser.canParse("1/3") === false, 'canParse("1/3") === false (not power of 2)');
assert(parser.canParse("") === false, 'canParse("") === false');

// ──────────────────────────────────────────────
console.log("\n4. FractionalInchFormatter");
// ──────────────────────────────────────────────
const formatter = new FractionalInchFormatter();
assert(formatter.decimalToFraction(1.25) === "1 1/4", 'decimalToFraction(1.25) === "1 1/4"');
assert(formatter.decimalToFraction(0.5) === "1/2", 'decimalToFraction(0.5) === "1/2"');
assert(formatter.decimalToFraction(0.75) === "3/4", 'decimalToFraction(0.75) === "3/4"');
assert(formatter.decimalToFraction(2.375) === "2 3/8", 'decimalToFraction(2.375) === "2 3/8"');
assert(formatter.decimalToFraction(-1.25) === "-1 1/4", 'decimalToFraction(-1.25) === "-1 1/4"');
assert(formatter.decimalToFraction(0) === "0", 'decimalToFraction(0) === "0"');

// ──────────────────────────────────────────────
console.log("\n5. FractionalInchOutput — construction");
// ──────────────────────────────────────────────
const output = new FractionalInchOutput({ id: "test" });
assert(output.unit === "in", "unit === 'in'");
assert(typeof output.formatDisplay === "function", "formatDisplay method exists");
assert(typeof output.formatEdit === "function", "formatEdit method exists");

// ──────────────────────────────────────────────
console.log("\n6. FractionalInchOutput with suffix modes");
// ──────────────────────────────────────────────
const symOut = new FractionalInchOutput({ id: "sym", suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL });
assert(symOut.suffixMode === OUTPUT_SUFFIX_MODES.SYMBOL, "suffixMode === SYMBOL");

const codeOut = new FractionalInchOutput({ id: "code", suffixMode: OUTPUT_SUFFIX_MODES.CODE });
assert(codeOut.suffixMode === OUTPUT_SUFFIX_MODES.CODE, "suffixMode === CODE");

// ──────────────────────────────────────────────
console.log("\n7. FractionalInchOutput via createValue");
// ──────────────────────────────────────────────
const fractionalVal = createValue({
  value: "1 1/4",
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "test-create" })
});
assert(typeof fractionalVal === "object", "createValue returned object");
assert(fractionalVal.internal.value === 0.03175, "internal value in meters (1.25 in = 0.03175 m)");
assert(fractionalVal.internal.unit === "m", "internal unit is meters");
assert(fractionalVal.input.formatForDisplay().includes("1 1/4"), 'display includes "1 1/4"');
assert(fractionalVal.input.formatForEdit() === "1 1/4", 'edit value === "1 1/4"');

// ──────────────────────────────────────────────
console.log("\n8. FractionalInchOutput — numeric decimal input");
// ──────────────────────────────────────────────
const numericVal = createValue({
  value: 0.375,
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "numeric-test" })
});
assert(numericVal.input.formatForDisplay().includes("3/8"), 'numeric input display includes "3/8"');

// ──────────────────────────────────────────────
console.log("\n9. FractionalInchOutput — metric input");
// ──────────────────────────────────────────────
const metricVal = createValue({
  value: 762,
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.MILLIMETER,
  output: new FractionalInchOutput({ id: "metric-test" })
});
assert(metricVal.input.formatForDisplay().includes("30"), 'metric input display includes "30"');

// ──────────────────────────────────────────────
console.log("\n10. FractionalInchOutput — prefix");
// ──────────────────────────────────────────────
const prefixed = createValue({
  value: "1 1/4",
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "prefix-test", prefix: "⌀ " })
});
const displayText = prefixed.input.formatForDisplay();
assert(displayText.startsWith("⌀"), 'prefixed display starts with diameter sign');
assert(displayText.includes("1 1/4"), 'prefixed display includes "1 1/4"');

// ──────────────────────────────────────────────
console.log("\n11. tryCreateValue rejects invalid fraction");
// ──────────────────────────────────────────────
const result = tryCreateValue({
  value: "1/3",
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "invalid-test" })
});
assert(result.ok === false, 'result.ok === false for invalid fraction');
assert(result.value === null, 'result.value === null for invalid fraction');
assert(result.error !== null, 'result.error exists for invalid fraction');
assert(result.error.code === "invalid_numeric_value", 'error.code === "invalid_numeric_value"');

// ──────────────────────────────────────────────
console.log("\n12. Singleton parser and formatter work");
// ──────────────────────────────────────────────
assert(fractionalInchParser.parse("3/8") === 0.375, 'fractionalInchParser.parse("3/8") === 0.375');
assert(parseFractionalInch("3/8") === 0.375, 'parseFractionalInch("3/8") === 0.375');
assert(fractionalInchFormatter.decimalToFraction(0.375) === "3/8", 'fractionalInchFormatter.decimalToFraction(0.375) === "3/8"');

// ──────────────────────────────────────────────
console.log("\n13. Round-trip: string -> internal -> display");
// ──────────────────────────────────────────────
const rt = createValue({
  value: "1 1/4",
  valueType: "float",
  quantity: "length",
  unit: UNIT_TOKENS.INCH,
  output: new FractionalInchOutput({ id: "roundtrip" })
});
assert(rt.input.formatForEdit() === "1 1/4", 'round-trip edit: "1 1/4"');
assert(rt.input.formatForDisplay().includes("1 1/4"), 'round-trip display includes "1 1/4"');

// ──────────────────────────────────────────────
console.log("\n========================================");
console.log("Total: " + (passed + failed) + "  |  Passed: " + passed + "  |  Failed: " + failed);
console.log("========================================");

process.exit(failed > 0 ? 1 : 0);
