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
