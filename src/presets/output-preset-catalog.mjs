import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { MATHJS_STRINGS } from "../constants/mathjs-string-catalog.mjs";
import { OUTPUT_SUFFIX_MODES } from "../constants/output-suffix-modes.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";

const createPreset = ({ id, ...preset }) => Object.freeze({
  id,
  ...preset
});

const OUTPUT_PRESET_ENTRIES = Object.freeze({
  "length:model-mm": createPreset({
    id: "length:model-mm",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Model Length (mm)",
    description: "Millimeter output for modeled dimensions and fabrication-ready schedules.",
    unit: MATHJS_STRINGS.MILLIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:annotation-meter": createPreset({
    id: "length:annotation-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Annotation Length (m)",
    description: "Meter output with engineering precision for general BIM annotations.",
    unit: MATHJS_STRINGS.METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:detail-inch": createPreset({
    id: "length:detail-inch",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Detail Length (in)",
    description: "Imperial output for coordination with fabrication or manufacturer detail sheets.",
    unit: MATHJS_STRINGS.INCH,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:process-meter": createPreset({
    id: "length:process-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Process Length (m)",
    description: "Meter output with balanced precision for industrial equipment and piping packages.",
    unit: MATHJS_STRINGS.METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-mm": createPreset({
    id: "length:diameter-mm",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (mm)",
    description: "Diameter annotation in millimeters with ⌀ prefix for pipe, bolt, and hole callouts.",
    unit: MATHJS_STRINGS.MILLIMETER,
    precision: 0,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-meter": createPreset({
    id: "length:diameter-meter",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (m)",
    description: "Diameter annotation in meters with ⌀ prefix for large vessel and tank callouts.",
    unit: MATHJS_STRINGS.METER,
    precision: 3,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "length:diameter-inch": createPreset({
    id: "length:diameter-inch",
    quantity: QUANTITY_TYPES.LENGTH,
    name: "Diameter (in)",
    description: "Diameter annotation in inches with ⌀ prefix for fabrication and supplier details.",
    unit: MATHJS_STRINGS.INCH,
    precision: 2,
    showUnit: true,
    prefix: "⌀ ",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "area:schedule-square-meter": createPreset({
    id: "area:schedule-square-meter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Area Schedule (m2)",
    description: "Area schedule output with symbol suffix for room and slab takeoffs.",
    unit: MATHJS_STRINGS.SQUARE_METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:coating-square-meter": createPreset({
    id: "area:coating-square-meter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Coating Area (m2)",
    description: "Higher-precision area output for coatings, finishes, and surface treatment packages.",
    unit: MATHJS_STRINGS.SQUARE_METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:detail-square-centimeter": createPreset({
    id: "area:detail-square-centimeter",
    quantity: QUANTITY_TYPES.AREA,
    name: "Detailed Area (cm2)",
    description: "Square-centimeter output for compact technical details.",
    unit: MATHJS_STRINGS.SQUARE_CENTIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "area:fabrication-square-inch": createPreset({
    id: "area:fabrication-square-inch",
    quantity: QUANTITY_TYPES.AREA,
    name: "Fabrication Area (in2)",
    description: "Imperial area output for fabrication sheets, gaskets, and supplier details.",
    unit: MATHJS_STRINGS.SQUARE_INCH,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:concrete-cubic-meter": createPreset({
    id: "volume:concrete-cubic-meter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Concrete Volume (m3)",
    description: "Cubic-meter output for pours, tanks, and takeoffs.",
    unit: MATHJS_STRINGS.CUBIC_METER,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:process-cubic-meter": createPreset({
    id: "volume:process-cubic-meter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Process Volume (m3)",
    description: "Higher-precision cubic-meter output for tanks, process skids, and utility systems.",
    unit: MATHJS_STRINGS.CUBIC_METER,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:detail-cubic-centimeter": createPreset({
    id: "volume:detail-cubic-centimeter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Detailed Volume (cm3)",
    description: "Compact cubic-centimeter output for small component volumes.",
    unit: MATHJS_STRINGS.CUBIC_CENTIMETER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:fabrication-cubic-inch": createPreset({
    id: "volume:fabrication-cubic-inch",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Fabrication Volume (in3)",
    description: "Imperial cubic-inch output for small parts, resin doses, and vendor documentation.",
    unit: MATHJS_STRINGS.CUBIC_INCH,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "volume:tank-liter": createPreset({
    id: "volume:tank-liter",
    quantity: QUANTITY_TYPES.VOLUME,
    name: "Tank Volume (L)",
    description: "Liter output for tanks, vessels, and process fluid volumes.",
    unit: MATHJS_STRINGS.LITER,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "angle:annotation-degree": createPreset({
    id: "angle:annotation-degree",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Angle Annotation (deg)",
    description: "Degree output for geometry dimensions and plan annotations.",
    unit: MATHJS_STRINGS.DEGREE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "angle:annotation-symbol": createPreset({
    id: "angle:annotation-symbol",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Angle Symbol (°)",
    description: "Degree symbol output for polished BIM and AEC dashboards.",
    unit: MATHJS_STRINGS.DEGREE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "angle:process-radian": createPreset({
    id: "angle:process-radian",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Process Angle (rad)",
    description: "Radian output for industrial geometry, robotics, and calculation traces.",
    unit: MATHJS_STRINGS.RADIAN,
    precision: 3,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "angle:slope-symbol": createPreset({
    id: "angle:slope-symbol",
    quantity: QUANTITY_TYPES.ANGLE,
    name: "Slope Angle (°)",
    description: "Degree symbol output with one decimal for ramps, drains, and process slopes.",
    unit: MATHJS_STRINGS.DEGREE,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:celsius-room": createPreset({
    id: "temperature:celsius-room",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Room Temperature (°C)",
    description: "Degree Celsius output for HVAC and occupancy scenarios.",
    unit: MATHJS_STRINGS.DEGREE_CELSIUS,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:celsius-process": createPreset({
    id: "temperature:celsius-process",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Process Temperature (°C)",
    description: "Higher-precision Celsius output for HVAC plants and industrial process loops.",
    unit: MATHJS_STRINGS.DEGREE_CELSIUS,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:fahrenheit-room": createPreset({
    id: "temperature:fahrenheit-room",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Room Temperature (°F)",
    description: "Degree Fahrenheit output for US-facing coordination views.",
    unit: MATHJS_STRINGS.DEGREE_FAHRENHEIT,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "temperature:process-kelvin": createPreset({
    id: "temperature:process-kelvin",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    name: "Process Temperature (K)",
    description: "Kelvin output for thermodynamic calculations and industrial process datasets.",
    unit: MATHJS_STRINGS.KELVIN,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "mass:schedule-kilogram": createPreset({
    id: "mass:schedule-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Mass Schedule (kg)",
    description: "Kilogram output for equipment, assemblies, and logistics views.",
    unit: MATHJS_STRINGS.KILOGRAM,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "mass:shipping-kilogram": createPreset({
    id: "mass:shipping-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Shipping Mass (kg)",
    description: "Rounded kilogram output for logistics, transport manifests, and crane plans.",
    unit: MATHJS_STRINGS.KILOGRAM,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "mass:rigging-kilogram": createPreset({
    id: "mass:rigging-kilogram",
    quantity: QUANTITY_TYPES.MASS,
    name: "Rigging Mass (kg)",
    description: "Higher-precision kilogram output for lift studies and handling envelopes.",
    unit: MATHJS_STRINGS.KILOGRAM,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "force:structural-kilonewton": createPreset({
    id: "force:structural-kilonewton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Structural Force (kN)",
    description: "Kilonewton output for anchors, supports, and reactions.",
    unit: MATHJS_STRINGS.KILONEWTON,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "force:equipment-newton": createPreset({
    id: "force:equipment-newton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Equipment Force (N)",
    description: "Newton output for actuators, mechanisms, and industrial equipment internals.",
    unit: MATHJS_STRINGS.NEWTON,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "force:loadcase-kilonewton": createPreset({
    id: "force:loadcase-kilonewton",
    quantity: QUANTITY_TYPES.FORCE,
    name: "Load Case Force (kN)",
    description: "Higher-precision kilonewton output for structural and rigging load cases.",
    unit: MATHJS_STRINGS.KILONEWTON,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:hvac-kilopascal": createPreset({
    id: "pressure:hvac-kilopascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "HVAC Pressure (kPa)",
    description: "Kilopascal output for ducts, static pressure, and air-side reporting.",
    unit: MATHJS_STRINGS.KILOPASCAL,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:piping-bar": createPreset({
    id: "pressure:piping-bar",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Piping Pressure (bar)",
    description: "Bar output for piping, pumps, and water network coordination.",
    unit: MATHJS_STRINGS.BAR,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:vessel-megapascal": createPreset({
    id: "pressure:vessel-megapascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Vessel Pressure (MPa)",
    description: "Megapascal output for pressure vessels, skids, and design calculations.",
    unit: MATHJS_STRINGS.MEGAPASCAL,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "pressure:instrumentation-pascal": createPreset({
    id: "pressure:instrumentation-pascal",
    quantity: QUANTITY_TYPES.PRESSURE,
    name: "Instrumentation Pressure (Pa)",
    description: "Pascal output for fine-grained sensors, filters, and air-side diagnostics.",
    unit: MATHJS_STRINGS.PASCAL,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "time:schedule-hour": createPreset({
    id: "time:schedule-hour",
    quantity: QUANTITY_TYPES.TIME,
    name: "Duration (h)",
    description: "Hour output for schedules, curing, and installation windows.",
    unit: MATHJS_STRINGS.HOUR,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "time:coordination-minute": createPreset({
    id: "time:coordination-minute",
    quantity: QUANTITY_TYPES.TIME,
    name: "Duration (min)",
    description: "Minute output for coordination, sequencing, and process checks.",
    unit: MATHJS_STRINGS.MINUTE,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "time:curing-hour": createPreset({
    id: "time:curing-hour",
    quantity: QUANTITY_TYPES.TIME,
    name: "Curing Duration (h)",
    description: "Higher-precision hour output for curing, drying, and staging instructions.",
    unit: MATHJS_STRINGS.HOUR,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.CODE
  }),
  "ratio:dashboard-percent": createPreset({
    id: "ratio:dashboard-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Dashboard Ratio (%)",
    description: "Whole-percent output for dashboards, BIM operations panels, and room-performance views.",
    unit: MATHJS_STRINGS.PERCENT,
    precision: 0,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "ratio:process-percent": createPreset({
    id: "ratio:process-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Process Ratio (%)",
    description: "One-decimal percentage output for commissioning, control loops, and industrial KPIs.",
    unit: MATHJS_STRINGS.PERCENT,
    precision: 1,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  }),
  "ratio:utilization-percent": createPreset({
    id: "ratio:utilization-percent",
    quantity: QUANTITY_TYPES.RATIO,
    name: "Utilization Ratio (%)",
    description: "Two-decimal percentage output for utilization, efficiency, and QA tracking.",
    unit: MATHJS_STRINGS.PERCENT,
    precision: 2,
    showUnit: true,
    prefix: "",
    suffix: "",
    suffixMode: OUTPUT_SUFFIX_MODES.SYMBOL
  })
});

export class OutputPresetCatalog extends ReadOnlyCatalog {
  constructor() {
    super(OUTPUT_PRESET_ENTRIES);
  }

  list() {
    return Object.values(this.all());
  }

  listByQuantity(quantity) {
    return this.list().filter((preset) => preset.quantity === quantity);
  }

  groupByQuantity() {
    const groups = {};

    for (const preset of this.list()) {
      if (!groups[preset.quantity]) {
        groups[preset.quantity] = [];
      }

      groups[preset.quantity].push(preset);
    }

    for (const quantity of Object.keys(groups)) {
      groups[quantity] = Object.freeze(groups[quantity]);
    }

    return Object.freeze(groups);
  }
}

export const outputPresetCatalog = new OutputPresetCatalog();
export const OUTPUT_PRESETS = outputPresetCatalog.all();