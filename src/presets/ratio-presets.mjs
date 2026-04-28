import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const RATIO_PRESETS = Object.freeze({
  "ratio:dashboard-percent": createPreset({
    id: "ratio:dashboard-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Dashboard Ratio (%)",
    description: "Whole-percent output for dashboards, BIM operations panels, and room-performance views.",
    unit: UNIT_TOKENS.PERCENT,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "ratio:process-percent": createPreset({
    id: "ratio:process-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Process Ratio (%)",
    description: "One-decimal percentage output for commissioning, control loops, and industrial KPIs.",
    unit: UNIT_TOKENS.PERCENT,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "ratio:utilization-percent": createPreset({
    id: "ratio:utilization-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Utilization Ratio (%)",
    description: "Two-decimal percentage output for utilization, efficiency, and QA tracking.",
    unit: UNIT_TOKENS.PERCENT,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});
