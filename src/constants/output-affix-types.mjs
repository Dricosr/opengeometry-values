import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const OUTPUT_AFFIX_TYPE_ENTRIES = Object.freeze({
  NONE: "none",
  CUSTOM_TEXT: "custom_text",
  UNIT_CODE: "unit_code",
  UNIT_SYMBOL: "unit_symbol"
});

export class OutputAffixTypeCatalog extends ReadOnlyCatalog {
  constructor() {
    super(OUTPUT_AFFIX_TYPE_ENTRIES);
  }
}

export const outputAffixTypeCatalog = new OutputAffixTypeCatalog();
export const OUTPUT_AFFIX_TYPES = outputAffixTypeCatalog.all();