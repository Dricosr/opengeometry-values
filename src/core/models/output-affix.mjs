import { assertCatalogValue } from "../base/assert-catalog-value.mjs";
import { createReferenceId } from "../base/create-reference-id.mjs";
import { outputAffixTypeCatalog } from "../../constants/output-affix-types.mjs";

export class OutputAffix {
  constructor({ id, type }) {
    assertCatalogValue(type, outputAffixTypeCatalog, "OUTPUT_AFFIX_TYPES");

    this.id = createReferenceId("affix", id);
    this.type = type;
  }


  resolveText() {
    return "";
  }
}