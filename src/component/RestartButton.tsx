import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

type Props = {
  onRestart: () => void;
  className?: string;
};

const RestartButton = ({ onRestart: handleRestart, className = "" }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      onClick={handleClick}
      className={`block rounded px-8 hover:bg-slate-700/50 ${className}`}
    >
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default RestartButton;
