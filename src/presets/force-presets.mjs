import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const FORCE_PRESETS = Object.freeze({
  "force:structural-kilonewton": createPreset({
    id: "force:structural-kilonewton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Structural Force (kN)",
    description: "Kilonewton output for anchors, supports, and reactions.",
    unit: UNIT_TOKENS.KILONEWTON,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "force:equipment-newton": createPreset({
    id: "force:equipment-newton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Equipment Force (N)",
    description: "Newton output for actuators, mechanisms, and industrial equipment internals.",
    unit: UNIT_TOKENS.NEWTON,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "force:loadcase-kilonewton": createPreset({
    id: "force:loadcase-kilonewton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Load Case Force (kN)",
    description: "Higher-precision kilonewton output for structural and rigging load cases.",
    unit: UNIT_TOKENS.KILONEWTON,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
