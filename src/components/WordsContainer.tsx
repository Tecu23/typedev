import Word from "./Word";

type Props = {
  words: string[];
};

const WordsContainer = ({ words }: Props) => {
  return (
    <div id="words" className="col-[full-width] h-fit w-full pb-2 flex flex-wrap content-start select-none">
      {words.map((word: string, wordIndex: number) => (
        <Word text={word} index={wordIndex} id={`${word}_${wordIndex}`} typedValue={""} />
      ))}
    </div>
  );
};

export default WordsContainer;
