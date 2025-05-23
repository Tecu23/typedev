export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");

  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export const isWhitespace = (s: string) => {
  const whitespaceRe = /\s/;
  return whitespaceRe.test(s);
};

export const isCharacter = (char: string) => !isWhitespace(char);

export const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code.startsWith("Bracket") ||
    code === "Backspace" ||
    code === "Enter" ||
    code === "Tab" ||
    code === "Comma" ||
    code === "Period" ||
    code === "Equal" ||
    code === "Semicolon" ||
    code === "Minus" ||
    code === "Slash" ||
    code === "Backquote" ||
    code === "Space"
  );
};
