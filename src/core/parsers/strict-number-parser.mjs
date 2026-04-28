import { DOMAIN } from "../../constants/domain-catalog.mjs";

const STRICT_NUMBER_PATTERN = /^-?\d+(\.\d+)?$/u;

export class StrictNumberParser {
  parse(text) {
    const normalizedText = String(text).trim();

    if (!STRICT_NUMBER_PATTERN.test(normalizedText)) {
      throw new Error(`${DOMAIN.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    return Number(normalizedText);
  }
}

export const strictNumberParser = new StrictNumberParser();

export const parseNumber = (text) => strictNumberParser.parse(text);