import Char from "./Char";

type Props = {};

const WordsContainer = (props: Props) => {
  const words =
    "Lorem ipsum dolorsit amet consectetur adipiscing elit proin convallis ex id vestibulum auctor Vivamus rutrum ultrices feugiat Vivamus augue est interdum sed nisi molestie gravida pharetra nulla Sed quis tellus quam Curabitur scelerisque ac elit ac auctor Nullam lacinia lobortis ipsum a posuere Donec tempor turpis nunc id eleifend purus suscipit in Curabitur euismod id risus eu rutrum Phasellus eu est turpis Nulla sit amet tempor diam Nunc porta ex nisi Maecenas vitae velit nec nulla pellentesque auctor ac id lacus Curabitur eros urna mollis blandit lectus eget aliquet commodo lorem Maecenas congue velit vitae rutrum sollicitudin. In hac.";

  return (
    <div
      id="words"
      className="col-[full-width] h-fit w-full pb-2 flex flex-wrap content-start select-none"
    >
      {words.split(" ").map((word, wordIndex) => (
        <div className="relative text-[32px] leading-[32px] mx-[9.6px] my-[8px] border-b-2 border-transparent">
          {word.split("").map((letter, _) => {
            return (
              <Char expected={letter} isActive={false} isPending={false} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WordsContainer;
