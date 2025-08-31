import { useCallback, useState, useEffect } from "react";

import { words as randomWords } from "../data/words";

import { shuffleArray, getRandomSample, randomIntFromRange } from "../utils/helpers/array";
import { punctuateWord } from "../utils/helpers/string";

import type { Text } from "../types/common";
import type { ITestConfig } from "../types/game";

interface TypingSettings {
  punctuation: boolean;
  numbers: boolean;
}

function getNumbers(len: number): string {
  const randLen = randomIntFromRange(1, len);
  let ret = "";
  for (let i = 0; i < randLen; i++) {
    let randomNum;
    if (i === 0) {
      randomNum = randomIntFromRange(1, 9);
    } else {
      randomNum = randomIntFromRange(0, 9);
    }
    ret += randomNum.toString();
  }
  return ret;
}

// Generate text with settings
function generateText(wordCount: number, settings: TypingSettings, wordList: string[] = randomWords): string {
  const result: string[] = [];

  // Shuffle word list for variety
  const shuffledWords = shuffleArray(wordList);
  let wordIndex = 0;

  for (let i = 0; i < wordCount; i++) {
    // Insert numbers based on settings (15% chance)
    if (settings.numbers && Math.random() < 0.2) {
      result.push(getNumbers(4));
    } else {
      // Get next word (cycle through shuffled list)
      let word = shuffledWords[wordIndex % shuffledWords.length];
      wordIndex++;

      if (settings.punctuation) {
        const previousWord = result[result.length - 1] || "";
        const punctuated = punctuateWord(previousWord, word, i, wordCount);
        word = punctuated;
      }

      result.push(word);
    }
  }

  return result.join(" ");
}
export const useWords = (config: ITestConfig) => {
  const getWords = useCallback((): Text => {
    return generateText(
      config.wordCount,
      { punctuation: config.punctuation, numbers: config.numbers },
      getRandomSample(randomWords, 200),
    );
  }, [config.punctuation, config.numbers, config.wordCount]);

  const [words, setWords] = useState<string>(getWords());

  useEffect(() => {
    setWords(getWords());
  }, [getWords]);

  const updateWords = useCallback(() => {
    setWords(getWords());
  }, [getWords]);

  return { words, updateWords };
};
