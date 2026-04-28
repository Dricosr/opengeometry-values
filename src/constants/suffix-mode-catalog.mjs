import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const SUFFIX_MODE_ENTRIES = Object.freeze({
  NONE: "none",
  CODE: "code",
  SYMBOL: "symbol",
  CUSTOM: "custom"
});

export class SuffixModeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(SUFFIX_MODE_ENTRIES);
  }
}

export const suffixModeCatalog = new SuffixModeCatalog();
export const SUFFIX_MODES = suffixModeCatalog.all();
