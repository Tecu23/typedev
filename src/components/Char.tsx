import clsx from "clsx";

type Props = {
  expected: string;
  typed?: string;
  isPending: boolean;
  isCurrentChar?: boolean; // Add cursor position indicator
  showError?: boolean; // For error visibility control
};

/**
 * Character cmponent - represents a single character within a word
 */
const Char = ({ expected, typed, isPending, isCurrentChar = false, showError = true }: Props) => {
  const getCharacterClass = () => {
    // Character hasn't been removed yet
    if (isPending) {
      return "text-sub";
    }

    if (isCurrentChar) {
      return "text-text relative";
    }

    // No input for this position yet
    if (typed === undefined) {
      return "text-sub";
    }

    // Character has been typed
    if (typed === expected) {
      return "text-text";
    } else {
      return showError ? "text-error" : "text-text";
    }
  };

  const charClass = getCharacterClass();

  return (
    <span className="relative inline-block">
      <span
        className={clsx("inline-block border-b-[0.05em] border-b-transparent", charClass)}
        data-expected={expected}
        data-typed={typed}
        aria-label={`Expected: ${expected}, Typed: ${typed || "nothing"}`}
      >
        {expected}
      </span>
      {/* Cursor indicator */}
      {isCurrentChar && (
        <span className="absolute left-0 top-0 w-[2px] h-full bg-primary animate-blink" aria-hidden="true" />
      )}

      {/* Error indicator for extra characters */}
      {typed && typed !== expected && showError && (
        <span className="absolute -top-4 left-0 text-xs text-error opacity-50">{typed}</span>
      )}
    </span>
  );
};

export default Char;
