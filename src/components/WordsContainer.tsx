import { useVirtualizer } from "@tanstack/react-virtual";
import { CHARS_PER_LINE } from "../utils/constants/typing";
import { useRef, useMemo } from "react";

type Props = {};

const WordsContainer = (props: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const words =
    "Lorem ipsum dolorsit amet consectetur adipiscing elit proin convallis ex id vestibulum auctor Vivamus rutrum ultrices feugiat Vivamus augue est interdum sed nisi molestie gravida pharetra nulla Sed quis tellus quam Curabitur scelerisque ac elit ac auctor Nullam lacinia lobortis ipsum a posuere Donec tempor turpis nunc id eleifend purus suscipit in Curabitur euismod id risus eu rutrum Phasellus eu est turpis Nulla sit amet tempor diam Nunc porta ex nisi Maecenas vitae velit nec nulla pellentesque auctor ac id lacus Curabitur eros urna mollis blandit lectus eget aliquet commodo lorem Maecenas congue velit vitae rutrum sollicitudin. In hac.";

  const lines = useMemo(() => {
    const lines = [];
    let w = words.split(" ");

    let currentLine: string[] = [];
    let currentLineLength = 0;

    for (let i = 0; i < w.length; i++) {
      // Include space before word (excluding first)
      const spaceNeeded = currentLine.length > 0 ? 1 : 0;
      const lengthWithNewWord = currentLineLength + spaceNeeded + w[i].length;

      if (lengthWithNewWord > CHARS_PER_LINE && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = [w[i]];
        currentLineLength = w[i].length;
      } else {
        currentLine.push(w[i]);
        currentLineLength = lengthWithNewWord;
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  }, [words]);

  const rowVirtualizer = useVirtualizer({
    count: lines.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 35,
    overscan: 200,
  });

  console.log(lines);

  return (
    <div
      id="words"
      ref={containerRef}
      className="col-[full-width] h-fit pb-2 flex flex-wrap w-full content-start select-none"
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const line = lines[virtualRow.index];

        console.log(virtualRow);

        return (
          <div
            key={virtualRow.key}
            className="relative flex flex-wrap"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 35,
              width: "100%",
              transform: `translateY(${virtualRow.index * 38}px)`,
            }}
          >
            {line.map((word, wordIndex) => (
              <div className="relative text-[32px] leading-[32px] mx-[0.3em] my-[0.25em] border-b-2 border-transparent">
                {word.split("").map((letter, _) => {
                  return (
                    <div className="text-sub inline-block border-b-[0.05em] border-b-transparent">
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default WordsContainer;
