import { useEffect, useMemo } from "react";
import { GaugeIcon, GlobeIcon, RepeatIcon, RotateCwIcon } from "lucide-react";

import clsx from "clsx";

import Timer from "./Timer";
import WordsContainer from "./WordsContainer";

import Tooltip from "./standalone/Tooltip";

import { useWords } from "../hooks/useWords";
import { useTypingStore } from "../store/typingStore";

type Props = {
  initializeEngine: () => void;
  resetEngine: () => void;
  getCurrentPosition: () => { wordIndex: number; charIndex: number };
  isEngineEnabled: boolean;
  registerCharacter: (element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => void;
  registerWord: (element: HTMLDivElement | null, wordIndex: number) => void;
};

const TypingTest = ({
  initializeEngine,
  resetEngine,
  isEngineEnabled,
  getCurrentPosition,
  registerCharacter,
  registerWord,
}: Props) => {
  const config = useTypingStore((state) => state.config);
  const { words, updateWords } = useWords(config);
  const initializeTest = useTypingStore((state) => state.initializeTest);
  const restartTest = useTypingStore((state) => state.resetTest);

  const wordArray = useMemo(() => {
    return words ? words.split(" ") : [];
  }, [words]);

  useEffect(() => {
    if (words) {
      initializeTest(wordArray);
    }
  }, [wordArray]);

  return (
    <div id="typing_test" className="col-[content] content-grid relative w-full max-w-full mx-auto">
      <div id="test_modes_notice" className="col-[content] flex flex-wrap text-sub mb-2 justify-center text-[1rem]">
        {false && (
          <div className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
            <RepeatIcon size={20} />
            {"repeated"}
          </div>
        )}
        <div className="relative">
          <Tooltip content="Feature not implemented yet." position="top">
            <button
              className={clsx(
                "inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2",
                true ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <GlobeIcon size={20} />
              {"english"}
            </button>
          </Tooltip>
        </div>
        {false && (
          <button className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
            <GaugeIcon size={20} />
            {"custom pace 32 wpm"}
          </button>
        )}
      </div>
      <Timer />
      <WordsContainer
        words={wordArray}
        initializeEngine={initializeEngine}
        resetEngine={resetEngine}
        getCurrentPosition={getCurrentPosition}
        isEngineEnabled={isEngineEnabled}
        registerCharacter={registerCharacter}
        registerWord={registerWord}
      />
      <button
        id="restart_button"
        onClick={() => {
          updateWords();
          restartTest();
          resetEngine();
        }}
        className="col-[content] relative overflow-visible flex mt-4 mx-auto px-8 py-4 justify-center items-baseline gap-2 h-min leading-[1.25] text-center text-sub cursor-pointer"
      >
        <RotateCwIcon size={20} />
      </button>
    </div>
  );
};

export default TypingTest;
