import { test } from "node:test";
import assert from "node:assert/strict";
import { capitalize, wordCount } from "../src/text.js";

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
