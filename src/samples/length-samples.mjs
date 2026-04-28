/**
 * @fileoverview Parameter samples for the LENGTH quantity.
 * Covers all supported units: mm, cm, m, in.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const LENGTH_SAMPLES = Object.freeze({

  // ── mm ──────────────────────────────────────────────────────────────
  "length:wall-thickness": createSample({
    id: "length:wall-thickness",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Wall Thickness",
    description: "Typical architectural wall thickness used in modeled partitions.",
    input: { value: 120, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:pipe-spool": createSample({
    id: "length:pipe-spool",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Spool Length",
    description: "Common industrial spool length for shop fabrication and installation checks.",
    input: { value: 3657, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:process-meter", "length:detail-inch"]
  }),
  "length:cable-tray-offset": createSample({
    id: "length:cable-tray-offset",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cable Tray Offset",
    description: "Industrial MEP offset used for tray and conduit coordination.",
    input: { value: 450, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:pipe-od": createSample({
    id: "length:pipe-od",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe OD",
    description: "Nominal pipe outside diameter for piping isometric spools and fabrication.",
    input: { value: 168.3, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:diameter-mm", "length:detail-inch"]
  }),
  "length:rebar-diameter": createSample({
    id: "length:rebar-diameter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Rebar Diameter",
    description: "Steel reinforcement bar diameter for structural detailing and bar bending schedules.",
    input: { value: 25, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:diameter-mm"]
  }),
  "length:sheetmetal-16ga": createSample({
    id: "length:sheetmetal-16ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 16 Gauge",
    description: "Standard steel sheet thickness for 16 gauge — 0.0598 in per ASTM A 653 / U.S. Standard Gauge.",
    input: { value: 1.52, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),

  // ── cm ──────────────────────────────────────────────────────────────
  "length:column-spacing-cm": createSample({
    id: "length:column-spacing-cm",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Column Spacing (cm)",
    description: "Typical structural grid spacing in centimeters — 600 cm (6 m) bay.",
    input: { value: 600, unit: UNIT_TOKENS.CENTIMETER },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:model-mm"]
  }),
  "length:door-height-cm": createSample({
    id: "length:door-height-cm",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Door Height (cm)",
    description: "Standard interior door clear height — 210 cm per building codes.",
    input: { value: 210, unit: UNIT_TOKENS.CENTIMETER },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:model-mm"]
  }),

  // ── m ───────────────────────────────────────────────────────────────
  "length:beam-span": createSample({
    id: "length:beam-span",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Beam Span",
    description: "Primary beam span for structural coordination and shop drawings.",
    input: { value: 7.2, unit: UNIT_TOKENS.METER },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:detail-inch"]
  }),
  "length:vessel-nozzle": createSample({
    id: "length:vessel-nozzle",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Vessel Nozzle OD",
    description: "Pressure vessel nozzle outside diameter for vessel GA and nozzle schedule.",
    input: { value: 0.508, unit: UNIT_TOKENS.METER },
    recommendedOutputPresetIds: ["length:diameter-meter", "length:diameter-mm"]
  }),
  "length:floor-to-floor": createSample({
    id: "length:floor-to-floor",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Floor-to-Floor Height",
    description: "Typical commercial floor-to-floor height — 4.2 m for structural floor plates.",
    input: { value: 4.2, unit: UNIT_TOKENS.METER },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:model-mm"]
  }),

  // ── in ──────────────────────────────────────────────────────────────
  "length:hole-diameter": createSample({
    id: "length:hole-diameter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Hole Diameter",
    description: "Penetration or opening diameter for MEP coordination and structural embeds.",
    input: { value: 2.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:lumber-2x4": createSample({
    id: "length:lumber-2x4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x4 Lumber Actual Width",
    description: "Actual dressed width of nominal 2x4 lumber — 1.5 in x 3.5 in per NIST HB 130.",
    input: { value: 1.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-inch"]
  }),
  "length:lumber-2x6": createSample({
    id: "length:lumber-2x6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x6 Lumber Width",
    description: "Actual dressed width of nominal 2x6 — 1.5 in x 5.5 in.",
    input: { value: 5.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-4x4": createSample({
    id: "length:lumber-4x4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "4x4 Post Actual",
    description: "Actual dressed dimension of nominal 4x4 post — 3.5 in x 3.5 in.",
    input: { value: 3.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-2x10": createSample({
    id: "length:lumber-2x10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x10 Joist Depth",
    description: "Actual dressed depth of nominal 2x10 joist — 1.5 in x 9.25 in.",
    input: { value: 9.25, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-2x12": createSample({
    id: "length:lumber-2x12",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x12 Joist Depth",
    description: "Actual dressed depth of nominal 2x12 — 1.5 in x 11.25 in.",
    input: { value: 11.25, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-studs-16oc": createSample({
    id: "length:lumber-studs-16oc",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stud Spacing 16″ OC",
    description: "Standard stud spacing on-center for residential and light commercial walls.",
    input: { value: 16, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:pipe-nps-half": createSample({
    id: "length:pipe-nps-half",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 1/2″ Pipe OD",
    description: "Nominal Pipe Size 1/2″ — actual OD 0.840 in per ASME B36.10.",
    input: { value: 0.84, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-threequarter": createSample({
    id: "length:pipe-nps-threequarter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 3/4″ Pipe OD",
    description: "Nominal Pipe Size 3/4″ — actual OD 1.050 in per ASME B36.10.",
    input: { value: 1.05, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-1": createSample({
    id: "length:pipe-nps-1",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 1″ Pipe OD",
    description: "Nominal Pipe Size 1″ — actual OD 1.315 in per ASME B36.10.",
    input: { value: 1.315, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-2": createSample({
    id: "length:pipe-nps-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Pipe OD",
    description: "Nominal Pipe Size 2″ — actual OD 2.375 in per ASME B36.10.",
    input: { value: 2.375, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-3": createSample({
    id: "length:pipe-nps-3",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 3″ Pipe OD",
    description: "Nominal Pipe Size 3″ — actual OD 3.5 in per ASME B36.10.",
    input: { value: 3.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-6": createSample({
    id: "length:pipe-nps-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 6″ Pipe OD",
    description: "Nominal Pipe Size 6″ — actual OD 6.625 in per ASME B36.10.",
    input: { value: 6.625, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-8": createSample({
    id: "length:pipe-nps-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 8″ Pipe OD",
    description: "Nominal Pipe Size 8″ — actual OD 8.625 in per ASME B36.10.",
    input: { value: 8.625, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-10": createSample({
    id: "length:pipe-nps-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 10″ Pipe OD",
    description: "Nominal Pipe Size 10″ — actual OD 10.75 in per ASME B36.10.",
    input: { value: 10.75, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-sch40-wall": createSample({
    id: "length:pipe-sch40-wall",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Sch 40 Wall Thickness",
    description: "ASME B36.10 Schedule 40 wall thickness for 2″ pipe — 0.154 in.",
    input: { value: 0.154, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:pipe-sch80-wall": createSample({
    id: "length:pipe-sch80-wall",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Sch 80 Wall Thickness",
    description: "ASME B36.10 Schedule 80 wall thickness for 2″ pipe — 0.218 in.",
    input: { value: 0.218, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-14ga": createSample({
    id: "length:sheetmetal-14ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 14 Gauge",
    description: "Standard steel sheet thickness for 14 gauge — 0.0747 in.",
    input: { value: 0.0747, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-12ga": createSample({
    id: "length:sheetmetal-12ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 12 Gauge",
    description: "Standard steel sheet thickness for 12 gauge — 0.1046 in.",
    input: { value: 0.1046, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-10ga": createSample({
    id: "length:sheetmetal-10ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 10 Gauge",
    description: "Standard steel sheet thickness for 10 gauge — 0.1345 in.",
    input: { value: 0.1345, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-7ga": createSample({
    id: "length:sheetmetal-7ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 7 Gauge",
    description: "Standard steel sheet thickness for 7 gauge — 0.1793 in.",
    input: { value: 0.1793, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-3-8inch": createSample({
    id: "length:sheetmetal-3-8inch",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Plate 3/8″ Thickness",
    description: "Common steel plate thickness — 0.375 in for baseplates, brackets, and gussets.",
    input: { value: 0.375, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-1-2inch": createSample({
    id: "length:sheetmetal-1-2inch",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Plate 1/2″ Thickness",
    description: "Common steel plate thickness — 0.5 in for bearing plates and stiffeners.",
    input: { value: 0.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1-4": createSample({
    id: "length:bolt-diameter-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1/4″ Diameter",
    description: "Nominal bolt diameter 1/4″ — SAE grade 5 / ASTM A325 common fastener.",
    input: { value: 0.25, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-3-8": createSample({
    id: "length:bolt-diameter-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 3/8″ Diameter",
    description: "Nominal bolt diameter 3/8″ — structural and machinery fastener.",
    input: { value: 0.375, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1-2": createSample({
    id: "length:bolt-diameter-1-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1/2″ Diameter",
    description: "Nominal bolt diameter 1/2″ — common structural bolt size.",
    input: { value: 0.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-5-8": createSample({
    id: "length:bolt-diameter-5-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 5/8″ Diameter",
    description: "Nominal bolt diameter 5/8″ — heavy structural connection bolt.",
    input: { value: 0.625, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-3-4": createSample({
    id: "length:bolt-diameter-3-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 3/4″ Diameter",
    description: "Nominal bolt diameter 3/4″ — large structural bolt per ASTM A325 / A490.",
    input: { value: 0.75, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1": createSample({
    id: "length:bolt-diameter-1",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1″ Diameter",
    description: "Nominal bolt diameter 1″ — heavy bracing and column splice bolts.",
    input: { value: 1, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:weld-leg-1-4": createSample({
    id: "length:weld-leg-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 1/4″",
    description: "Common fillet weld leg size for light structural connections per AWS D1.1.",
    input: { value: 0.25, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:weld-leg-3-8": createSample({
    id: "length:weld-leg-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 3/8″",
    description: "Medium fillet weld leg size for beam-to-column connections per AWS D1.1.",
    input: { value: 0.375, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:weld-leg-1-2": createSample({
    id: "length:weld-leg-1-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 1/2″",
    description: "Heavy fillet weld leg size for large moment connections and splices.",
    input: { value: 0.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:rebar-us-4": createSample({
    id: "length:rebar-us-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #4 Rebar Diameter",
    description: "US #4 reinforcing bar — 1/2″ diameter per ASTM A615.",
    input: { value: 0.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-5": createSample({
    id: "length:rebar-us-5",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #5 Rebar Diameter",
    description: "US #5 reinforcing bar — 5/8″ diameter per ASTM A615.",
    input: { value: 0.625, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-6": createSample({
    id: "length:rebar-us-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #6 Rebar Diameter",
    description: "US #6 reinforcing bar — 3/4″ diameter per ASTM A615.",
    input: { value: 0.75, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-8": createSample({
    id: "length:rebar-us-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #8 Rebar Diameter",
    description: "US #8 reinforcing bar — 1″ diameter per ASTM A615.",
    input: { value: 1, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-10": createSample({
    id: "length:rebar-us-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #10 Rebar Diameter",
    description: "US #10 reinforcing bar — 1-1/4″ diameter (1.27 in actual) for heavy sections.",
    input: { value: 1.27, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:concrete-cover-3-4": createSample({
    id: "length:concrete-cover-3-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Cover 3/4″",
    description: "Minimum concrete cover for cast-in-place slabs and walls per ACI 318.",
    input: { value: 0.75, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-cover-1-5": createSample({
    id: "length:concrete-cover-1-5",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Cover 1.5″",
    description: "Minimum cover for exterior beams and columns exposed to weather per ACI 318.",
    input: { value: 1.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-slab-4": createSample({
    id: "length:concrete-slab-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab on Grade 4″",
    description: "Typical residential slab-on-grade thickness — 4 in per IRC.",
    input: { value: 4, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-slab-6": createSample({
    id: "length:concrete-slab-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab on Grade 6″",
    description: "Commercial/industrial slab-on-grade thickness — 6 in for heavy loads.",
    input: { value: 6, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:footing-width-24": createSample({
    id: "length:footing-width-24",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Strip Footing Width 24″",
    description: "Typical continuous footing width for two-story bearing wall — 24 in.",
    input: { value: 24, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:structural-beam-w8x10-flange": createSample({
    id: "length:structural-beam-w8x10-flange",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "W8x10 Flange Thickness",
    description: "AISC W8x10 wide-flange flange thickness — 0.205 in.",
    input: { value: 0.205, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:structural-beam-w10x22-flange": createSample({
    id: "length:structural-beam-w10x22-flange",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "W10x22 Flange Thickness",
    description: "AISC W10x22 wide-flange flange thickness — 0.29 in.",
    input: { value: 0.29, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:railroad-gauge": createSample({
    id: "length:railroad-gauge",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Railroad Track Gauge",
    description: "Standard gauge 4 ft 8.5 in = 56.5 in between rails per AREMA.",
    input: { value: 56.5, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:naval-depth-fathom": createSample({
    id: "length:naval-depth-fathom",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "River Depth (Fathoms)",
    description: "Navigation channel depth in fathoms — 6 ft per fathom, common in hydrographic surveys.",
    input: { value: 18, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:annotation-meter"]
  }),
  "length:screen-mesh-100": createSample({
    id: "length:screen-mesh-100",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "100 Mesh Opening",
    description: "No. 100 sieve opening — 0.0059 in (149 µm) per ASTM E11.",
    input: { value: 0.0059, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:screen-mesh-200": createSample({
    id: "length:screen-mesh-200",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "200 Mesh Opening",
    description: "No. 200 sieve opening — 0.0029 in (74 µm) per ASTM E11.",
    input: { value: 0.0029, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:paper-mil-10": createSample({
    id: "length:paper-mil-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "10 mil Paper Thickness",
    description: "Common card stock thickness — 10 mil = 0.010 in.",
    input: { value: 0.01, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:foundation-pile-diameter-12": createSample({
    id: "length:foundation-pile-diameter-12",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pile Diameter 12″",
    description: "Cast-in-place concrete pile diameter 12 in per IBC / ACI 318 deep foundations.",
    input: { value: 12, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:foundation-pile-diameter-18": createSample({
    id: "length:foundation-pile-diameter-18",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pile Diameter 18″",
    description: "Cast-in-place concrete pile diameter 18 in for high-load foundations.",
    input: { value: 18, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:awg-12-wire": createSample({
    id: "length:awg-12-wire",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "AWG #12 Wire Diameter",
    description: "American Wire Gauge #12 conductor diameter — 0.0808 in per ASTM B258.",
    input: { value: 0.0808, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:awg-10-wire": createSample({
    id: "length:awg-10-wire",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "AWG #10 Wire Diameter",
    description: "American Wire Gauge #10 conductor diameter — 0.1019 in per ASTM B258.",
    input: { value: 0.1019, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:pipe-tubing-od-1-4": createSample({
    id: "length:pipe-tubing-od-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Instrument Tubing 1/4″ OD",
    description: "Stainless steel instrument tubing OD — 0.25 in for pneumatic and hydraulic lines.",
    input: { value: 0.25, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-tubing-od-3-8": createSample({
    id: "length:pipe-tubing-od-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Instrument Tubing 3/8″ OD",
    description: "Stainless steel instrument tubing OD — 0.375 in for process impulse lines.",
    input: { value: 0.375, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),

  // ── integer value type ───────────────────────────────────────────────
  "length:stud-count-integer": createSample({
    id: "length:stud-count-integer",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.INTEGER,
    name: "Stud Spacing 24″ OC (Integer)",
    description: "24 in on-center stud spacing stored as integer inches — common metal framing grid.",
    input: { value: 24, unit: UNIT_TOKENS.INCH },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:clear-height-integer-mm": createSample({
    id: "length:clear-height-integer-mm",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.INTEGER,
    name: "Clear Height 3000 mm (Integer)",
    description: "Minimum clear height for industrial warehouse — 3000 mm as an integer.",
    input: { value: 3000, unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),

  // ── formula input forms ──────────────────────────────────────────────
  "length:formula-embedded-units": createSample({
    id: "length:formula-embedded-units",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Run (Formula)",
    description: "Pipe segment sum with embedded units — 7200 mm + 150 mm.",
    input: { value: "=7200 mm + 150 mm", unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:formula-plain": createSample({
    id: "length:formula-plain",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Offset Diff (Formula)",
    description: "Plain numeric formula without embedded units — 2500 - 150.",
    input: { value: "=2500 - 150", unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:inline-unit": createSample({
    id: "length:inline-unit",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Spool Length (Inline)",
    description: "Numeric value with inline unit suffix — 4000mm.",
    input: { value: "4000mm", unit: UNIT_TOKENS.MILLIMETER },
    recommendedOutputPresetIds: ["length:model-mm", "length:detail-inch"]
  })
});
