import { samples } from "../helpers/seeds/code/typescript";
// import { words as randomWords } from "../helpers/seeds/words/simple";
import { useCallback, useState } from "react";

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

const useWords = () => {
  const [words, setWords] = useState<string>(
    samples[Math.floor(Math.random() * samples.length)],
  );

  const updateWords = useCallback(() => {
    setWords(samples[Math.floor(Math.random() * samples.length)]);
  }, []);

  return { words, updateWords };
};

export default useWords;
