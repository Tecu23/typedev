import { useRef } from "react";

import Char from "./Char";

import type { IWord } from "../types";

type Props = {
  // Word data
  word: IWord; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list

  // Current typing state
  typedValue: string; // What the user has typed so far

  currentCharIndex: number;
};

const Word = ({ word, id, index, currentCharIndex, typedValue = "" }: Props) => {
  const wordRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id={id}
      ref={wordRef}
      className="relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] border-b-2 border-transparent"
    >
      {word.text.split("").map((letter, letterIndex) => {
        return <Char expected={letter} typed={typedValue[letterIndex]} isPending={false} />;
      })}
    </div>
  );
};

export default Word;
