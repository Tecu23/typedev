/**
 * Main game logic hook
 * This is where ALL game logic lives - the single source of truth
 */
import { useCallback } from "react";

import { useKeyboardInput } from "./useKeyboardInput";
import type { KeyboardEvent } from "./useKeyboardInput";

import type { GameState } from "../types/game";
import { useTypingStore } from "../store/typingStore";
import type { IWord } from "../types/common";

export const useTypingGame = (initialWords: IWord[] = []) => {
  const testMode = useTypingStore((state) => state.mode);
  const testStatus = useTypingStore((state) => state.status);

  const typeBackspace = useTypingStore((state) => state.typeBackspace);
  const typeCharacter = useTypingStore((state) => state.typeCharacter);

  const startTest = useTypingStore((state) => state.startTest);
  const resetTest = useTypingStore((state) => state.resetTest);
  const pauseTest = useTypingStore((state) => state.pauseTest);
  const resumeTest = useTypingStore((state) => state.resumeTest);
  const initializeTest = useTypingStore((state) => state.initialize);

  const words = useTypingStore((state) => state.words);
  const setWords = useTypingStore((state) => state.setWords);
  const currentWordIndex = useTypingStore((state) => state.currentWordIndex);

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      console.log("Key Event");
      if (event.type === "keydown") {
        if (event.key === "Escape") {
          resetTest();
          return;
        }

        if (event.key === "Tab") {
          resetTest();
          setWords(initialWords);
          initializeTest(testMode);
          return;
        }

        if ((event.ctrlKey || event.metaKey) && event.key === "p") {
          if (testStatus === "typing") {
            pauseTest();
          } else if (testStatus === "paused") {
            resumeTest();
          }
          return;
        }

        if (event.key === "Backspace") {
          typeBackspace(event.timestamp);
          return;
        }

        if (event.key.length === 1) {
          console.log("type character");
          typeCharacter(event.key, event.timestamp);
        }
      }
    },
    [initialWords, testMode, testStatus],
  );

  useKeyboardInput(handleKeyEvent, {
    disabled: testStatus === "finished",
    preventDefault: true,
  });

  const initialize = useCallback((words: IWord[], mode: GameState["mode"] = "time") => {
    setWords(words);
    initializeTest(mode);
  }, []);

  const start = useCallback((duration: number) => {
    startTest(duration);
  }, []);

  const pause = useCallback(() => {
    pauseTest();
  }, []);

  const resume = useCallback(() => {
    resumeTest();
  }, []);

  const reset = useCallback(() => {
    resetTest();
  }, []);

  const restart = useCallback(() => {
    resetTest();
    setWords(initialWords);
    initializeTest(testMode);
  }, [initialWords, testMode]);

  return {
    // Actions
    initialize,
    start,
    pause,
    resume,
    reset,
    restart,

    // Computed values
    isActive: testStatus === "typing",
    isPaused: testStatus === "paused",
    isFinished: testStatus === "finished",
    progress: (currentWordIndex / words.length) * 100,
  };
};
