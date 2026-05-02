/**
 * @fileoverview Parameter samples for the PRESSURE quantity.
 * Covers all supported units: Pa, kPa, MPa, bar.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const PRESSURE_SAMPLES = Object.freeze({

  // -- kPa --
  "pressure:duct-static": createSample({
    id: "pressure:duct-static",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Duct Static Pressure",
    description: "HVAC medium-pressure supply duct static -- 0.5 kPa (2 in w.g.) per ASHRAE HVAC Systems Handbook.",
    input: { value: 0.5, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:instrumentation-pascal"]
  }),
  "pressure:compressed-air": createSample({
    id: "pressure:compressed-air",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Compressed Air Header",
    description: "Plant utility pressure for pneumatic systems and distribution headers.",
    input: { value: 690, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:water-main-city": createSample({
    id: "pressure:water-main-city",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "City Water Main Pressure",
    description: "Typical municipal water main -- 60 psi (414 kPa) per AWWA standards.",
    input: { value: 414, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:pump-head-100ft": createSample({
    id: "pressure:pump-head-100ft",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Pump Head 100 ft H₂O",
    description: "Pump discharge head -- 100 ft water column = 298.9 kPa (43.4 psi) per HI.",
    input: { value: 298.9, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:hvac-kilopascal"]
  }),
  "pressure:wind-100mph": createSample({
    id: "pressure:wind-100mph",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Wind Pressure 100 mph",
    description: "ASCE 7 wind pressure at 100 mph exposure C -- 25.6 psf (1.225 kPa).",
    input: { value: 1.225, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:instrumentation-pascal"]
  }),
  "pressure:soil-bearing-3000psf": createSample({
    id: "pressure:soil-bearing-3000psf",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Soil Bearing 3000 psf",
    description: "Allowable soil bearing -- 3,000 psf (143.6 kPa) for medium sand/clay per IBC.",
    input: { value: 143.6, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal"]
  }),
  "pressure:fire-hydrant": createSample({
    id: "pressure:fire-hydrant",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Fire Hydrant Flow Pressure",
    description: "Minimum residual hydrant pressure -- 20 psi (138 kPa) per NFPA 24.",
    input: { value: 138, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),

  // -- MPa --
  "pressure:vessel-design": createSample({
    id: "pressure:vessel-design",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Vessel Design Pressure",
    description: "Pressure vessel or skid design pressure per ASME Section VIII Div 1.",
    input: { value: 1.6, unit: UNIT_TOKENS.MEGAPASCAL },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:ansi-150": createSample({
    id: "pressure:ansi-150",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "ANSI Class 150 Rating",
    description: "ANSI/ASME B16.5 Class 150 flange rating -- 285 psi (1.96 MPa) at 100 degF.",
    input: { value: 1.96, unit: UNIT_TOKENS.MEGAPASCAL },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:ansi-300": createSample({
    id: "pressure:ansi-300",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "ANSI Class 300 Rating",
    description: "ANSI/ASME B16.5 Class 300 flange rating -- 740 psi (5.1 MPa) at 100 degF.",
    input: { value: 5.1, unit: UNIT_TOKENS.MEGAPASCAL },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:concrete-cylinder-strength": createSample({
    id: "pressure:concrete-cylinder-strength",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Concrete Compressive Strength",
    description: "Standard f'c = 28 MPa (4000 psi) normal-weight concrete per ACI 318.",
    input: { value: 28, unit: UNIT_TOKENS.MEGAPASCAL },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),

  // -- bar --
  "pressure:pump-discharge": createSample({
    id: "pressure:pump-discharge",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Pump Discharge Pressure",
    description: "Industrial pumping discharge pressure for piping and rotating equipment coordination.",
    input: { value: 8.5, unit: UNIT_TOKENS.BAR },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  }),
  "pressure:steam-header-bar": createSample({
    id: "pressure:steam-header-bar",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Steam Distribution Header",
    description: "Low-pressure steam distribution header -- 3.5 bar(g) in process plants.",
    input: { value: 3.5, unit: UNIT_TOKENS.BAR },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  }),

  // -- Pa --
  "pressure:hvac-static-inwg": createSample({
    id: "pressure:hvac-static-inwg",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "HVAC Static (in wg to Pa)",
    description: "Fan static pressure -- 2.0 in w.g. = 498 Pa per ASHRAE.",
    input: { value: 498, unit: UNIT_TOKENS.PASCAL },
    recommendedOutputPresetIds: ["pressure:instrumentation-pascal", "pressure:hvac-kilopascal"]
  }),
  "pressure:cleanroom-differential": createSample({
    id: "pressure:cleanroom-differential",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Clean Room Differential Pressure",
    description: "ISO Class 7 clean room positive pressure -- 12.5 Pa above adjacent space per ISO 14644-4.",
    input: { value: 12.5, unit: UNIT_TOKENS.PASCAL },
    recommendedOutputPresetIds: ["pressure:instrumentation-pascal", "pressure:hvac-kilopascal"]
  }),

  // -- integer value type --
  "pressure:test-pressure-integer": createSample({
    id: "pressure:test-pressure-integer",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Hydro Test Pressure (Integer kPa)",
    description: "Hydrostatic test pressure for process piping -- 1500 kPa as integer per ASME B31.3.",
    input: { value: 1500, unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),

  // -- formula input forms --
  "pressure:formula-embedded-units": createSample({
    id: "pressure:formula-embedded-units",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Vessel Test (Formula)",
    description: "Pressure sum with embedded units -- 1.6 MPa + 0.5 bar.",
    input: { value: "=1.6 MPa + 0.5 bar", unit: UNIT_TOKENS.MEGAPASCAL },
    recommendedOutputPresetIds: ["pressure:vessel-megapascal", "pressure:piping-bar"]
  }),
  "pressure:formula-plain": createSample({
    id: "pressure:formula-plain",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Header Sum (Formula)",
    description: "Plain numeric formula without embedded units -- 250 + 690.",
    input: { value: "=250 + 690", unit: UNIT_TOKENS.KILOPASCAL },
    recommendedOutputPresetIds: ["pressure:hvac-kilopascal", "pressure:piping-bar"]
  }),
  "pressure:inline-unit": createSample({
    id: "pressure:inline-unit",
    quantity: QUANTITY_TYPES.PRESSURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Discharge (Inline)",
    description: "Numeric value with inline unit suffix -- 8.5bar.",
    input: { value: "8.5bar", unit: UNIT_TOKENS.BAR },
    recommendedOutputPresetIds: ["pressure:piping-bar", "pressure:vessel-megapascal"]
  })
});
