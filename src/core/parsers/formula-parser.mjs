import { evaluate, typeOf, unit as mathjsUnit } from "mathjs";

const FORMULA_PREFIX = "=";

// mathjs `min` is a function — replace standalone `min` unit tokens before evaluating
const MIN_UNIT_RE = /\bmin\b(?!\s*\()/g;

const normalizeExpression = (expr) => expr.replace(MIN_UNIT_RE, "minute");

export class FormulaParser {
  isFormula(text) {
    return typeof text === "string" && text.startsWith(FORMULA_PREFIX);
  }

  /**
   * Evaluates a formula that returns a plain number.
   * Throws for formulas that evaluate to a mathjs Unit (use parseWithUnit for those).
   */
  parse(text) {
    const withoutPrefix = text.slice(FORMULA_PREFIX.length).trim();

    if (withoutPrefix === "") {
      throw new Error(`Empty formula expression: ${text}`);
    }

    let result;

    try {
      result = evaluate(normalizeExpression(withoutPrefix));
    } catch {
      throw new Error(`Invalid formula expression: ${text}`);
    }

    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error(`Formula must evaluate to a finite number: ${text}`);
    }

    return result;
  }

  /**
   * Evaluates a formula and returns full metadata:
   * - mathjsUnit: the mathjs Unit object when the expression carries units (null otherwise)
   * - value: the plain numeric result when dimensionless (null otherwise)
   * - cleanText: the original formula text as-is
   * - hasEmbeddedUnits: true when the expression resolved to a mathjs Unit
   */
  parseWithUnit(text) {
    const withoutPrefix = text.slice(FORMULA_PREFIX.length).trim();

    if (withoutPrefix === "") {
      throw new Error(`Empty formula expression: ${text}`);
    }

    let result;

    try {
      result = evaluate(normalizeExpression(withoutPrefix));
    } catch {
      throw new Error(`Invalid formula expression: ${text}`);
    }

    if (typeOf(result) === "Unit") {
      return {
        mathjsUnit: result,
        value: null,
        cleanText: text,
        hasEmbeddedUnits: true
      };
    }

    if (typeof result !== "number" || !isFinite(result)) {
      throw new Error(`Formula must evaluate to a finite number: ${text}`);
    }

    return {
      mathjsUnit: null,
      value: result,
      cleanText: text,
      hasEmbeddedUnits: false
    };
  }

  extractTrailingUnit(expression) {
    const lastSpaceIdx = expression.lastIndexOf(" ");

    if (lastSpaceIdx === -1) {
      return { expression, unit: null };
    }

    const candidate = expression.slice(lastSpaceIdx + 1);
    const expressionPart = expression.slice(0, lastSpaceIdx).trim();

    if (!expressionPart) {
      return { expression, unit: null };
    }

    try {
      mathjsUnit(1, candidate);
      return { expression: expressionPart, unit: candidate };
    } catch {
      return { expression, unit: null };
    }
  }
}

export const formulaParser = new FormulaParser();

export const parseFormula = (text) => formulaParser.parse(text);
