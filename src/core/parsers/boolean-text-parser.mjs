import { DOMAIN } from "../../constants/domain-catalog.mjs";
import { ValueInputError } from "../errors/value-input-error.mjs";

const TRUE_VALUES = Object.freeze([
  DOMAIN.BOOLEAN_TRUE,
  DOMAIN.BOOLEAN_YES,
  DOMAIN.BOOLEAN_ONE
]);

export class BooleanTextParser {
  parse(text) {
    const str = String(text).trim();

    // Reject formulas — boolean does not support formula expressions
    if (str.startsWith("=")) {
      throw new ValueInputError({
        code: DOMAIN.ERROR_CODE_INVALID_FORMULA_EXPRESSION,
        field: DOMAIN.ERROR_FIELD_VALUE,
        message: `${DOMAIN.ERROR_INVALID_FORMULA_EXPRESSION_PREFIX}: ${text}`,
        value: text,
        valueType: "boolean",
        quantity: null,
        unit: null
      });
    }

    const normalizedText = str.toLowerCase();
    return TRUE_VALUES.includes(normalizedText);
  }
}

export const booleanTextParser = new BooleanTextParser();

export const parseBoolean = (text) => booleanTextParser.parse(text);