import { test } from "node:test";
import assert from "node:assert/strict";
import { capitalize, wordCount, slugify } from "../src/text.js";

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
