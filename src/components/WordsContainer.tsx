import { useEffect, useRef } from "react";
import { useVisualEngine } from "../hooks/useVisualEngine";
import Word from "./Word";
import clsx from "clsx";

type Props = {
  words: string[];
};

const WordsContainer = ({ words }: Props) => {
  console.log(words);
  const visualEngine = useVisualEngine({
    enabled: true,
    onTestComplete: () => {
      console.log("Test completed via visual engin hook");
    },
    onError: (error) => {
      console.error("Visual engine error: ", error);
    },
  });

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && words.length > 0) {
      const timer = setTimeout(() => {
        visualEngine.initialize();
        isInitializedRef.current = true;
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [words, visualEngine.initialize]);

  useEffect(() => {
    if (isInitializedRef.current) {
      visualEngine.reset();
    }
  }, [words, visualEngine.reset]);

  return (
    <div
      id="words"
      className={clsx(
        "col-[full-width] h-[180px] overflow-hidden w-full pb-2 flex flex-wrap content-start select-none relative",
        !visualEngine.isEnabled && "opacity-50",
      )}
    >
      {words.map((word: string, wordIndex: number) => {
        return (
          <Word
            key={`word-${wordIndex}`}
            word={word}
            index={wordIndex}
            id={`word-${wordIndex}`}
            onCharacterMount={visualEngine.registerCharacter}
            onWordMount={visualEngine.registerWord}
          />
        );
      })}
    </div>
  );
};

export default WordsContainer;
