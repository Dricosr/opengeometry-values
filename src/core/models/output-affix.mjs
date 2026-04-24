import { createReferenceId } from "../base/create-reference-id.mjs";

export class OutputAffix {
  constructor({ id, type }) {
    this.id = createReferenceId("affix", id);
    this.type = type;
  }

  resolveText() {
    return "";
  }
}