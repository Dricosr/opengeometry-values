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
import { BOOLEAN_LABEL_PRESETS } from "../../src/constants/boolean-label-catalog.mjs";

const inputValue = "true"; // 1

function createWithLabels(labels) {
  return createValue({
    value: inputValue,
    valueType: VALUE_TYPES.BOOLEAN,
    quantity: QUANTITY_TYPES.BOOL,
    unit: UNIT_TOKENS.BOOL,
    output: new Output({
      id: "label-demo",
      unit: UNIT_TOKENS.BOOL,
      precision: 0,
      showUnit: false,
      booleanLabels: labels
    })
  });
}

const LABEL_SETS = Object.freeze([
  { key: "YES_NO",               labels: BOOLEAN_LABEL_PRESETS.YES_NO },
  { key: "OPEN_CLOSED",          labels: BOOLEAN_LABEL_PRESETS.OPEN_CLOSED },
  { key: "ENABLED_DISABLED",     labels: BOOLEAN_LABEL_PRESETS.ENABLED_DISABLED },
  { key: "COMPLIANT_NON_COMPLIANT", labels: BOOLEAN_LABEL_PRESETS.COMPLIANT_NON_COMPLIANT },
  { key: "APPROVED_NOT_APPROVED",   labels: BOOLEAN_LABEL_PRESETS.APPROVED_NOT_APPROVED }
]);

console.log("=== Boolean label set comparison (input: true) ===");
console.log("");

for (const { key, labels } of LABEL_SETS) {
  const v = createWithLabels(labels);
  console.log(`${key.padEnd(30)} Display: "${v.input.formatForDisplay()}"  Edit: "${v.input.formatForEdit()}"`);
}
