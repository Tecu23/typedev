// processTypedInput.test.ts
import { processTypedInput } from "../../../utilities/helpers/processTypedInput";

describe("processTypedInput", () => {
  test("Test 1: Exact Match", () => {
    const generated = "hello world";
    const typed = "hello world";
    const expectedOutput = [..."hello world"].map((char) => ({
      expected: char,
      typed: char,
      className: "correct",
    }));

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 2: Expected Character, Got Whitespace", () => {
    const generated = "hello";
    const typed = "he llo";
    const expectedOutput = [
      { expected: "h", typed: "h", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "l", typed: " ", className: "incorrect" },
      { expected: "l", typed: " ", className: "incorrect" },
      { expected: "o", typed: " ", className: "incorrect" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 3: Expected Whitespace, Got Character", () => {
    const generated = "hello world";
    const typed = "helloworld";
    const expectedOutput = [
      { expected: "h", typed: "h", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "l", typed: "l", className: "correct" },
      { expected: "l", typed: "l", className: "correct" },
      { expected: "o", typed: "o", className: "correct" },
      { expected: " ", typed: "w", className: "extra" },
      { expected: " ", typed: "o", className: "extra" },
      { expected: " ", typed: "r", className: "extra" },
      { expected: " ", typed: "l", className: "extra" },
      { expected: " ", typed: "d", className: "extra" },
      { expected: " ", typed: null, className: "untyped" },
      { expected: "w", typed: null, className: "untyped" },
      { expected: "o", typed: null, className: "untyped" },
      { expected: "r", typed: null, className: "untyped" },
      { expected: "l", typed: null, className: "untyped" },
      { expected: "d", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 4: Expected Whitespace, Got Whitespace", () => {
    const generated = "line1\nline2";
    const typed = "line1\nline2";
    const expectedOutput = [
      { expected: "l", typed: "l", className: "correct" },
      { expected: "i", typed: "i", className: "correct" },
      { expected: "n", typed: "n", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "1", typed: "1", className: "correct" },
      { expected: "\n", typed: "\n", className: "correct" },
      { expected: "l", typed: "l", className: "correct" },
      { expected: "i", typed: "i", className: "correct" },
      { expected: "n", typed: "n", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "2", typed: "2", className: "correct" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 5: Expected Whitespace, Got Wrong Whitespace", () => {
    const generated = "line1\nline2";
    const typed = "line1\tline2";
    const expectedOutput = [
      { expected: "l", typed: "l", className: "correct" },
      { expected: "i", typed: "i", className: "correct" },
      { expected: "n", typed: "n", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "1", typed: "1", className: "correct" },
      { expected: "\n", typed: "\t", className: "incorrect-space" },
      { expected: "\n", typed: "l", className: "extra" },
      { expected: "\n", typed: "i", className: "extra" },
      { expected: "\n", typed: "n", className: "extra" },
      { expected: "\n", typed: "e", className: "extra" },
      { expected: "\n", typed: "2", className: "extra" },
      { expected: "\n", typed: null, className: "untyped" },
      { expected: "l", typed: null, className: "untyped" },
      { expected: "i", typed: null, className: "untyped" },
      { expected: "n", typed: null, className: "untyped" },
      { expected: "e", typed: null, className: "untyped" },
      { expected: "2", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 6: Both Inputs Are Whitespace", () => {
    const generated = "\t \n";
    const typed = "\t \n";
    const expectedOutput = [
      { expected: "\t", typed: "\t", className: "correct" },
      { expected: " ", typed: " ", className: "correct" },
      { expected: "\n", typed: "\n", className: "correct" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 7: User Types Extra Characters", () => {
    const generated = "abc";
    const typed = "abcd";
    const expectedOutput = [
      { expected: "a", typed: "a", className: "correct" },
      { expected: "b", typed: "b", className: "correct" },
      { expected: "c", typed: "c", className: "correct" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 8: User Omits Characters", () => {
    const generated = "abcd";
    const typed = "abc";
    const expectedOutput = [
      { expected: "a", typed: "a", className: "correct" },
      { expected: "b", typed: "b", className: "correct" },
      { expected: "c", typed: "c", className: "correct" },
      { expected: "d", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 9: Empty Inputs", () => {
    const generated = "";
    const typed = "";
    const expectedOutput: Array<undefined> = [];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 10: Expected Character, Got Whitespace (Multiple Words)", () => {
    const generated = "abc def";
    const typed = "ab def";
    const expectedOutput = [
      { expected: "a", typed: "a", className: "correct" },
      { expected: "b", typed: "b", className: "correct" },
      // Expected character 'c', got whitespace
      { expected: "c", typed: " ", className: "incorrect" },
      // Expected whitespace, got whitespace
      { expected: " ", typed: " ", className: "correct" },
      { expected: "d", typed: "d", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "f", typed: "f", className: "correct" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 11: Expected Whitespace, Got Character (Punctuation)", () => {
    const generated = "Hello, world!";
    const typed = "Hello,world!";
    const expectedOutput = [
      { expected: "H", typed: "H", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "l", typed: "l", className: "correct" },
      { expected: "l", typed: "l", className: "correct" },
      { expected: "o", typed: "o", className: "correct" },
      { expected: ",", typed: ",", className: "correct" },
      { expected: " ", typed: "w", className: "extra" },
      { expected: " ", typed: "o", className: "extra" },
      { expected: " ", typed: "r", className: "extra" },
      { expected: " ", typed: "l", className: "extra" },
      { expected: " ", typed: "d", className: "extra" },
      { expected: " ", typed: "!", className: "extra" },
      { expected: " ", typed: null, className: "untyped" },
      { expected: "w", typed: null, className: "untyped" },
      { expected: "o", typed: null, className: "untyped" },
      { expected: "r", typed: null, className: "untyped" },
      { expected: "l", typed: null, className: "untyped" },
      { expected: "d", typed: null, className: "untyped" },
      { expected: "!", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 12: Expected Whitespace, Got Wrong Whitespace (Spaces and Newlines)", () => {
    const generated = "line1\nline2";
    const typed = "line1 line2";
    const expectedOutput = [
      { expected: "l", typed: "l", className: "correct" },
      { expected: "i", typed: "i", className: "correct" },
      { expected: "n", typed: "n", className: "correct" },
      { expected: "e", typed: "e", className: "correct" },
      { expected: "1", typed: "1", className: "correct" },
      { expected: "\n", typed: " ", className: "incorrect-space" },
      { expected: "\n", typed: "l", className: "extra" },
      { expected: "\n", typed: "i", className: "extra" },
      { expected: "\n", typed: "n", className: "extra" },
      { expected: "\n", typed: "e", className: "extra" },
      { expected: "\n", typed: "2", className: "extra" },
      { expected: "\n", typed: null, className: "untyped" },
      { expected: "l", typed: null, className: "untyped" },
      { expected: "i", typed: null, className: "untyped" },
      { expected: "n", typed: null, className: "untyped" },
      { expected: "e", typed: null, className: "untyped" },
      { expected: "2", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 13: Expected Character, Got Whitespace (At Start)", () => {
    const generated = "abc";
    const typed = " abc";
    const expectedOutput = [
      { expected: "a", typed: " ", className: "incorrect" },
      { expected: "b", typed: " ", className: "incorrect" },
      { expected: "c", typed: " ", className: "incorrect" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 14: Expected Whitespace, Got Character (At End)", () => {
    const generated = "abc ";
    const typed = "abc";
    const expectedOutput = [
      { expected: "a", typed: "a", className: "correct" },
      { expected: "b", typed: "b", className: "correct" },
      { expected: "c", typed: "c", className: "correct" },
      { expected: " ", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });

  test("Test 15: Mixed Whitespace Characters", () => {
    const generated = "a\tb\nc d";
    const typed = "a b\nc\td";
    const expectedOutput = [
      { expected: "a", typed: "a", className: "correct" },
      { expected: "\t", typed: " ", className: "incorrect-space" },
      { expected: "\t", typed: "b", className: "extra" },
      { expected: "\t", typed: "\n", className: "incorrect-space" },
      { expected: "\t", typed: "c", className: "extra" },
      { expected: "\t", typed: "\t", className: "correct" },
      { expected: "b", typed: "d", className: "incorrect" },
      { expected: "\n", typed: null, className: "untyped" },
      { expected: "c", typed: null, className: "untyped" },
      { expected: " ", typed: null, className: "untyped" },
      { expected: "d", typed: null, className: "untyped" },
    ];

    const result = processTypedInput(generated, typed);

    expect(result).toEqual(expectedOutput);
  });
});
