/**
 * Capitalize the first character of a string.
 * @param {string} input
 * @returns {string}
 */
export function capitalize(input) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  if (input.length === 0) return input;
  return input[0].toUpperCase() + input.slice(1);
}

/**
 * Count words separated by whitespace.
 * @param {string} input
 * @returns {number}
 */
export function wordCount(input) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  const trimmed = input.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/**
 * Lowercase a string and join runs of ASCII letters and digits with hyphens.
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/**
 * Shorten a string to at most `maxLength` characters, ending with "…" (U+2026)
 * when it had to be cut. Characters are counted as Unicode code points, so
 * surrogate pairs such as emoji are never split.
 * @param {string} input
 * @param {number} maxLength Integer of at least 1.
 * @returns {string}
 */
export function truncate(input, maxLength) {
  if (typeof input !== "string") throw new TypeError("input must be a string");
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError("maxLength must be an integer of at least 1");
  }
  const chars = Array.from(input);
  if (chars.length <= maxLength) return input;
  return chars.slice(0, maxLength - 1).join("") + "…";
}
