/**
 * @fileoverview Parameter samples for the TEMPERATURE quantity.
 * Covers all supported units: degC, degF, K.
 * All values are real AEC/industrial measurements.
 */

import { UNIT_TOKENS } from "../constants/unit-token-catalog.mjs";
import { QUANTITY_TYPES } from "../constants/quantity-types.mjs";
import { VALUE_TYPES } from "../constants/value-types.mjs";
import { createSample } from "./create-sample.mjs";

export const TEMPERATURE_SAMPLES = Object.freeze({

  // -- degC -------------------------------------------------------------
  "temperature:room-setpoint": createSample({
    id: "temperature:room-setpoint",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Room Setpoint",
    description: "HVAC room setpoint used in mechanical schedules.",
    input: { value: 22, unit: UNIT_TOKENS.DEGREE_CELSIUS },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:fahrenheit-room"]
  }),
  "temperature:chilled-water": createSample({
    id: "temperature:chilled-water",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Chilled Water Supply",
    description: "Mechanical chilled water supply temperature for plant and HVAC coordination.",
    input: { value: 6, unit: UNIT_TOKENS.DEGREE_CELSIUS },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:celsius-process"]
  }),
  "temperature:steam-saturated": createSample({
    id: "temperature:steam-saturated",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Saturated Steam at 7 bar",
    description: "Saturated steam temperature at 7 bar(g) -- 165 degC per steam tables.",
    input: { value: 165, unit: UNIT_TOKENS.DEGREE_CELSIUS },
    recommendedOutputPresetIds: ["temperature:celsius-process", "temperature:fahrenheit-room"]
  }),

  // -- degF -------------------------------------------------------------
  "temperature:furnace-shell": createSample({
    id: "temperature:furnace-shell",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Furnace Shell Limit",
    description: "Industrial equipment shell temperature limit -- 180 degF for ASME Section VIII Div 1.",
    input: { value: 180, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:weld-preheat": createSample({
    id: "temperature:weld-preheat",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Weld Preheat",
    description: "Minimum preheat temperature for 1in thick A36 steel -- 150 degF per AWS D1.1.",
    input: { value: 150, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:weld-interpass": createSample({
    id: "temperature:weld-interpass",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Weld Interpass",
    description: "Maximum interpass temperature for quenched-and-tempered steel -- 400 degF per AWS D1.1.",
    input: { value: 400, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:weld-postheat": createSample({
    id: "temperature:weld-postheat",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "PWHT Soak Temperature",
    description: "Post-weld heat treatment soak temp for carbon steel -- 1100 degF per ASME Section VIII.",
    input: { value: 1100, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:hvac-supply-air": createSample({
    id: "temperature:hvac-supply-air",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "HVAC Supply Air",
    description: "Typical cooling supply air temperature -- 55 degF (12.8 degC) for AHU.",
    input: { value: 55, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:hvac-return-air": createSample({
    id: "temperature:hvac-return-air",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "HVAC Return Air",
    description: "Typical return air temperature setpoint -- 75 degF (23.9 degC) per ASHRAE 55.",
    input: { value: 75, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-room"]
  }),
  "temperature:boiler-water": createSample({
    id: "temperature:boiler-water",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Boiler Water Temperature",
    description: "Hot water boiler supply -- 180 degF (82 degC) for hydronic heating per ASHRAE.",
    input: { value: 180, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:engine-coolant": createSample({
    id: "temperature:engine-coolant",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Engine Coolant Operating",
    description: "Diesel generator coolant operating temp -- 195 degF (90 degC).",
    input: { value: 195, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:asphalt-paving": createSample({
    id: "temperature:asphalt-paving",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Asphalt Paving Temperature",
    description: "Hot mix asphalt discharge temp -- 300 degF (149 degC) per AASHTO specs.",
    input: { value: 300, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:fire-protection-rating": createSample({
    id: "temperature:fire-protection-rating",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Fire Sprinkler Activation",
    description: "Standard fire sprinkler head activation temp -- 155 degF (68 degC) per NFPA 13.",
    input: { value: 155, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),
  "temperature:heat-treatment-anneal": createSample({
    id: "temperature:heat-treatment-anneal",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Annealing Temperature (Steel)",
    description: "Full anneal temp for low-carbon steel -- 1600 degF (871 degC) per ASTM A 919.",
    input: { value: 1600, unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  }),

  // -- K ----------------------------------------------------------------
  "temperature:reactor-jacket": createSample({
    id: "temperature:reactor-jacket",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Reactor Jacket Temperature",
    description: "Process reactor jacket setpoint -- 338.15 K (65 degC) for exothermic batch.",
    input: { value: 338.15, unit: UNIT_TOKENS.KELVIN },
    recommendedOutputPresetIds: ["temperature:process-kelvin", "temperature:celsius-process"]
  }),
  "temperature:cryogenic-nitrogen": createSample({
    id: "temperature:cryogenic-nitrogen",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Liquid Nitrogen Boiling Point",
    description: "LN2 boiling point at 1 atm -- 77.36 K per NIST data.",
    input: { value: 77.36, unit: UNIT_TOKENS.KELVIN },
    recommendedOutputPresetIds: ["temperature:process-kelvin", "temperature:celsius-process"]
  }),

  // -- formula input forms ----------------------------------------------
  "temperature:formula-plain": createSample({
    id: "temperature:formula-plain",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Temp Rise (Formula)",
    description: "Plain numeric formula without embedded units -- 22 + 8.",
    input: { value: "=22 + 8", unit: UNIT_TOKENS.DEGREE_CELSIUS },
    recommendedOutputPresetIds: ["temperature:celsius-room", "temperature:celsius-process"]
  }),
  "temperature:formula-embedded-units": createSample({
    id: "temperature:formula-embedded-units",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Setpoint Difference (Formula)",
    description: "Temperature difference formula with embedded units -- 338.15 K - 273.15 K.",
    input: { value: "=338.15 K - 273.15 K", unit: UNIT_TOKENS.KELVIN },
    recommendedOutputPresetIds: ["temperature:process-kelvin", "temperature:celsius-process"]
  }),
  "temperature:inline-unit": createSample({
    id: "temperature:inline-unit",
    quantity: QUANTITY_TYPES.TEMPERATURE,
    valueType: VALUE_TYPES.NUMBER,
    name: "Furnace Limit (Inline)",
    description: "Numeric value with inline unit suffix -- 180degF.",
    input: { value: "180degF", unit: UNIT_TOKENS.DEGREE_FAHRENHEIT },
    recommendedOutputPresetIds: ["temperature:fahrenheit-room", "temperature:celsius-process"]
  })
});
