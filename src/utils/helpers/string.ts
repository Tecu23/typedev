import { randomElementFromArray } from "./array";

type Pair = [string, string[]];

const random = Math.random;

// English contractions mapping
const pairs: Pair[] = [
  ["are", ["aren't"]],
  ["can", ["can't"]],
  ["could", ["couldn't"]],
  ["did", ["didn't"]],
  ["does", ["doesn't"]],
  ["do", ["don't"]],
  ["had", ["hadn't"]],
  ["has", ["hasn't"]],
  ["have", ["haven't"]],
  ["is", ["isn't"]],
  ["it", ["it's", "it'll"]],
  ["i", ["i'm", "i'll", "i've", "i'd"]],
  ["you", ["you'll", "you're", "you've", "you'd"]],
  ["that", ["that's", "that'll", "that'd"]],
  ["must", ["mustn't", "must've"]],
  ["there", ["there's", "there'll", "there'd"]],
  ["he", ["he's", "he'll", "he'd"]],
  ["she", ["she's", "she'll", "she'd"]],
  ["we", ["we're", "we'll", "we'd", "we've"]],
  ["they", ["they're", "they'll", "they'd", "they've"]],
  ["should", ["shouldn't", "should've"]],
  ["was", ["wasn't"]],
  ["were", ["weren't"]],
  ["will", ["won't"]],
  ["would", ["wouldn't", "would've"]],
  ["going", ["goin'"]],
];

function getLastChar(word: string): string {
  try {
    return word.charAt(word.length - 1);
  } catch {
    return "";
  }
}

function shouldCapitalize(lastChar: string): boolean {
  return /[?!.؟]/.test(lastChar);
}

function capitalizeFirstLetterOfEachWord(str: string): string {
  return str
    .split(/ +/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

// Check if word is in the group of pairs so it can be replaced
function checkEnglish(word: string): boolean {
  if (pairs.find((pair) => word.match(RegExp(`^([\\W]*${pair[0]}[\\W]*)$`, "gi"))) === undefined) {
    return false;
  }
  return true;
}

function shouldWholeReplacementWordBeCapitalised(wordToBeReplaced: string): boolean {
  if (wordToBeReplaced === "I") return false;
  if (wordToBeReplaced === wordToBeReplaced.toUpperCase()) return true;
  return false;
}

function replaceEnglish(word: string): string {
  const replacement = pairs.find((pair) => word.match(RegExp(`^([\\W]*${pair[0]}[\\W]*)$`, "gi")));

  if (replacement === undefined) return word;

  const randomReplacement = randomElementFromArray(replacement[1]);

  return word.replace(
    RegExp(`^(?:([\\W]*)(${replacement[0]})([\\W]*))$`, "gi"),
    (_, $1, $2, $3) =>
      $1 +
      (($2 as string).charAt(0) === ($2 as string).charAt(0).toUpperCase()
        ? shouldWholeReplacementWordBeCapitalised($2 as string)
          ? randomReplacement.toUpperCase()
          : capitalizeFirstLetterOfEachWord(randomReplacement)
        : randomReplacement) +
      $3,
  );
}

export function punctuateWord(previousWord: string, currentWord: string, index: number, maxindex: number): string {
  let word = currentWord;

  const lastChar = getLastChar(previousWord);

  if (index === 0 || shouldCapitalize(lastChar)) {
    //always capitalise the first word or if there was a dot unless using a code alphabet or the Georgian language

    word = capitalizeFirstLetterOfEachWord(word);
  } else if (
    (random() < 0.1 && lastChar !== "." && lastChar !== "," && index !== maxindex - 2) ||
    index === maxindex - 1
  ) {
    const rand = random();
    if (rand <= 0.8) {
      word += ".";
    } else if (rand > 0.8 && rand < 0.9) {
      word += "?";
    } else {
      word += "!";
    }
  } else if (random() < 0.01 && lastChar !== "," && lastChar !== ".") {
    word = `"${word}"`;
  } else if (random() < 0.011 && lastChar !== "," && lastChar !== ".") {
    word = `'${word}'`;
  } else if (random() < 0.012 && lastChar !== "," && lastChar !== ".") {
    word = `(${word})`;
  } else if (
    random() < 0.013 &&
    lastChar !== "," &&
    lastChar !== "." &&
    lastChar !== ";" &&
    lastChar !== "؛" &&
    lastChar !== ":" &&
    lastChar !== "；" &&
    lastChar !== "："
  ) {
    word += ":";
  } else if (random() < 0.014 && lastChar !== "," && lastChar !== "." && previousWord !== "-") {
    word = "-";
  } else if (
    random() < 0.015 &&
    lastChar !== "," &&
    lastChar !== "." &&
    lastChar !== ";" &&
    lastChar !== "؛" &&
    lastChar !== "；" &&
    lastChar !== "："
  ) {
    word += ";";
  } else if (random() < 0.2 && lastChar !== ",") {
    word += ",";
  } else if (random() < 0.5 && checkEnglish(word)) {
    word = replaceEnglish(word);
  }

  if (word.includes("\t")) {
    word = word.replace(/\t/g, "");
    word += "\t";
  }
  if (word.includes("\n")) {
    word = word.replace(/\n/g, "");
    word += "\n";
  }

  return word;
}
