/**
 * @fileoverview Parameter samples for the ANGLE quantity.
 * Covers all supported units: deg, rad.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const ANGLE_SAMPLES = Object.freeze({

  // ── deg ──────────────────────────────────────────────────────────────
  "angle:roof-pitch": createSample({
    id: "angle:roof-pitch",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Roof Pitch",
    description: "Roof pitch angle for detailing and annotation previews.",
    input: { value: 30, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),
  "angle:pipe-slope": createSample({
    id: "angle:pipe-slope",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Slope Angle",
    description: "Process and drainage slope angle for routing and fabrication drawings.",
    input: { value: 1.5, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:stair-turn": createSample({
    id: "angle:stair-turn",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stair Turn",
    description: "Architectural turning angle for stairs, ramps, or handrail transitions.",
    input: { value: 45, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:slope-symbol"]
  }),
  "angle:truss-pitch-4-12": createSample({
    id: "angle:truss-pitch-4-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 4:12",
    description: "Roof truss slope 4 in 12 = 18.43° — common residential slope.",
    input: { value: 18.43, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:truss-pitch-6-12": createSample({
    id: "angle:truss-pitch-6-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 6:12",
    description: "Roof truss slope 6 in 12 = 26.57° — steep slope for snow shedding.",
    input: { value: 26.57, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:truss-pitch-12-12": createSample({
    id: "angle:truss-pitch-12-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 12:12",
    description: "Roof truss slope 12 in 12 = 45° — steep pitch for cathedral ceilings.",
    input: { value: 45, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-symbol"]
  }),
  "angle:stair-stringer": createSample({
    id: "angle:stair-stringer",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stair Stringer Cut Angle",
    description: "Typical stair stringer rise/run for 7″ rise x 11″ run = ~32.5° per IBC.",
    input: { value: 32.5, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:conical-tank-bottom": createSample({
    id: "angle:conical-tank-bottom",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Conical Tank Bottom Slope",
    description: "ASME conical bottom slope — 60° included angle for hopper bottoms.",
    input: { value: 60, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:annotation-degree"]
  }),
  "angle:structural-brace": createSample({
    id: "angle:structural-brace",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Structural Brace Angle",
    description: "Diagonal brace angle for X-bracing in steel frames — typically 45° or 30-60°.",
    input: { value: 45, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:slope-symbol"]
  }),
  "angle:auger-flight": createSample({
    id: "angle:auger-flight",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Auger Flight Angle",
    description: "Screw conveyor/auger flight pitch angle — typically ~25° for granular materials.",
    input: { value: 25, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:process-radian"]
  }),

  // ── rad ──────────────────────────────────────────────────────────────
  "angle:nozzle-rotation": createSample({
    id: "angle:nozzle-rotation",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Nozzle Rotation",
    description: "Equipment nozzle orientation often exchanged in radians inside industrial tools.",
    input: { value: 1.0471975512, unit: UNIT_TOKENS.RADIAN },
    recommendedOutputPresetIds: ["angle:process-radian", "angle:annotation-symbol"]
  }),
  "angle:pipe-elbow-radian": createSample({
    id: "angle:pipe-elbow-radian",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "90° Elbow in Radians",
    description: "Standard long-radius 90° pipe elbow — π/2 rad (1.5708 rad) per ASME B16.9.",
    input: { value: 1.5707963268, unit: UNIT_TOKENS.RADIAN },
    recommendedOutputPresetIds: ["angle:process-radian", "angle:annotation-degree"]
  }),

  // ── integer value type ───────────────────────────────────────────────
  "angle:right-angle-integer": createSample({
    id: "angle:right-angle-integer",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.INTEGER,
    name: "Right Angle (Integer)",
    description: "Orthogonal framing angle — 90° stored as an integer for grid-locked geometry.",
    input: { value: 90, unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "angle:formula-embedded-units": createSample({
    id: "angle:formula-embedded-units",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bend Sum (Formula)",
    description: "Angle sum with embedded units — 30 deg + 15 deg.",
    input: { value: "=30 deg + 15 deg", unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),
  "angle:formula-plain": createSample({
    id: "angle:formula-plain",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Turn Diff (Formula)",
    description: "Plain numeric formula without embedded units — 90 - 5.",
    input: { value: "=90 - 5", unit: UNIT_TOKENS.DEGREE },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:slope-symbol"]
  }),
  "angle:inline-unit": createSample({
    id: "angle:inline-unit",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Nozzle Rotation (Inline)",
    description: "Numeric value with inline unit suffix — 1.0472rad.",
    input: { value: "1.0472rad", unit: UNIT_TOKENS.RADIAN },
    recommendedOutputPresetIds: ["angle:process-radian", "angle:annotation-symbol"]
  })
});
