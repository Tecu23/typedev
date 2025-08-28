import type { IWord, Keystroke } from "./common";

export interface GameState {
  // Words
  words: IWord[];
  currentWordIndex: number;
  currentCharIndex: number;
  currentInput: string;

  // Game status
  status: "idle" | "ready" | "typing" | "paused" | "finished";
  mode: "time" | "words" | "quote" | "zen";

  // Configuration
  testDuration: number;
  testWordCount: number;

  // Timing
  startTime: number | null;
  endTime: number | null;
  pauseStartTime: number | null;
  totalPausedTime: number;

  // Statistics
  keystrokes: Keystroke[];
  errors: number;
  corrections: number;

  // Live stats
  wpm: number;
  accuracy: number;
  time: number;

  // UI State
  isLoading: boolean;
  showResults: boolean;
}

// Define the actions (functions) that can modify the state
export interface StoreActions {
  initialize: (mode: GameState["mode"]) => void;
  setWords: (words: IWord[]) => void;
  startTest: (duration: number) => void;
  pauseTest: () => void;
  resumeTest: () => void;
  finishTest: () => void;
  resetTest: () => void;
  setTypingValue: (value: string) => void;
  typeCharacter: (char: string, timestamp: number) => void;
  typeBackspace: (timestamp: number) => void;
  updateStats: () => void; // A function to recalculate WPM, accuracy, etc.
}
