import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const OUTPUT_SUFFIX_MODE_ENTRIES = Object.freeze({
  NONE: "none",
  CODE: "code",
  SYMBOL: "symbol",
  CUSTOM: "custom"
});

export class OutputSuffixModeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(OUTPUT_SUFFIX_MODE_ENTRIES);
  }
}

export const outputSuffixModeCatalog = new OutputSuffixModeCatalog();
export const OUTPUT_SUFFIX_MODES = outputSuffixModeCatalog.all();