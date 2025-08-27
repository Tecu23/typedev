/**
 * Main game logic hook
 * This is where ALL game logic lives - the single source of truth
 */

import { useReducer, useCallback } from "react";

import { useKeyboardInput } from "./useKeyboardInput";
import type { KeyboardEvent } from "./useKeyboardInput";
import type { Word } from "../types";

interface GameState {
  // Words
  words: Word[];
  currentWordIndex: number;
  currentCharIndex: number;
  currentInput: string;

  // Game status
  status: "idle" | "ready" | "typing" | "paused" | "finished";
  mode: "time" | "words" | "quote" | "zen";

  // Timing
  startTime: number | null;
  endTime: number | null;
  pauseStartTime: number | null;
  totalPausedTime: number;

  // Statistics
  keystrokes: Array<{
    key: string;
    timestamp: number;
    correct: boolean;
  }>;
  errors: number;
  corrections: number;

  // Live stats
  wpm: number;
  accuracy: number;
  time: number;
}

// Game actions
type GameAction =
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

// Game reducer - ALL game logic happens here
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "INITIALIZE": {
      return {
        ...state,
        words: action.words.map((text, index) => ({
          text,
          id: `word-${index}`,
          status: index === 0 ? "current" : "pending",
        })),
        currentWordIndex: 0,
        currentCharIndex: 0,
        currentInput: "",
        status: "ready",
        mode: action.mode,
        keystrokes: [],
        errors: 0,
        corrections: 0,
      };
    }

    case "START": {
      if (state.status !== "ready") return state;
      return {
        ...state,
        status: "typing",
        startTime: Date.now(),
      };
    }

    case "PAUSE": {
      if (state.status !== "typing") return state;
      return {
        ...state,
        status: "paused",
        pauseStartTime: Date.now(),
      };
    }

    case "RESUME": {
      if (state.status !== "paused") return state;
      const pauseDuration = Date.now() - (state.pauseStartTime || 0);
      return {
        ...state,
        status: "typing",
        pauseStartTime: null,
        totalPausedTime: state.totalPausedTime + pauseDuration,
      };
    }

    case "TYPE_CHARACTER": {
      // Auto-start on first character
      if (state.status === "ready") {
        state = { ...state, status: "typing", startTime: Date.now() };
      }

      if (state.status !== "typing") return state;

      const currentWord = state.words[state.currentWordIndex];
      if (!currentWord) return state;

      const expectedChar = currentWord.text[state.currentCharIndex];
      const isCorrect = action.char === expectedChar;

      // Handle space - move to next word
      if (action.char === " ") {
        // Check if current word is complete
        if (state.currentInput === currentWord.text) {
          // Word is correct
          const updatedWords = [...state.words];
          updatedWords[state.currentWordIndex] = {
            ...currentWord,
            status: "correct",
          };

          // Move to next word
          const nextIndex = state.currentWordIndex + 1;
          if (nextIndex < state.words.length) {
            updatedWords[nextIndex] = {
              ...updatedWords[nextIndex],
              status: "current",
            };

            return {
              ...state,
              words: updatedWords,
              currentWordIndex: nextIndex,
              currentCharIndex: 0,
              currentInput: "",
              keystrokes: [
                ...state.keystrokes,
                {
                  key: action.char,
                  timestamp: action.timestamp,
                  correct: true,
                },
              ],
            };
          } else {
            // Test complete
            return gameReducer(state, { type: "FINISH" });
          }
        } else {
          // Word has errors - mark as incorrect
          const updatedWords = [...state.words];
          updatedWords[state.currentWordIndex] = {
            ...currentWord,
            status: "incorrect",
          };

          const nextIndex = state.currentWordIndex + 1;
          if (nextIndex < state.words.length) {
            updatedWords[nextIndex] = {
              ...updatedWords[nextIndex],
              status: "current",
            };

            return {
              ...state,
              words: updatedWords,
              currentWordIndex: nextIndex,
              currentCharIndex: 0,
              currentInput: "",
              errors: state.errors + 1,
              keystrokes: [
                ...state.keystrokes,
                {
                  key: action.char,
                  timestamp: action.timestamp,
                  correct: false,
                },
              ],
            };
          } else {
            return gameReducer(state, { type: "FINISH" });
          }
        }
      }

      // Regular character
      return {
        ...state,
        currentInput: state.currentInput + action.char,
        currentCharIndex: state.currentCharIndex + 1,
        errors: isCorrect ? state.errors : state.errors + 1,
        keystrokes: [
          ...state.keystrokes,
          {
            key: action.char,
            timestamp: action.timestamp,
            correct: isCorrect,
          },
        ],
      };
    }

    case "BACKSPACE": {
      if (state.status !== "typing") return state;
      if (state.currentCharIndex === 0) return state;

      return {
        ...state,
        currentInput: state.currentInput.slice(0, -1),
        currentCharIndex: state.currentCharIndex - 1,
        corrections: state.corrections + 1,
        keystrokes: [
          ...state.keystrokes,
          {
            key: "Backspace",
            timestamp: action.timestamp,
            correct: true,
          },
        ],
      };
    }

    case "UPDATE_STATS": {
      if (!state.startTime) return state;

      const timeInSeconds = (Date.now() - state.startTime - state.totalPausedTime) / 1000;
      const timeInMinutes = timeInSeconds / 60;

      const correctKeystrokes = state.keystrokes.filter((k) => k.correct && k.key !== "Backspace").length;
      const totalKeystrokes = state.keystrokes.filter((k) => k.key !== "Backspace").length;

      const wpm = timeInMinutes > 0 ? Math.round(correctKeystrokes / 5 / timeInMinutes) : 0;
      const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

      return {
        ...state,
        wpm,
        accuracy,
        time: Math.round(timeInSeconds),
      };
    }

    case "FINISH": {
      return {
        ...state,
        status: "finished",
        endTime: Date.now(),
      };
    }

    case "RESET": {
      return {
        ...initialGameState,
        mode: state.mode,
      };
    }

    default:
      return state;
  }
}

