/**
 * @fileoverview Factory helper that freezes a parameter sample entry.
 * Every per-quantity sample file imports this instead of repeating the pattern.
 */

/**
 * Creates a frozen parameter sample object.
 * @param {{ id: string, input: object, recommendedOutputPresetIds: string[], [key: string]: any }} sample
 * @returns {Readonly<object>}
 */
export const createSample = ({ id, input, recommendedOutputPresetIds, ...rest }) =>
  Object.freeze({
    id,
    ...rest,
    input: Object.freeze({ ...input }),
    recommendedOutputPresetIds: Object.freeze([...recommendedOutputPresetIds])
  });
