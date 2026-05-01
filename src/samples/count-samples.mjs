/**
 * @fileoverview Parameter samples for the COUNT quantity.
 * Covers VALUE_TYPES.NUMBER with UNIT_TOKENS.UN (discrete integer counts).
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const COUNT_SAMPLES = Object.freeze({
  "count:pipe-length-count": createSample({
    id: "count:pipe-length-count",
    quantity: QUANTITY_TYPES.COUNT,
    valueType: VALUE_TYPES.NUMBER,
    name: "Pipe Spool Count",
    description: "Number of 6-m pipe spools for a 48-in cooling water line - 12 spools per ISO sketch.",
    input: { value: 12, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["count:count"]
  }),
  "count:flange-count": createSample({
    id: "count:flange-count",
    quantity: QUANTITY_TYPES.COUNT,
    valueType: VALUE_TYPES.NUMBER,
    name: "Flange Joint Count",
    description: "Number of 150# RFWN flanges on a 10-in steam header - 8 flanges per P&ID line list.",
    input: { value: 8, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["count:count"]
  }),
  "count:bolt-count": createSample({
    id: "count:bolt-count",
    quantity: QUANTITY_TYPES.COUNT,
    valueType: VALUE_TYPES.NUMBER,
    name: "Bolt Count per Flange",
    description: "Number of 3/4-in bolts for a 12-in 300# flange - 20 bolts per ASME B16.5.",
    input: { value: 20, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["count:count"]
  }),
  "count:valve-count": createSample({
    id: "count:valve-count",
    quantity: QUANTITY_TYPES.COUNT,
    valueType: VALUE_TYPES.NUMBER,
    name: "Valve Count",
    description: "Total gate valves on a 6-in cooling water loop - 4 valves per P&ID.",
    input: { value: 4, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["count:count"]
  })
});
