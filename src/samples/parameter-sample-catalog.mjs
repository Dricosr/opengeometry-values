/**
 * @fileoverview Parameter sample catalog index.
 * Merges all per-quantity sample objects into a single frozen catalog and
 * exposes the same public API as before: ParameterSampleCatalog, parameterSampleCatalog,
 * and PARAMETER_SAMPLES.
 */

import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { LENGTH_SAMPLES } from "./length-samples.mjs";
import { AREA_SAMPLES } from "./area-samples.mjs";
import { VOLUME_SAMPLES } from "./volume-samples.mjs";
import { ANGLE_SAMPLES } from "./angle-samples.mjs";
import { TEMPERATURE_SAMPLES } from "./temperature-samples.mjs";
import { MASS_SAMPLES } from "./mass-samples.mjs";
import { FORCE_SAMPLES } from "./force-samples.mjs";
import { PRESSURE_SAMPLES } from "./pressure-samples.mjs";
import { TIME_SAMPLES } from "./time-samples.mjs";
import { RATIO_SAMPLES } from "./ratio-samples.mjs";
import { BOOL_SAMPLES } from "./bool-samples.mjs";
import { COUNT_SAMPLES } from "./count-samples.mjs";

const PARAMETER_SAMPLE_ENTRIES = Object.freeze({
  ...LENGTH_SAMPLES,
  ...AREA_SAMPLES,
  ...VOLUME_SAMPLES,
  ...ANGLE_SAMPLES,
  ...TEMPERATURE_SAMPLES,
  ...MASS_SAMPLES,
  ...FORCE_SAMPLES,
  ...PRESSURE_SAMPLES,
  ...TIME_SAMPLES,
  ...RATIO_SAMPLES,
  ...BOOL_SAMPLES,
  ...COUNT_SAMPLES
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
