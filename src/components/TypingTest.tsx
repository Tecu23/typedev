import { useEffect, useMemo } from "react";
import { GaugeIcon, GlobeIcon, RepeatIcon, RotateCwIcon } from "lucide-react";

import Timer from "./Timer";
import WordsContainer from "./WordsContainer";

import { useWords } from "../hooks/useWords";
import { useVisualEngine } from "../hooks/useVisualEngine";
import { useTypingStore } from "../store/typingStore";

type Props = {};

const TypingTest = (props: Props) => {
  const config = useTypingStore((state) => state.config);
  const initializeTest = useTypingStore((state) => state.initializeTest);
  const restartTest = useTypingStore((state) => state.resetTest);

  const { words, updateWords } = useWords(config);

  const wordArray = useMemo(() => {
    return words ? words.split(" ") : [];
  }, [words]);

  const engineOptions = useMemo(
    () => ({
      enabled: true,
      onTestComplete: () => console.log("Test completed"),
      onError: (error: Error) => console.error("Error:", error),
    }),
    [],
  );
  const visualEngine = useVisualEngine(engineOptions);

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
        <button className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
          <GlobeIcon size={20} />
          {"english"}
        </button>
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
        initializeEngine={visualEngine.initialize}
        resetEngine={visualEngine.reset}
        getCurrentPosition={visualEngine.getCurrentPosition}
        isEngineEnabled={visualEngine.isEnabled}
        registerCharacter={visualEngine.registerCharacter}
        registerWord={visualEngine.registerWord}
      />
      <button
        id="restart_button"
        onClick={() => {
          updateWords();
          restartTest();
          visualEngine.reset();
        }}
        className="col-[content] relative overflow-visible flex mt-4 mx-auto px-8 py-4 justify-center items-baseline gap-2 h-min leading-[1.25] text-center text-sub cursor-pointer"
      >
        <RotateCwIcon size={20} />
      </button>
    </div>
  );
};

export default TypingTest;
