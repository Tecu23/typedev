import Caret from "../../Caret";

const WordsContainer = ({ words, typed }: { words: string; typed: string }) => {
  const typedWords = typed.split(" ");
  const generatedWords = words.split(" ");

  const currentWordIndex = typedWords.length - 1;
  const currentLetterIndex = typedWords[currentWordIndex]?.length || 0;

  const cursorPositon = {
    wordIndex: currentWordIndex,
    letterIndex: currentLetterIndex,
  };

  return (
    <div className="flex overflow-hidden relative flex-wrap gap-x-8 max-w-3xl text-4xl leading-relaxed h-[230px]">
      {generatedWords.map((_, i) => (
        <Word
          word={generatedWords[i]}
          typedWord={typedWords[i]}
          cursorPosition={cursorPositon}
          wordIndex={i}
          isLast={i == typedWords.length - 1}
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
}: {
  word: string;
  typedWord: string | null;
  wordIndex: number;
  cursorPosition: { wordIndex: number; letterIndex: number };
  isLast: boolean;
}) => {
  const tmpLetters: React.JSX.Element[] = [];
  const generatedLetters = word.split("");
  const typedLetters = typedWord == null ? [] : typedWord.split("");

  let i: number;

  for (i = 0; i < generatedLetters.length; i++) {
    const show_cursor =
      cursorPosition.wordIndex === wordIndex &&
      i === cursorPosition.letterIndex;

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

    if (show_cursor) {
      tmpLetters.push(<Caret />);
    }

    tmpLetters.push(
      <span className={`${className}`}>{generatedLetters[i]}</span>,
    );
  }

  if (i < typedLetters.length) {
    for (i = i + 0; i < typedLetters.length; i++) {
      const show_cursor =
        cursorPosition.wordIndex === wordIndex &&
        i === cursorPosition.letterIndex - 1;

      tmpLetters.push(
        <span className="text-error-space">{typedLetters[i]}</span>,
      );

      if (show_cursor) {
        tmpLetters.push(<Caret />);
      }
    }
  }

  return <div className="word">{tmpLetters}</div>;
};
