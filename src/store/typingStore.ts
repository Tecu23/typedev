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
    initializeTest: (words) =>
      set((state) => {
        state.wordList = words;
        state.totalWords = words.length;
        state.status = "idle";
        state.currentWordIndex = 0;
        state.wordsCompleted = 0;
        state.totalWordsTyped = 0;
        state.keystrokeHistory = [];
        state.wordResults = [];
        state.finalStats = defaultStats;
        state.liveStats = defaultLiveStats;
        state.startTime = null;
        state.endTime = null;
      }),

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

    finishTest: () =>
      set((state) => {
        state.status = "finished";
        state.endTIme = performance.now();

        // Trigger final stats calculation
        const store = get();
        store.calculateFinalStats();
      }),

    resetTest: () =>
      set((state) => {
        state.status = "idle";
        state.currentWordIndex = 0;
        state.wordsCompleted = 0;
        state.totalWordsTyped = 0;
        state.keystrokeHistory = [];
        state.wordsCompleted = [];
        state.finalStats = defaultStats;
        state.liveStats = defaultLiveStats;
        state.startTime = null;
        state.endTime = null;
        state.lastStatsUpdate = 0;
      }),

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
        state.keystrokeHistory.push(...keystrokesForWord);
        state.wordsCompleted += 1;
        state.totalWordsTyped += 1;
        state.currentWordIndex += 1;

        // Check for test completion
        if (get().isTestComplete()) {
          get().finishTest();
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
      const state = get();
      if (state.currentWordIndex >= state.wordList.length) return null;
      return state.wordList[state.currentWordIndex];
    },

    getTestProgress: () => {
      const state = get();
      if (state.config.mode === "words") {
        return (state.wordsCompleted / state.config.wordCount) * 100;
      } else if (state.config.mode === "time" && state.startTime) {
        const elapsed = (performance.now() - state.startTime) / 1000;
        return Math.min((elapsed / state.config.timeLimit) * 100, 100);
      }
      return 0;
    },

    isTestComplete: () => {
      const state = get();

      if (state.config.mode === "words") {
        return state.wordsCompleted >= state.config.wordCount;
      } else if (state.config.mode === "time" && state.startTime) {
        const elapsed = (performance.now() - state.startTime) / 1000;
        return elapsed >= state.config.timeLimit;
      }
      return false;
    },

    getTimeRemaining: () => {
      const state = get();
      if (state.config.mode !== "time" || !state.startTime) return 0;

      const elapsed = (performance.now() - state.startTime) / 1000;
      return Math.max(0, state.config.timeLimit - elapsed);
    },

    // Utilities
    exportResults: () => {
      const state = get();
      return {
        config: state.config,
        finalStats: state.finalStats,
        wordResults: state.wordResults,
        keystrokeHistory: state.keystrokeHistory,
        testDuration: state.endTime && state.startTime ? (state.endTime - state.startTime) / 1000 : 0,
        timestamp: new Date().toISOString(),
      };
    },

    getPerformanceMetrics: () => {
      const state = get();
      return {
        totalKeystrokes: state.keystrokeHistory.length,
        wordsCompleted: state.wordsCompleted,
        averageWordTime:
          state.wordResults.length > 0
            ? state.wordResults.reduce((acc, w, i) => {
                if (i === 0) return 0;
                return acc + (w.timestamp - state.wordResults[i - 1].timestamp);
              }, 0) /
              (state.wordResults.length - 1)
            : 0,
        errorRate:
          state.keystrokeHistory.length > 0
            ? (state.keystrokeHistory.filter((k) => !k.correct).length / state.keystrokeHistory.length) * 100
            : 0,
      };
    },
  })),
);

// Hook for components that only need live stats
export const useLiveStats = () => useTypingStore((state) => state.liveStats);

// Hook for timer display
export const useTimer = () =>
  useTypingStore((state) => ({
    timeRemaining: state.getTimeRemaining(),
    progress: state.getTestProgress(),
    status: state.status,
  }));

// Hook for test configuration
export const useTestConfig = () =>
  useTypingStore((state) => ({
    config: state.config,
    setConfig: state.setConfig,
    resetConfig: state.resetConfig,
  }));

// Hook for test lifecycle
export const useTestLifecycle = () =>
  useTypingStore((state) => ({
    status: state.status,
    initializeTest: state.initializeTest,
    startTest: state.startTest,
    pauseTest: state.pauseTest,
    resumeTest: state.resumeTest,
    finishTest: state.finishTest,
    resetTest: state.resetTest,
  }));
