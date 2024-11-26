import React, { MutableRefObject, useEffect, useRef } from "react";
import { isCharacter, isWhitespace } from "../../../utilities/helpers";
import { processTypedInput } from "../../../utilities/helpers/processTypedInput";
import Cursor from "../../ui/Cursor";
import debounce from "lodash.debounce";

type Props = {
  text: string;
  typed: string;
};

const DevWordsContainer = React.forwardRef<HTMLDivElement | null, Props>(
  ({ text, typed }, ref) => {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const containerRef = ref as MutableRefObject<HTMLInputElement>;

    const components: React.JSX.Element[] = [];

    const elements = processTypedInput(text, typed);
    const cursor_idx = getCursorPosition(elements);

    elements.map((el, idx) => {
      if (idx == cursor_idx) {
        components.push(<Cursor key={"cursor"} ref={cursorRef} />);
      }
      components.push(
        <Char
          key={idx}
          generatedChar={el.expected}
          typedChar={el.typed}
          className={el.className}
        />,
      );
    });

    const adjustScrollPosition = () => {
      if (cursorRef.current && containerRef.current) {
        const cursorElement = cursorRef.current;
        const containerElement = containerRef.current;

        const cursorRect = cursorElement.getBoundingClientRect();
        const containerRect = containerElement.getBoundingClientRect();

        const cursorOffset = cursorRect.top - containerRect.top;
        const containerHeight = containerElement.clientHeight;
        const cursorHeight = cursorRect.height;

        const centerThreshhold = containerHeight / 2;

        // If the cursor is above the visible area, scroll up
        if (cursorOffset >= centerThreshhold) {
          // Cursor has passed the center; adjust scroll to keep it centered
          const scrollOffset =
            cursorOffset - centerThreshhold + cursorHeight / 2;
          const maxScrollTop = containerElement.scrollHeight - containerHeight;
          const newScrollTop = Math.min(
            Math.max(containerElement.scrollTop + scrollOffset, 0),
            maxScrollTop,
          );

          containerElement.scrollTo({
            top: newScrollTop,
            behavior: "smooth",
          });
        } else if (cursorElement.offsetTop < containerElement.scrollTop) {
          containerElement.scrollTo({
            top: cursorElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    useEffect(() => {
      const debouncedAdjustScrollPosition = debounce(adjustScrollPosition, 50);

      debouncedAdjustScrollPosition();

      return () => {
        debouncedAdjustScrollPosition.cancel();
      };
    }, [typed]);

    useEffect(() => {
      const handleResize = debounce(() => {
        if (cursorRef.current && containerRef.current) {
          // Recalculate and adjust scroll position
          adjustScrollPosition();
        }
      }, 100);

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        handleResize.cancel();
      };
    }, []);

    return (
      <div
        ref={ref}
        className={`overflow-hidden relative mx-8 max-w-3xl text-4xl whitespace-pre-wrap leading-[40px] h-[200px] `}
      >
        <pre className="whitespace-pre-wrap break-words select-none">
          {components}
        </pre>
      </div>
    );
  },
);

export default DevWordsContainer;

const Char = ({
  generatedChar,
  typedChar,
  className,
}: {
  generatedChar: string;
  typedChar: string | null;
  className: string;
}) => {
  // Character comparison level:
  //  If we expect an character and we get character => show the character (correct)
  //  If we expect an character and we get an whitespace => add the whitespace (error)
  //  If we expect an whitespace, but we get character => show the character (error)
  //  If we expect an whitespace, and we get the correct whitespace => show whitespace (correct)
  //  If we expect an whitespace, but we get the wrong whitespace:
  //    expect \n but get \t or \s => show the space/tab (error)
  //    expect \t or \s but get \n => show the new line (error)

  let char = null;

  if (typedChar == null) {
    char = generatedChar;
  } else {
    if (isCharacter(generatedChar) && isCharacter(typedChar)) {
      char = generatedChar;
    } else if (isCharacter(generatedChar) && isWhitespace(typedChar)) {
      char = generatedChar;
    } else if (isWhitespace(generatedChar) && isCharacter(typedChar)) {
      char = typedChar;
    } else if (
      isWhitespace(generatedChar) &&
      isWhitespace(typedChar) &&
      generatedChar === typedChar
    ) {
      char = typedChar;
    } else {
      char = typedChar;
    }
  }

  return <span className={`${className}`}>{char}</span>;
};

const getCursorPosition = (elements: Array<{ className: string }>): number => {
  let idx = 0;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].className !== "untyped") {
      idx++;
    }
  }

  return idx;
};
