import { createPreset } from "./create-preset.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

export const TIME_PRESETS = Object.freeze({
  "time:schedule-hour": createPreset({
    id: "time:schedule-hour",
    quantity: QUANTITY_TYPES.TIME,
    name: "Duration (h)",
    description: "Hour output for schedules, curing, and installation windows.",
    unit: UNIT_TOKENS.HOUR,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "time:coordination-minute": createPreset({
    id: "time:coordination-minute",
    quantity: QUANTITY_TYPES.TIME,
    name: "Duration (min)",
    description: "Minute output for coordination, sequencing, and process checks.",
    unit: UNIT_TOKENS.MINUTE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "time:curing-hour": createPreset({
    id: "time:curing-hour",
    quantity: QUANTITY_TYPES.TIME,
    name: "Curing Duration (h)",
    description: "Higher-precision hour output for curing, drying, and staging instructions.",
    unit: UNIT_TOKENS.HOUR,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  })
});
