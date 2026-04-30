/**
 * @fileoverview Parameter samples for the FORCE quantity.
 * Covers all supported units: N, kN.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const FORCE_SAMPLES = Object.freeze({

  // -- kN --
  "force:anchor-load": createSample({
    id: "force:anchor-load",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Anchor Load",
    description: "Factored anchor load for structural detailing and reports.",
    input: { value: 18, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton"]
  }),
  "force:baseplate-reaction": createSample({
    id: "force:baseplate-reaction",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Baseplate Reaction",
    description: "Structural reaction used in baseplate, grout, and anchor sizing checks.",
    input: { value: 125, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:lifting-point": createSample({
    id: "force:lifting-point",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Lifting Point Check",
    description: "Rigging verification load for lifting lugs and temporary erection conditions.",
    input: { value: 42.5, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:loadcase-kilonewton", "force:structural-kilonewton"]
  }),
  "force:bolt-tension-3-4-a325": createSample({
    id: "force:bolt-tension-3-4-a325",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "A325 3/4in Bolt Tension",
    description: "ASTM A325 3/4in bolt minimum pretension -- 28 kips (124.5 kN) per RCSC / AISC.",
    input: { value: 124.5, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:bolt-tension-7-8-a325": createSample({
    id: "force:bolt-tension-7-8-a325",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "A325 7/8in Bolt Tension",
    description: "ASTM A325 7/8in bolt minimum pretension -- 39 kips (173.5 kN) per RCSC.",
    input: { value: 173.5, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:cable-tension": createSample({
    id: "force:cable-tension",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Cable Tension (Bridle)",
    description: "Bridle cable tension for suspended loads -- 10 kips (44.5 kN) typical lift.",
    input: { value: 44.5, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:wind-load-column": createSample({
    id: "force:wind-load-column",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Wind Load on Column",
    description: "Wind load reaction at base for 30 ft building column -- 15 kN per ASCE 7.",
    input: { value: 15, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:seismic-base-shear": createSample({
    id: "force:seismic-base-shear",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Seismic Base Shear",
    description: "Seismic base shear for 3-story steel frame per ASCE 7 -- 250 kN.",
    input: { value: 250, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:loadcase-kilonewton", "force:structural-kilonewton"]
  }),
  "force:crane-capacity-50t": createSample({
    id: "force:crane-capacity-50t",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Crane Capacity 50 ton",
    description: "Mobile crane lifting capacity -- 50 ton (445 kN) at minimum radius.",
    input: { value: 445, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),

  // -- N --
  "force:actuator-thrust": createSample({
    id: "force:actuator-thrust",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Actuator Thrust",
    description: "Equipment actuator thrust typically checked in Newtons for industrial packages.",
    input: { value: 3500, unit: UNIT_TOKENS.NEWTON },
    recommendedOutputPresetIds: ["force:equipment-newton", "force:structural-kilonewton"]
  }),
  "force:spring-load": createSample({
    id: "force:spring-load",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Spring Load (N)",
    description: "Safety valve spring pre-load -- 850 N for a 1-in ASME spring-loaded relief valve.",
    input: { value: 850, unit: UNIT_TOKENS.NEWTON },
    recommendedOutputPresetIds: ["force:equipment-newton", "force:structural-kilonewton"]
  }),

  // -- integer value type --
  "force:equipment-weight-integer": createSample({
    id: "force:equipment-weight-integer",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Equipment Dead Weight (Integer kN)",
    description: "Dead weight of a compressor package -- 200 kN as integer for load table.",
    input: { value: 200, unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),

  // -- formula input forms --
  "force:formula-embedded-units": createSample({
    id: "force:formula-embedded-units",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Reaction Sum (Formula with units)",
    description: "Force sum with embedded units -- 125 kN + 42.5 kN.",
    input: { value: "=125 kN + 42.5 kN", unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:formula-plain": createSample({
    id: "force:formula-plain",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Load Sum (Formula)",
    description: "Plain numeric formula without embedded units -- 125 + 18 + 42.5.",
    input: { value: "=125 + 18 + 42.5", unit: UNIT_TOKENS.KILONEWTON },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:inline-unit": createSample({
    id: "force:inline-unit",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Thrust (Inline)",
    description: "Numeric value with inline unit suffix -- 3500N.",
    input: { value: "3500N", unit: UNIT_TOKENS.NEWTON },
    recommendedOutputPresetIds: ["force:equipment-newton", "force:structural-kilonewton"]
  })
});
