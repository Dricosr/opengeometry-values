import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { OutputAffix } from "./output-affix.mjs";

export class UnitCodeOutputAffix extends OutputAffix {
  constructor({ id, unit }) {
    super({
      id,
      type: OUTPUT_AFFIX_TYPES.UNIT_CODE
    });

    this.unit = unit;

    Object.freeze(this);
  }

  resolveText() {
    return this.unit ?? "";
  }
}