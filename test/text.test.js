import { test } from "node:test";
import assert from "node:assert/strict";
import { capitalize, wordCount, slugify, truncate } from "../src/text.js";

test("capitalize uppercases the first character", () => {
  assert.equal(capitalize("hello"), "Hello");
  assert.equal(capitalize(""), "");
});

test("capitalize rejects non-strings", () => {
  assert.throws(() => capitalize(42), TypeError);
});

test("wordCount counts whitespace-separated words", () => {
  assert.equal(wordCount("one two  three"), 3);
  assert.equal(wordCount("   "), 0);
});

test("slugify lowercases letters and preserves digits", () => {
  assert.equal(slugify("HeLLo123"), "hello123");
  assert.equal(slugify("0123456789"), "0123456789");
});

test("slugify replaces each run of non-ASCII-alphanumeric characters with a hyphen", () => {
  assert.equal(slugify("ONE__two...THREE / 4"), "one-two-three-4");
  assert.equal(slugify("one\t\n two---three"), "one-two-three");
  assert.equal(slugify("aé中🙂b"), "a-b");
});

test("slugify removes leading and trailing hyphens", () => {
  assert.equal(slugify("  Hello, World!  "), "hello-world");
  assert.equal(slugify("---Hello"), "hello");
  assert.equal(slugify("World---"), "world");
  assert.equal(slugify("already-a-slug"), "already-a-slug");
});

test("slugify returns an empty string for empty or all-symbol input", () => {
  for (const input of ["", "   \t\n", "!@#$%^&*()_+-=", "---", "é中🙂"]) {
    assert.equal(slugify(input), "");
  }
});

test("slugify rejects non-strings", () => {
  for (const input of [undefined, null, 42, NaN, true, 1n, {}, [], Symbol("text"), () => "text", new String("text")]) {
    assert.throws(() => slugify(input), {
      name: "TypeError",
      message: "input must be a string",
    });
  }
});

test("truncate returns input unchanged when it fits", () => {
  assert.equal(truncate("Hello", 5), "Hello");
  assert.equal(truncate("Hello", 10), "Hello");
  assert.equal(truncate("", 1), "");
  assert.equal(truncate("🙂🙂", 2), "🙂🙂");
});

test("truncate cuts to exactly maxLength characters ending with an ellipsis", () => {
  assert.equal(truncate("Hello, world", 8), "Hello, …");
  assert.equal(truncate("Hello", 4), "Hel…");
  assert.equal(truncate("Hello", 1), "…");
  for (const maxLength of [1, 2, 5, 11]) {
    const result = truncate("Hello, world", maxLength);
    assert.equal(Array.from(result).length, maxLength);
    assert.ok(result.endsWith("…"));
  }
});

test("truncate never splits a surrogate pair", () => {
  assert.equal(truncate("a🙂b🙂c", 3), "a🙂…");
});

test("truncate rejects maxLength that is not an integer of at least 1", () => {
  for (const maxLength of [0, -1, 1.5, NaN, Infinity, -Infinity, "5", null, undefined, 5n, new Number(5)]) {
    assert.throws(() => truncate("Hello", maxLength), {
      name: "RangeError",
      message: "maxLength must be an integer of at least 1",
    });
  }
});

test("truncate rejects non-strings", () => {
  for (const input of [undefined, null, 42, true, {}, [], new String("text")]) {
    assert.throws(() => truncate(input, 5), {
      name: "TypeError",
      message: "input must be a string",
    });
  }
});
