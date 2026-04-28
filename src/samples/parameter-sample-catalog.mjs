import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";

const createSample = ({ id, input, recommendedOutputPresetIds, ...sample }) => Object.freeze({
  id,
  ...sample,
  input: Object.freeze({ ...input }),
  recommendedOutputPresetIds: Object.freeze([...recommendedOutputPresetIds])
});

const PARAMETER_SAMPLE_ENTRIES = Object.freeze({

  // ════════════════════════════════════════════
  // LENGTH — construção civil (US/imperial)
  // ════════════════════════════════════════════
  "length:wall-thickness": createSample({
    id: "length:wall-thickness",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Wall Thickness",
    description: "Typical architectural wall thickness used in modeled partitions.",
    input: {
      value: 120,
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:beam-span": createSample({
    id: "length:beam-span",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Beam Span",
    description: "Primary beam span for structural coordination and shop drawings.",
    input: {
      value: 7.2,
      unit: UNIT_TOKENS.METER
    },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:detail-inch"]
  }),
  "length:pipe-spool": createSample({
    id: "length:pipe-spool",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Spool Length",
    description: "Common industrial spool length for shop fabrication and installation checks.",
    input: {
      value: 3657,
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:process-meter", "length:detail-inch"]
  }),
  "length:cable-tray-offset": createSample({
    id: "length:cable-tray-offset",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cable Tray Offset",
    description: "Industrial MEP offset used for tray and conduit coordination.",
    input: {
      value: 450,
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:pipe-od": createSample({
    id: "length:pipe-od",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe OD",
    description: "Nominal pipe outside diameter for piping isometric spools and fabrication.",
    input: {
      value: 168.3,
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:diameter-mm", "length:detail-inch"]
  }),
  "length:vessel-nozzle": createSample({
    id: "length:vessel-nozzle",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Vessel Nozzle OD",
    description: "Pressure vessel nozzle outside diameter for vessel GA and nozzle schedule.",
    input: {
      value: 0.508,
      unit: UNIT_TOKENS.METER
    },
    recommendedOutputPresetIds: ["length:diameter-meter", "length:diameter-mm"]
  }),
  "length:rebar-diameter": createSample({
    id: "length:rebar-diameter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Rebar Diameter",
    description: "Steel reinforcement bar diameter for structural detailing and bar bending schedules.",
    input: {
      value: 25,
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:diameter-mm"]
  }),
  "length:hole-diameter": createSample({
    id: "length:hole-diameter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Hole Diameter",
    description: "Penetration or opening diameter for MEP coordination and structural embeds.",
    input: {
      value: 2.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:lumber-2x4": createSample({
    id: "length:lumber-2x4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x4 Lumber Actual Width",
    description: "Actual dressed width of nominal 2x4 lumber — 1.5 in x 3.5 in per NIST HB 130.",
    input: {
      value: 1.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-inch"]
  }),
  "length:lumber-2x6": createSample({
    id: "length:lumber-2x6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x6 Lumber Width",
    description: "Actual dressed width of nominal 2x6 — 1.5 in x 5.5 in.",
    input: {
      value: 5.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-4x4": createSample({
    id: "length:lumber-4x4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "4x4 Post Actual",
    description: "Actual dressed dimension of nominal 4x4 post — 3.5 in x 3.5 in.",
    input: {
      value: 3.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-2x10": createSample({
    id: "length:lumber-2x10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x10 Joist Depth",
    description: "Actual dressed depth of nominal 2x10 joist — 1.5 in x 9.25 in.",
    input: {
      value: 9.25,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-2x12": createSample({
    id: "length:lumber-2x12",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "2x12 Joist Depth",
    description: "Actual dressed depth of nominal 2x12 — 1.5 in x 11.25 in.",
    input: {
      value: 11.25,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:lumber-studs-16oc": createSample({
    id: "length:lumber-studs-16oc",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stud Spacing 16″ OC",
    description: "Standard stud spacing on-center for residential and light commercial walls.",
    input: {
      value: 16,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:pipe-nps-half": createSample({
    id: "length:pipe-nps-half",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 1/2″ Pipe OD",
    description: "Nominal Pipe Size 1/2″ — actual OD 0.840 in per ASME B36.10.",
    input: {
      value: 0.84,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-threequarter": createSample({
    id: "length:pipe-nps-threequarter",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 3/4″ Pipe OD",
    description: "Nominal Pipe Size 3/4″ — actual OD 1.050 in per ASME B36.10.",
    input: {
      value: 1.05,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-1": createSample({
    id: "length:pipe-nps-1",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 1″ Pipe OD",
    description: "Nominal Pipe Size 1″ — actual OD 1.315 in per ASME B36.10.",
    input: {
      value: 1.315,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-2": createSample({
    id: "length:pipe-nps-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Pipe OD",
    description: "Nominal Pipe Size 2″ — actual OD 2.375 in per ASME B36.10.",
    input: {
      value: 2.375,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-3": createSample({
    id: "length:pipe-nps-3",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 3″ Pipe OD",
    description: "Nominal Pipe Size 3″ — actual OD 3.5 in per ASME B36.10.",
    input: {
      value: 3.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-6": createSample({
    id: "length:pipe-nps-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 6″ Pipe OD",
    description: "Nominal Pipe Size 6″ — actual OD 6.625 in per ASME B36.10.",
    input: {
      value: 6.625,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-8": createSample({
    id: "length:pipe-nps-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 8″ Pipe OD",
    description: "Nominal Pipe Size 8″ — actual OD 8.625 in per ASME B36.10.",
    input: {
      value: 8.625,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-nps-10": createSample({
    id: "length:pipe-nps-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 10″ Pipe OD",
    description: "Nominal Pipe Size 10″ — actual OD 10.75 in per ASME B36.10.",
    input: {
      value: 10.75,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-sch40-wall": createSample({
    id: "length:pipe-sch40-wall",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Sch 40 Wall Thickness",
    description: "ASME B36.10 Schedule 40 wall thickness for 2″ pipe — 0.154 in.",
    input: {
      value: 0.154,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:pipe-sch80-wall": createSample({
    id: "length:pipe-sch80-wall",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "NPS 2″ Sch 80 Wall Thickness",
    description: "ASME B36.10 Schedule 80 wall thickness for 2″ pipe — 0.218 in.",
    input: {
      value: 0.218,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-16ga": createSample({
    id: "length:sheetmetal-16ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 16 Gauge",
    description: "Standard steel sheet thickness for 16 gauge — 0.0598 in per ASTM A 653 / U.S. Standard Gauge.",
    input: {
      value: 0.0598,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-14ga": createSample({
    id: "length:sheetmetal-14ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 14 Gauge",
    description: "Standard steel sheet thickness for 14 gauge — 0.0747 in.",
    input: {
      value: 0.0747,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-12ga": createSample({
    id: "length:sheetmetal-12ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 12 Gauge",
    description: "Standard steel sheet thickness for 12 gauge — 0.1046 in.",
    input: {
      value: 0.1046,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-10ga": createSample({
    id: "length:sheetmetal-10ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 10 Gauge",
    description: "Standard steel sheet thickness for 10 gauge — 0.1345 in.",
    input: {
      value: 0.1345,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-7ga": createSample({
    id: "length:sheetmetal-7ga",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Sheet Metal 7 Gauge",
    description: "Standard steel sheet thickness for 7 gauge — 0.1793 in.",
    input: {
      value: 0.1793,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-3-8inch": createSample({
    id: "length:sheetmetal-3-8inch",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Plate 3/8″ Thickness",
    description: "Common steel plate thickness — 0.375 in for baseplates, brackets, and gussets.",
    input: {
      value: 0.375,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:sheetmetal-1-2inch": createSample({
    id: "length:sheetmetal-1-2inch",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Plate 1/2″ Thickness",
    description: "Common steel plate thickness — 0.5 in for bearing plates and stiffeners.",
    input: {
      value: 0.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1-4": createSample({
    id: "length:bolt-diameter-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1/4″ Diameter",
    description: "Nominal bolt diameter 1/4″ — SAE grade 5 / ASTM A325 common fastener.",
    input: {
      value: 0.25,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-3-8": createSample({
    id: "length:bolt-diameter-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 3/8″ Diameter",
    description: "Nominal bolt diameter 3/8″ — structural and machinery fastener.",
    input: {
      value: 0.375,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1-2": createSample({
    id: "length:bolt-diameter-1-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1/2″ Diameter",
    description: "Nominal bolt diameter 1/2″ — common structural bolt size.",
    input: {
      value: 0.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-5-8": createSample({
    id: "length:bolt-diameter-5-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 5/8″ Diameter",
    description: "Nominal bolt diameter 5/8″ — heavy structural connection bolt.",
    input: {
      value: 0.625,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-3-4": createSample({
    id: "length:bolt-diameter-3-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 3/4″ Diameter",
    description: "Nominal bolt diameter 3/4″ — large structural bolt per ASTM A325 / A490.",
    input: {
      value: 0.75,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:bolt-diameter-1": createSample({
    id: "length:bolt-diameter-1",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bolt 1″ Diameter",
    description: "Nominal bolt diameter 1″ — heavy bracing and column splice bolts.",
    input: {
      value: 1,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:weld-leg-1-4": createSample({
    id: "length:weld-leg-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 1/4″",
    description: "Common fillet weld leg size for light structural connections per AWS D1.1.",
    input: {
      value: 0.25,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:weld-leg-3-8": createSample({
    id: "length:weld-leg-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 3/8″",
    description: "Medium fillet weld leg size for beam-to-column connections per AWS D1.1.",
    input: {
      value: 0.375,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:weld-leg-1-2": createSample({
    id: "length:weld-leg-1-2",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fillet Weld Leg 1/2″",
    description: "Heavy fillet weld leg size for large moment connections and splices.",
    input: {
      value: 0.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:rebar-us-4": createSample({
    id: "length:rebar-us-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #4 Rebar Diameter",
    description: "US #4 reinforcing bar — 1/2″ diameter per ASTM A615.",
    input: {
      value: 0.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-5": createSample({
    id: "length:rebar-us-5",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #5 Rebar Diameter",
    description: "US #5 reinforcing bar — 5/8″ diameter per ASTM A615.",
    input: {
      value: 0.625,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-6": createSample({
    id: "length:rebar-us-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #6 Rebar Diameter",
    description: "US #6 reinforcing bar — 3/4″ diameter per ASTM A615.",
    input: {
      value: 0.75,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-8": createSample({
    id: "length:rebar-us-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #8 Rebar Diameter",
    description: "US #8 reinforcing bar — 1″ diameter per ASTM A615.",
    input: {
      value: 1,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:rebar-us-10": createSample({
    id: "length:rebar-us-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "US #10 Rebar Diameter",
    description: "US #10 reinforcing bar — 1-1/4″ diameter (1.27 in actual) for heavy sections.",
    input: {
      value: 1.27,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:concrete-cover-3-4": createSample({
    id: "length:concrete-cover-3-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Cover 3/4″",
    description: "Minimum concrete cover for cast-in-place slabs and walls per ACI 318.",
    input: {
      value: 0.75,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-cover-1-5": createSample({
    id: "length:concrete-cover-1-5",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Cover 1.5″",
    description: "Minimum cover for exterior beams and columns exposed to weather per ACI 318.",
    input: {
      value: 1.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-slab-4": createSample({
    id: "length:concrete-slab-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab on Grade 4″",
    description: "Typical residential slab-on-grade thickness — 4 in per IRC.",
    input: {
      value: 4,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:concrete-slab-6": createSample({
    id: "length:concrete-slab-6",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab on Grade 6″",
    description: "Commercial/industrial slab-on-grade thickness — 6 in for heavy loads.",
    input: {
      value: 6,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:footing-width-24": createSample({
    id: "length:footing-width-24",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Strip Footing Width 24″",
    description: "Typical continuous footing width for two-story bearing wall — 24 in.",
    input: {
      value: 24,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:structural-beam-w8x10-flange": createSample({
    id: "length:structural-beam-w8x10-flange",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "W8x10 Flange Thickness",
    description: "AISC W8x10 wide-flange flange thickness — 0.205 in.",
    input: {
      value: 0.205,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:structural-beam-w10x22-flange": createSample({
    id: "length:structural-beam-w10x22-flange",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "W10x22 Flange Thickness",
    description: "AISC W10x22 wide-flange flange thickness — 0.29 in.",
    input: {
      value: 0.29,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:railroad-gauge": createSample({
    id: "length:railroad-gauge",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Railroad Track Gauge",
    description: "Standard gauge 4 ft 8.5 in = 56.5 in between rails per AREMA.",
    input: {
      value: 56.5,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch"]
  }),
  "length:naval-depth-fathom": createSample({
    id: "length:naval-depth-fathom",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "River Depth (Fathoms)",
    description: "Navigation channel depth in fathoms — 6 ft per fathom, common in hydrographic surveys.",
    input: {
      value: 18,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:annotation-meter"]
  }),
  "length:screen-mesh-100": createSample({
    id: "length:screen-mesh-100",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "100 Mesh Opening",
    description: "No. 100 sieve opening — 0.0059 in (149 µm) per ASTM E11.",
    input: {
      value: 0.0059,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:screen-mesh-200": createSample({
    id: "length:screen-mesh-200",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "200 Mesh Opening",
    description: "No. 200 sieve opening — 0.0029 in (74 µm) per ASTM E11.",
    input: {
      value: 0.0029,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:paper-mil-10": createSample({
    id: "length:paper-mil-10",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "10 mil Paper Thickness",
    description: "Common card stock thickness — 10 mil = 0.010 in.",
    input: {
      value: 0.01,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:foundation-pile-diameter-12": createSample({
    id: "length:foundation-pile-diameter-12",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pile Diameter 12″",
    description: "Cast-in-place concrete pile diameter 12 in per IBC / ACI 318 deep foundations.",
    input: {
      value: 12,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:foundation-pile-diameter-18": createSample({
    id: "length:foundation-pile-diameter-18",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pile Diameter 18″",
    description: "Cast-in-place concrete pile diameter 18 in for high-load foundations.",
    input: {
      value: 18,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:awg-12-wire": createSample({
    id: "length:awg-12-wire",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "AWG #12 Wire Diameter",
    description: "American Wire Gauge #12 conductor diameter — 0.0808 in per ASTM B258.",
    input: {
      value: 0.0808,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:awg-10-wire": createSample({
    id: "length:awg-10-wire",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "AWG #10 Wire Diameter",
    description: "American Wire Gauge #10 conductor diameter — 0.1019 in per ASTM B258.",
    input: {
      value: 0.1019,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:detail-inch", "length:diameter-mm"]
  }),
  "length:pipe-tubing-od-1-4": createSample({
    id: "length:pipe-tubing-od-1-4",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Instrument Tubing 1/4″ OD",
    description: "Stainless steel instrument tubing OD — 0.25 in for pneumatic and hydraulic lines.",
    input: {
      value: 0.25,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),
  "length:pipe-tubing-od-3-8": createSample({
    id: "length:pipe-tubing-od-3-8",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Instrument Tubing 3/8″ OD",
    description: "Stainless steel instrument tubing OD — 0.375 in for process impulse lines.",
    input: {
      value: 0.375,
      unit: UNIT_TOKENS.INCH
    },
    recommendedOutputPresetIds: ["length:diameter-inch", "length:diameter-mm"]
  }),

  // ──────────────────────────────────────────────
  // LENGTH — formula/inline variants
  // ──────────────────────────────────────────────
  "length:formula-embedded-units": createSample({
    id: "length:formula-embedded-units",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Run (Formula)",
    description: "Pipe segment sum with embedded units — 7200 mm + 150 mm.",
    input: {
      value: "=7200 mm + 150 mm",
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:formula-plain": createSample({
    id: "length:formula-plain",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Offset Diff (Formula)",
    description: "Plain numeric formula without embedded units — 2500 - 150.",
    input: {
      value: "=2500 - 150",
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
  }),
  "length:inline-unit": createSample({
    id: "length:inline-unit",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Spool Length (Inline)",
    description: "Numeric value with inline unit suffix — 4000mm.",
    input: {
      value: "4000mm",
      unit: UNIT_TOKENS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:detail-inch"]
  }),

  // ════════════════════════════════════════════
  // AREA
  // ════════════════════════════════════════════
  "area:slab-zone": createSample({
    id: "area:slab-zone",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab Zone Area",
    description: "Area takeoff for a concrete slab or finish zone.",
    input: {
      value: 42.35,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "area:room-finishing": createSample({
    id: "area:room-finishing",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Room Finishing Area",
    description: "Architectural finishing area for flooring, ceiling, or paint packages.",
    input: {
      value: 18.75,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:gasket-surface": createSample({
    id: "area:gasket-surface",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Gasket Surface",
    description: "Compact industrial sealing surface often checked in square centimeters or square inches.",
    input: {
      value: 2400,
      unit: UNIT_TOKENS.SQUARE_CENTIMETER
    },
    recommendedOutputPresetIds: ["area:detail-square-centimeter", "area:fabrication-square-inch"]
  }),
  "area:cladding-panel": createSample({
    id: "area:cladding-panel",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cladding Panel Face",
    description: "Facade or equipment enclosure panel area used in procurement and detailing.",
    input: {
      value: 12.8,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:roof-sheathing": createSample({
    id: "area:roof-sheathing",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Roof Sheathing Area",
    description: "Plywood or OSB roof sheathing area for residential framing takeoff.",
    input: {
      value: 1280,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:paint-coverage-us": createSample({
    id: "area:paint-coverage-us",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Paint Coverage (sq ft)",
    description: "Typical paint coverage per gallon — 350 sq ft at 1 coat per manufacturer specs.",
    input: {
      value: 350,
      unit: UNIT_TOKENS.SQUARE_INCH
    },
    recommendedOutputPresetIds: ["area:fabrication-square-inch", "area:schedule-square-meter"]
  }),
  "area:floor-tile-12x12": createSample({
    id: "area:floor-tile-12x12",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "12x12 Tile Area (sq in)",
    description: "Single 12 in x 12 in floor tile area — 144 sq in per piece.",
    input: {
      value: 144,
      unit: UNIT_TOKENS.SQUARE_INCH
    },
    recommendedOutputPresetIds: ["area:fabrication-square-inch"]
  }),
  "area:concrete-formwork": createSample({
    id: "area:concrete-formwork",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Formwork Area",
    description: "Vertical formwork contact area for 100 ft of 8 ft high wall — 800 sq ft.",
    input: {
      value: 74.32,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:land-acre": createSample({
    id: "area:land-acre",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Land Parcel (acres converted to sq m)",
    description: "Standard building lot — 0.25 acre ~= 1012 sq m.",
    input: {
      value: 1012,
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "area:awg-500-kcmil": createSample({
    id: "area:awg-500-kcmil",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "500 kcmil Conductor Area",
    description: "Large electrical conductor 500,000 circular mils = 253 mm² per NEC.",
    input: {
      value: 253,
      unit: UNIT_TOKENS.SQUARE_CENTIMETER
    },
    recommendedOutputPresetIds: ["area:detail-square-centimeter"]
  }),
  "area:formula-embedded-units": createSample({
    id: "area:formula-embedded-units",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab Dimensions (Formula)",
    description: "Area from length x width with embedded units — 8 m * 5 m.",
    input: {
      value: "=8 m * 5 m",
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "area:formula-plain": createSample({
    id: "area:formula-plain",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Zone Sum (Formula)",
    description: "Plain numeric formula without embedded units — 2.5 * 1.8.",
    input: {
      value: "=2.5 * 1.8",
      unit: UNIT_TOKENS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
  }),
  "area:inline-unit": createSample({
    id: "area:inline-unit",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Gasket Area (Inline)",
    description: "Numeric value with inline unit suffix — 2400cm^2.",
    input: {
      value: "2400cm^2",
      unit: UNIT_TOKENS.SQUARE_CENTIMETER
    },
    recommendedOutputPresetIds: ["area:detail-square-centimeter", "area:fabrication-square-inch"]
  }),

  // ════════════════════════════════════════════
  // VOLUME
  // ════════════════════════════════════════════
  "volume:concrete-pour": createSample({
    id: "volume:concrete-pour",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Pour",
    description: "Concrete pour quantity for structural elements or foundations.",
    input: {
      value: 2.4,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter"]
  }),
  "volume:process-tank": createSample({
    id: "volume:process-tank",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Process Tank Volume",
    description: "Industrial tank or sump capacity for process and utility packages.",
    input: {
      value: 18.75,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:resin-cartridge": createSample({
    id: "volume:resin-cartridge",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Resin Cartridge",
    description: "Small industrial volume typically reviewed in cubic centimeters.",
    input: {
      value: 950,
      unit: UNIT_TOKENS.CUBIC_CENTIMETER
    },
    recommendedOutputPresetIds: ["volume:detail-cubic-centimeter", "volume:fabrication-cubic-inch"]
  }),
  "volume:storage-tank-liter": createSample({
    id: "volume:storage-tank-liter",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Storage Tank (L)",
    description: "Vertical storage tank capacity entered in liters for process and utility applications.",
    input: {
      value: 50000,
      unit: UNIT_TOKENS.LITER
    },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:duct-plenum": createSample({
    id: "volume:duct-plenum",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Plenum Volume",
    description: "Mechanical plenum volume for airflow balancing and commissioning checks.",
    input: {
      value: 0.38,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:concrete-yard-us": createSample({
    id: "volume:concrete-yard-us",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Yard (cu yd)",
    description: "US concrete truck load — 10 cubic yards for a standard ready-mix delivery.",
    input: {
      value: 7.65,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter", "volume:process-cubic-meter"]
  }),
  "volume:tank-gallons-us": createSample({
    id: "volume:tank-gallons-us",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fuel Tank (gal to L)",
    description: "Standard 275-gallon residential fuel oil tank.",
    input: {
      value: 275,
      unit: UNIT_TOKENS.LITER
    },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:pipe-volume-per-foot": createSample({
    id: "volume:pipe-volume-per-foot",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Volume per Foot",
    description: "Internal volume per foot of 2″ Sch 40 pipe — 0.0603 cu ft/ft (1.71 L/m).",
    input: {
      value: 0.0603,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:tank-liter"]
  }),
  "volume:swimming-pool": createSample({
    id: "volume:swimming-pool",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Swimming Pool Volume",
    description: "Residential in-ground pool — 20,000 US gallons (~75.7 m³).",
    input: {
      value: 75.7,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:truck-load": createSample({
    id: "volume:truck-load",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Dump Truck Load",
    description: "Standard dump truck heaped capacity — ~12 m³ aggregates.",
    input: {
      value: 12,
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter", "volume:process-cubic-meter"]
  }),
  "volume:formula-embedded-units": createSample({
    id: "volume:formula-embedded-units",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Section (Formula)",
    description: "Volume from L x W x H with embedded units — 4 m * 0.8 m * 0.3 m.",
    input: {
      value: "=4 m * 0.8 m * 0.3 m",
      unit: UNIT_TOKENS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:concrete-cubic-meter"]
  }),
  "volume:formula-plain": createSample({
    id: "volume:formula-plain",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Tank Sum (Formula)",
    description: "Plain numeric formula without embedded units — 15000 + 35000.",
    input: {
      value: "=15000 + 35000",
      unit: UNIT_TOKENS.LITER
    },
    recommendedOutputPresetIds: ["volume:tank-liter", "volume:process-cubic-meter"]
  }),
  "volume:inline-unit": createSample({
    id: "volume:inline-unit",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cartridge Volume (Inline)",
    description: "Numeric value with inline unit suffix — 950cm^3.",
    input: {
      value: "950cm^3",
      unit: UNIT_TOKENS.CUBIC_CENTIMETER
    },
    recommendedOutputPresetIds: ["volume:detail-cubic-centimeter", "volume:fabrication-cubic-inch"]
  }),

  // ════════════════════════════════════════════
  // ANGLE
  // ════════════════════════════════════════════
  "angle:roof-pitch": createSample({
    id: "angle:roof-pitch",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Roof Pitch",
    description: "Roof pitch angle for detailing and annotation previews.",
    input: {
      value: 30,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),
  "angle:pipe-slope": createSample({
    id: "angle:pipe-slope",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Slope Angle",
    description: "Process and drainage slope angle for routing and fabrication drawings.",
    input: {
      value: 1.5,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:nozzle-rotation": createSample({
    id: "angle:nozzle-rotation",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Nozzle Rotation",
    description: "Equipment nozzle orientation often exchanged in radians inside industrial tools.",
    input: {
      value: 1.0471975512,
      unit: UNIT_TOKENS.RADIAN
    },
    recommendedOutputPresetIds: ["angle:process-radian", "angle:annotation-symbol"]
  }),
  "angle:stair-turn": createSample({
    id: "angle:stair-turn",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stair Turn",
    description: "Architectural turning angle for stairs, ramps, or handrail transitions.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:slope-symbol"]
  }),
  "angle:truss-pitch-4-12": createSample({
    id: "angle:truss-pitch-4-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 4:12",
    description: "Roof truss slope 4 in 12 = 18.43° — common residential slope.",
    input: {
      value: 18.43,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:truss-pitch-6-12": createSample({
    id: "angle:truss-pitch-6-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 6:12",
    description: "Roof truss slope 6 in 12 = 26.57° — steep slope for snow shedding.",
    input: {
      value: 26.57,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:truss-pitch-12-12": createSample({
    id: "angle:truss-pitch-12-12",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Truss Pitch 12:12",
    description: "Roof truss slope 12 in 12 = 45° — steep pitch for cathedral ceilings.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-symbol"]
  }),
  "angle:stair-stringer": createSample({
    id: "angle:stair-stringer",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Stair Stringer Cut Angle",
    description: "Typical stair stringer rise/run for 7″ rise x 11″ run = ~32.5° per IBC.",
    input: {
      value: 32.5,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:slope-symbol", "angle:annotation-degree"]
  }),
  "angle:conical-tank-bottom": createSample({
    id: "angle:conical-tank-bottom",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Conical Tank Bottom Slope",
    description: "ASME conical bottom slope — 60° included angle for hopper bottoms.",
    input: {
      value: 60,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:annotation-degree"]
  }),
  "angle:structural-brace": createSample({
    id: "angle:structural-brace",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Structural Brace Angle",
    description: "Diagonal brace angle for X-bracing in steel frames — typically 45° or 30-60°.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:slope-symbol"]
  }),
  "angle:auger-flight": createSample({
    id: "angle:auger-flight",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Auger Flight Angle",
    description: "Screw conveyor/auger flight pitch angle — typically ~25° for granular materials.",
    input: {
      value: 25,
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:process-radian"]
  }),
  "angle:formula-embedded-units": createSample({
    id: "angle:formula-embedded-units",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Bend Sum (Formula)",
    description: "Angle sum with embedded units — 30 deg + 15 deg.",
    input: {
      value: "=30 deg + 15 deg",
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),
  "angle:formula-plain": createSample({
    id: "angle:formula-plain",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Turn Diff (Formula)",
    description: "Plain numeric formula without embedded units — 90 - 5.",
    input: {
      value: "=90 - 5",
      unit: UNIT_TOKENS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:slope-symbol"]
  }),
  "angle:inline-unit": createSample({
    id: "angle:inline-unit",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Nozzle Rotation (Inline)",
    description: "Numeric value with inline unit suffix — 1.0472rad.",
    input: {
      value: "1.0472rad",
      unit: UNIT_TOKENS.RADIAN
    },
    recommendedOutputPresetIds: ["angle:process-radian", "angle:annotation-symbol"]
  }),

  // ════════════════════════════════════════════
  // TEMPERATURE
  // ════════════════════════════════════════════
  "temperature:room-setpoint": createSample({
    id: "temperature:room-setpoint",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Room Setpoint",
    description: "HVAC room setpoint used in mechanical schedules.",
    input: {
      value: 22,
      unit: UNIT_TOKENS.DEGREE_CELSIUS
    },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:fahrenheit-room"]
  }),
  "temperature:chilled-water": createSample({
    id: "temperature:chilled-water",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Chilled Water Supply",
    description: "Mechanical chilled water supply temperature for plant and HVAC coordination.",
    input: {
      value: 6,
      unit: UNIT_TOKENS.DEGREE_CELSIUS
    },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:celsius-process"]
  }),
  "temperature:furnace-shell": createSample({
    id: "temperature:furnace-shell",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Furnace Shell Limit",
    description: "Industrial equipment shell temperature limit — 180 °F for ASME Section VIII Div 1.",
    input: {
      value: 180,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:reactor-jacket": createSample({
    id: "temperature:reactor-jacket",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Reactor Jacket Temperature",
    description: "Process reactor jacket setpoint — 338.15 K (65 °C) for exothermic batch.",
    input: {
      value: 338.15,
      unit: UNIT_TOKENS.KELVIN
    },
    recommendedOutputPresetIds: ["temperature:process-kelvin", "temperature:celsius-process"]
  }),
  "temperature:weld-preheat": createSample({
    id: "temperature:weld-preheat",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Weld Preheat",
    description: "Minimum preheat temperature for 1″ thick A36 steel — 150 °F per AWS D1.1.",
    input: {
      value: 150,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:weld-interpass": createSample({
    id: "temperature:weld-interpass",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Weld Interpass",
    description: "Maximum interpass temperature for quenched-and-tempered steel — 400 °F per AWS D1.1.",
    input: {
      value: 400,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:weld-postheat": createSample({
    id: "temperature:weld-postheat",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "PWHT Soak Temperature",
    description: "Post-weld heat treatment soak temp for carbon steel — 1100 °F per ASME Section VIII.",
    input: {
      value: 1100,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:hvac-supply-air": createSample({
    id: "temperature:hvac-supply-air",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "HVAC Supply Air",
    description: "Typical cooling supply air temperature — 55 °F (12.8 °C) for AHU.",
    input: {
      value: 55,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:hvac-return-air": createSample({
    id: "temperature:hvac-return-air",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "HVAC Return Air",
    description: "Typical return air temperature setpoint — 75 °F (23.9 °C) per ASHRAE 55.",
    input: {
      value: 75,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-room"]
  }),
  "temperature:boiler-water": createSample({
    id: "temperature:boiler-water",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Boiler Water Temperature",
    description: "Hot water boiler supply — 180 °F (82 °C) for hydronic heating per ASHRAE.",
    input: {
      value: 180,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:engine-coolant": createSample({
    id: "temperature:engine-coolant",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Engine Coolant Operating",
    description: "Diesel generator coolant operating temp — 195 °F (90 °C).",
    input: {
      value: 195,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:asphalt-paving": createSample({
    id: "temperature:asphalt-paving",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Asphalt Paving Temperature",
    description: "Hot mix asphalt discharge temp — 300 °F (149 °C) per AASHTO specs.",
    input: {
      value: 300,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:fire-protection-rating": createSample({
    id: "temperature:fire-protection-rating",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Sprinkler Activation",
    description: "Standard fire sprinkler head activation temp — 155 °F (68 °C) per NFPA 13.",
    input: {
      value: 155,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:heat-treatment-anneal": createSample({
    id: "temperature:heat-treatment-anneal",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Annealing Temperature (Steel)",
    description: "Full anneal temp for low-carbon steel — 1600 °F (871 °C) per ASTM A 919.",
    input: {
      value: 1600,
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:formula-plain": createSample({
    id: "temperature:formula-plain",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Temp Rise (Formula)",
    description: "Plain numeric formula without embedded units — 22 + 8.",
    input: {
      value: "=22 + 8",
      unit: UNIT_TOKENS.DEGREE_CELSIUS
    },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:celsius-process"]
  }),
  "temperature:inline-unit": createSample({
    id: "temperature:inline-unit",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Furnace Limit (Inline)",
    description: "Numeric value with inline unit suffix — 180degF.",
    input: {
      value: "180degF",
      unit: UNIT_TOKENS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),

  // ════════════════════════════════════════════
  // MASS
  // ════════════════════════════════════════════
  "mass:equipment-panel": createSample({
    id: "mass:equipment-panel",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Equipment Panel Mass",
    description: "Assembly mass for coordination, transportation, and lifting checks.",
    input: {
      value: 12.5,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:valve-assembly": createSample({
    id: "mass:valve-assembly",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Valve Assembly Mass",
    description: "Industrial valve mass used in supports, handling, and procurement schedules.",
    input: {
      value: 48.3,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:cable-reel": createSample({
    id: "mass:cable-reel",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cable Reel Mass",
    description: "Installation logistics mass for electrical packages and site planning.",
    input: {
      value: 520,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  }),
  "mass:pump-skid": createSample({
    id: "mass:pump-skid",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pump Skid Mass",
    description: "Skid package mass for rigging, transport, and structural support checks.",
    input: {
      value: 1840,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  }),
  "mass:steel-beam-w8x10": createSample({
    id: "mass:steel-beam-w8x10",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "W8x10 Beam Mass per Foot",
    description: "AISC W8x10 weight — 10 lb/ft (14.9 kg/m) for structural steel takeoff.",
    input: {
      value: 14.9,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:steel-beam-w12x26": createSample({
    id: "mass:steel-beam-w12x26",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "W12x26 Beam Mass per Foot",
    description: "AISC W12x26 weight — 26 lb/ft (38.7 kg/m) for structural steel takeoff.",
    input: {
      value: 38.7,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:rebar-weight-4": createSample({
    id: "mass:rebar-weight-4",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "#4 Rebar Weight per Meter",
    description: "US #4 rebar (1/2″) — 0.668 lb/ft = 0.994 kg/m per ASTM A615.",
    input: {
      value: 0.994,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:rebar-weight-8": createSample({
    id: "mass:rebar-weight-8",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "#8 Rebar Weight per Meter",
    description: "US #8 rebar (1″) — 2.670 lb/ft = 3.973 kg/m.",
    input: {
      value: 3.973,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:pipe-weight-2inch-sch40": createSample({
    id: "mass:pipe-weight-2inch-sch40",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "2″ Sch 40 Pipe Weight per ft",
    description: "NPS 2″ Schedule 40 — 3.653 lb/ft (5.44 kg/m) per ASME B36.10.",
    input: {
      value: 5.44,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:wire-rope-3-4": createSample({
    id: "mass:wire-rope-3-4",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "3/4″ Wire Rope Weight per ft",
    description: "6x19 IWRC wire rope — 3/4″ dia = 1.53 lb/ft (2.28 kg/m) per API 9A.",
    input: {
      value: 2.28,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "mass:concrete-density": createSample({
    id: "mass:concrete-density",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Density (kg per m³)",
    description: "Normal weight concrete — 2400 kg/m³ per ACI 318.",
    input: {
      value: 2400,
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:shipping-kilogram"]
  }),
  "mass:formula-plain": createSample({
    id: "mass:formula-plain",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Assembly Sum (Formula)",
    description: "Plain numeric formula without embedded units — 12.5 + 48.3 + 520.",
    input: {
      value: "=12.5 + 48.3 + 520",
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram", "mass:shipping-kilogram"]
  }),
  "mass:inline-unit": createSample({
    id: "mass:inline-unit",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Reel Mass (Inline)",
    description: "Numeric value with inline unit suffix — 520kg.",
    input: {
      value: "520kg",
      unit: UNIT_TOKENS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
  }),

  // ════════════════════════════════════════════
  // FORCE
  // ════════════════════════════════════════════
  "force:anchor-load": createSample({
    id: "force:anchor-load",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Anchor Load",
    description: "Factored anchor load for structural detailing and reports.",
    input: {
      value: 18,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton"]
  }),
  "force:baseplate-reaction": createSample({
    id: "force:baseplate-reaction",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Baseplate Reaction",
    description: "Structural reaction used in baseplate, grout, and anchor sizing checks.",
    input: {
      value: 125,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:actuator-thrust": createSample({
    id: "force:actuator-thrust",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Actuator Thrust",
    description: "Equipment actuator thrust typically checked in Newtons for industrial packages.",
    input: {
      value: 3500,
      unit: UNIT_TOKENS.NEWTON
    },
    recommendedOutputPresetIds: ["force:equipment-newton", "force:structural-kilonewton"]
  }),
  "force:lifting-point": createSample({
    id: "force:lifting-point",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Lifting Point Check",
    description: "Rigging verification load for lifting lugs and temporary erection conditions.",
    input: {
      value: 42.5,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:loadcase-kilonewton", "force:structural-kilonewton"]
  }),
  "force:bolt-tension-3-4-a325": createSample({
    id: "force:bolt-tension-3-4-a325",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "A325 3/4″ Bolt Tension",
    description: "ASTM A325 3/4″ bolt minimum pretension — 28 kips (124.5 kN) per RCSC / AISC.",
    input: {
      value: 124.5,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:bolt-tension-7-8-a325": createSample({
    id: "force:bolt-tension-7-8-a325",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "A325 7/8″ Bolt Tension",
    description: "ASTM A325 7/8″ bolt minimum pretension — 39 kips (173.5 kN) per RCSC.",
    input: {
      value: 173.5,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:cable-tension": createSample({
    id: "force:cable-tension",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Cable Tension (Bridle)",
    description: "Bridle cable tension for suspended loads — 10 kips (44.5 kN) typical lift.",
    input: {
      value: 44.5,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:wind-load-column": createSample({
    id: "force:wind-load-column",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Wind Load on Column",
    description: "Wind load reaction at base for 30 ft building column — 15 kN per ASCE 7.",
    input: {
      value: 15,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:seismic-base-shear": createSample({
    id: "force:seismic-base-shear",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Seismic Base Shear",
    description: "Seismic base shear for 3-story steel frame per ASCE 7 — 250 kN.",
    input: {
      value: 250,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:loadcase-kilonewton", "force:structural-kilonewton"]
  }),
  "force:crane-capacity-50t": createSample({
    id: "force:crane-capacity-50t",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Crane Capacity 50 ton",
    description: "Mobile crane lifting capacity — 50 ton (445 kN) at minimum radius.",
    input: {
      value: 445,
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:formula-plain": createSample({
    id: "force:formula-plain",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Load Sum (Formula)",
    description: "Plain numeric formula without embedded units — 125 + 18 + 42.5.",
    input: {
      value: "=125 + 18 + 42.5",
      unit: UNIT_TOKENS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton", "force:loadcase-kilonewton"]
  }),
  "force:inline-unit": createSample({
    id: "force:inline-unit",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Thrust (Inline)",
    description: "Numeric value with inline unit suffix — 3500N.",
    input: {
      value: "3500N",
      unit: UNIT_TOKENS.NEWTON
    },
    recommendedOutputPresetIds: ["force:equipment-newton", "force:structural-kilonewton"]
  }),

  // ════════════════════════════════════════════
  // PRESSURE
  // ════════════════════════════════════════════
  "pressure:duct-static": createSample({
    id: "pressure:duct-static",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Static Pressure",
    description: "Static pressure point for HVAC coordination and balancing.",
    input: {
      value: 250,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:pump-discharge": createSample({
    id: "pressure:pump-discharge",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pump Discharge Pressure",
    description: "Industrial pumping discharge pressure for piping and rotating equipment coordination.",
    input: {
      value: 8.5,
      unit: UNIT_TOKENS.BAR
    },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  }),
  "pressure:vessel-design": createSample({
    id: "pressure:vessel-design",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Vessel Design Pressure",
    description: "Pressure vessel or skid design pressure per ASME Section VIII Div 1.",
    input: {
      value: 1.6,
      unit: UNIT_TOKENS.MEGAPASCAL
    },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:compressed-air": createSample({
    id: "pressure:compressed-air",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Compressed Air Header",
    description: "Plant utility pressure for pneumatic systems and distribution headers.",
    input: {
      value: 690,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:water-main-city": createSample({
    id: "pressure:water-main-city",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "City Water Main Pressure",
    description: "Typical municipal water main — 60 psi (414 kPa) per AWWA standards.",
    input: {
      value: 414,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:tire-pressure-auto": createSample({
    id: "pressure:tire-pressure-auto",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Automotive Tire Pressure",
    description: "Typical passenger tire inflation — 32 psi (220 kPa) per DOT specs.",
    input: {
      value: 220,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:hvac-static-inwg": createSample({
    id: "pressure:hvac-static-inwg",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "HVAC Static (in wg to Pa)",
    description: "Fan static pressure — 2.0 in w.g. = 498 Pa per ASHRAE.",
    input: {
      value: 498,
      unit: UNIT_TOKENS.PASCAL
    },
    recommendedOutputPresetIds: ["pressure:instrumentation-pascal", "pressure:hvac-kilopascal"]
  }),
  "pressure:pump-head-100ft": createSample({
    id: "pressure:pump-head-100ft",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pump Head 100 ft H₂O",
    description: "Pump discharge head — 100 ft water column = 298.9 kPa (43.4 psi) per HI.",
    input: {
      value: 298.9,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:hvac-kilopascal"]
  }),
  "pressure:wind-100mph": createSample({
    id: "pressure:wind-100mph",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Wind Pressure 100 mph",
    description: "ASCE 7 wind pressure at 100 mph exposure C — 25.6 psf (1.225 kPa).",
    input: {
      value: 1.225,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:instrumentation-pascal"]
  }),
  "pressure:soil-bearing-3000psf": createSample({
    id: "pressure:soil-bearing-3000psf",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Soil Bearing 3000 psf",
    description: "Allowable soil bearing — 3,000 psf (143.6 kPa) for medium sand/clay per IBC.",
    input: {
      value: 143.6,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal"]
  }),
  "pressure:ansi-150": createSample({
    id: "pressure:ansi-150",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "ANSI Class 150 Rating",
    description: "ANSI/ASME B16.5 Class 150 flange rating — 285 psi (1.96 MPa) at 100 °F.",
    input: {
      value: 1.96,
      unit: UNIT_TOKENS.MEGAPASCAL
    },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:ansi-300": createSample({
    id: "pressure:ansi-300",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "ANSI Class 300 Rating",
    description: "ANSI/ASME B16.5 Class 300 flange rating — 740 psi (5.1 MPa) at 100 °F.",
    input: {
      value: 5.1,
      unit: UNIT_TOKENS.MEGAPASCAL
    },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:fire-hydrant": createSample({
    id: "pressure:fire-hydrant",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Hydrant Flow Pressure",
    description: "Minimum residual hydrant pressure — 20 psi (138 kPa) per NFPA 24.",
    input: {
      value: 138,
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:formula-embedded-units": createSample({
    id: "pressure:formula-embedded-units",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Vessel Test (Formula)",
    description: "Pressure sum with embedded units — 1.6 MPa + 0.5 bar.",
    input: {
      value: "=1.6 MPa + 0.5 bar",
      unit: UNIT_TOKENS.MEGAPASCAL
    },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:formula-plain": createSample({
    id: "pressure:formula-plain",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Header Sum (Formula)",
    description: "Plain numeric formula without embedded units — 250 + 690.",
    input: {
      value: "=250 + 690",
      unit: UNIT_TOKENS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:inline-unit": createSample({
    id: "pressure:inline-unit",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Discharge (Inline)",
    description: "Numeric value with inline unit suffix — 8.5bar.",
    input: {
      value: "8.5bar",
      unit: UNIT_TOKENS.BAR
    },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  }),

  // ════════════════════════════════════════════
  // TIME
  // ════════════════════════════════════════════
  "time:fire-rating": createSample({
    id: "time:fire-rating",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Rating Duration",
    description: "Duration-driven parameter for fire assemblies and curing windows.",
    input: {
      value: 120,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:coordination-minute"]
  }),
  "time:concrete-curing": createSample({
    id: "time:concrete-curing",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Curing Window",
    description: "Concrete curing or waiting window used in planning and execution sequences.",
    input: {
      value: 72,
      unit: UNIT_TOKENS.HOUR
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:coating-dwell": createSample({
    id: "time:coating-dwell",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Coating Dwell Time",
    description: "Industrial coating dwell or flash-off time for QA and production instructions.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:maintenance-window": createSample({
    id: "time:maintenance-window",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Maintenance Window",
    description: "Shutdown or maintenance duration used in industrial planning and site coordination.",
    input: {
      value: 8,
      unit: UNIT_TOKENS.HOUR
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:weld-arc-time": createSample({
    id: "time:weld-arc-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Weld Arc Time",
    description: "Arc-on time per weld pass — 3.5 minutes for a 1/4″ fillet 6″ long.",
    input: {
      value: 3.5,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:fire-rating-1hr": createSample({
    id: "time:fire-rating-1hr",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "1-Hour Fire Rating",
    description: "Standard 1-hour fire-resistance rated assembly per IBC Table 721 / ASTM E119.",
    input: {
      value: 60,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:fire-rating-2hr": createSample({
    id: "time:fire-rating-2hr",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "2-Hour Fire Rating",
    description: "Standard 2-hour fire-resistance rated floor/ceiling assembly per ASTM E119.",
    input: {
      value: 120,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:paint-dry-time": createSample({
    id: "time:paint-dry-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Paint Dry-to-Touch",
    description: "Alkyd enamel dry-to-touch time at 77 °F — 6 hours per manufacturer.",
    input: {
      value: 6,
      unit: UNIT_TOKENS.HOUR
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:grout-set-time": createSample({
    id: "time:grout-set-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Grout Initial Set",
    description: "Non-shrink grout initial set time — 30 minutes per ASTM C1107.",
    input: {
      value: 30,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:mortar-set-time": createSample({
    id: "time:mortar-set-time",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Mortar Set Time",
    description: "Type S mortar initial set — 2.5 hours per ASTM C270.",
    input: {
      value: 150,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:asphalt-cooldown": createSample({
    id: "time:asphalt-cooldown",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Asphalt Cooldown Time",
    description: "HMA cooldown to rolling temp (175 °F) — 20 minutes per AASHTO.",
    input: {
      value: 20,
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:formula-plain": createSample({
    id: "time:formula-plain",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duration Sum (Formula)",
    description: "Plain numeric formula without embedded units — 120 + 72 + 45.",
    input: {
      value: "=120 + 72 + 45",
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),
  "time:formula-embedded-units": createSample({
    id: "time:formula-embedded-units",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Shutdown (Formula)",
    description: "Duration sum with embedded units — 3 days + 8 h.",
    input: {
      value: "=3 days + 8 h",
      unit: UNIT_TOKENS.HOUR
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "time:inline-unit": createSample({
    id: "time:inline-unit",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Dwell (Inline)",
    description: "Numeric value with inline unit suffix — 45min.",
    input: {
      value: "45min",
      unit: UNIT_TOKENS.MINUTE
    },
    recommendedOutputPresetIds: ["time:coordination-minute", "time:schedule-hour"]
  }),

  // ════════════════════════════════════════════
  // RATIO
  // ════════════════════════════════════════════
  "ratio:formula-plain": createSample({
    id: "ratio:formula-plain",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Setpoint (Formula)",
    description: "Plain numeric formula — =85 (percentual).",
    input: {
      value: "=85",
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:valve-opening": createSample({
    id: "ratio:valve-opening",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Valve Opening",
    description: "Control valve opening percentage used in industrial operations dashboards.",
    input: {
      value: 85,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:equipment-load": createSample({
    id: "ratio:equipment-load",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Equipment Load Factor",
    description: "Equipment utilization ratio for AEC operations and industrial dashboards.",
    input: {
      value: 73.5,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:room-humidity": createSample({
    id: "ratio:room-humidity",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Room Humidity Target",
    description: "AEC and clean-room humidity target used in controls and commissioning views.",
    input: {
      value: 55,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:utilization-percent"]
  }),
  "ratio:process-yield": createSample({
    id: "ratio:process-yield",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Process Yield",
    description: "Production and commissioning yield indicator tracked as a percentage.",
    input: {
      value: 92.3,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:slope-1-12": createSample({
    id: "ratio:slope-1-12",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slope 1:12",
    description: "ADA maximum ramp slope — 1:12 = 8.33% for accessible routes per 2010 ADA Standards.",
    input: {
      value: 8.33,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:slope-2-12": createSample({
    id: "ratio:slope-2-12",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slope 2:12",
    description: "Standard parking lot cross-slope — 2% (1/4″ per foot) per IBC.",
    input: {
      value: 2,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:concrete-mix-proportion": createSample({
    id: "ratio:concrete-mix-proportion",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Mix w/c Ratio",
    description: "Water-cement ratio for 4000 psi concrete mix — 0.45 per ACI 318.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:reinforcement-ratio": createSample({
    id: "ratio:reinforcement-ratio",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Reinforcement Ratio (ρ)",
    description: "Steel reinforcement ratio for 24x24 beam — 1.2% per ACI 318.",
    input: {
      value: 1.2,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  }),
  "ratio:void-ratio-soil": createSample({
    id: "ratio:void-ratio-soil",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Soil Void Ratio",
    description: "Typical sand void ratio — 0.45 (45%) per geotechnical CPT data.",
    input: {
      value: 45,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent"]
  }),
  "ratio:motor-efficiency": createSample({
    id: "ratio:motor-efficiency",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Motor Efficiency",
    description: "NEMA Premium IE3 motor efficiency at full load — 95.4%.",
    input: {
      value: 95.4,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:utilization-percent", "ratio:process-percent"]
  }),
  "ratio:air-changes-per-hour": createSample({
    id: "ratio:air-changes-per-hour",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Air Changes per Hour",
    description: "Office space ventilation — 4 ACH per ASHRAE 62.1.",
    input: {
      value: 4,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:glycol-concentration": createSample({
    id: "ratio:glycol-concentration",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Glycol Concentration",
    description: "Propylene glycol freeze protection for hydronic loop — 30% by volume.",
    input: {
      value: 30,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:dashboard-percent"]
  }),
  "ratio:steel-damper-open": createSample({
    id: "ratio:steel-damper-open",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Damper Open Percentage",
    description: "Fire/smoke damper open position feedback — 100% open = normal operation.",
    input: {
      value: 100,
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:dashboard-percent", "ratio:process-percent"]
  }),
  "ratio:formula-embedded-units": createSample({
    id: "ratio:formula-embedded-units",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Efficiency (Formula)",
    description: "Ratio formula — 250 / 300 * 100 (%) = 83.3%.",
    input: {
      value: "=250 / 300 * 100",
      unit: UNIT_TOKENS.PERCENT
    },
    recommendedOutputPresetIds: ["ratio:process-percent", "ratio:utilization-percent"]
  })
});

export class ParameterSampleCatalog extends ReadOnlyCatalog {
  constructor() {
    super(PARAMETER_SAMPLE_ENTRIES);
  }

  list() {
    return Object.values(this.all());
  }

  listByQuantity(quantity) {
    return this.list().filter((sample) => sample.quantity === quantity);
  }

  groupByQuantity() {
    const groups = {};

    for (const sample of this.list()) {
      if (!groups[sample.quantity]) {
        groups[sample.quantity] = [];
      }

      groups[sample.quantity].push(sample);
    }

    for (const quantity of Object.keys(groups)) {
      groups[quantity] = Object.freeze(groups[quantity]);
    }

    return Object.freeze(groups);
  }
}

export const parameterSampleCatalog = new ParameterSampleCatalog();
export const PARAMETER_SAMPLES = parameterSampleCatalog.all();
