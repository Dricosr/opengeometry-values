import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const ANGLE_PRESETS = Object.freeze({
  "angle:annotation-degree": createPreset({
    id: "angle:annotation-degree",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Angle Annotation (deg)",
    description: "Degree output for geometry dimensions and plan annotations.",
    unit: UNIT_TOKENS.DEGREE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "angle:annotation-symbol": createPreset({
    id: "angle:annotation-symbol",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Angle Symbol (°)",
    description: "Degree symbol output for polished BIM and AEC dashboards.",
    unit: UNIT_TOKENS.DEGREE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "angle:process-radian": createPreset({
    id: "angle:process-radian",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Process Angle (rad)",
    description: "Radian output for industrial geometry, robotics, and calculation traces.",
    unit: UNIT_TOKENS.RADIAN,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "angle:slope-symbol": createPreset({
    id: "angle:slope-symbol",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Slope Angle (°)",
    description: "Degree symbol output with one decimal for ramps, drains, and process slopes.",
    unit: UNIT_TOKENS.DEGREE,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});
