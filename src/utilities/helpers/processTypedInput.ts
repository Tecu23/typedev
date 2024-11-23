import { isWhitespace, isCharacter } from ".";
import { log } from "console";

export function processTypedInput(
  generatedChars: string[],
  typedChars: string[],
): { expected: string | null; typed: string | null }[] {
  const output: { expected: string | null; typed: string | null }[] = [];

  let i = 0; // Index for generatedChars
  let j = 0; // Index for typedChars

  while (i < generatedChars.length && j < typedChars.length) {
    const genChar = generatedChars[i];
    const typedChar = typedChars[j];

    // log(genChar, typedChar, typeof genChar, typeof typedChar);

    // Case 1: Expected character, got character
    if (isCharacter(genChar) && isCharacter(typedChar)) {
      output.push({ expected: genChar, typed: typedChar });
      i++;
      j++;
      continue;
    }

    // Case 2: Expected character, got whitespace
    if (isCharacter(genChar) && isWhitespace(typedChar)) {
      // Send remaining characters in word as char + whitespace
      while (i < generatedChars.length && isCharacter(generatedChars[i])) {
        output.push({ expected: generatedChars[i], typed: typedChar });
        i++;
      }

      continue;
    }

    // Case 3: Expected whitespace, got character
    if (isWhitespace(genChar) && isCharacter(typedChar)) {
      // Send characters in typed until whitespace as whitespace + char
      while (j < typedChars.length && isCharacter(typedChars[j])) {
        output.push({ expected: genChar, typed: typedChars[j] });
        j++;
      }

      continue;
    }

    // Case 4: Expected whitespace, got correct whitespace
    if (
      isWhitespace(genChar) &&
      isWhitespace(typedChar) &&
      genChar == typedChar
    ) {
      output.push({ expected: genChar, typed: typedChar });
      i++;
      j++;

      continue;
    }

    // Case 5: Expected whitespace, got wrong whitespace
    if (
      isWhitespace(genChar) &&
      isWhitespace(typedChar) &&
      genChar != typedChar
    ) {
      while (j < typedChars.length && typedChars[j] != genChar) {
        output.push({ expected: genChar, typed: typedChars[j] });
        j++;
      }

      continue;
    }
  }

  // If we have more generated chars we just append them at the end
  while (i < generatedChars.length) {
    const genChar = generatedChars[i];

    output.push({ expected: genChar, typed: null });
    i++;
  }

  return output;
}
