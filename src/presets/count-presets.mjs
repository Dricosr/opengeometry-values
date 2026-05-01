import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const COUNT_PRESETS = Object.freeze({
  "count:count": createPreset({
    id: "count:count",
    quantity: QUANTITY_TYPES.COUNT,
    name: "Unit Count",
    description: "Generic whole-number count with unit suffix for discrete items.",
    unit: UNIT_TOKENS.UN,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "count:count-pcs": createPreset({
    id: "count:count-pcs",
    quantity: QUANTITY_TYPES.COUNT,
    name: "Unit Count (pcs)",
    description: "Whole-number count with 'pcs' custom suffix for parts or components.",
    unit: UNIT_TOKENS.UN,
    precision: 0,
    showUnit: false,
    prefix: "Qty ",
    suffix: " pcs",
    suffixMode: OUTPUT_SUFFIX_MODES.CUSTOM
  })
});
