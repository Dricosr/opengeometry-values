import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const AFFIX_TYPE_ENTRIES = Object.freeze({
  NONE: "none",
  CUSTOM_TEXT: "custom_text",
  UNIT_CODE: "unit_code",
  UNIT_SYMBOL: "unit_symbol"
});

export class AffixTypeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(AFFIX_TYPE_ENTRIES);
  }
}

export const affixTypeCatalog = new AffixTypeCatalog();
export const AFFIX_TYPES = affixTypeCatalog.all();
