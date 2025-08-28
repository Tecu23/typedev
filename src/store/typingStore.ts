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
  initialize: (mode) => {
    set({
      currentWordIndex: 0,
      currentCharIndex: 0,
      currentInput: "",
      status: "ready",
      mode: mode,
      keystrokes: [],
      errors: 0,
      corrections: 0,
    });
  },
  setWords: (newWords) => {
    set({
      words: newWords,
      status: "ready",
      isLoading: false,
    });
  },
  startTest: (duration) => {
    if (get().status !== "ready") return;

    set({
      status: "typing",
      startTime: Date.now(),
      testDuration: duration,
      showResults: false,
    });
  },
  pauseTest: () => {
    if (get().status !== "typing") return;
    set({
      status: "paused",
      pauseStartTime: Date.now(),
    });
  },
  resumeTest: () => {
    if (get().status !== "paused") return;
    const pauseDuration = Date.now() - (get().pauseStartTime || 0);
    set({
      status: "typing",
      pauseStartTime: null,
      totalPausedTime: get().totalPausedTime + pauseDuration,
    });
  },
  finishTest: () => {
    set({
      status: "finished",
      endTime: Date.now(),
      showResults: true,
    });
  },
  resetTest: () => {
    set({
      words: [],
      currentWordIndex: 0,
      currentCharIndex: 0,
      currentInput: "",
      status: "idle",
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
    });
  },
  setTypingValue: (value) => {
    set({ currentInput: value });
  },
  typeCharacter: (char, timestamp) => {
    let newState: { status?: string; startTime?: number } = {};
    // Auto-start on first character
    if (get().status === "ready") {
      newState = { status: "typing", startTime: Date.now() };
    }

    if (get().status !== "typing") return;

    const currentWord = get().words[get().currentWordIndex];
    if (!currentWord) return;

    const expectedChar = currentWord.text[get().currentCharIndex];
    const isCorrect = char === expectedChar;

    // Handle space - move to next word
    if (char === " ") {
      // Check if current word is complete
      if (get().currentInput === currentWord.text) {
        // Word is correct
        const updatedWords = [...get().words];
        updatedWords[get().currentWordIndex] = {
          ...currentWord,
          status: "correct",
        };

        // Move to next word
        const nextIndex = get().currentWordIndex + 1;
        if (nextIndex < get().words.length) {
          updatedWords[nextIndex] = {
            ...updatedWords[nextIndex],
            status: "current",
          };

          set({
            ...newState,
            words: updatedWords,
            currentWordIndex: nextIndex,
            currentCharIndex: 0,
            currentInput: "",
            keystrokes: [
              ...get().keystrokes,
              {
                key: char,
                timestamp: timestamp,
                correct: true,
              },
            ],
          });
        } else {
          // Test complete
          return get().finishTest();
        }
      } else {
        // Word has errors - mark as incorrect
        const updatedWords = [...get().words];
        updatedWords[get().currentWordIndex] = {
          ...currentWord,
          status: "incorrect",
        };

        const nextIndex = get().currentWordIndex + 1;
        if (nextIndex < get().words.length) {
          updatedWords[nextIndex] = {
            ...updatedWords[nextIndex],
            status: "current",
          };

          set({
            ...newState,
            words: updatedWords,
            currentWordIndex: nextIndex,
            currentCharIndex: 0,
            currentInput: "",
            errors: get().errors + 1,
            keystrokes: [
              ...get().keystrokes,
              {
                key: char,
                timestamp: timestamp,
                correct: false,
              },
            ],
          });
        } else {
          return get().finishTest();
        }
      }
    }

    // Regular character
    set({
      ...newState,
      currentInput: get().currentInput + char,
      currentCharIndex: get().currentCharIndex + 1,
      errors: isCorrect ? get().errors : get().errors + 1,
      keystrokes: [
        ...get().keystrokes,
        {
          key: char,
          timestamp: timestamp,
          correct: isCorrect,
        },
      ],
    });
  },

  typeBackspace: (timestamp) => {
    if (get().status !== "typing") return;
    if (get().currentCharIndex === 0) return;

    set({
      currentInput: get().currentInput.slice(0, -1),
      currentCharIndex: get().currentCharIndex - 1,
      corrections: get().corrections + 1,
      keystrokes: [
        ...get().keystrokes,
        {
          key: "Backspace",
          timestamp: timestamp,
          correct: true,
        },
      ],
    });
  },
  updateStats: () => {
    if (get().startTime == null) return;

    const timeInSeconds = (Date.now() - get().startTime - get().totalPausedTime) / 1000;
    const timeInMinutes = timeInSeconds / 60;

    const correctKeystrokes = get().keystrokes.filter((k) => k.correct && k.key !== "Backspace").length;
    const totalKeystrokes = get().keystrokes.filter((k) => k.key !== "Backspace").length;

    const wpm = timeInMinutes > 0 ? Math.round(correctKeystrokes / 5 / timeInMinutes) : 0;
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

    set({
      wpm,
      accuracy,
      time: Math.round(timeInSeconds),
    });
  },
}));
