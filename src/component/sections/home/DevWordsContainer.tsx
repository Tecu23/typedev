import debounce from "lodash.debounce";
import { useRef, useEffect, LegacyRef } from "react";
import Caret from "../../Caret";
import { isWhiteSpace } from "../../../utilities/helpers";

type Props = {
  text: string;
  typed: string;
};

const text =
  "interface Mediator {\n\tnotify(sender: object, event: string): void;\n}";
const typed = "interfaceaaaa Mediator       ";

const DevWordsContainer = ({}: Props) => {
  const characters = text.split("");
  const typedCharacters = typed.split("");

  const components: React.JSX.Element[] = [];
  let i: number; // this will keep track of generated chars
  let j: number; // this will keep track of the typed chars

  // String parsing level:
  //  If we expect an character and we get character:
  //    => send both characters and move both indices
  //  If we expect an character and we get an whitespace:
  //    => send all remaining characters in word until the next word or
  //    end of string as chac + whitespace we move only the i
  //  If we expect an whitespace, but we get character
  //    => send all characters in typed until whitespace or end of string
  //    as whitespace + char and keep i the same
  //  If we expect an whitespace, and we get the correct whitespace
  //    => send both whitespaces and move both i and j
  //  If we expect an whitespace, but we get the wrong whitespace:
  //    expect \n but get \t or \s => send \n and the inputed space and move both i and j
  //    expect \t or \s but get \n => send expected space and \n and move both i and j

  for (i = 0, j = 0; i < characters.length; i++, j++) {
    if (
      isWhiteSpace(text[i]) &&
      text[i] !== typedCharacters[j] &&
      j < typedCharacters.length
    ) {
      components.push(
        <Char
          key={`${i}_${j}_${text[i]}_${typedCharacters[j]}`}
          generatedChar={text[i]}
          typedChar={typedCharacters[j]}
          typedLength={typedCharacters.length}
        />,
      );
      i--;
    } else {
      components.push(
        <Char
          key={`${i}_${j}_${text[i]}_${typedCharacters[j]}`}
          generatedChar={text[i]}
          typedChar={typedCharacters[j]}
          typedLength={typedCharacters.length}
        />,
      );
    }
  }

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
  typedLength,
}: {
  generatedChar: string;
  typedChar: string;
  typedLength: number;
}) => {
  // Character comparison level:
  //  If we expect an character and we get character => show the character (correct)
  //  If we expect an character and we get an whitespace => add the whitespace (error)
  //  If we expect an whitespace, but we get character => show the character (error)
  //  If we expect an whitespace, and we get the correct whitespace => show whitespace (correct)
  //  If we expect an whitespace, but we get the wrong whitespace:
  //    expect \n but get \t or \s => show the space/tab (error)
  //    expect \t or \s but get \n => show the new line (error)

  console.log(generatedChar, typedChar);

  let classname = "text-grey-comment";

  if (typedChar != null) {
    classname = generatedChar === typedChar ? "text-foreground" : "text-error";
  }

  let char = "";
  if (
    isWhiteSpace(generatedChar) &&
    generatedChar !== typedChar &&
    typedChar != null
  ) {
    char = typedChar;
  } else {
    char = generatedChar;
  }

  return <span className={`${classname}`}>{char}</span>;
};
