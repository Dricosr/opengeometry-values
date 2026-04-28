import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const TEMPERATURE_PRESETS = Object.freeze({
  "temperature:celsius-room": createPreset({
    id: "temperature:celsius-room",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Room Temperature (°C)",
    description: "Degree Celsius output for HVAC and occupancy scenarios.",
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:celsius-process": createPreset({
    id: "temperature:celsius-process",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Process Temperature (°C)",
    description: "Higher-precision Celsius output for HVAC plants and industrial process loops.",
    unit: UNIT_TOKENS.DEGREE_CELSIUS,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:fahrenheit-room": createPreset({
    id: "temperature:fahrenheit-room",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Room Temperature (°F)",
    description: "Degree Fahrenheit output for US-facing coordination views.",
    unit: UNIT_TOKENS.DEGREE_FAHRENHEIT,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:process-kelvin": createPreset({
    id: "temperature:process-kelvin",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Process Temperature (K)",
    description: "Kelvin output for thermodynamic calculations and industrial process datasets.",
    unit: UNIT_TOKENS.KELVIN,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
