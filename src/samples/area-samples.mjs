/**
 * @fileoverview Parameter samples for the AREA quantity.
 * Covers all supported units: cm^2, m^2, in^2.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const AREA_SAMPLES = Object.freeze({

  // -- m^2 --
  "area:slab-zone": createSample({
    id: "area:slab-zone",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Slab Zone Area",
    description: "Area takeoff for a concrete slab or finish zone.",
    input: { value: 42.35, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "area:room-finishing": createSample({
    id: "area:room-finishing",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Room Finishing Area",
    description: "Architectural finishing area for flooring, ceiling, or paint packages.",
    input: { value: 18.75, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:cladding-panel": createSample({
    id: "area:cladding-panel",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Cladding Panel Face",
    description: "Facade or equipment enclosure panel area used in procurement and detailing.",
    input: { value: 12.8, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:roof-sheathing": createSample({
    id: "area:roof-sheathing",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Roof Sheathing Area",
    description: "Plywood or OSB roof sheathing area for residential framing takeoff.",
    input: { value: 1280, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:concrete-formwork": createSample({
    id: "area:concrete-formwork",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Concrete Formwork Area",
    description: "Vertical formwork contact area for 100 ft of 8 ft high wall -- 800 sq ft.",
    input: { value: 74.32, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:land-acre": createSample({
    id: "area:land-acre",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Land Parcel (acres converted to sq m)",
    description: "Standard building lot -- 0.25 acre ~= 1012 sq m.",
    input: { value: 1012, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),

  // -- cm^2 --
  "area:gasket-surface": createSample({
    id: "area:gasket-surface",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Gasket Surface",
    description: "Compact industrial sealing surface often checked in square centimeters or square inches.",
    input: { value: 2400, unit: UNIT_TOKENS.SQUARE_CENTIMETER },
    recommendedOutputPresetIds: ["area:detail-square-centimeter", "area:fabrication-square-inch"]
  }),
  "area:awg-500-kcmil": createSample({
    id: "area:awg-500-kcmil",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "500 kcmil Conductor Area",
    description: "Large electrical conductor 500,000 circular mils = 253 mm2 per NEC.",
    input: { value: 253, unit: UNIT_TOKENS.SQUARE_CENTIMETER },
    recommendedOutputPresetIds: ["area:detail-square-centimeter"]
  }),
  "area:nozzle-bore-cm2": createSample({
    id: "area:nozzle-bore-cm2",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Nozzle Bore Area (cm2)",
    description: "Flow area of a 4-in NPS nozzle bore -- approximately 81 cm2 per ASME B16.5.",
    input: { value: 81.07, unit: UNIT_TOKENS.SQUARE_CENTIMETER },
    recommendedOutputPresetIds: ["area:detail-square-centimeter", "area:fabrication-square-inch"]
  }),

  // -- in^2 --
  "area:paint-coverage-us": createSample({
    id: "area:paint-coverage-us",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Paint Coverage (sq ft)",
    description: "Typical paint coverage per gallon -- 350 sq ft at 1 coat per manufacturer specs.",
    input: { value: 350, unit: UNIT_TOKENS.SQUARE_INCH },
    recommendedOutputPresetIds: ["area:fabrication-square-inch", "area:schedule-square-meter"]
  }),
  "area:floor-tile-12x12": createSample({
    id: "area:floor-tile-12x12",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "12x12 Tile Area (sq in)",
    description: "Single 12 in x 12 in floor tile area -- 144 sq in per piece.",
    input: { value: 144, unit: UNIT_TOKENS.SQUARE_INCH },
    recommendedOutputPresetIds: ["area:fabrication-square-inch"]
  }),

  // -- integer value type --
  "area:bay-grid-integer": createSample({
    id: "area:bay-grid-integer",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Structural Bay Area (Integer m2)",
    description: "6 m × 8 m structural bay -- 48 m2 stored as integer for grid-aligned BIM.",
    input: { value: 48, unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),

  // -- formula input forms --
  "area:formula-embedded-units": createSample({
    id: "area:formula-embedded-units",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Slab Dimensions (Formula)",
    description: "Area from length x width with embedded units -- 8 m * 5 m.",
    input: { value: "=8 m * 5 m", unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "area:formula-plain": createSample({
    id: "area:formula-plain",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Zone Sum (Formula)",
    description: "Plain numeric formula without embedded units -- 2.5 * 1.8.",
    input: { value: "=2.5 * 1.8", unit: UNIT_TOKENS.SQUARE_METER },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:inline-unit": createSample({
    id: "area:inline-unit",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.NUMBER,
    name: "Gasket Area (Inline)",
    description: "Numeric value with inline unit suffix -- 2400cm^2.",
    input: { value: "2400cm^2", unit: UNIT_TOKENS.SQUARE_CENTIMETER },
    recommendedOutputPresetIds: ["area:detail-square-centimeter", "area:fabrication-square-inch"]
  })
});
