import { DOMAIN } from "../../constants/domain-catalog.mjs";

const TRUE_VALUES = Object.freeze([
  DOMAIN.BOOLEAN_TRUE,
  DOMAIN.BOOLEAN_YES,
  DOMAIN.BOOLEAN_ONE
]);

export class BooleanTextParser {
  parse(text) {
    const normalizedText = String(text).trim().toLowerCase();
    return TRUE_VALUES.includes(normalizedText);
  }
}

export const booleanTextParser = new BooleanTextParser();

export const parseBoolean = (text) => booleanTextParser.parse(text);