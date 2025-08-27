/**
 * Represents the whole text that the user will try to type
 */
export type Text = string;

/**
 * Represents a complete word in the test
 */
export interface Word {
  text: string; // The actual word text
  id: string; // Unique identifier
  status: "pending" | "current" | "correct" | "incorrect" | "skipped";
  typedText?: string; // What the user actually typed
}

/**
 * Represents a single character typed by the user with timing and accuracy data
 */
export interface TypedCharacter {
  char: string; // The actual character typed
  expected: string; // What character was expected
  timestamp: number; // When the character was typed
  status: "correct" | "incorrect"; // Whether it matched expected
  wordIndex: number; // Which word this character belongs to
  charIndex: number; // Position within the word
  backspaced: boolean; // Whether this char was later deleted
}

/**
 * Keystroke data for detailed analysis
 */
export interface Keystroke {
  key: string; // The key pressed
  timestamp: number; // When it was pressed
  duration?: number; // How long the key was held (for key-down/up tracking)
  type: "char" | "backspace" | "space" | "modifier";
}

/**
 * Detailed statistics for performance analysis
 */
export interface DetailedStats {
  // Speed metrics
  wpm: number; // Words per minute (correct words only)
  rawWpm: number; // Raw typing speed including mistakes
  characterPerMinute: number; // CPM for more granular speed tracking

  // Accuracy metrics
  accuracy: number; // Percentage of correct characters
  errorRate: number; // Errors per minute
  corrections: number; // Total backspaces used
  uncorrectedErrors: number; // Mistakes left unfixed

  // Consistency metrics
  consistency: number; // How steady the typing speed was (100 = perfectly steady)
  standardDeviation: number; // Standard deviation of character typing speeds

  // Timing metrics
  totalTime: number; // Total test duration in seconds
  pauseTime: number; // Time spent paused/idle
  activeTypingTime: number; // Actual typing time

  // Character-level stats
  totalCharacters: number;
  correctCharacters: number;
  incorrectCharacters: number;
  extraCharacters: number; // Characters typed beyond word length
  missedCharacters: number; // Characters skipped

  // Word-level stats
  totalWords: number;
  correctWords: number;
  incorrectWords: number;

  // Advanced metrics
  startDelay: number; // Time before first keystroke
  afkTime: number; // Time spent away from keyboard
  characterSpeeds: number[]; // Speed for each character position
  wordSpeeds: number[]; // WPM for each word
  keyDurations: Map<string, number[]>; // How long each key is held
}
