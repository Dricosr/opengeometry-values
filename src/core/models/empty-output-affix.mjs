import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { OutputAffix } from "./output-affix.mjs";

export class EmptyOutputAffix extends OutputAffix {
  constructor({ id } = {}) {
    super({
      id,
      type: OUTPUT_AFFIX_TYPES.NONE
    });

    Object.freeze(this);
  }
}