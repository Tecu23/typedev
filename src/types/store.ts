import type { IKeystroke } from "./common";
import type { ILiveStats, ITestConfig, ITypingStats, IWordResult } from "./game";

export interface ITypingStore {
  // Test Configuration
  config: ITestConfig;

  // Word Data (logical only - no visual state)
  wordList: string[];
  totalWords: number;

  // Game Status
  status: "idle" | "pending" | "paused" | "finished" | "typing";
  startTime: number | null;
  endTime: number | null;

  // Progress Tracking (updates only on word completion)
  currentWordIndex: number;
  wordsCompleted: number;
  totalWordsTyped: number;

  // Performance Data
  keystrokeHistory: IKeystroke[];
  wordResults: IWordResult[];
  finalStats: ITypingStats;
  liveStats: ILiveStats;

  // Performance Monitoring
  lastStatsUpdate: number;
  statsUpdateInterval: number;

  // Actions - Configuration
  setConfig: (config: Partial<ITestConfig>) => void;
  resetConfig: () => void;

  // Actions - Test Lifecycle
  initializeTest: (words: string[]) => void;
  startTest: () => void;
  pauseTest: () => void;
  resumeTest: () => void;
  finishTest: () => void;
  resetTest: () => void;

  // Actions - Progress Tracking (called by Visual Engine)
  completeWord: (typedWord: string, keystrokesForWord: IKeystroke[]) => void;

  // Actions - Statistics
  updateLiveStats: () => void;
  calculateFinalStats: () => void;

  // Getters
  getCurrentWord: () => string | null;
  getTestProgress: () => number;
  isTestComplete: () => boolean;
  getTimeRemaining: () => number;

  // Utilities
  exportResults: () => object;
  getPerformanceMetrics: () => object;
}
