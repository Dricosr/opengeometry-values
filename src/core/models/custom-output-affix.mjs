import { OUTPUT_AFFIX_TYPES } from "../../constants/output-affix-types.mjs";
import { OutputAffix } from "./output-affix.mjs";

export class CustomOutputAffix extends OutputAffix {
  constructor({ id, characters }) {
    super({
      id,
      type: OUTPUT_AFFIX_TYPES.CUSTOM_TEXT
    });

    this.characters = String(characters ?? "");

    Object.freeze(this);
  }

  resolveText() {
    return this.characters;
  }
}