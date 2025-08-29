import { useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  expected: string;
  wordIndex: number;
  charIndex: number;
  onCharacterMount: (element: HTMLSpanElement | null, wordIndex: number, charIndex: number) => void;
};

/**
 * Character cmponent - represents a single character within a word
 */
const Char = ({ expected, wordIndex, charIndex, onCharacterMount }: Props) => {
  const charRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (charRef.current) {
      onCharacterMount(charRef.current, wordIndex, charIndex);
    }
  }, [wordIndex, charIndex, onCharacterMount]);

  return (
    <span
      ref={charRef}
      className={clsx(
        "char char-pending",
        "relative inline-block border-b-[0.05em] border-b-transparent",
        "transition-colors duration-75 ease-out",
      )}
      data-word-index={wordIndex}
      data-char-index={charIndex}
      data-expected={expected}
    >
      {expected}
    </span>
  );
};

export default Char;
