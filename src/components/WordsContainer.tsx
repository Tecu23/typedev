import Word from "./Word";

type Props = {
  words: string[];
};

const WordsContainer = ({ words }: Props) => {
  return (
    <div
      id="words"
      className="col-[full-width] h-[180px] overflow-hidden w-full pb-2 flex flex-wrap content-start select-none relative"
    >
      {words.map((word: string, wordIndex: number) => {
        return <Word key={word} word={word} index={wordIndex} id={word} />;
      })}
    </div>
  );
};

export default WordsContainer;
