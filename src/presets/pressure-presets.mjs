import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const PRESSURE_PRESETS = Object.freeze({
  "pressure:hvac-kilopascal": createPreset({
    id: "pressure:hvac-kilopascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "HVAC Pressure (kPa)",
    description: "Kilopascal output for ducts, static pressure, and air-side reporting.",
    unit: UNIT_TOKENS.KILOPASCAL,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:piping-bar": createPreset({
    id: "pressure:piping-bar",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Piping Pressure (bar)",
    description: "Bar output for piping, pumps, and water network coordination.",
    unit: UNIT_TOKENS.BAR,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:vessel-megapascal": createPreset({
    id: "pressure:vessel-megapascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Vessel Pressure (MPa)",
    description: "Megapascal output for pressure vessels, skids, and design calculations.",
    unit: UNIT_TOKENS.MEGAPASCAL,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:instrumentation-pascal": createPreset({
    id: "pressure:instrumentation-pascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Instrumentation Pressure (Pa)",
    description: "Pascal output for fine-grained sensors, filters, and air-side diagnostics.",
    unit: UNIT_TOKENS.PASCAL,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
