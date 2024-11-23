import { LegacyRef, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import Caret from "../../Caret";
import { samples } from "../../../utilities/helpers/seeds/code/typescript";

const WordsContainer = ({ words, typed }: { words: string; typed: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const typedWords = typed.split(" ");
  const generatedWords = words.split(" ");

  const currentWordIndex = typedWords.length - 1;
  const currentLetterIndex = typedWords[currentWordIndex]?.length || 0;

  const cursorPositon = {
    wordIndex: currentWordIndex,
    letterIndex: currentLetterIndex,
  };

  const adjustScrollPosition = () => {
    if (cursorRef.current && containerRef.current) {
      const cursorElement = cursorRef.current;
      const containerElement = containerRef.current;

      const cursorRect = cursorElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();

      const cursorOffset = cursorRect.top - containerRect.top;
      const containerHeight = containerElement.clientHeight;
      const cursorHeight = cursorRect.height;

      const centerThreshhold = containerHeight / 2;

      // If the cursor is above the visible area, scroll up
      if (cursorOffset >= centerThreshhold) {
        // Cursor has passed the center; adjust scroll to keep it centered
        const scrollOffset = cursorOffset - centerThreshhold + cursorHeight / 2;
        const maxScrollTop = containerElement.scrollHeight - containerHeight;
        const newScrollTop = Math.min(
          Math.max(containerElement.scrollTop + scrollOffset, 0),
          maxScrollTop,
        );

        containerElement.scrollTo({
          top: newScrollTop,
          behavior: "smooth",
        });
      } else if (cursorElement.offsetTop < containerElement.scrollTop) {
        containerElement.scrollTo({
          top: cursorElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const debouncedAdjustScrollPosition = debounce(adjustScrollPosition, 50);

    debouncedAdjustScrollPosition();

    return () => {
      debouncedAdjustScrollPosition.cancel();
    };
  }, [typed]);

  useEffect(() => {
    const handleResize = debounce(() => {
      if (cursorRef.current && containerRef.current) {
        // Recalculate and adjust scroll position
        adjustScrollPosition();
      }
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex overflow-hidden relative flex-wrap gap-x-8 mx-8 max-w-3xl text-4xl leading-[50px] h-[200px]"
    >
      {generatedWords.map((_, i) => (
        <Word
          key={`${generatedWords[i]}_${typedWords}_${i}`}
          word={generatedWords[i]}
          typedWord={typedWords[i]}
          cursorPosition={cursorPositon}
          wordIndex={i}
          isLast={i == typedWords.length - 1}
          cursorRef={cursorRef}
        />
      ))}
    </div>
  );
};

export default WordsContainer;

const Word = ({
  word,
  typedWord = null,
  isLast,
  cursorPosition,
  wordIndex,
  cursorRef,
}: {
  word: string;
  typedWord: string | null;
  wordIndex: number;
  cursorPosition: { wordIndex: number; letterIndex: number };
  isLast: boolean;
  cursorRef: LegacyRef<HTMLDivElement | null>;
}) => {
  const tmpLetters: React.JSX.Element[] = [];
  const generatedLetters = word.split("");
  const typedLetters = typedWord == null ? [] : typedWord.split("");

  let i: number;

  for (i = 0; i < generatedLetters.length; i++) {
    let className = "";
    if (typedWord == null || (typedWord === "" && isLast)) {
      className = "text-grey-comment";
    } else {
      if (typedLetters[i] != null) {
        if (generatedLetters[i] == typedLetters[i]) {
          className = "text-foreground";
        } else {
          className = "text-error";
        }
      } else {
        if (isLast) {
          className = "text-grey-comment";
        } else {
          className = "text-error";
        }
      }
    }

    if (
      cursorPosition.wordIndex === wordIndex &&
      0 === cursorPosition.letterIndex &&
      i === 0
    ) {
      tmpLetters.push(<Caret key={`${"cursor"}`} ref={cursorRef} />);
    }

    tmpLetters.push(
      <span
        key={`${word}_${wordIndex}_${generatedLetters[i]}_${i}`}
        className={`${className}`}
      >
        {generatedLetters[i]}
      </span>,
    );

    if (
      cursorPosition.wordIndex === wordIndex &&
      i === cursorPosition.letterIndex - 1
    ) {
      tmpLetters.push(<Caret key={`${"cursor"}`} ref={cursorRef} />);
    }
  }

  if (i < typedLetters.length) {
    for (i = i + 0; i < typedLetters.length; i++) {
      const show_cursor =
        cursorPosition.wordIndex === wordIndex &&
        i === cursorPosition.letterIndex - 1;

      tmpLetters.push(
        <span
          key={`${word}_${wordIndex}_${typedLetters[i]}_${i}`}
          className="text-error-space"
        >
          {typedLetters[i]}
        </span>,
      );

      if (show_cursor) {
        tmpLetters.push(<Caret key={`${"cursor"}`} ref={cursorRef} />);
      }
    }
  }

  return (
    <div key={`${word}_${wordIndex}`} className="word">
      {tmpLetters}
    </div>
  );
};
