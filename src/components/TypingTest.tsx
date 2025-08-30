import { useEffect, useMemo } from "react";

import { GaugeIcon, GlobeIcon, RepeatIcon, RotateCwIcon } from "lucide-react";

import WordsContainer from "./WordsContainer";

import { useTypingStore } from "../store/typingStore";

import useWords from "../hooks/useWords";

type Props = {};

const TypingTest = (props: Props) => {
  const { words } = useWords("normal");
  const initializeTest = useTypingStore((state) => state.initializeTest);

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
        <div className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
          <RepeatIcon size={20} />
          {"repeated"}
        </div>
        <button className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
          <GlobeIcon size={20} />
          {"english"}
        </button>
        <button className="inline-flex justify-center items-center gap-2 h-min appearance-none border-none text-[1rem] leading-[1.25] rounded-lg px-4 py-2">
          <GaugeIcon size={20} />
          {"custom pace 32 wpm"}
        </button>
      </div>
      <WordsContainer words={wordArray} />
      <button
        id="restart_button"
        className="col-[content] relative overflow-visible flex mt-4 mx-auto px-8 py-4 justify-center items-baseline gap-2 h-min leading-[1.25] text-center text-sub"
      >
        <RotateCwIcon size={20} />
      </button>
    </div>
  );
};

export default TypingTest;
