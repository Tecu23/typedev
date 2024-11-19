import Caret from "./Caret";

type Props = {
  userInput: string;
  className?: string;
  words: string;
};

const UserTyping = ({ userInput, className, words }: Props) => {
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, idx) => {
        return (
          <Character
            key={`${char}_${idx}`}
            actual={char}
            expected={words[idx]}
          />
        );
      })}
      <Caret />
    </div>
  );
};

const Character = ({
  actual,
  expected,
}: {
  actual: string;
  expected: string;
}) => {
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={`${!isWhiteSpace ? (isCorrect ? "text-yellow-400" : "text-red-500") : isCorrect ? "" : "bg-red-500/50"}`}
    >
      {expected}
    </span>
  );
};

export default UserTyping;
