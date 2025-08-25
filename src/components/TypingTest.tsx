import Caret from "./Caret";

type Props = {};

const TypingTest = (props: Props) => {
  const words =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit proin convallis ex id vestibulum auctor Vivamus rutrum ultrices feugiat Vivamus augue est interdum sed nisi molestie gravida pharetra nulla Sed quis tellus quam Curabitur scelerisque ac elit ac auctor Nullam lacinia lobortis ipsum a posuere Donec tempor turpis nunc id eleifend purus suscipit in Curabitur euismod id risus eu rutrum Phasellus eu est turpis Nulla sit amet tempor diam Nunc porta ex nisi Maecenas vitae velit nec nulla pellentesque auctor ac id lacus Curabitur eros urna mollis blandit lectus eget aliquet commodo lorem Maecenas congue velit vitae rutrum sollicitudin. In hac.";
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
        <div
          id="words"
          className="col-[full-width] h-fit pb-2 flex flex-wrap w-full content-start select-none"
        >
          {words.split(" ").map((word, wordIndex) => {
            return (
              <div className="relative text-[32px] leading-[32px] mx-[0.3em] my-[0.25em] border-b-2 border-transparent">
                {word.split("").map((letter, letterIndex) => {
                  return (
                    <div className="text-sub inline-block border-b-[0.05em] border-b-transparent">
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div id="restart_button"></div>
    </div>
  );
};

export default TypingTest;
