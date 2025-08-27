import clsx from "clsx";

type Props = {
  expected: string;
  typed?: string;
  isActive: boolean;
  isPending: boolean;
};

/**
 * Character cmponent - represents a single character within a word
 */
const Char = ({ expected, typed, isActive, isPending }: Props) => {
  const getCharacterClass = () => {
    // Character hasn't been removed yet
    if (isPending) {
      return "char-pending";
    }

    // No input for this position yet
    if (typed === undefined) {
      return isActive ? "char-waiting" : "char-pending";
    }

    // Character has been typed
    if (typed === expected) {
      return "char-correct";
    } else {
      return "char-incorrect";
    }
  };

  const charClass = getCharacterClass();

  return (
    <span
      className={clsx(
        "inline-block border-b-[0.05em] border-b-transparent",
        charClass,
      )}
      data-expected={expected}
      data-typed={typed}
      aria-label={`Expected: ${expected}, Typed: ${typed || "nothing"}`}
    >
      {/* Show the expected character always */}
      {expected}
    </span>
  );
};

export default Char;
