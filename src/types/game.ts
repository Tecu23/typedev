export interface ITestConfig {
  mode: "time" | "words" | "quote" | "zen" | "custom";
  timeLimit: number;
  wordCount: number;
  language: string;
  punctuation: boolean;
  numbers: boolean;
}

export interface IWordResult {
  word: string;
  typed: string;
  correct: boolean;
  wpm: number;
  errors: number;
  timestamp: number;
}

export interface ITypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  correctWords: number;
  totalWords: number;
}

export interface ILiveStats {
  currentWpm: number;
  currentAccuracy: number;
  timeElapsed: number;
  wordsCompleted: number;
}
