import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const LENGTH_PRESETS = Object.freeze({
  "length:model-mm": createPreset({
    id: "length:model-mm",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Model Length (mm)",
    description: "Millimeter output for modeled dimensions and fabrication-ready schedules.",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:annotation-meter": createPreset({
    id: "length:annotation-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Annotation Length (m)",
    description: "Meter output with engineering precision for general BIM annotations.",
    unit: UNIT_TOKENS.METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:detail-inch": createPreset({
    id: "length:detail-inch",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Detail Length (in)",
    description: "Imperial output for coordination with fabrication or manufacturer detail sheets.",
    unit: UNIT_TOKENS.INCH,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:process-meter": createPreset({
    id: "length:process-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Process Length (m)",
    description: "Meter output with balanced precision for industrial equipment and piping packages.",
    unit: UNIT_TOKENS.METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-mm": createPreset({
    id: "length:diameter-mm",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (mm)",
    description: "Diameter annotation in millimeters with ⌀ prefix for pipe, bolt, and hole callouts.",
    unit: UNIT_TOKENS.MILLIMETER,
    precision: 0,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-meter": createPreset({
    id: "length:diameter-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (m)",
    description: "Diameter annotation in meters with ⌀ prefix for large vessel and tank callouts.",
    unit: UNIT_TOKENS.METER,
    precision: 3,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-inch": createPreset({
    id: "length:diameter-inch",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (in)",
    description: "Diameter annotation in inches with ⌀ prefix for fabrication and supplier details.",
    unit: UNIT_TOKENS.INCH,
    precision: 2,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
