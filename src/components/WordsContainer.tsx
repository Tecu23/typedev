import { useEffect, useMemo, useRef } from "react";
import { useVisualEngine } from "../hooks/useVisualEngine";
import Word from "./Word";
import clsx from "clsx";

type Props = {
  words: string[];
};

const WordsContainer = ({ words }: Props) => {
  const engineOptions = useMemo(
    () => ({
      enabled: true,
      onTestComplete: () => console.log("Test completed"),
      onError: (error: Error) => console.error("Error:", error),
    }),
    [],
  );

  const visualEngine = useVisualEngine(engineOptions);

  const isInitializedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      visualEngine.initialize();
      isInitializedRef.current = true;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
