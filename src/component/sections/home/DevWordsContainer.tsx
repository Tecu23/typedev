// import debounce from "lodash.debounce";
// import { useRef, useEffect, LegacyRef } from "react";
// import Caret from "../../Caret";
import { isCharacter, isWhitespace } from "../../../utilities/helpers";
import { processTypedInput } from "../../../utilities/helpers/processTypedInput";
import Caret from "../../Caret";

type Props = {
  text: string;
  typed: string;
};

const DevWordsContainer = ({ text, typed }: Props) => {
  const components: React.JSX.Element[] = [];

  const elements = processTypedInput(text, typed);

  elements.map((el, idx) => {
    if (idx == typed.length) {
      components.push(<Caret />);
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

  return (
    <div className="overflow-hidden relative mx-8 max-w-3xl text-4xl whitespace-pre-wrap leading-[50px] h-[200px]">
      <pre className="whitespace-pre-wrap break-words select-none">
        {components}
      </pre>
    </div>
  );
};

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
  //

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
