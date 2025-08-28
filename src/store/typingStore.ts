import type { ILiveStats, ITestConfig, ITypingStats } from "../types/game";
import type { ITypingStore } from "../types/store";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const defaultConfig: ITestConfig = {
  mode: "time",
  timeLimit: 60,
  wordCount: 50,
  language: "english",
  punctuation: false,
  numbers: false,
  // difficulty: "medium",
};

const defaultStats: ITypingStats = {
  wpm: 0,
  rawWpm: 0,
  accuracy: 100,
  consistency: 100,
  correctChars: 0,
  incorrectChars: 0,
  totalChars: 0,
  correctWords: 0,
  totalWords: 0,
};

const defaultLiveStats: ILiveStats = {
  currentWpm: 0,
  currentAccuracy: 100,
  timeElapsed: 0,
  wordsCompleted: 0,
};
