/**
 * Represents the whole text that the user will try to type
 */
export type Text = string;

/**
 * Represents a complete word in the test
 */
export interface IWord {
  text: string; // The actual word text
  id: string; // Unique identifier
  status: "pending" | "current" | "correct" | "incorrect" | "skipped";
  typedText?: string; // What the user actually typed
}

/**
 * Keystroke data for detailed analysis
 */
export interface Keystroke {
  key: string; // The key pressed
  timestamp: number; // When it was pressed
  correct: boolean;
}
