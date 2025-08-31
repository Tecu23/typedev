const random = Math.random;
const ceil = Math.ceil;
const floor = Math.floor;

export function randomElementFromArray<T>(array: T[]): T {
  return array[randomIntFromRange(0, array.length - 1)] as T;
}

export function randomIntFromRange(min: number, max: number): number {
  const minNorm = ceil(min);
  const maxNorm = floor(max);
  return floor(random() * (maxNorm - minNorm + 1) + minNorm);
}

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Get random sample without punctuation
export function getRandomSample(array: string[], sampleSize: number): string[] {
  if (sampleSize > array.length) {
    throw new Error("Sample size cannot be larger than the array length.");
  }

  const shuffled = shuffleArray(array);
  return shuffled.slice(0, sampleSize);
}
