import { unitConverter } from "../convert-value.mjs";

/**
 * Formatter that converts decimal inch values to fractional inch strings.
 *
 * Converts according to ANSI/ASME Y14.5 standards:
 * - "1 1/4" for 1.25 (mixed number with space)
 * - "1/2" for 0.5 (pure fraction for values < 1")
 * - "2" for 2.0 (integer only, no fraction)
 * - "-1 1/4" for -1.25 (negative mixed number)
 *
 * Uses continued fractions algorithm to find the best fraction approximation
 * up to the specified max denominator.
 */
export class FractionalInchFormatter {
  /**
   * @param {Object} [options]
   * @param {number} [options.maxDenominator=64] - Maximum denominator to use (must be power of 2)
   * @param {Object} [options.converter] - Unit converter dependency
   */
  constructor({ maxDenominator = 64, converter = unitConverter } = {}) {
    this.maxDenominator = maxDenominator;
    this.converter = converter;
  }

  /**
   * Formats an OpenGeometry value as a fractional inch string.
   * The value is converted from internal unit to inches first.
   *
   * @param {object} ogValue - OpenGeometry value object
   * @param {object} [options]
   * @param {number} [options.precision] - Not used for fractional output, kept for interface compatibility
   * @returns {string} Fractional inch string (e.g., "1 1/4")
   */
  formatNumber(ogValue, _displayUnit, _requestedPrecision) {
    const valueInInches = this.converter.convert({
      value: ogValue.internal.value,
      fromUnit: ogValue.internal.unit,
      toUnit: "in"
    });

    return this.decimalToFraction(valueInInches);
  }

  /**
   * Converts a decimal number to a fractional inch string.
   *
   * @param {number} decimal - Value in inches
   * @returns {string} Fractional representation (e.g., "1 1/4", "1/2", "3")
   */
  decimalToFraction(decimal) {
    if (!isFinite(decimal)) {
      return String(decimal);
    }

    // Handle negative values
    if (decimal < 0) {
      return `-${this.decimalToFraction(-decimal)}`;
    }

    const wholePart = Math.floor(decimal);
    const fractionalPart = decimal - wholePart;

    // If no fractional part (or near-zero), return whole number
    if (fractionalPart < 1e-10) {
      return String(wholePart);
    }

    // Find best fraction approximation
    const { numerator, denominator } = this.approximateFraction(fractionalPart, this.maxDenominator);

    // If numerator rounds to 0, just return the whole part
    if (numerator === 0) {
      return String(wholePart);
    }

    // Reduce fraction
    const { numerator: reducedNum, denominator: reducedDen } = this.reduceFraction(numerator, denominator);

    if (wholePart === 0) {
      return `${reducedNum}/${reducedDen}`;
    }

    return `${wholePart} ${reducedNum}/${reducedDen}`;
  }

  /**
   * Finds the best fraction approximation for a decimal value
   * using continued fractions, capped at maxDenominator.
   *
   * @param {number} value - Fractional part (0 < value < 1)
   * @param {number} maxDenominator - Maximum denominator
   * @returns {{ numerator: number, denominator: number }}
   */
  approximateFraction(value, maxDenominator) {
    let bestNumer = 0;
    let bestDenom = 1;
    let bestError = Infinity;

    for (let denom = 1; denom <= maxDenominator; denom++) {
      const numer = Math.round(value * denom);
      const error = Math.abs(value - numer / denom);

      if (error < bestError) {
        bestError = error;
        bestNumer = numer;
        bestDenom = denom;

        // Early exit if we found an exact match
        if (error < 1e-12) {
          break;
        }
      }
    }

    return { numerator: bestNumer, denominator: bestDenom };
  }

  /**
   * Reduces a fraction to its simplest form using GCD.
   *
   * @param {number} numerator
   * @param {number} denominator
   * @returns {{ numerator: number, denominator: number }}
   */
  reduceFraction(numerator, denominator) {
    if (numerator === 0) {
      return { numerator: 0, denominator: 1 };
    }

    const gcd = this.gcd(numerator, denominator);
    return {
      numerator: numerator / gcd,
      denominator: denominator / gcd
    };
  }

  /**
   * Greatest common divisor using Euclidean algorithm.
   */
  gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b > 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}

export const fractionalInchFormatter = new FractionalInchFormatter();
