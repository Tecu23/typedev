type Props = {};

const TypingTest = (props: Props) => {
  const words =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit proin convallis ex id vestibulum auctor Vivamus rutrum ultrices feugiat Vivamus augue est interdum sed nisi molestie gravida pharetra nulla Sed quis tellus quam Curabitur scelerisque ac elit ac auctor Nullam lacinia lobortis ipsum a posuere Donec tempor turpis nunc id eleifend purus suscipit in Curabitur euismod id risus eu rutrum Phasellus eu est turpis Nulla sit amet tempor diam Nunc porta ex nisi Maecenas vitae velit nec nulla pellentesque auctor ac id lacus Curabitur eros urna mollis blandit lectus eget aliquet commodo lorem Maecenas congue velit vitae rutrum sollicitudin. In hac.";
  return (
    <div
      id="typing_test"
      className="relative w-full mx-auto grid px-4 2xl:px-8"
    >
      <div id="test_modes_notice"></div>
      <div
        id="words_wrapper"
        className="grid px-4 2xl:px-8 justify-center w-full"
      >
        <input
          id="words_input"
          className="w-[77px] left-2.5 top-[9px] text-[2rem] h-[1rem] opacity-0 mx-auto border-none outline-none block resize-none absolute z-[-1] cursor-default pointer-events-none rounded-none"
        />
        <div id="out-of_focus"></div>
        <div id="caret"></div>
        <div
          id="words"
          className="h-fit pb-2 flex flex-wrap w-full content-start"
        >
          {words.split(" ").map((word, wordIndex) => {
            return (
              <div className="relative text-[1em] mx-[0.3em] my-[0.25em] border-b-2 border-transparent">
                {word.split("").map((letter, letterIndex) => {
                  return (
                    <div className="text-grey-300 inline-block border-b-[0.05em] border-b-transparent">
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
