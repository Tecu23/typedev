import Caret from "./Caret";
import WordsContainer from "./WordsContainer";

type Props = {};

const TypingTest = (props: Props) => {
  return (
    <div
      id="typing_test"
      className="col-[content] content-grid relative w-full max-w-full mx-auto"
    >
      <div id="test_modes_notice"></div>
      <div
        id="words_wrapper"
        className="content-grid col-[full-width] relative h-[153px] overflow-clip "
      >
        <input
          id="words_input"
          className="col-[full-width] w-[77px] left-2.5 top-[9px] text-[2rem] h-[1rem] opacity-0 mx-auto border-none outline-none block resize-none absolute z-[-1] cursor-default pointer-events-none rounded-none"
        />
        <div id="out-of_focus"></div>
        <Caret />
        <WordsContainer />
      </div>
      <div id="restart_button"></div>
    </div>
  );
};

export default TypingTest;
