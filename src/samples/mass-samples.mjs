/**
 * @fileoverview Parameter samples for the MASS quantity.
 * Supported unit: kg only (MassQuantityProfile supports kg exclusively).
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const MASS_SAMPLES = Object.freeze({

  // ── kg (only supported unit) ─────────────────────────────────────────
  "mass:equipment-panel": createSample({
    id: "mass:equipment-panel",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Equipment Panel Mass",
    description: "Assembly mass for coordination, transportation, and lifting checks.",
    input: { value: 12.5, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:valve-assembly": createSample({
    id: "mass:valve-assembly",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Valve Assembly Mass",
    description: "Industrial valve mass used in supports, handling, and procurement schedules.",
    input: { value: 48.3, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:cable-reel": createSample({
    id: "mass:cable-reel",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cable Reel Mass",
    description: "Installation logistics mass for electrical packages and site planning.",
    input: { value: 520, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  }),
  "mass:pump-skid": createSample({
    id: "mass:pump-skid",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pump Skid Mass",
    description: "Skid package mass for rigging, transport, and structural support checks.",
    input: { value: 1840, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  }),
  "mass:steel-beam-w8x10": createSample({
    id: "mass:steel-beam-w8x10",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "W8x10 Beam Mass per Foot",
    description: "AISC W8x10 weight — 10 lb/ft (14.9 kg/m) for structural steel takeoff.",
    input: { value: 14.9, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:steel-beam-w12x26": createSample({
    id: "mass:steel-beam-w12x26",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "W12x26 Beam Mass per Foot",
    description: "AISC W12x26 weight — 26 lb/ft (38.7 kg/m) for structural steel takeoff.",
    input: { value: 38.7, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:rebar-weight-4": createSample({
    id: "mass:rebar-weight-4",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "#4 Rebar Weight per Meter",
    description: "US #4 rebar (1/2″) — 0.668 lb/ft = 0.994 kg/m per ASTM A615.",
    input: { value: 0.994, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:rebar-weight-8": createSample({
    id: "mass:rebar-weight-8",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "#8 Rebar Weight per Meter",
    description: "US #8 rebar (1″) — 2.670 lb/ft = 3.973 kg/m.",
    input: { value: 3.973, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:pipe-weight-2inch-sch40": createSample({
    id: "mass:pipe-weight-2inch-sch40",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "2″ Sch 40 Pipe Weight per ft",
    description: "NPS 2″ Schedule 40 — 3.653 lb/ft (5.44 kg/m) per ASME B36.10.",
    input: { value: 5.44, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:wire-rope-3-4": createSample({
    id: "mass:wire-rope-3-4",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "3/4″ Wire Rope Weight per ft",
    description: "6x19 IWRC wire rope — 3/4″ dia = 1.53 lb/ft (2.28 kg/m) per API 9A.",
    input: { value: 2.28, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:concrete-density": createSample({
    id: "mass:concrete-density",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Density (kg per m³)",
    description: "Normal weight concrete — 2400 kg/m³ per ACI 318.",
    input: { value: 2400, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:shipping-kilogram"]
  }),

  // ── integer value type ───────────────────────────────────────────────
  "mass:manhole-cover-integer": createSample({
    id: "mass:manhole-cover-integer",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.INTEGER,
    name: "Manhole Cover Mass (Integer kg)",
    description: "Standard ductile iron manhole cover — 50 kg per EN 124 Class D400.",
    input: { value: 50, unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "mass:formula-plain": createSample({
    id: "mass:formula-plain",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Assembly Sum (Formula)",
    description: "Plain numeric formula without embedded units — 12.5 + 48.3 + 520.",
    input: { value: "=12.5 + 48.3 + 520", unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:formula-embedded-units": createSample({
    id: "mass:formula-embedded-units",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Skid Total (Formula with units)",
    description: "Mass sum with embedded units — 1840 kg + 48.3 kg.",
    input: { value: "=1840 kg + 48.3 kg", unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:rigging-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:inline-unit": createSample({
    id: "mass:inline-unit",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Reel Mass (Inline)",
    description: "Numeric value with inline unit suffix — 520kg.",
    input: { value: "520kg", unit: UNIT_TOKENS.KILOGRAM },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  })
});
