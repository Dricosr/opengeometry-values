import { ReadOnlyCatalog } from "../core/base/read-only-catalog.mjs";

/**
 * Fractional inch separator types.
 * @readonly
 * @enum {string}
 */
const FRACTIONAL_SEPARATOR_ENTRIES = Object.freeze({
  SPACE: "space",
  HYPHEN: "hyphen"
});

/**
 * Enum for common inch fraction denominator types.
 * Based on ANSI/ASME Y14.5 and ISO 129-1 standards.
 * @readonly
 * @enum {string}
 */
const FRACTIONAL_INCH_DENOMINATOR_ENTRIES = Object.freeze({
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
export const DENOMINATOR_LIMITS = Object.freeze({
  [FRACTIONAL_INCH_DENOMINATOR_ENTRIES.CONSTRUCTION]: 16,
  [FRACTIONAL_INCH_DENOMINATOR_ENTRIES.PRECISION]: 32,
  [FRACTIONAL_INCH_DENOMINATOR_ENTRIES.MACHINING]: 64,
  [FRACTIONAL_INCH_DENOMINATOR_ENTRIES.FINE]: 128
});

const FRACTIONAL_INCH_DEFAULT_ENTRIES = Object.freeze({
  MAX_DENOMINATOR: 64,
  SEPARATOR: "space",
  SUFFIX_MODE: "symbol",
  UNIT_CODE: "in"
});

export class FractionalSeparatorCatalog extends ReadOnlyCatalog {
  constructor() {
    super(FRACTIONAL_SEPARATOR_ENTRIES);
  }
}

export class FractionalInchDenominatorCatalog extends ReadOnlyCatalog {
  constructor() {
    super(FRACTIONAL_INCH_DENOMINATOR_ENTRIES);
  }
}

export class FractionalInchDefaultCatalog extends ReadOnlyCatalog {
  constructor() {
    super(FRACTIONAL_INCH_DEFAULT_ENTRIES);
  }
}

export const fractionalSeparatorCatalog = new FractionalSeparatorCatalog();
export const fractionalInchDenominatorCatalog = new FractionalInchDenominatorCatalog();
export const fractionalInchDefaultCatalog = new FractionalInchDefaultCatalog();

export const SEPARATORS = fractionalSeparatorCatalog.all();
export const FRACTION_DENOMINATORS = fractionalInchDenominatorCatalog.all();
export const FRACTION_DEFAULTS = fractionalInchDefaultCatalog.all();
