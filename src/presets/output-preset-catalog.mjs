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