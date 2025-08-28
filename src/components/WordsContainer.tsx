import Word from "./Word";
import type { IWord } from "../types/common";

type Props = {
  words: IWord[];
  currentWordIndex: number;
  currentInput: string;
  cursorPosition: number;
  showErrors?: boolean;
};

const WordsContainer = ({ words, currentWordIndex, currentInput, cursorPosition, showErrors }: Props) => {
  return (
    <div
      id="words"
      className="col-[full-width] h-[180px] overflow-hidden w-full pb-2 flex flex-wrap content-start select-none relative"
    >
      {words.map((word: IWord, wordIndex: number) => {
        const isActive = wordIndex === currentWordIndex;

        // For completed words, use the stored typed text
        // For current word, use the live input
        // For future words, no input yet
        let typedValue = "";
        if (wordIndex < currentWordIndex && word.typedText !== undefined) {
          typedValue = word.typedText;
        } else if (isActive) {
          typedValue = currentInput;
        }

        return (
          <Word
            key={word.id}
            word={word}
            index={wordIndex}
            id={word.id}
            isActive={isActive}
            typedValue={typedValue}
            cursorPosition={isActive ? cursorPosition : -1}
            showErrors={showErrors}
          />
        );
      })}
    </div>
  );
};

export default WordsContainer;
