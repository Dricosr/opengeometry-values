import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const MASS_PRESETS = Object.freeze({
  "mass:schedule-kilogram": createPreset({
    id: "mass:schedule-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Mass Schedule (kg)",
    description: "Kilogram output for equipment, assemblies, and logistics views.",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "mass:shipping-kilogram": createPreset({
    id: "mass:shipping-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Shipping Mass (kg)",
    description: "Rounded kilogram output for logistics, transport manifests, and crane plans.",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "mass:rigging-kilogram": createPreset({
    id: "mass:rigging-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Rigging Mass (kg)",
    description: "Higher-precision kilogram output for lift studies and handling envelopes.",
    unit: UNIT_TOKENS.KILOGRAM,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
