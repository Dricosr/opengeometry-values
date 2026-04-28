import { DOMAIN_STRINGS } from "../../constants/domain-string-catalog.mjs";

/**
 * Enum for common inch fraction denominator types.
 * Based on ANSI/ASME Y14.5 and ISO 129-1 standards.
 * @readonly
 * @enum {string}
 */
export const FRACTIONAL_INCH_DENOMINATORS = Object.freeze({
  /** Construction, general fabrication (e.g., NPS pipe diameters) */
  CONSTRUCTION: "construction",
  /** Precision fabrication (e.g., sheet metal, plate thickness) */
  PRECISION: "precision",
  /** Machining and tooling */
  MACHINING: "machining",
  /** Fine machining and tool & die */
  FINE: "fine"
});

/** Map denominator categories to max denominator values */
const DENOMINATOR_LIMITS = Object.freeze({
  [FRACTIONAL_INCH_DENOMINATORS.CONSTRUCTION]: 16,
  [FRACTIONAL_INCH_DENOMINATORS.PRECISION]: 32,
  [FRACTIONAL_INCH_DENOMINATORS.MACHINING]: 64,
  [FRACTIONAL_INCH_DENOMINATORS.FINE]: 128
});

/** Default denominator limit */
const DEFAULT_MAX_DENOMINATOR = 64;

/**
 * Parser for fractional inch input strings (e.g., "1 1/4", "1/2", "3/4").
 *
 * Accepts the following patterns per ANSI/ASME Y14.5:
 * - Mixed number:   "1 1/4"  (space between integer and fraction)
 * - Pure fraction:  "3/4"    (value < 1)
 * - Integer:        "2"      (no fraction)
 * - Decimal fallback: "1.25" (standard decimal is also accepted)
 *
 * Hyphen usage:
 * - Leading hyphen is the negative sign: "-1 1/4", "-3/4"
 * - Hyphen is NOT a valid separator between whole and fraction
 *   ("1-1/4" is not accepted — use "1 1/4" with a space)
 *
 * Validation rules:
 * - Denominator must be a power of 2 (2, 4, 8, 16, 32, 64, 128)
 * - Fraction must be proper (numerator < denominator)
 * - Numerator and denominator must be positive integers
 */
export class FractionalInchParser {
  /**
   * @param {Object} [options]
   * @param {string} [options.denominatorCategory] - Max denominator category
   * @param {number} [options.maxDenominator] - Explicit max denominator (takes precedence over denominatorCategory)
   */
  constructor({ denominatorCategory = FRACTIONAL_INCH_DENOMINATORS.MACHINING, maxDenominator } = {}) {
    this.maxDenominator = maxDenominator ?? DENOMINATOR_LIMITS[denominatorCategory] ?? DEFAULT_MAX_DENOMINATOR;
  }

  /**
   * Checks if a text string can be parsed as a fractional inch value.
   * @param {string} text
   * @returns {boolean}
   */
  canParse(text) {
    try {
      this.parse(text);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Parses a fractional inch string to a decimal number.
   * @param {string} text
   * @returns {number} Decimal value in inches
   * @throws {Error} If the text does not match a valid fractional inch pattern
   */
  parse(text) {
    const normalizedText = String(text).trim();

    if (!normalizedText) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Check if it's already a valid decimal number (delegate to standard number)
    if (/^-?\d+(\.\d+)?$/u.test(normalizedText)) {
      const val = Number(normalizedText);
      // Normalize -0 to 0
      return val === 0 ? 0 : val;
    }

    // Detect and extract leading negative sign.
    // The negative sign applies to the entire value, so we parse the positive form
    // and negate the result. This avoids issues like -1 + 1/4 = -0.75 instead of -1.25.
    const isNegative = normalizedText.startsWith("-");
    const positiveText = isNegative ? normalizedText.slice(1).trimStart() : normalizedText;

    // Try pure fraction first: digits/digits with no whole part
    const PURE_FRACTION_PATTERN = /^(\d+)\/(\d+)$/u;
    const pureMatch = PURE_FRACTION_PATTERN.exec(positiveText);

    if (pureMatch) {
      const numerator = parseInt(pureMatch[1], 10);
      const denominator = parseInt(pureMatch[2], 10);
      const fractionalValue = this.validateAndComputeFraction(numerator, denominator, text);
      return isNegative ? -fractionalValue : fractionalValue;
    }

    // Try mixed number: whole digits, one or more spaces, then fraction
    const MIXED_NUMBER_PATTERN = /^(\d+)\s+(\d+)\/(\d+)$/u;
    const mixedMatch = MIXED_NUMBER_PATTERN.exec(positiveText);

    if (mixedMatch) {
      const wholeValue = parseInt(mixedMatch[1], 10);
      const numerator = parseInt(mixedMatch[2], 10);
      const denominator = parseInt(mixedMatch[3], 10);
      const fractionalValue = this.validateAndComputeFraction(numerator, denominator, text);
      const result = wholeValue + fractionalValue;
      return isNegative ? -result : result;
    }

    throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
  }

  validateAndComputeFraction(numerator, denominator, originalText) {
    if (denominator <= 0) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${originalText}`);
    }

    if (!this.isPowerOfTwo(denominator)) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${originalText}`);
    }

    if (denominator > this.maxDenominator) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${originalText}`);
    }

    if (numerator <= 0) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${originalText}`);
    }

    if (numerator >= denominator) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${originalText}`);
    }

    return numerator / denominator;
  }

  isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
  }
}

export const fractionalInchParser = new FractionalInchParser();

export const parseFractionalInch = (text) => fractionalInchParser.parse(text);
