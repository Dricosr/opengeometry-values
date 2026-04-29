/**
 * Example: Input 42.35 m² → Output in cm²
 *
 * Converts square meters to square centimeters (×10000).
 * Useful for detailed area takeoffs in smaller units.
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const value = createValue({
  value: 42.35,
  valueType: VALUE_TYPES.FLOAT,
  quantity: QUANTITY_TYPES.AREA,
  unit: UNIT_TOKENS.SQUARE_METER,
  output: new Output({
    id: "example",
    unit: UNIT_TOKENS.SQUARE_CENTIMETER,
    precision: 0,
    showUnit: true
  })
});

console.log("=== Input m² → Output cm² ===");
console.log("Input : 42.35 m²");
console.log("Display:", value.input.formatForDisplay()); // "423500 cm²"
console.log("Edit  :", value.input.formatForEdit());       // "423500"
