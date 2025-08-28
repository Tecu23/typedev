import { useRef, useEffect } from "react";
import clsx from "clsx";
import Char from "./Char";
import type { IWord } from "../types/common";

type Props = {
  // Word data
  word: string; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list
};

const Word = ({ word, id, index }: Props) => {
  const wordRef = useRef<HTMLDivElement | null>(null);

  // Determine word styling based on status
  const wordClasses = clsx(
    "relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] border-b-2 transition-all duration-200",
  );

  return (
    <div id={id} ref={wordRef} className={wordClasses}>
      {word.split("").map((letter, letterIndex) => {
        return <Char key={`${id}-char-${letterIndex}`} expected={letter} />;
      })}
    </div>
  );
};

export default Word;
