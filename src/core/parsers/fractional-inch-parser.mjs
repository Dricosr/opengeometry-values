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
 * Parser for fractional inch input strings (e.g., "1 1/4", "1/2", "3/4", "1-1/4").
 *
 * Accepts the following patterns per ANSI/ASME Y14.5:
 * - Mixed number:   "1 1/4"  (space between integer and fraction)
 * - Mixed number:   "1-1/4"  (hyphen between integer and fraction - optional)
 * - Pure fraction:  "3/4"    (value < 1)
 * - Integer:        "2"      (no fraction)
 * - Decimal fallback: "1.25" (standard decimal is also accepted)
 *
 * Edge cases:
 * - Negative values: "-1 1/4"
 * - Zero: "0", "0 1/2"
 *
 * Validation rules:
 * - Denominator must be a power of 2 (2, 4, 8, 16, 32, 64, 128)
 * - Fraction must be proper (numerator < denominator)
 * - Numerator and denominator must be positive integers
 */
export class FractionalInchParser {
  /**
   * @param {Object} [options]
   * @param {string} [options.denominatorCategory="machining"] - Max denominator category
   */
  constructor({ denominatorCategory = FRACTIONAL_INCH_DENOMINATORS.MACHINING } = {}) {
    this.maxDenominator = DENOMINATOR_LIMITS[denominatorCategory] ?? DEFAULT_MAX_DENOMINATOR;
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
      return Number(normalizedText);
    }

    // Detect and extract leading negative sign
    // The negative sign applies to the entire value, so we parse the positive form
    // and negate the result. This avoids issues like -1 + 1/4 = -0.75 instead of -1.25.
    const isNegative = normalizedText.startsWith("-");
    const positiveText = isNegative ? normalizedText.slice(1).trimStart() : normalizedText;

    // Pattern: optional whole number, optional dash/space, then fraction
    // Accepts both space-separated ("1 1/4") and hyphen-separated ("1-1/4")
    const FRACTION_PATTERN = /^(\d+)?\s*[- ]?\s*(\d+)\/(\d+)$/u;
    const match = FRACTION_PATTERN.exec(positiveText);

    if (!match) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    const wholePart = match[1] !== undefined ? match[1] : null;
    const numerator = parseInt(match[2], 10);
    const denominator = parseInt(match[3], 10);

    // Validate denominator is a positive integer
    if (denominator <= 0) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Validate denominator is a power of 2
    if (!this.isPowerOfTwo(denominator)) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Validate denominator does not exceed max
    if (denominator > this.maxDenominator) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Validate numerator is a positive integer
    if (numerator <= 0) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Validate fraction is proper (numerator < denominator)
    if (numerator >= denominator) {
      throw new Error(`${DOMAIN_STRINGS.ERROR_INVALID_NUMERIC_VALUE_PREFIX}: ${text}`);
    }

    // Calculate decimal value
    const fractionalValue = numerator / denominator;
    const wholeValue = wholePart !== null ? parseInt(wholePart, 10) : 0;
    const result = wholeValue + fractionalValue;

    return isNegative ? -result : result;
  }

  isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
  }
}

export const fractionalInchParser = new FractionalInchParser();

export const parseFractionalInch = (text) => fractionalInchParser.parse(text);
