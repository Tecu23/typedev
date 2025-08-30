import { useCallback, useEffect, useMemo, useRef } from "react";

import { useKeyboardInput } from "./useKeyboardInput";

import { useTypingStore } from "../store/typingStore";

import type { KeyboardEvent } from "../types/common";
import type { VisualEngineState, UseVisualEngineOptions } from "../types/engine";

export const useVisualEngine = (options: UseVisualEngineOptions = {}) => {
  const { enabled = true, onTestComplete, onError } = options;

  // Store references to DOM elements
  const characterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const wordRefs = useRef<Map<number, HTMLSpanElement>>(new Map());

  // Internal state
  const stateRef = useRef<VisualEngineState>({
    currentWordIndex: 0,
    currentCharIndex: 0,
    inputBuffer: "",
    isInitialized: false,
  });

  const status = useTypingStore((state) => state.status);
  const getCurrentWord = useTypingStore((state) => state.getCurrentWord);
  const startTest = useTypingStore((state) => state.startTest);
  const finishTest = useTypingStore((state) => state.finishTest);
  const completeWord = useTypingStore((state) => state.completeWord);
  const isTestComplete = useTypingStore((state) => state.isTestComplete);

  const updateCharacterVisual = useCallback((element: HTMLSpanElement, typedChar: string, isCorrect: boolean) => {
    if (isCorrect) {
      element.className = "char char-correct relative inline-bloc transition-colors duration-75 ease-out";
      element.removeAttribute("data-typed");
    } else {
      element.className = "char char-incorrect relative inline-bloc transition-colors duration-75 ease-out";
      element.setAttribute("data-typed", typedChar);
    }
  }, []);

  const updateCursorPosition = useCallback(() => {
    const state = stateRef.current;
    // Remove cursor from all characters and spaces
    characterRefs.current.forEach((element) => element.classList.remove("char-cursor"));
    wordRefs.current.forEach((wordElement) => {
      const spaceElement = wordElement.querySelector(".word-space");
      if (spaceElement) {
        spaceElement.classList.remove("char-cursor");
      }
    });

    // Add cursor to current position
    const currentCharKey = `${state.currentWordIndex}-${state.currentCharIndex}`;
    const currentCharElement = characterRefs.current.get(currentCharKey);

    if (currentCharElement) {
      currentCharElement.classList.add("char-cursor");
    } else {
      // Cursor at end of word - show on word space
      const wordElement = wordRefs.current.get(state.currentWordIndex);
      if (wordElement) {
        const spaceElement = wordElement.querySelector(".word-space");
        if (spaceElement) {
          spaceElement.classList.add("char-cursor");
        }
      }
    }
  }, []);

  const completeCurrentWord = useCallback(() => {
    const state = stateRef.current;
    const wordElement = wordRefs.current.get(state.currentWordIndex);
    if (!wordElement) return;

    const expectedWord = wordElement.getAttribute("data-word-text") || "";
    const isCorrect = state.inputBuffer === expectedWord;

    // Update word visual state
    wordElement.className = isCorrect
      ? "word word-correct relative inline-block text-[32px] leading-[32px] mx-[9.6px] my-[8px] transition-opacity duration-200 ease-out opacity-60"
      : "word word-incorrect relative inline-block text-[32px] leading-[32px] mx-[9.6px] my-[8px] transition-opacity duration-200 ease-out opacity-60";
  }, []);

  const moveToNextWord = useCallback((): boolean => {
    const state = stateRef.current;

    // Check if there's a next word
    const nextWordElement = wordRefs.current.get(state.currentWordIndex + 1);
    if (!nextWordElement) {
      return false; // Test complete
    }

    // Remove current styling from current word
    const currentWordElement = wordRefs.current.get(state.currentWordIndex);
    if (currentWordElement) {
      currentWordElement.classList.remove("word-current");
    }

    // Move indices
    state.currentWordIndex++;
    state.currentCharIndex = 0;

    // Add current styling to new word
    nextWordElement.classList.add("word-current");
    updateCursorPosition();

    return true;
  }, [updateCursorPosition]);

  const handleCharacter = useCallback(
    (typedChar: string, expectedChar: string): boolean => {
      const state = stateRef.current;
      const charKey = `${state.currentWordIndex}-${state.currentCharIndex}`;
      const charElement = characterRefs.current.get(charKey);

      if (!charElement) return false;

      state.inputBuffer += typedChar;
      const isCorrect = typedChar === expectedChar;

      // Direct DOM manipulation
      updateCharacterVisual(charElement, typedChar, isCorrect);

      // Move to next character position
      state.currentCharIndex++;
      updateCursorPosition();

      return true;
    },
    [updateCharacterVisual, updateCursorPosition],
  );

  const handleSpacebar = useCallback((): boolean => {
    const state = stateRef.current;

    // Complete current word
    completeCurrentWord();

    // Move to next word
    const success = moveToNextWord();

    if (success) {
      // Notify Zustand store (only React state update during typing)
      completeWord(state.inputBuffer, []); // Simplified keystroke data

      // Reset buffer for next word
      state.inputBuffer = "";
    }

    return success;
  }, [completeCurrentWord, moveToNextWord, completeWord]);

  const handleBackspace = useCallback((): boolean => {
    const state = stateRef.current;

    if (state.currentCharIndex > 0) {
      state.currentCharIndex--;
      state.inputBuffer = state.inputBuffer.slice(0, -1);

      const charKey = `${state.currentWordIndex}-${state.currentCharIndex}`;
      const charElement = characterRefs.current.get(charKey);

      if (charElement) {
        // Reset to pending state
        charElement.className = "char char-pending relative inline-block transition-colors duration-75 ease-out";
        charElement.removeAttribute("data-typed");
        updateCursorPosition();
        return true;
      }
    }
    return false;
  }, [updateCursorPosition]);

  const processKeystroke = useCallback(
    (keyEvent: KeyboardEvent, expectedChar: string): boolean => {
      if (!stateRef.current.isInitialized) return false;

      const { key } = keyEvent;

      try {
        if (key === " ") {
          return handleSpacebar();
        }

        if (key === "Backspace") {
          return handleBackspace();
        }

        if (key.length === 1) {
          return handleCharacter(key, expectedChar);
        }

        return false; // Key not processed
      } catch (error) {
        onError?.(error as Error);
        return false;
      }
    },
    [handleSpacebar, handleBackspace, handleCharacter, onError],
  );

  const handleKeyEvent = useCallback(
    (keyEvent: KeyboardEvent) => {
      if (keyEvent.type !== "keydown") return;

      // Get expected character from store
      const currentWord = getCurrentWord();
      if (!currentWord) return;

      const state = stateRef.current;
      const expectedChar = currentWord[state.currentCharIndex] || "";

      // Process keystroke
      const processed = processKeystroke(keyEvent, expectedChar);

      if (processed) {
        // Start test on first successful keystroke
        if (status === "idle" && keyEvent.key.length === 1) {
          startTest();
        }

        // Check for test completion
        if (isTestComplete()) {
          finishTest();
          onTestComplete?.();
        }
      }
    },
    [processKeystroke, onTestComplete, getCurrentWord, status, startTest, isTestComplete, finishTest],
  );

  useKeyboardInput(handleKeyEvent, {
    disabled: !enabled || status === "finished",
    preventDefault: true,
    capture: true,
    allowedKeys: null,
    blockedKeys: ["Tab", "Alt", "Meta", "Control", "Shift", "CapsLock"],
  });

  const registerCharacter = useCallback((element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => {
    if (element == null) return;
    const key = `${wordIndex}-${charIndex}`;
    characterRefs.current.set(key, element);
  }, []);

  const registerWord = useCallback((element: HTMLDivElement | null, wordIndex: number) => {
    if (element == null) return;
    wordRefs.current.set(wordIndex, element);
  }, []);

  const initialize = useCallback(() => {
    const state = stateRef.current;

    const firstWordElement = wordRefs.current.get(0);
    if (firstWordElement) {
      firstWordElement.classList.add("word-current");
    }

    const firstCharElement = characterRefs.current.get("0-0");
    if (firstCharElement) {
      firstCharElement.classList.add("char-cursor");
    }

    state.isInitialized = true;
  }, []);

  const reset = useCallback(() => {
    const state = stateRef.current;

    // Reset internal state
    state.currentWordIndex = 0;
    state.currentCharIndex = 0;
    state.inputBuffer = "";

    // Reset all character visual states
    characterRefs.current.forEach((element) => {
      element.className = "char char-pending relative inline-block transition-colors duration-75 ease-out";
      element.removeAttribute("data-typed");
      element.classList.remove("char-cursor");
    });

    // Reset all word visual states
    wordRefs.current.forEach((element) => {
      element.className =
        "word word-pending relative inline-block text-[32px] leading-[32px] mx-[9.6px] my-[8px] transition-opacity duration-200 ease-out";
      element.classList.remove("word-current");

      const spaceElement = element.querySelector(".word-space");
      if (spaceElement) {
        spaceElement.classList.remove("char-cursor");
      }
    });

    // Re-initialize
    initialize();
  }, [initialize]);

  const api = useMemo(
    () => ({
      // Registration functions for components
      registerCharacter,
      registerWord,

      // Lifecycle management
      initialize,
      reset,

      // State accessors (for debugging/monitoring)
      getCurrentPosition: () => ({
        wordIndex: stateRef.current.currentWordIndex,
        charIndex: stateRef.current.currentCharIndex,
      }),

      getInputBuffer: () => stateRef.current.inputBuffer,

      // Status
      isEnabled: enabled && status !== "finished",
      isInitialized: stateRef.current.isInitialized,
    }),
    [registerCharacter, registerWord, initialize, reset, status],
  );

  return api;
};
