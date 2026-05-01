import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { unitTokenCatalog } from "../../constants/unit-token-catalog.mjs";
import { unitSymbolCatalog } from "../../constants/unit-symbols.mjs";
import { OutputAffix } from "./output-affix.mjs";

export class UnitSymbolOutputAffix extends OutputAffix {
  constructor({ id, unit }) {
    assertCatalogValue(unit, unitTokenCatalog, "UNIT_TOKENS");

    super({
      id,
      type: OUTPUT_AFFIX_TYPES.UNIT_SYMBOL
    });

    this.unit = unit;


    Object.freeze(this);
  }

  resolveText() {
    return unitSymbolCatalog.get(this.unit) ?? this.unit ?? "";
  }
}