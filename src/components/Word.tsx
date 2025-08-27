import { useRef } from "react";

import Char from "./Char";

type Props = {
  // Word data
  text: string; // The actual word text to type
  id: string; // Unique identifier
  index: number; // Position in the word list

  // Current typing state
  typedValue: string; // What the user has typed so far
};

const Word = ({ text, id, index, typedValue = "" }: Props) => {
  const wordRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      id={id}
      ref={wordRef}
      className="relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] border-b-2 border-transparent"
    >
      {text.split("").map((letter, _) => {
        return (
          <Char expected={letter} typed={typedValue[index]} isPending={false} />
        );
      })}
    </div>
  );
};

export default Word;
