/**
 * @fileoverview Parameter samples for the NONE quantity.
 * Covers VALUE_TYPES.BOOLEAN (on/off, open/closed) and
 * VALUE_TYPES.NUMBER with UNIT_TOKENS.UN (unit count).
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const NONE_SAMPLES = Object.freeze({

  // ── boolean samples ──────────────────────────────────────────────────
  "none:valve-open": createSample({
    id: "none:valve-open",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Valve Open Status",
    description: "Isolation valve position feedback - open/closed for piping isometric verification.",
    input: { value: "true", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["none:open-closed"]
  }),
  "none:pump-running": createSample({
    id: "none:pump-running",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Pump Running Status",
    description: "Centrifugal pump run status - on/off for equipment schedule dashboards.",
    input: { value: "yes", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["none:yes-no"]
  }),
  "none:breaker-closed": createSample({
    id: "none:breaker-closed",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Breaker Closed Status",
    description: "MCCB breaker position - 1 = closed, 0 = open for electrical one-line diagrams.",
    input: { value: "1", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["none:yes-no"]
  }),
  "none:damper-open": createSample({
    id: "none:damper-open",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Damper Open Status",
    description: "Fire damper end-switch feedback - open/closed for BAS point schedules.",
    input: { value: "false", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["none:open-closed"]
  }),

  // ── unit count samples ────────────────────────────────────────────────
  "none:pipe-length-count": createSample({
    id: "none:pipe-length-count",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Pipe Spool Count",
    description: "Number of 6-m pipe spools for a 48-in cooling water line - 12 spools per ISO sketch.",
    input: { value: 12, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["none:count"]
  }),
  "none:flange-count": createSample({
    id: "none:flange-count",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Flange Joint Count",
    description: "Number of 150# RFWN flanges on a 10-in steam header - 8 flanges per P&ID line list.",
    input: { value: 8, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["none:count"]
  }),
  "none:bolt-count": createSample({
    id: "none:bolt-count",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Bolt Count per Flange",
    description: "Number of 3/4-in bolts for a 12-in 300# flange - 20 bolts per ASME B16.5.",
    input: { value: 20, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["none:count"]
  }),
  "none:valve-count": createSample({
    id: "none:valve-count",
    quantity: QUANTITY_TYPES.NONE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Valve Count",
    description: "Total gate valves on a 6-in cooling water loop - 4 valves per P&ID.",
    input: { value: 4, unit: UNIT_TOKENS.UN },
    recommendedOutputPresetIds: ["none:count"]
  })
});
