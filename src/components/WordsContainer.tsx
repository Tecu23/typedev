import { useEffect, useMemo, useRef, useState } from "react";

import { MousePointer } from "lucide-react";

import clsx from "clsx";

import Word from "./Word";

import { useVisualEngine } from "../hooks/useVisualEngine";

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
    <div id="words_wrapper" className="content-grid col-[full-width] h-[153px] overflow-clip relative">
      <input
        id="words_input"
        className="col-[full-width] w-[77px] h-8 left-2.5 top-[9px] text-[2rem] opacity-0 mx-auto border-none outline-none block resize-none absolute z-[-1] cursor-default pointer-events-none rounded-none"
      />
      {false && (
        <div
          id="out-of_focus"
          className="col-[content] max-h-[153px] w-full h-full absolute content-center z-50 text-center text-[1rem] text-sub flex-center gap-2"
        >
          <MousePointer size={20} />
          {" Click here or press any key to focus"}
        </div>
      )}
      <div
        id="words"
        className={clsx(
          "col-[full-width] h-[180px] overflow-hidden w-full pb-2 flex flex-wrap content-start select-none relative",
          !visualEngine.isEnabled && "opacity-50",
          false && "opacity-25 blur-[4px]", // (out of focus)
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
    </div>
  );
};

export default WordsContainer;
