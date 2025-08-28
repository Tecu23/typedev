import clsx from "clsx";

type Props = {
  expected: string;
};

/**
 * Character cmponent - represents a single character within a word
 */
const Char = ({ expected }: Props) => {
  return (
    <span className="relative inline-block">
      <span
        className={clsx("inline-block border-b-[0.05em] border-b-transparent", "text-sub")}
        data-expected={expected}
      >
        {expected}
      </span>
    </span>
  );
};

export default Char;
