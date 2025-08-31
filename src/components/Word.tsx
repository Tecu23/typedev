import { useRef, useEffect } from "react";
import clsx from "clsx";
import Char from "./Char";

type Props = {
  word: string; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list
  onCharacterMount: (element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => void;
  onWordMount: (element: HTMLDivElement | null, wordIndex: number) => void;
};

const Word = ({ word, id, index, onCharacterMount, onWordMount }: Props) => {
  const wordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (wordRef.current) {
      // Register this word element with the visual engine
      onWordMount(wordRef.current, index);
    }
  }, [index, onWordMount]);

  // Determine word styling based on status
  const wordClasses = clsx("word");

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
