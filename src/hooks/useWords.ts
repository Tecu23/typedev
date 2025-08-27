import { useCallback, useState } from "react";

import { words as randomWords } from "../data/words";
import type { Text } from "../types/common";

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

const useWords = (type: string) => {
  const getWords = useCallback((): Text => {
    if (type == "normal") {
      return getRandomSample(randomWords, 180);
    }

    return "";
  }, [type]);

  const [words, setWords] = useState<string>(getWords());
  const updateWords = useCallback(() => {
    setWords(getWords());
  }, [getWords]);

  return { words, updateWords };
};

export default useWords;
