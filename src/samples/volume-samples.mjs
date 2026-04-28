/**
 * @fileoverview Parameter samples for the VOLUME quantity.
 * Covers all supported units: cm^3, m^3, in^3, L.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const VOLUME_SAMPLES = Object.freeze({

  // ── m^3 ──────────────────────────────────────────────────────────────
  "volume:concrete-pour": createSample({
    id: "volume:concrete-pour",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Pour",
    description: "Concrete pour quantity for structural elements or foundations.",
    input: { value: 2.4, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter"]
  }),
  "volume:process-tank": createSample({
    id: "volume:process-tank",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Process Tank Volume",
    description: "Industrial tank or sump capacity for process and utility packages.",
    input: { value: 18.75, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:duct-plenum": createSample({
    id: "volume:duct-plenum",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Plenum Volume",
    description: "Mechanical plenum volume for airflow balancing and commissioning checks.",
    input: { value: 0.38, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:concrete-yard-us": createSample({
    id: "volume:concrete-yard-us",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Yard (cu yd)",
    description: "US concrete truck load — 10 cubic yards for a standard ready-mix delivery.",
    input: { value: 7.65, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter", "volume:process-cubic-meter"]
  }),
  "volume:pipe-volume-per-foot": createSample({
    id: "volume:pipe-volume-per-foot",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Volume per Foot",
    description: "Internal volume per foot of 2″ Sch 40 pipe — 0.0603 cu ft/ft (1.71 L/m).",
    input: { value: 0.0603, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:tank-liter"]
  }),
  "volume:swimming-pool": createSample({
    id: "volume:swimming-pool",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Swimming Pool Volume",
    description: "Residential in-ground pool — 20,000 US gallons (~75.7 m³).",
    input: { value: 75.7, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:truck-load": createSample({
    id: "volume:truck-load",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Dump Truck Load",
    description: "Standard dump truck heaped capacity — ~12 m³ aggregates.",
    input: { value: 12, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter", "volume:process-cubic-meter"]
  }),

  // ── cm^3 ─────────────────────────────────────────────────────────────
  "volume:resin-cartridge": createSample({
    id: "volume:resin-cartridge",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Resin Cartridge",
    description: "Small industrial volume typically reviewed in cubic centimeters.",
    input: { value: 950, unit: UNIT_TOKENS.CUBIC_CENTIMETER },
    recommendedOutputPresetIds: ["volume:detail-cubic-centimeter", "volume:fabrication-cubic-inch"]
  }),
  "volume:hydraulic-accumulator": createSample({
    id: "volume:hydraulic-accumulator",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Hydraulic Accumulator (cm³)",
    description: "Small bladder accumulator pre-charge volume — 500 cm³ for low-pressure circuits.",
    input: { value: 500, unit: UNIT_TOKENS.CUBIC_CENTIMETER },
    recommendedOutputPresetIds: ["volume:detail-cubic-centimeter", "volume:fabrication-cubic-inch"]
  }),

  // ── L ────────────────────────────────────────────────────────────────
  "volume:storage-tank-liter": createSample({
    id: "volume:storage-tank-liter",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Storage Tank (L)",
    description: "Vertical storage tank capacity entered in liters for process and utility applications.",
    input: { value: 50000, unit: UNIT_TOKENS.LITER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:tank-gallons-us": createSample({
    id: "volume:tank-gallons-us",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fuel Tank (gal to L)",
    description: "Standard 275-gallon residential fuel oil tank.",
    input: { value: 275, unit: UNIT_TOKENS.LITER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:fire-suppression-tank": createSample({
    id: "volume:fire-suppression-tank",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Suppression Tank (L)",
    description: "Wet-pipe fire sprinkler system tank — 3785 L (1000 US gal) per NFPA 13.",
    input: { value: 3785, unit: UNIT_TOKENS.LITER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),

  // ── in^3 ─────────────────────────────────────────────────────────────
  "volume:instrument-cavity": createSample({
    id: "volume:instrument-cavity",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Instrument Cavity (in³)",
    description: "Conduit body LB cavity — 3.8 in³ minimum per NEC 314.16 for wire fill.",
    input: { value: 3.8, unit: UNIT_TOKENS.CUBIC_INCH },
    recommendedOutputPresetIds: ["volume:fabrication-cubic-inch", "volume:detail-cubic-centimeter"]
  }),
  "volume:hydraulic-piston-displacement": createSample({
    id: "volume:hydraulic-piston-displacement",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Hydraulic Piston Displacement (in³)",
    description: "2-in bore x 6-in stroke cylinder displacement — 18.85 in³ per actuator data sheet.",
    input: { value: 18.85, unit: UNIT_TOKENS.CUBIC_INCH },
    recommendedOutputPresetIds: ["volume:fabrication-cubic-inch", "volume:detail-cubic-centimeter"]
  }),

  // ── integer value type ───────────────────────────────────────────────
  "volume:concrete-pour-integer": createSample({
    id: "volume:concrete-pour-integer",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.INTEGER,
    name: "Concrete Pour (Integer m³)",
    description: "Whole-number concrete volume for a mat slab pour — 50 m³.",
    input: { value: 50, unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "volume:formula-embedded-units": createSample({
    id: "volume:formula-embedded-units",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Section (Formula)",
    description: "Volume from L x W x H with embedded units — 4 m * 0.8 m * 0.3 m.",
    input: { value: "=4 m * 0.8 m * 0.3 m", unit: UNIT_TOKENS.CUBIC_METER },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:formula-plain": createSample({
    id: "volume:formula-plain",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Tank Sum (Formula)",
    description: "Plain numeric formula without embedded units — 15000 + 35000.",
    input: { value: "=15000 + 35000", unit: UNIT_TOKENS.LITER },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:inline-unit": createSample({
    id: "volume:inline-unit",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cartridge Volume (Inline)",
    description: "Numeric value with inline unit suffix — 950cm^3.",
    input: { value: "950cm^3", unit: UNIT_TOKENS.CUBIC_CENTIMETER },
    recommendedOutputPresetIds: ["volume:detail-cubic-centimeter", "volume:fabrication-cubic-inch"]
  })
});
