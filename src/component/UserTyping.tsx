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
      className={`${!isWhiteSpace ? (isCorrect ? "text-foreground" : "text-error") : isCorrect ? "" : "bg-error-space opacity-70"}`}
    >
      {expected}
    </span>
  );
};

export default UserTyping;
