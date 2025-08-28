export function calculateConsistency(wpmValues: number[]): number {
  if (wpmValues.length < 2) return 100;

  const mean = wpmValues.reduce((sum, wpm) => sum + wpm, 0) / wpmValues.length;
  const variance = wpmValues.reduce((sum, wpm) => sum + Math.pow(wpm - mean, 2), 0) / wpmValues.length;
  const standardDeviation = Math.sqrt(variance);

  if (mean === 0) return 100;

  const coefficientOfVariation = (standardDeviation / mean) * 100;
  return Math.max(0, Math.round(100 - coefficientOfVariation));
}
