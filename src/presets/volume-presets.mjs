import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const VOLUME_PRESETS = Object.freeze({
  "volume:concrete-cubic-meter": createPreset({
    id: "volume:concrete-cubic-meter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Concrete Volume (m3)",
    description: "Cubic-meter output for pours, tanks, and takeoffs.",
    unit: UNIT_TOKENS.CUBIC_METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:process-cubic-meter": createPreset({
    id: "volume:process-cubic-meter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Process Volume (m3)",
    description: "Higher-precision cubic-meter output for tanks, process skids, and utility systems.",
    unit: UNIT_TOKENS.CUBIC_METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:detail-cubic-centimeter": createPreset({
    id: "volume:detail-cubic-centimeter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Detailed Volume (cm3)",
    description: "Compact cubic-centimeter output for small component volumes.",
    unit: UNIT_TOKENS.CUBIC_CENTIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:fabrication-cubic-inch": createPreset({
    id: "volume:fabrication-cubic-inch",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Fabrication Volume (in3)",
    description: "Imperial cubic-inch output for small parts, resin doses, and vendor documentation.",
    unit: UNIT_TOKENS.CUBIC_INCH,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:tank-liter": createPreset({
    id: "volume:tank-liter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Tank Volume (L)",
    description: "Liter output for tanks, vessels, and process fluid volumes.",
    unit: UNIT_TOKENS.LITER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});
