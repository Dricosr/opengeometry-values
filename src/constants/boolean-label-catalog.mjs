import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const BOOLEAN_LABEL_ENTRIES = Object.freeze({
  YES_NO: Object.freeze({ 0: "No", 1: "Yes" }),
  ACTIVE_INACTIVE: Object.freeze({ 0: "Inactive", 1: "Active" }),
  ENABLED_DISABLED: Object.freeze({ 0: "Disabled", 1: "Enabled" }),
  INCLUDED_EXCLUDED: Object.freeze({ 0: "Excluded", 1: "Included" }),
  VALID_INVALID: Object.freeze({ 0: "Invalid", 1: "Valid" }),
  COMPLIANT_NON_COMPLIANT: Object.freeze({ 0: "Non-compliant", 1: "Compliant" }),
  LOCKED_UNLOCKED: Object.freeze({ 0: "Unlocked", 1: "Locked" }),
  VISIBLE_HIDDEN: Object.freeze({ 0: "Hidden", 1: "Visible" }),
  OPEN_CLOSED: Object.freeze({ 0: "Closed", 1: "Open" }),
  REVIEWED_NOT_REVIEWED: Object.freeze({ 0: "Not reviewed", 1: "Reviewed" }),
  APPROVED_NOT_APPROVED: Object.freeze({ 0: "Not approved", 1: "Approved" }),
  REQUIRED_NOT_REQUIRED: Object.freeze({ 0: "Not required", 1: "Required" }),
  APPLICABLE_NOT_APPLICABLE: Object.freeze({ 0: "Not applicable", 1: "Applicable" })
});

export class BooleanLabelCatalog extends ReadOnlyCatalog {
  constructor() {
    super(BOOLEAN_LABEL_ENTRIES);
  }
}

export const booleanLabelCatalog = new BooleanLabelCatalog();
export const BOOLEAN_LABEL_PRESETS = booleanLabelCatalog.all();
