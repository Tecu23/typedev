// processTypedInput.test.ts
import { processTypedInput } from "../../../utilities/helpers/processTypedInput";

describe("processTypedInput", () => {
  test("Test 1: Exact Match", () => {
    const generated = "hello world";
    const typed = "hello world";
    const expectedOutput = [..."hello world"].map((char) => ({
      expected: char,
      typed: char,
    }));

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 2: Expected Character, Got Whitespace", () => {
    const generated = "hello";
    const typed = "he llo";
    const expectedOutput = [
      { expected: "h", typed: "h" },
      { expected: "e", typed: "e" },
      { expected: "l", typed: " " },
      { expected: "l", typed: " " },
      { expected: "o", typed: " " },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 3: Expected Whitespace, Got Character", () => {
    const generated = "hello world";
    const typed = "helloworld";
    const expectedOutput = [
      { expected: "h", typed: "h" },
      { expected: "e", typed: "e" },
      { expected: "l", typed: "l" },
      { expected: "l", typed: "l" },
      { expected: "o", typed: "o" },
      { expected: " ", typed: "w" },
      { expected: " ", typed: "o" },
      { expected: " ", typed: "r" },
      { expected: " ", typed: "l" },
      { expected: " ", typed: "d" },
      { expected: " ", typed: null },
      { expected: "w", typed: null },
      { expected: "o", typed: null },
      { expected: "r", typed: null },
      { expected: "l", typed: null },
      { expected: "d", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 4: Expected Whitespace, Got Whitespace", () => {
    const generated = "line1\nline2";
    const typed = "line1\nline2";
    const expectedOutput = [
      { expected: "l", typed: "l" },
      { expected: "i", typed: "i" },
      { expected: "n", typed: "n" },
      { expected: "e", typed: "e" },
      { expected: "1", typed: "1" },
      { expected: "\n", typed: "\n" },
      { expected: "l", typed: "l" },
      { expected: "i", typed: "i" },
      { expected: "n", typed: "n" },
      { expected: "e", typed: "e" },
      { expected: "2", typed: "2" },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 5: Expected Whitespace, Got Wrong Whitespace", () => {
    const generated = "line1\nline2";
    const typed = "line1\tline2";
    const expectedOutput = [
      { expected: "l", typed: "l" },
      { expected: "i", typed: "i" },
      { expected: "n", typed: "n" },
      { expected: "e", typed: "e" },
      { expected: "1", typed: "1" },
      { expected: "\n", typed: "\t" },
      { expected: "\n", typed: "l" },
      { expected: "\n", typed: "i" },
      { expected: "\n", typed: "n" },
      { expected: "\n", typed: "e" },
      { expected: "\n", typed: "2" },
      { expected: "\n", typed: null },
      { expected: "l", typed: null },
      { expected: "i", typed: null },
      { expected: "n", typed: null },
      { expected: "e", typed: null },
      { expected: "2", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 6: Both Inputs Are Whitespace", () => {
    const generated = "\t \n";
    const typed = "\t \n";
    const expectedOutput = [
      { expected: "\t", typed: "\t" },
      { expected: " ", typed: " " },
      { expected: "\n", typed: "\n" },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 7: User Types Extra Characters", () => {
    const generated = "abc";
    const typed = "abcd";
    const expectedOutput = [
      { expected: "a", typed: "a" },
      { expected: "b", typed: "b" },
      { expected: "c", typed: "c" },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 8: User Omits Characters", () => {
    const generated = "abcd";
    const typed = "abc";
    const expectedOutput = [
      { expected: "a", typed: "a" },
      { expected: "b", typed: "b" },
      { expected: "c", typed: "c" },
      { expected: "d", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 9: Empty Inputs", () => {
    const generated = "";
    const typed = "";
    const expectedOutput: Array<undefined> = [];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 10: Expected Character, Got Whitespace (Multiple Words)", () => {
    const generated = "abc def";
    const typed = "ab def";
    const expectedOutput = [
      { expected: "a", typed: "a" },
      { expected: "b", typed: "b" },
      // Expected character 'c', got whitespace
      { expected: "c", typed: " " },
      // Expected whitespace, got whitespace
      { expected: " ", typed: " " },
      { expected: "d", typed: "d" },
      { expected: "e", typed: "e" },
      { expected: "f", typed: "f" },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 11: Expected Whitespace, Got Character (Punctuation)", () => {
    const generated = "Hello, world!";
    const typed = "Hello,world!";
    const expectedOutput = [
      { expected: "H", typed: "H" },
      { expected: "e", typed: "e" },
      { expected: "l", typed: "l" },
      { expected: "l", typed: "l" },
      { expected: "o", typed: "o" },
      { expected: ",", typed: "," },
      { expected: " ", typed: "w" },
      { expected: " ", typed: "o" },
      { expected: " ", typed: "r" },
      { expected: " ", typed: "l" },
      { expected: " ", typed: "d" },
      { expected: " ", typed: "!" },
      { expected: " ", typed: null },
      { expected: "w", typed: null },
      { expected: "o", typed: null },
      { expected: "r", typed: null },
      { expected: "l", typed: null },
      { expected: "d", typed: null },
      { expected: "!", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 12: Expected Whitespace, Got Wrong Whitespace (Spaces and Newlines)", () => {
    const generated = "line1\nline2";
    const typed = "line1 line2";
    const expectedOutput = [
      { expected: "l", typed: "l" },
      { expected: "i", typed: "i" },
      { expected: "n", typed: "n" },
      { expected: "e", typed: "e" },
      { expected: "1", typed: "1" },
      { expected: "\n", typed: " " },
      { expected: "\n", typed: "l" },
      { expected: "\n", typed: "i" },
      { expected: "\n", typed: "n" },
      { expected: "\n", typed: "e" },
      { expected: "\n", typed: "2" },
      { expected: "\n", typed: null },
      { expected: "l", typed: null },
      { expected: "i", typed: null },
      { expected: "n", typed: null },
      { expected: "e", typed: null },
      { expected: "2", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 13: Expected Character, Got Whitespace (At Start)", () => {
    const generated = "abc";
    const typed = " abc";
    const expectedOutput = [
      { expected: "a", typed: " " },
      { expected: "b", typed: " " },
      { expected: "c", typed: " " },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 14: Expected Whitespace, Got Character (At End)", () => {
    const generated = "abc ";
    const typed = "abc";
    const expectedOutput = [
      { expected: "a", typed: "a" },
      { expected: "b", typed: "b" },
      { expected: "c", typed: "c" },
      { expected: " ", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });

  test("Test 15: Mixed Whitespace Characters", () => {
    const generated = "a\tb\nc d";
    const typed = "a b\nc\td";
    const expectedOutput = [
      { expected: "a", typed: "a" },
      { expected: "\t", typed: " " },
      { expected: "\t", typed: "b" },
      { expected: "\t", typed: "\n" },
      { expected: "\t", typed: "c" },
      { expected: "\t", typed: "\t" },
      { expected: "b", typed: "d" },
      { expected: "\n", typed: null },
      { expected: "c", typed: null },
      { expected: " ", typed: null },
      { expected: "d", typed: null },
    ];

    const result = processTypedInput(generated.split(""), typed.split(""));

    expect(result).toEqual(expectedOutput);
  });
});
