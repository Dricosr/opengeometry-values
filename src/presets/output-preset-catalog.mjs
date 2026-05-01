import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";
import { LENGTH_PRESETS } from "./length-presets.mjs";
import { AREA_PRESETS } from "./area-presets.mjs";
import { VOLUME_PRESETS } from "./volume-presets.mjs";
import { ANGLE_PRESETS } from "./angle-presets.mjs";
import { TEMPERATURE_PRESETS } from "./temperature-presets.mjs";
import { MASS_PRESETS } from "./mass-presets.mjs";
import { FORCE_PRESETS } from "./force-presets.mjs";
import { PRESSURE_PRESETS } from "./pressure-presets.mjs";
import { TIME_PRESETS } from "./time-presets.mjs";
import { RATIO_PRESETS } from "./ratio-presets.mjs";
import { BOOL_PRESETS } from "./bool-presets.mjs";
import { COUNT_PRESETS } from "./count-presets.mjs";

const OUTPUT_PRESET_ENTRIES = Object.freeze({
  ...LENGTH_PRESETS,
  ...AREA_PRESETS,
  ...VOLUME_PRESETS,
  ...ANGLE_PRESETS,
  ...TEMPERATURE_PRESETS,
  ...MASS_PRESETS,
  ...FORCE_PRESETS,
  ...PRESSURE_PRESETS,
  ...TIME_PRESETS,
  ...RATIO_PRESETS,
  ...BOOL_PRESETS,
  ...COUNT_PRESETS
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