// Initial state
const initialGameState: GameState = {
  words: [],
  currentWordIndex: 0,
  currentCharIndex: 0,
  currentInput: "",
  status: "idle",
  mode: "time",
  startTime: null,
  endTime: null,
  pauseStartTime: null,
  totalPausedTime: 0,
  keystrokes: [],
  errors: 0,
  corrections: 0,
  wpm: 0,
  accuracy: 100,
  time: 0,
};

export const useTypingGame = (initialWords: string[] = []) => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.type === "keydown") {
        if (event.key === "Escape") {
          dispatch({ type: "RESET" });
          return;
        }

        if (event.key === "Tab") {
          dispatch({ type: "RESET" });
          dispatch({ type: "INITIALIZE", words: initialWords, mode: state.mode });
          return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key === "p") {
          if (state.status === "typing") {
            dispatch({ type: "PAUSE" });
          } else if (state.status === "paused") {
            dispatch({ type: "RESUME" });
          }
          return;
        }

        if (event.key === "Backspace") {
          dispatch({ type: "BACKSPACE", timestamp: event.timestamp });
          return;
        }

        if (event.key.length === 1) {
          dispatch({ type: "TYPE_CHARACTER", char: event.key, timestamp: event.timestamp });
        }
      }
    },
    [initialWords, state.mode, state.status],
  );

  useKeyboardInput(handleKeyEvent, {
    disabled: state.status === "finished",
    preventDefault: true,
  });
  const initialize = useCallback((words: string[], mode: GameState["mode"] = "time") => {
    dispatch({ type: "INITIALIZE", words, mode });
  }, []);

  const start = useCallback(() => {
    dispatch({ type: "START" });
  }, []);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  const resume = useCallback(() => {
    dispatch({ type: "RESUME" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: "RESET" });
    dispatch({ type: "INITIALIZE", words: initialWords, mode: state.mode });
  }, [initialWords, state.mode]);

  return {
    // State
    ...state,

    // Actions
    initialize,
    start,
    pause,
    resume,
    reset,
    restart,

    // Computed values
    isActive: state.status === "typing",
    isPaused: state.status === "paused",
    isFinished: state.status === "finished",
    progress: (state.currentWordIndex / state.words.length) * 100,
  };
};
