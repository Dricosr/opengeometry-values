/**
 * Example: Boolean label set comparison
 *
 * Demonstrates how the same boolean input renders different
 * label pairs depending on the booleanLabelKey in the Output.
 * Useful for choosing the right label set per context
 * (equipment, QA/QC, document control, etc.).
 */

import { createValue } from "../../src/core/create-value.mjs";
import { Output } from "../../src/core/models/output.mjs";
import { UNIT_TOKENS } from "../../src/constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../../src/constants/quantity-types.mjs";
import { VALUE_TYPES } from "../../src/constants/value-types.mjs";

const inputValue = "true"; // 1

function createWithLabelKey(labelKey) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.BOOLEAN,
    quantity: QUANTITY_TYPES.NONE,
    unit: UNIT_TOKENS.BOOL,
    output: new Output({
      id: "label-demo",
      unit: UNIT_TOKENS.BOOL,
      precision: 0,
      showUnit: false,
      booleanLabelKey: labelKey
    })
  });
}

console.log("=== Boolean label set comparison (input: true) ===");
console.log("");

for (const key of ["YES_NO", "OPEN_CLOSED", "ENABLED_DISABLED", "COMPLIANT_NON_COMPLIANT", "APPROVED_NOT_APPROVED"]) {
  const v = createWithLabelKey(key);
  console.log(`${key.padEnd(30)} Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
