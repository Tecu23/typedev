import { useCallback, useState } from "react";
import { words as randomWords } from "../helpers/seeds/words/simple";
import { samples } from "../helpers/seeds/code/typescript";
import type { Words, GameConfig } from "../types";

function getRandomSample(array: string[], sampleSize: number): string {
  if (sampleSize > array.length) {
    throw new Error("Sample size cannot be larger than the array length.");
  }

  // Copy the array to avoid mutating the original
  const shuffled = [...array];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  // Return the first `sampleSize` elements
  return shuffled.slice(0, sampleSize).join(" ");
}

const useWords = (config: GameConfig) => {
  const getWords = useCallback((): Words => {
    if (config.type == "normal") {
      return getRandomSample(randomWords, config.count);
    } else {
      return samples[Math.floor(Math.random() * samples.length)];
    }
  }, [config]);

  const [words, setWords] = useState<string>(getWords());
  const updateWords = useCallback(() => {
    setWords(getWords());
  }, [getWords]);

  return { words, updateWords };
};

export default useWords;
