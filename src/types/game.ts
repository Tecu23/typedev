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
  setWords: (words: IWord[]) => void;
  startTest: (duration: number) => void;
  pauseTest: () => void;
  resumeTest: () => void;
  finishTest: () => void;
  resetTest: () => void;
  setTypingValue: (value: string) => void;
  updateStats: () => void; // A function to recalculate WPM, accuracy, etc.
}

// Game actions
export type GameAction =
  | { type: "INITIALIZE"; words: string[]; mode: GameState["mode"] }
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "TYPE_CHARACTER"; char: string; timestamp: number }
  | { type: "BACKSPACE"; timestamp: number }
  | { type: "NEXT_WORD" }
  | { type: "UPDATE_STATS" }
  | { type: "FINISH" }
  | { type: "RESET" }
  | { type: "SET_MODE"; mode: GameState["mode"] };
