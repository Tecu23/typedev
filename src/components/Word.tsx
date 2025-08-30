import { useRef, useEffect } from "react";
import clsx from "clsx";
import Char from "./Char";
import { useWhyDidYouUpdate } from "../utils/debugging";

type Props = {
  word: string; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list
  onCharacterMount: (element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => void;
  onWordMount: (element: HTMLDivElement | null, wordIndex: number) => void;
};

const Word = ({ word, id, index, onCharacterMount, onWordMount }: Props) => {
  useWhyDidYouUpdate("WordComponent", { word, id, index, onCharacterMount, onWordMount });
  const wordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wordRef.current) {
      // Register this word element with the visual engine
      onWordMount(wordRef.current, index);
    }
  }, [index, onWordMount]);

  // Determine word styling based on status
  const wordClasses = clsx(
    "word word-pending",
    "relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] transition-all duration-200",
    "transition-opacity duration-200 ease-out",
  );

  return (
    <div id={id} ref={wordRef} className={wordClasses} data-word-index={index} data-word-text={word}>
      {word.split("").map((letter, letterIndex) => {
        return (
          <Char
            key={`${id}-char-${letterIndex}`}
            expected={letter}
            wordIndex={index}
            charIndex={letterIndex}
            onCharacterMount={onCharacterMount}
          />
        );
      })}

      {/* Space after word - will be styles via CSS */}
      <span className="word-space"></span>
    </div>
  );
};

export default Word;
