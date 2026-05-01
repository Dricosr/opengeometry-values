/**
 * Asserts that a value belongs to a ReadOnlyCatalog.
 *
 * Used by base model constructors to reject invalid catalog values
 * at the lowest level, avoiding redundant checks higher up the call stack.
 *
 * @param {*} value - The value to validate
 * @param {import("./read-only-catalog.mjs").ReadOnlyCatalog} catalog - The catalog to check against
 * @param {string} label - Human-readable label for error messages (e.g. "VALUE_TYPES")
 * @throws {TypeError} When value is not null/undefined and not in the catalog
 */
export function assertCatalogValue(value, catalog, label) {
  if (value !== undefined && value !== null && !catalog.hasValue(value)) {
    const validValues = Object.values(catalog.all()).join(", ");
    throw new TypeError(
      `Invalid ${label}: "${String(value)}". Expected one of: ${validValues}`
    );
  }
}
