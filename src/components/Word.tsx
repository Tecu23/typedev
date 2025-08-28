import { useRef, useEffect } from "react";
import clsx from "clsx";
import Char from "./Char";
import type { IWord } from "../types/common";

type Props = {
  // Word data
  word: IWord; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list

  isActive: boolean;

  // Current typing state
  typedValue: string; // What the user has typed so far
  cursorPosition: number;
  showErrors?: boolean;
};

const Word = ({ word, id, index, isActive, typedValue = "", cursorPosition, showErrors = true }: Props) => {
  const wordRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to keep active word in view
  useEffect(() => {
    if (isActive && wordRef.current) {
      const rect = wordRef.current.getBoundingClientRect();
      const containerRect = wordRef.current.parentElement?.getBoundingClientRect();

      if (containerRect && rect.bottom > containerRect.bottom - 50) {
        wordRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [isActive]);

  // Determine word styling based on status
  const wordClasses = clsx(
    "relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] border-b-2 transition-all duration-200",
    {
      "border-transparent": !isActive,
      "border-primary/20 bg-primary/5": isActive,
      "opacity-60": word.status === "correct" || word.status === "incorrect",
      "border-error": word.status === "incorrect" && showErrors,
      "border-success": word.status === "correct",
    },
  );

  return (
    <div id={id} ref={wordRef} className={wordClasses} data-status={word.status}>
      {word.text.split("").map((letter, letterIndex) => {
        const isCurrentChar = isActive && letterIndex === cursorPosition;
        const isPending = !isActive && word.status === "pending";

        return (
          <Char
            key={`${id}-char-${letterIndex}`}
            expected={letter}
            typed={typedValue[letterIndex]}
            isPending={isPending}
            isCurrentChar={isCurrentChar}
            showError={showErrors}
          />
        );
      })}
      {/* Show overflow characters */}
      {isActive && typedValue.length > word.text.length && (
        <span className="text-error opacity-70">
          {typedValue
            .slice(word.text.length)
            .split("")
            .map((char, i) => (
              <span key={`overflow-${i}`} className="inline-block border-b-[0.05em] border-error">
                {char}
              </span>
            ))}
        </span>
      )}

      {/* Word status indicators */}
      {word.status === "correct" && <span className="absolute -top-3 right-0 text-xs text-success">✓</span>}
      {word.status === "incorrect" && showErrors && (
        <span className="absolute -top-3 right-0 text-xs text-error">✗</span>
      )}
    </div>
  );
};

export default Word;
