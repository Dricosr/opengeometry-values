import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

const DOMAIN_ENTRIES = Object.freeze({
  BOOLEAN_TRUE: "true",
  BOOLEAN_YES: "yes",
  BOOLEAN_ONE: "1",
  ERROR_CODE_INVALID_NUMERIC_VALUE: "invalid_numeric_value",
  ERROR_CODE_INVALID_INTEGER_VALUE: "invalid_integer_value",
  ERROR_CODE_UNKNOWN_INPUT_UNIT: "unknown_input_unit",
  ERROR_CODE_UNSUPPORTED_INPUT_UNIT: "unsupported_input_unit",
  ERROR_CODE_INCOMPATIBLE_INPUT_UNIT: "incompatible_input_unit",
  ERROR_CODE_INVALID_FORMULA_EXPRESSION: "invalid_formula_expression",
  ERROR_FIELD_VALUE: "value",
  ERROR_FIELD_UNIT: "unit",
  ERROR_INVALID_NUMERIC_VALUE_PREFIX: "Invalid numeric value",
  ERROR_INVALID_INTEGER_VALUE_PREFIX: "Invalid integer value",
  ERROR_UNKNOWN_INPUT_UNIT_PREFIX: "Unknown input unit",
  ERROR_UNSUPPORTED_INPUT_UNIT_PREFIX: "Unsupported input unit",
  ERROR_INCOMPATIBLE_INPUT_UNIT_PREFIX: "Input unit is not compatible with quantity",
  ERROR_INVALID_FORMULA_EXPRESSION_PREFIX: "Invalid formula expression",
  SPACE: " "
});

export class DomainCatalog extends ReadOnlyCatalog {
  constructor() {
    super(DOMAIN_ENTRIES);
  }
}

export const domainCatalog = new DomainCatalog();
export const DOMAIN = domainCatalog.all();

// Backward-compat aliases (deprecated - prefer DOMAIN / domainCatalog / DomainCatalog)
export { DomainCatalog as DomainStringCatalog, domainCatalog as domainStringCatalog, DOMAIN as DOMAIN_STRINGS };
