import { create } from "zustand";
import type { GameState, StoreActions } from "../types/game";

export const useTypingStore = create<GameState & StoreActions>((set, get) => ({
  // Initial state values
  words: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  currentInput: "",

  status: "idle",
  mode: "time",
  testDuration: 60,
  testWordCount: 50,

  startTime: null,
  endTime: null,
  pauseStartTime: null,
  totalPausedTime: 0,

  keystrokes: [],
  errors: 0,
  corrections: 0,

  wpm: 0,
  accuracy: 0,
  time: 0,

  isLoading: false,
  showResults: false,

  // Actions
  setWords: (newWords) => {},
  startTest: (duration) => {},
  pauseTest: () => {},
  resumeTest: () => {},
  finishTest: () => {},
  resetTest: () => {},
  setTypingValue: (value: string) => {},
  updateStats: () => {}, // A function to recalculate WPM, accuracy, etc.
}));
