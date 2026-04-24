import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { MATHJS_STRINGS } from "../constants/mathjs-string-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";

const createSample = ({ id, input, recommendedOutputPresetIds, ...sample }) => Object.freeze({
  id,
  ...sample,
  input: Object.freeze({ ...input }),
  recommendedOutputPresetIds: Object.freeze([...recommendedOutputPresetIds])
});

const PARAMETER_SAMPLE_ENTRIES = Object.freeze({
  "length:wall-thickness": createSample({
    id: "length:wall-thickness",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Wall Thickness",
    description: "Typical architectural wall thickness used in modeled partitions.",
    input: {
      value: 120,
      unit: MATHJS_STRINGS.MILLIMETER
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
      unit: MATHJS_STRINGS.METER
    },
    recommendedOutputPresetIds: ["length:annotation-meter", "length:detail-inch"]
  }),
  "area:slab-zone": createSample({
    id: "area:slab-zone",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Slab Zone Area",
    description: "Area takeoff for a concrete slab or finish zone.",
    input: {
      value: 42.35,
      unit: MATHJS_STRINGS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter"]
  }),
  "volume:concrete-pour": createSample({
    id: "volume:concrete-pour",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Pour",
    description: "Concrete pour quantity for structural elements or foundations.",
    input: {
      value: 2.4,
      unit: MATHJS_STRINGS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:concrete-cubic-meter"]
  }),
  "angle:roof-pitch": createSample({
    id: "angle:roof-pitch",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Roof Pitch",
    description: "Roof pitch angle for detailing and annotation previews.",
    input: {
      value: 30,
      unit: MATHJS_STRINGS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-degree", "angle:annotation-symbol"]
  }),
  "temperature:room-setpoint": createSample({
    id: "temperature:room-setpoint",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Room Setpoint",
    description: "HVAC room setpoint used in mechanical schedules.",
    input: {
      value: 22,
      unit: MATHJS_STRINGS.DEGREE_CELSIUS
    },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:fahrenheit-room"]
  }),
  "mass:equipment-panel": createSample({
    id: "mass:equipment-panel",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Equipment Panel Mass",
    description: "Assembly mass for coordination, transportation, and lifting checks.",
    input: {
      value: 12.5,
      unit: MATHJS_STRINGS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:schedule-kilogram"]
  }),
  "force:anchor-load": createSample({
    id: "force:anchor-load",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Anchor Load",
    description: "Factored anchor load for structural detailing and reports.",
    input: {
      value: 18,
      unit: MATHJS_STRINGS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:structural-kilonewton"]
  }),
  "pressure:duct-static": createSample({
    id: "pressure:duct-static",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Duct Static Pressure",
    description: "Static pressure point for HVAC coordination and balancing.",
    input: {
      value: 250,
      unit: MATHJS_STRINGS.KILOPASCAL
    },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "time:fire-rating": createSample({
    id: "time:fire-rating",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Fire Rating Duration",
    description: "Duration-driven parameter for fire assemblies and curing windows.",
    input: {
      value: 120,
      unit: MATHJS_STRINGS.MINUTE
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:coordination-minute"]
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