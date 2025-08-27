import clsx from "clsx";

type Props = {
  expected: string;
  typed?: string;
  isPending: boolean;
};

/**
 * Character cmponent - represents a single character within a word
 */
const Char = ({ expected, typed, isPending }: Props) => {
  const getCharacterClass = () => {
    // Character hasn't been removed yet
    if (isPending) {
      return "text-sub";
    }

    // No input for this position yet
    if (typed === undefined) {
      return "text-sub";
    }

    // Character has been typed
    if (typed === expected) {
      return "text-text";
    } else {
      return "text-error";
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
      {expected}
    </span>
  );
};

export default Char;
