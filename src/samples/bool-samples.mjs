/**
 * @fileoverview Parameter samples for the BOOL quantity.
 * Covers VALUE_TYPES.BOOLEAN (on/off, open/closed, yes/no).
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const BOOL_SAMPLES = Object.freeze({
  "bool:valve-open": createSample({
    id: "bool:valve-open",
    quantity: QUANTITY_TYPES.BOOL,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Valve Open Status",
    description: "Isolation valve position feedback - open/closed for piping isometric verification.",
    input: { value: "true", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["bool:open-closed"]
  }),
  "bool:pump-running": createSample({
    id: "bool:pump-running",
    quantity: QUANTITY_TYPES.BOOL,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Pump Running Status",
    description: "Centrifugal pump run status - on/off for equipment schedule dashboards.",
    input: { value: "yes", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["bool:yes-no"]
  }),
  "bool:breaker-closed": createSample({
    id: "bool:breaker-closed",
    quantity: QUANTITY_TYPES.BOOL,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Breaker Closed Status",
    description: "MCCB breaker position - 1 = closed, 0 = open for electrical one-line diagrams.",
    input: { value: "1", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["bool:yes-no"]
  }),
  "bool:damper-open": createSample({
    id: "bool:damper-open",
    quantity: QUANTITY_TYPES.BOOL,
    valueType: VALUE_TYPES.BOOLEAN,
    name: "Damper Open Status",
    description: "Fire damper end-switch feedback - open/closed for BAS point schedules.",
    input: { value: "false", unit: UNIT_TOKENS.BOOL },
    recommendedOutputPresetIds: ["bool:open-closed"]
  })
});
