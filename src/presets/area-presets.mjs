import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const AREA_PRESETS = Object.freeze({
  "area:schedule-square-meter": createPreset({
    id: "area:schedule-square-meter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Area Schedule (m2)",
    description: "Area schedule output with symbol suffix for room and slab takeoffs.",
    unit: UNIT_TOKENS.SQUARE_METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:coating-square-meter": createPreset({
    id: "area:coating-square-meter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Coating Area (m2)",
    description: "Higher-precision area output for coatings, finishes, and surface treatment packages.",
    unit: UNIT_TOKENS.SQUARE_METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:detail-square-centimeter": createPreset({
    id: "area:detail-square-centimeter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Detailed Area (cm2)",
    description: "Square-centimeter output for compact technical details.",
    unit: UNIT_TOKENS.SQUARE_CENTIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:fabrication-square-inch": createPreset({
    id: "area:fabrication-square-inch",
    quantity: QUANTITY_TYPES.AREA,
    name: "Fabrication Area (in2)",
    description: "Imperial area output for fabrication sheets, gaskets, and supplier details.",
    unit: UNIT_TOKENS.SQUARE_INCH,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});
