import { DOMAIN_STRINGS } from "../../constants/domain-string-catalog.mjs";

const TRUE_VALUES = Object.freeze([
  DOMAIN_STRINGS.BOOLEAN_TRUE,
  DOMAIN_STRINGS.BOOLEAN_YES,
  DOMAIN_STRINGS.BOOLEAN_ONE
]);

export class BooleanTextParser {
  parse(text) {
    const normalizedText = String(text).trim().toLowerCase();
    return TRUE_VALUES.includes(normalizedText);
  }
}

export const booleanTextParser = new BooleanTextParser();

export const parseBoolean = (text) => booleanTextParser.parse(text);