import { unit as mathjsUnit } from "../mathjs-api.mjs";

// Matches a number (with optional decimal) followed by optional whitespace and a unit token.
// Examples: "2m", "4000mm", "2.5 m^2", "100 degC", "-5 degF"
const NUMERIC_WITH_UNIT = /^(-?\d+(?:\.\d+)?)\s*(\S.*)$/u;

export class UnitInputParser {
  canParse(text) {
    const str = String(text).trim();
    const match = NUMERIC_WITH_UNIT.exec(str);

    if (!match) {
      return false;
    }

    const candidate = match[2].trim();

    try {
      mathjsUnit(1, candidate);
      return true;
    } catch {
      return false;
    }
  }

  parse(text) {
    const str = String(text).trim();
    const match = NUMERIC_WITH_UNIT.exec(str);

    if (!match) {
      throw new Error(`Not a unit input: ${text}`);
    }

    const candidate = match[2].trim();

    try {
      mathjsUnit(1, candidate);
    } catch {
      throw new Error(`Unknown unit in input: ${text}`);
    }

    return { value: Number(match[1]), unit: candidate };
  }
}

export const unitInputParser = new UnitInputParser();

export const parseUnitInput = (text) => unitInputParser.parse(text);
