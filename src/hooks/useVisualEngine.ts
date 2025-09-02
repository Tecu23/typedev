import { useCallback, useMemo, useRef } from "react";

import { useKeyboardInput } from "./useKeyboardInput";

import { useTypingStore } from "../store/typingStore";

import type { KeyboardEvent } from "../types/common";
import type { VisualEngineState, UseVisualEngineOptions } from "../types/engine";

// TODO: Update this hook to handle wpm and stats after

export const useVisualEngine = (options: UseVisualEngineOptions = {}) => {
  const { enabled = true, onTestComplete, onError } = options;

  // Store references to DOM elements
  const characterRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const wordRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  // New ref to trck extra haracter element
  const extraCharRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  // Ref for the cursor element
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const cursorContainerRef = useRef<HTMLElement | null>(null);

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
      element.className = "char char-correct";
      element.removeAttribute("data-typed");
    } else {
      element.className = "char char-incorrect";
      element.setAttribute("data-typed", typedChar);
    }
  }, []);

  const createExtraCharacterElement = useCallback(
    (typedChar: string, wordIndex: number, extraIndex: number): HTMLSpanElement => {
      const span = document.createElement("span");
      span.className = "char char-incorrect-extra";
      span.textContent = typedChar;
      span.setAttribute("data-typed", typedChar);
      span.setAttribute("data-extra-index", extraIndex.toString());

      // Store reference
      const key = `${wordIndex}-extra-${extraIndex}`;
      extraCharRefs.current.set(key, span);

      return span;
    },
    [],
  );

  const updateCursorPosition = useCallback(() => {
    if (!cursorRef.current || !cursorContainerRef.current) return;

    const state = stateRef.current;
    const currentWord = getCurrentWord();
    const expectedLength = currentWord?.length || 0;

    let targetElement: HTMLElement | null = null;

    // Check if we're in extra character territory
    if (state.currentCharIndex >= expectedLength) {
      // Check if we have an extra character at this position
      const extraIndex = state.currentCharIndex - expectedLength;
      const extraCharKey = `${state.currentWordIndex}-extra-${extraIndex}`;
      const extraCharElement = extraCharRefs.current.get(extraCharKey);

      if (extraCharElement) {
        targetElement = extraCharElement;
      } else {
        // Cursor at end of word (including any extras) - show on word space
        // Position cursor after the last character or extra character
        const wordElement = wordRefs.current.get(state.currentWordIndex);
        if (wordElement) {
          // Try to find the last character or extra character
          const allChars = wordElement.querySelectorAll(".char");
          if (allChars?.length > 0) {
            const lastChar = allChars[allChars.length - 1] as HTMLElement;
            const containerRect = cursorContainerRef.current.getBoundingClientRect();
            const lastCharRect = lastChar.getBoundingClientRect();

            // Position cursor at the right edge of the last character
            const x = lastCharRect.right - containerRect.left;
            const y = lastCharRect.top - containerRect.top;

            cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
            cursorRef.current.style.height = `${lastCharRect.height}px`;
            cursorRef.current.style.display = "block";
            return; // Early return since we handled this case
          }
        }
      }
    } else {
      // Normal character position
      const currentCharKey = `${state.currentWordIndex}-${state.currentCharIndex}`;
      const currentCharElement = characterRefs.current.get(currentCharKey);

      if (currentCharElement) {
        targetElement = currentCharElement;
      }
    }

    if (targetElement) {
      const containerRect = cursorContainerRef.current.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();

      // Calculate position relative to container
      const x = targetRect.left - containerRect.left;
      const y = targetRect.top - containerRect.top;

      // Use transform to position cursor without causing layout shifts
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      cursorRef.current.style.height = `${targetRect.height}px`;
      cursorRef.current.style.display = "block";
    } else {
      // Hide cursor if no target
      cursorRef.current.style.display = "none";
    }
  }, [getCurrentWord]);

  const completeCurrentWord = useCallback(() => {
    const state = stateRef.current;
    const wordElement = wordRefs.current.get(state.currentWordIndex);
    if (!wordElement) return;

    const expectedWord = wordElement.getAttribute("data-word-text") || "";
    const isCorrect = state.inputBuffer === expectedWord;

    // Update word visual state
    wordElement.className = isCorrect ? "word word-correct" : "word word-incorrect";
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
      currentWordElement.classList.remove("word-active");
      // NOTE: We keep the extra characters vsible - ther-re part of what was typed
    }

    // Move indices
    state.currentWordIndex++;
    state.currentCharIndex = 0;

    // Add current styling to new word
    nextWordElement.classList.add("word-active");
    updateCursorPosition();

    return true;
  }, [updateCursorPosition]);

  const handleCharacter = useCallback(
    (typedChar: string, expectedChar: string): boolean => {
      const state = stateRef.current;
      const currentWord = getCurrentWord();
      const expectedLength = currentWord?.length || 0;

      // Check if we'ew typing beyond the expected word length
      if (state.currentCharIndex >= expectedLength) {
        // Handle extra character
        const wordElement = wordRefs.current.get(state.currentWordIndex);
        if (!wordElement) return false;

        // Find the container the characters (before the space)
        const charContainer = wordElement.querySelector(".word-chars") || wordElement;

        // Create and append extra character
        const extraIndex = state.currentCharIndex - expectedLength;
        const extraElement = createExtraCharacterElement(typedChar, state.currentWordIndex, extraIndex);

        // Insert before the space element if it exists
        const spaceElement = wordElement.querySelector(".word-space");
        if (spaceElement) {
          wordElement.insertBefore(extraElement, spaceElement);
        } else {
          charContainer.appendChild(extraElement);
        }

        // Move to next postion
        state.currentCharIndex++;
        updateCursorPosition();

        return true;
      }

      // Normal character handling
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
      completeWord(state.inputBuffer, []);

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

      const currentWord = getCurrentWord();
      const expectedLength = currentWord?.length || 0;

      // Check if we're deleting an extra character
      if (state.currentCharIndex >= expectedLength) {
        const extraIndex = state.currentCharIndex - expectedLength;
        const extraCharKey = `${state.currentWordIndex}-extra-${extraIndex}`;
        const extraElement = extraCharRefs.current.get(extraCharKey);

        if (extraElement) {
          extraElement.remove();
          extraCharRefs.current.delete(extraCharKey);
        }

        updateCursorPosition();
        return true;
      }

      // Normal character deletion
      const charKey = `${state.currentWordIndex}-${state.currentCharIndex}`;
      const charElement = characterRefs.current.get(charKey);

      if (charElement) {
        // Reset to pending state
        charElement.className = "char";
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
      // Whem beyond word length, we don't have an expected char
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
    blockedKeys: ["Alt", "Meta", "Control", "Shift", "CapsLock"],
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

  const registerCursor = useCallback((element: HTMLSpanElement | null) => {
    if (element) {
      cursorRef.current = element;

      // SetInitialStyles
      element.style.position = "absolute";
      element.style.top = "2px";
      element.style.left = "0";
      element.style.width = "2px";
      element.style.backgroundColor = "var(--color-caret, #f2cdcd)";
      element.style.pointerEvents = "none";
      element.style.zIndex = "10";
      element.style.transition = "transform 100ms ease-out";
    }
  }, []);

  const registerCursorContainer = useCallback((element: HTMLElement | null) => {
    if (element) {
      cursorContainerRef.current = element;

      // Ensure container has posiion relative for absolute positioning to work
      element.style.position = "relative";
    }
  }, []);

  const initialize = useCallback(() => {
    const state = stateRef.current;

    const firstWordElement = wordRefs.current.get(0);
    if (firstWordElement) {
      firstWordElement.classList.add("word-active");
    }

    // Position cursor at first character
    updateCursorPosition();

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
      element.className = "char";
      element.removeAttribute("data-typed");
      element.classList.remove("char-cursor");
    });

    // Reset all word visual states
    wordRefs.current.forEach((element) => {
      element.className = "word";
      element.classList.remove("word-active");

      // Remove any extra characters
      const extraChars = element.querySelectorAll("[data-extra-index]");
      extraChars.forEach((el) => el.remove());

      const spaceElement = element.querySelector(".word-space");
      if (spaceElement) {
        spaceElement.classList.remove("char-cursor");
      }
    });

    extraCharRefs.current.clear();

    // Re-initialize
    initialize();
  }, [initialize]);

  const api = useMemo(
    () => ({
      // Registration functions for components
      registerCharacter,
      registerWord,
      registerCursor,
      registerCursorContainer,

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
    [registerCharacter, registerWord, registerCursor, registerCursorContainer, initialize, reset, status],
  );

  return api;
};
