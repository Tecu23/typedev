import type { IKeystroke } from "../types/common";
import type { ILiveStats, ITestConfig, ITypingStats, IWordResult } from "../types/game";
import type { ITypingStore } from "../types/store";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { calculateConsistency } from "../utils/helpers";

const defaultConfig: ITestConfig = {
  mode: "time",
  timeLimit: 60,
  wordCount: 50,
  language: "english",
  punctuation: false,
  numbers: false,
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

export const useTypingStore = create<ITypingStore>()(
  immer((set, get) => ({
    // Initial State
    config: defaultConfig,
    wordList: [],
    totalWords: 0,
    status: "idle",
    startTime: null,
    endTime: null,
    currentWordIndex: 0,
    wordsCompleted: 0,
    totalWordsTyped: 0,
    keystrokeHistory: [],
    wordResults: [],
    finalStats: defaultStats,
    liveStats: defaultLiveStats,
    lastStatsUpdate: 0,
    statsUpdateInterval: 1000,

    // Configuration Actions
    setConfig: (newConfig) =>
      set((state) => {
        state.config = { ...state.config, ...newConfig };
      }),

    resetConfig: () =>
      set((state) => {
        state.config = defaultConfig;
      }),

    // Test Lifecycle Actions
    initializeTest: (words) => {
      set((state) => {
        state.status = "idle";
        state.currentWordIndex = 0;
        state.wordsCompleted = 0;
        state.totalWordsTyped = 0;
        state.keystrokeHistory = [];
        state.finalStats = defaultStats;
        state.liveStats = defaultLiveStats;
        state.startTime = null;
        state.endTime = null;
        state.wordList = words;
        state.totalWords = words.length;
        state.wordResults = [];
      });
    },

    startTest: () =>
      set((state) => {
        if (state.status === "idle") {
          state.status = "typing";
          state.startTime = performance.now();
          state.lastStatsUpdate = performance.now();
        }
      }),

    pauseTest: () =>
      set((state) => {
        if (state.status === "typing") {
          state.status = "paused";
        }
      }),

    resumeTest: () =>
      set((state) => {
        if (state.status === "paused") {
          state.status = "typing";
        }
      }),

    finishTest: () => {
      set((state) => {
        state.status = "finished";
        state.endTime = performance.now();

        // Trigger final stats calculation
      });
      get().calculateFinalStats();
    },

    resetTest: () => {
      set((state) => {
        state.status = "idle";
        state.currentWordIndex = 0;
        state.wordsCompleted = 0;
        state.totalWordsTyped = 0;
        state.keystrokeHistory = [];
        state.finalStats = defaultStats;
        state.liveStats = defaultLiveStats;
        state.startTime = null;
        state.endTime = null;
        state.lastStatsUpdate = 0;
      });
    },

    // Progress Tracking Actions (called by Visual Engine)
    completeWord: (typedWord, keystrokesForWord) =>
      set((state) => {
        const expectedWord = state.wordList[state.currentWordIndex];
        const isCorrect = typedWord === expectedWord;
        const currentTime = performance.now();

        // Record word result
        const wordResult: IWordResult = {
          word: expectedWord,
          typed: typedWord,
          correct: isCorrect,
          wpm: get().liveStats.currentWpm,
          errors: keystrokesForWord.filter((k) => !k.correct).length,
          timestamp: currentTime,
        };

        state.wordResults.push(wordResult);
        state.wordsCompleted += 1;
        state.totalWordsTyped += 1;
        state.currentWordIndex += 1;

        // Check for test completion
        if (get().isTestComplete()) {
          get().finishTest();
        }
      }),

    undoCompleteWord: () =>
      set((state) => {
        if (state.wordsCompleted > 0 && state.wordResults.length > 0) {
          // Remove the last word result
          const lastWordResult = state.wordResults.pop();

          // Remove keystrokes for this word from the end of keystrokeHistory
          // This is complex because we need to identify which keystrokes belong to this word
          // A better approach might be to store keystroke count per word or mark keystrokes with word completion status

          // For now, we'll remove keystrokes that match the current word index
          // This is imperfect but should work for most cases
          const targetWordIndex = state.currentWordIndex - 1;
          let keystrokesToRemove = 0;

          // Count keystrokes from the end that belong to this word
          for (let i = state.keystrokeHistory.length - 1; i >= 0; i--) {
            if (state.keystrokeHistory[i].wordIndex === targetWordIndex) {
              keystrokesToRemove++;
            } else {
              break; // Stop when we hit keystrokes from a different word
            }
          }

          // Remove those keystrokes
          state.keystrokeHistory.splice(-keystrokesToRemove, keystrokesToRemove);

          state.wordsCompleted -= 1;
          state.totalWordsTyped -= 1;
          state.currentWordIndex -= 1;
        }
      }),

    // Statistics Actions
    updateLiveStats: () =>
      set((state) => {
        const currentTime = performance.now();

        // Throttle updates to avoid excessive calculations
        if (currentTime - state.lastStatsUpdate < state.statsUpdateInterval) {
          return;
        }

        if (!state.startTime) return;

        const timeElapsedMs = currentTime - state.startTime;
        const timeElapsedMin = timeElapsedMs / 1000 / 60;
        const totalCorrectChars = state.keystrokeHistory.filter((k: IKeystroke) => k.correct).length;
        const totalChars = state.keystrokeHistory.length;

        state.liveStats = {
          currentWpm: totalCorrectChars > 0 ? Math.round(totalCorrectChars / 5 / timeElapsedMin) : 0,
          currentAccuracy: totalChars > 0 ? Math.round((totalCorrectChars / totalChars) * 100) : 100,
          timeElapsed: Math.round(timeElapsedMs / 1000),
          wordsCompleted: state.wordsCompleted,
        };

        state.lastStatsUpdate = currentTime;
      }),

    calculateFinalStats: () =>
      set((state) => {
        if (!state.startTime || !state.endTime) return;

        const testDurationMs = state.endTime - state.startTime;
        const testDurationMin = testDurationMs / 1000 / 60;

        const totalCorrectChars = state.keystrokeHistory.filter((k: IKeystroke) => k.correct).length;
        const totalIncorrectChars = state.keystrokeHistory.filter((k: IKeystroke) => !k.correct).length;
        const totalChars = state.keystrokeHistory.length;
        const correctWords = state.wordResults.filter((w: IWordResult) => w.correct).length;

        // Calculate WPM (standard: correct chars / 5 / time in minutes)
        const wpm = totalCorrectChars > 0 ? Math.round(totalCorrectChars / 5 / testDurationMin) : 0;

        // Calculate Raw WPM (all chars / 5 / time)
        const rawWpm = totalChars > 0 ? Math.round(totalChars / 5 / testDurationMin) : 0;

        // Calculate Accuracy
        const accuracy = totalChars > 0 ? Math.round((totalCorrectChars / totalChars) * 100) : 100;

        // Calculate Consistency (coefficient of variation of WPM over time)
        const consistency = calculateConsistency(state.wordResults.map((w: IWordResult) => w.wpm));

        state.finalStats = {
          wpm,
          rawWpm,
          accuracy,
          consistency,
          correctChars: totalCorrectChars,
          incorrectChars: totalIncorrectChars,
          totalChars,
          correctWords,
          totalWords: state.wordResults.length,
        };
      }),

    // Getters
    getCurrentWord: () => {
      if (get().currentWordIndex >= get().wordList.length) return null;
      return get().wordList[get().currentWordIndex];
    },

    getTestProgress: () => {
      if (get().config.mode === "words") {
        return (get().wordsCompleted / get().config.wordCount) * 100;
      } else if (get().config.mode === "time" && get().startTime) {
        const elapsed = (performance.now() - (get().startTime || 0)) / 1000;
        return Math.min((elapsed / get().config.timeLimit) * 100, 100);
      }
      return 0;
    },

    isTestComplete: () => {
      if (get().config.mode === "words") {
        return get().wordsCompleted >= get().config.wordCount;
      } else if (get().config.mode === "time" && get().startTime) {
        const elapsed = (performance.now() - (get().startTime || 0)) / 1000;
        return elapsed >= get().config.timeLimit;
      }
      return false;
    },

    getTimeRemaining: () => {
      if (get().config.mode !== "time" || !get().startTime) return 0;

      const elapsed = (performance.now() - (get().startTime || 0)) / 1000;
      return Math.max(0, get().config.timeLimit - elapsed);
    },

    addKeystroke: (keystroke) =>
      set((state) => {
        state.keystrokeHistory.push(keystroke);
      }),

    // Utilities
    exportResults: () => {
      return {
        config: get().config,
        finalStats: get().finalStats,
        wordResults: get().wordResults,
        keystrokeHistory: get().keystrokeHistory,
        testDuration: get().endTime && get().startTime ? ((get().endTime || 0) - (get().startTime || 0)) / 1000 : 0,
        timestamp: new Date().toISOString(),
      };
    },

    getPerformanceMetrics: () => {
      return {
        totalKeystrokes: get().keystrokeHistory.length,
        wordsCompleted: get().wordsCompleted,
        averageWordTime:
          get().wordResults.length > 0
            ? get().wordResults.reduce((acc, w, i) => {
                if (i === 0) return 0;
                return acc + (w.timestamp - get().wordResults[i - 1].timestamp);
              }, 0) /
              (get().wordResults.length - 1)
            : 0,
        errorRate:
          get().keystrokeHistory.length > 0
            ? (get().keystrokeHistory.filter((k) => !k.correct).length / get().keystrokeHistory.length) * 100
            : 0,
      };
    },
  })),
);
