/**
 * @fileoverview Factory helper that freezes an output preset entry.
 * Every per-quantity preset file imports this instead of repeating the pattern.
 */

/**
 * Creates a frozen output preset object.
 * @param {{ id: string, quantity: string, name: string, description: string, unit: string, precision: number, showUnit: boolean, prefix: string, suffix: string, suffixMode: string }} preset
 * @returns {Readonly<object>}
 */
export const createPreset = ({ id, ...preset }) => Object.freeze({
  id,
  ...preset
});
