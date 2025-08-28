import { GaugeIcon, GlobeIcon, RepeatIcon, RotateCwIcon } from "lucide-react";
import Caret from "./Caret";
import WordsContainer from "./WordsContainer";
import useWords from "../hooks/useWords";
import { useTestLifecycle } from "../store/typingStore";

type Props = {};

const TypingTest = (props: Props) => {
  const { words } = useWords("normal");
  const { status, initializeTest, startTest, pauseTest, resumeTest, finishTest, resetTest } = useTestLifecycle();

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
      <div id="words_wrapper" className="content-grid col-[full-width] relative h-[153px] overflow-clip relative">
        <input
          id="words_input"
          className="col-[full-width] w-[77px] h-8 left-2.5 top-[9px] text-[2rem] opacity-0 mx-auto border-none outline-none block resize-none absolute z-[-1] cursor-default pointer-events-none rounded-none"
        />
        <div id="out-of_focus"></div>
        <Caret />
        <WordsContainer words={words.split(" ")} />
      </div>
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
