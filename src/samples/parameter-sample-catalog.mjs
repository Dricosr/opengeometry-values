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
  "length:pipe-spool": createSample({
    id: "length:pipe-spool",
    quantity: QUANTITY_TYPES.LENGTH,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Spool Length",
    description: "Common industrial spool length for shop fabrication and installation checks.",
    input: {
      value: 3657,
      unit: MATHJS_STRINGS.MILLIMETER
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
      unit: MATHJS_STRINGS.MILLIMETER
    },
    recommendedOutputPresetIds: ["length:model-mm", "length:annotation-meter"]
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
  "area:room-finishing": createSample({
    id: "area:room-finishing",
    quantity: QUANTITY_TYPES.AREA,
    valueType: VALUE_TYPES.FLOAT,
    name: "Room Finishing Area",
    description: "Architectural finishing area for flooring, ceiling, or paint packages.",
    input: {
      value: 18.75,
      unit: MATHJS_STRINGS.SQUARE_METER
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
      unit: MATHJS_STRINGS.SQUARE_CENTIMETER
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
      unit: MATHJS_STRINGS.SQUARE_METER
    },
    recommendedOutputPresetIds: ["area:schedule-square-meter", "area:coating-square-meter"]
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
  "volume:process-tank": createSample({
    id: "volume:process-tank",
    quantity: QUANTITY_TYPES.VOLUME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Process Tank Volume",
    description: "Industrial tank or sump capacity for process and utility packages.",
    input: {
      value: 18.75,
      unit: MATHJS_STRINGS.CUBIC_METER
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
      unit: MATHJS_STRINGS.CUBIC_CENTIMETER
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
      unit: MATHJS_STRINGS.LITER
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
      unit: MATHJS_STRINGS.CUBIC_METER
    },
    recommendedOutputPresetIds: ["volume:process-cubic-meter", "volume:concrete-cubic-meter"]
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
  "angle:pipe-slope": createSample({
    id: "angle:pipe-slope",
    quantity: QUANTITY_TYPES.ANGLE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pipe Slope Angle",
    description: "Process and drainage slope angle for routing and fabrication drawings.",
    input: {
      value: 1.5,
      unit: MATHJS_STRINGS.DEGREE
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
      unit: MATHJS_STRINGS.RADIAN
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
      unit: MATHJS_STRINGS.DEGREE
    },
    recommendedOutputPresetIds: ["angle:annotation-symbol", "angle:slope-symbol"]
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
  "temperature:chilled-water": createSample({
    id: "temperature:chilled-water",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Chilled Water Supply",
    description: "Mechanical chilled water supply temperature for plant and HVAC coordination.",
    input: {
      value: 6,
      unit: MATHJS_STRINGS.DEGREE_CELSIUS
    },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:celsius-process"]
  }),
  "temperature:furnace-shell": createSample({
    id: "temperature:furnace-shell",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Furnace Shell Limit",
    description: "Industrial equipment limit frequently communicated in Fahrenheit for supplier interfaces.",
    input: {
      value: 180,
      unit: MATHJS_STRINGS.DEGREE_FAHRENHEIT
    },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:reactor-jacket": createSample({
    id: "temperature:reactor-jacket",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Reactor Jacket Temperature",
    description: "Process engineering setpoint exchanged in Kelvin for thermodynamic calculations.",
    input: {
      value: 338.15,
      unit: MATHJS_STRINGS.KELVIN
    },
    recommendedOutputPresetIds: ["temperature:process-kelvin", "temperature:celsius-process"]
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
  "mass:valve-assembly": createSample({
    id: "mass:valve-assembly",
    quantity: QUANTITY_TYPES.MASS,
    valueType: VALUE_TYPES.FLOAT,
    name: "Valve Assembly Mass",
    description: "Industrial valve mass used in supports, handling, and procurement schedules.",
    input: {
      value: 48.3,
      unit: MATHJS_STRINGS.KILOGRAM
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
      unit: MATHJS_STRINGS.KILOGRAM
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
      unit: MATHJS_STRINGS.KILOGRAM
    },
    recommendedOutputPresetIds: ["mass:shipping-kilogram", "mass:rigging-kilogram"]
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
  "force:baseplate-reaction": createSample({
    id: "force:baseplate-reaction",
    quantity: QUANTITY_TYPES.FORCE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Baseplate Reaction",
    description: "Structural reaction used in baseplate, grout, and anchor sizing checks.",
    input: {
      value: 125,
      unit: MATHJS_STRINGS.KILONEWTON
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
      unit: MATHJS_STRINGS.NEWTON
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
      unit: MATHJS_STRINGS.KILONEWTON
    },
    recommendedOutputPresetIds: ["force:loadcase-kilonewton", "force:structural-kilonewton"]
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
  "pressure:pump-discharge": createSample({
    id: "pressure:pump-discharge",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Pump Discharge Pressure",
    description: "Industrial pumping discharge pressure for piping and rotating equipment coordination.",
    input: {
      value: 8.5,
      unit: MATHJS_STRINGS.BAR
    },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  }),
  "pressure:vessel-design": createSample({
    id: "pressure:vessel-design",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.FLOAT,
    name: "Vessel Design Pressure",
    description: "Pressure vessel or skid design pressure often checked in MPa and bar.",
    input: {
      value: 1.6,
      unit: MATHJS_STRINGS.MEGAPASCAL
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
  }),
  "time:concrete-curing": createSample({
    id: "time:concrete-curing",
    quantity: QUANTITY_TYPES.TIME,
    valueType: VALUE_TYPES.FLOAT,
    name: "Concrete Curing Window",
    description: "Concrete curing or waiting window used in planning and execution sequences.",
    input: {
      value: 72,
      unit: MATHJS_STRINGS.HOUR
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
      unit: MATHJS_STRINGS.MINUTE
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
      unit: MATHJS_STRINGS.HOUR
    },
    recommendedOutputPresetIds: ["time:schedule-hour", "time:curing-hour"]
  }),
  "ratio:valve-opening": createSample({
    id: "ratio:valve-opening",
    quantity: QUANTITY_TYPES.RATIO,
    valueType: VALUE_TYPES.FLOAT,
    name: "Valve Opening",
    description: "Control valve opening percentage used in industrial operations dashboards.",
    input: {
      value: 85,
      unit: MATHJS_STRINGS.PERCENT
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
      unit: MATHJS_STRINGS.PERCENT
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
      unit: MATHJS_STRINGS.PERCENT
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
      unit: MATHJS_STRINGS.PERCENT
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