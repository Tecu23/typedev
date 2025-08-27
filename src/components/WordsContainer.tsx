import Word from "./Word";

import type { IWord } from "../types/common";

type Props = {
  words: IWord[];
  typedInput: string;

  currentWordIndex: number;
  currentCharIndex: number;
};

const WordsContainer = ({ words, typedInput, currentWordIndex, currentCharIndex }: Props) => {
  return (
    <div id="words" className="col-[full-width] h-fit w-full pb-2 flex flex-wrap content-start select-none">
      {words.map((word: IWord, wordIndex: number) => (
        <Word
          key={word.id}
          word={word}
          index={wordIndex}
          id={`${word}_${wordIndex}`}
          typedValue={currentWordIndex ? typedInput : ""}
          currentCharIndex={currentCharIndex}
        />
      ))}
    </div>
  );
};

export default WordsContainer;
