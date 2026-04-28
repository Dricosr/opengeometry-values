/**
 * @fileoverview Parameter samples for the TIME quantity.
 * Covers all supported units: s, min, h.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const TIME_SAMPLES = Object.freeze({

  // ── min ──────────────────────────────────────────────────────────────
  "time:fire-rating": createSample({
    id: "time:fire-rating",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Rating Duration",
    description: "Duration-driven parameter for fire assemblies and curing windows.",
    input: { value: 120, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:coordination-minute"]
  }),
  "time:coating-dwell": createSample({
    id: "time:coating-dwell",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Coating Dwell Time",
    description: "Industrial coating dwell or flash-off time for QA and production instructions.",
    input: { value: 45, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:weld-arc-time": createSample({
    id: "time:weld-arc-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Weld Arc Time",
    description: "Arc-on time per weld pass — 3.5 minutes for a 1/4″ fillet 6″ long.",
    input: { value: 3.5, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:fire-rating-1hr": createSample({
    id: "time:fire-rating-1hr",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "1-Hour Fire Rating",
    description: "Standard 1-hour fire-resistance rated assembly per IBC Table 721 / ASTM E119.",
    input: { value: 60, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:fire-rating-2hr": createSample({
    id: "time:fire-rating-2hr",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "2-Hour Fire Rating",
    description: "Standard 2-hour fire-resistance rated floor/ceiling assembly per ASTM E119.",
    input: { value: 120, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:grout-set-time": createSample({
    id: "time:grout-set-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Grout Initial Set",
    description: "Non-shrink grout initial set time — 30 minutes per ASTM C1107.",
    input: { value: 30, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:mortar-set-time": createSample({
    id: "time:mortar-set-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Mortar Set Time",
    description: "Type S mortar initial set — 2.5 hours per ASTM C270.",
    input: { value: 150, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:asphalt-cooldown": createSample({
    id: "time:asphalt-cooldown",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Asphalt Cooldown Time",
    description: "HMA cooldown to rolling temp (175 °F) — 20 minutes per AASHTO.",
    input: { value: 20, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),

  // ── h ────────────────────────────────────────────────────────────────
  "time:concrete-curing": createSample({
    id: "time:concrete-curing",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Curing Window",
    description: "Concrete curing or waiting window used in planning and execution sequences.",
    input: { value: 72, unit: UNIT_TOKENS.HOUR },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:maintenance-window": createSample({
    id: "time:maintenance-window",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Maintenance Window",
    description: "Shutdown or maintenance duration used in industrial planning and site coordination.",
    input: { value: 8, unit: UNIT_TOKENS.HOUR },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:paint-dry-time": createSample({
    id: "time:paint-dry-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Paint Dry-to-Touch",
    description: "Alkyd enamel dry-to-touch time at 77 °F — 6 hours per manufacturer.",
    input: { value: 6, unit: UNIT_TOKENS.HOUR },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:epoxy-cure": createSample({
    id: "time:epoxy-cure",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Epoxy Cure Time",
    description: "Two-part structural epoxy full cure at 75 °F — 24 h per manufacturer data sheet.",
    input: { value: 24, unit: UNIT_TOKENS.HOUR },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),

  // ── s ────────────────────────────────────────────────────────────────
  "time:seismic-period": createSample({
    id: "time:seismic-period",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Building Natural Period",
    description: "Fundamental period of vibration for a 5-story steel frame — 0.65 s per ASCE 7.",
    input: { value: 0.65, unit: UNIT_TOKENS.SECOND },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:valve-close-time": createSample({
    id: "time:valve-close-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Emergency Valve Close Time",
    description: "Process safety valve stroke time — 15 s maximum per IEC 61511 SIL 2 loop.",
    input: { value: 15, unit: UNIT_TOKENS.SECOND },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),

  // ── integer value type ───────────────────────────────────────────────
  "time:fire-watch-integer": createSample({
    id: "time:fire-watch-integer",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.INTEGER,
    name: "Hot-Work Fire Watch (Integer min)",
    description: "Post-hot-work fire watch duration — 60 min as integer per NFPA 51B.",
    input: { value: 60, unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "time:formula-plain": createSample({
    id: "time:formula-plain",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duration Sum (Formula)",
    description: "Plain numeric formula without embedded units — 120 + 72 + 45.",
    input: { value: "=120 + 72 + 45", unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:formula-embedded-units": createSample({
    id: "time:formula-embedded-units",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Shutdown (Formula)",
    description: "Duration sum with embedded units — 3 days + 8 h.",
    input: { value: "=3 days + 8 h", unit: UNIT_TOKENS.HOUR },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:inline-unit": createSample({
    id: "time:inline-unit",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Dwell (Inline)",
    description: "Numeric value with inline unit suffix — 45min.",
    input: { value: "45min", unit: UNIT_TOKENS.MINUTE },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  })
});
