/**
 * @fileoverview Parameter samples for the RATIO quantity.
 * Supported unit: percent only (RatioQuantityProfile uses UNIT_TOKENS.PERCENT).
 * Only VALUE_TYPES.NUMBER is used - ratio values are inherently decimal.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const RATIO_SAMPLES = Object.freeze({

  // ── percent (only supported unit) ────────────────────────────────────
  "ratio:valve-opening": createSample({
    id: "ratio:valve-opening",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Valve Opening",
    description: "Control valve opening percentage used in industrial operations dashboards.",
    input: { value: 85, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:equipment-load": createSample({
    id: "ratio:equipment-load",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Equipment Load Factor",
    description: "Equipment utilization ratio for AEC operations and industrial dashboards.",
    input: { value: 73.5, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:room-humidity": createSample({
    id: "ratio:room-humidity",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Room Humidity Target",
    description: "AEC and clean-room humidity target used in controls and commissioning views.",
    input: { value: 55, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:utilization-percent"]
  }),
  "ratio:process-yield": createSample({
    id: "ratio:process-yield",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Process Yield",
    description: "Production and commissioning yield indicator tracked as a percentage.",
    input: { value: 92.3, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:slope-1-12": createSample({
    id: "ratio:slope-1-12",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Slope 1:12",
    description: "ADA maximum ramp slope - 1:12 = 8.33% for accessible routes per 2010 ADA Standards.",
    input: { value: 8.33, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:slope-2-12": createSample({
    id: "ratio:slope-2-12",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Slope 2:12",
    description: "Standard parking lot cross-slope - 2% (1/4″ per foot) per IBC.",
    input: { value: 2, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:concrete-mix-proportion": createSample({
    id: "ratio:concrete-mix-proportion",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Concrete Mix w/c Ratio",
    description: "Water-cement ratio for 4000 psi concrete mix - 0.45 per ACI 318.",
    input: { value: 45, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:reinforcement-ratio": createSample({
    id: "ratio:reinforcement-ratio",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Reinforcement Ratio (p)",
    description: "Steel reinforcement ratio for 24x24 beam - 1.2% per ACI 318.",
    input: { value: 1.2, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:motor-efficiency": createSample({
    id: "ratio:motor-efficiency",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Motor Efficiency",
    description: "NEMA Premium IE3 motor efficiency at full load - 95.4%.",
    input: { value: 95.4, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:utilization-percent", "ratio:process-percent"]
  }),
  "ratio:glycol-concentration": createSample({
    id: "ratio:glycol-concentration",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Glycol Concentration",
    description: "Propylene glycol freeze protection for hydronic loop - 30% by volume.",
    input: { value: 30, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:steel-damper-open": createSample({
    id: "ratio:steel-damper-open",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Damper Open Percentage",
    description: "Fire/smoke damper open position feedback - 100% open = normal operation.",
    input: { value: 100, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:insulation-efficiency": createSample({
    id: "ratio:insulation-efficiency",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Insulation Thermal Efficiency",
    description: "Pipe insulation heat retention efficiency - 96% for 2-in mineral wool at 200 °F.",
    input: { value: 96, unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:utilization-percent", "ratio:process-percent"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "ratio:formula-plain": createSample({
    id: "ratio:formula-plain",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Setpoint (Formula)",
    description: "Plain numeric formula - =85 (percentual).",
    input: { value: "=85", unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:formula-embedded-units": createSample({
    id: "ratio:formula-embedded-units",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.NUMBER,
    name: "Efficiency (Formula)",
    description: "Ratio formula - 250 / 300 * 100 (%) = 83.3%.",
    input: { value: "=250 / 300 * 100", unit: UNIT_TOKENS.PERCENT },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
});
