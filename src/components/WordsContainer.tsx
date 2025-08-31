import { useEffect, useMemo, useRef, useCallback } from "react";

import clsx from "clsx";
import { MousePointer } from "lucide-react";

import Word from "./Word";

type Props = {
  words: string[];
  initializeEngine: () => void;
  resetEngine: () => void;
  getCurrentPosition: () => { wordIndex: number; charIndex: number };
  isEngineEnabled: boolean;
  registerCharacter: (element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => void;
  registerWord: (element: HTMLDivElement | null, wordIndex: number) => void;
};

const WordsContainer = ({
  words,
  isEngineEnabled,
  initializeEngine,
  resetEngine,
  getCurrentPosition,
  registerCharacter,
  registerWord,
}: Props) => {
  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);
  const lastScrolledWordRef = useRef<number>(-1);

  const isInitializedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeEngine();
      isInitializedRef.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) {
      resetEngine();
    }
  }, [words, resetEngine]);

  // Function to handle scrolling
  const scrollToActiveWord = useCallback(() => {
    if (!wordsContainerRef.current || !wordsRef.current) return;

    const position = getCurrentPosition();
    const currentWordIndex = position.wordIndex;

    // Only scroll if we've moved to a new word
    if (currentWordIndex === lastScrolledWordRef.current) return;

    // Get the current word element
    const currentWordElement = document.getElementById(`word-${currentWordIndex}`);
    if (!currentWordElement) return;

    const containerHeight = wordsContainerRef.current.clientHeight;
    const containerScrollTop = wordsContainerRef.current.scrollTop;
    const wordTop = currentWordElement.offsetTop;
    const wordHeight = currentWordElement.offsetHeight;

    // Calculate the word's position relative to the container's visible area
    const wordRelativeTop = wordTop - containerScrollTop;
    const wordBottom = wordRelativeTop + wordHeight;

    // Define the scroll trigger zone (middle third of the container)
    const triggerZoneTop = containerHeight * 0.33;
    const triggerZoneBottom = containerHeight * 0.66;

    // Scroll if the word is below the trigger zone
    if (wordBottom > triggerZoneBottom) {
      // Calculate scroll position to center the word vertically
      const targetScrollTop = wordTop - containerHeight / 2 + wordHeight / 2;
      wordsContainerRef.current.scrollTop = targetScrollTop;
      lastScrolledWordRef.current = currentWordIndex;
    }

    // Also scroll if word is above the visible area (for when user goes back)
    if (wordRelativeTop < 0) {
      const targetScrollTop = wordTop - triggerZoneTop;
      wordsContainerRef.current.scrollTop = Math.max(0, targetScrollTop);
      lastScrolledWordRef.current = currentWordIndex;
    }
  }, [getCurrentPosition]);

  // Set up MutationObserver to watch for class changes
  useEffect(() => {
    if (!wordsRef.current) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains("word-active") || target.classList.contains("word-correct")) {
            scrollToActiveWord();
          }
        }
      });
    });

    // Observe all word elements for class changes
    observer.observe(wordsRef.current, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    return () => observer.disconnect();
  }, [scrollToActiveWord, words]);

  return (
    <div
      id="words_wrapper"
      ref={wordsContainerRef}
      className="content-grid col-[full-width] h-[153px] overflow-y-hidden overflow-x-visible relative"
    >
      <input
        id="words_input"
        className="col-[full-width] w-[77px] h-8 left-2.5 top-[9px] text-[2rem] opacity-0 mx-auto border-none outline-none block resize-none absolute z-[-1] cursor-default pointer-events-none rounded-none"
      />
      {false && (
        <div
          id="out-of_focus"
          className="col-[content] max-h-[153px] w-full h-full absolute content-center z-50 text-center text-[1rem] text-sub flex-center gap-2"
        >
          <MousePointer size={20} />
          {" Click here or press any key to focus"}
        </div>
      )}
      <div
        id="words"
        ref={wordsRef}
        className={clsx(
          "col-[full-width] h-fit w-full pb-2 flex flex-wrap content-start select-none",
          !isEngineEnabled && "opacity-50",
          false && "opacity-25 blur-[4px]", // (out of focus)
        )}
      >
        {words.map((word: string, wordIndex: number) => {
          return (
            <Word
              key={`word-${wordIndex}`}
              word={word}
              index={wordIndex}
              id={`word-${wordIndex}`}
              onCharacterMount={registerCharacter}
              onWordMount={registerWord}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WordsContainer;
