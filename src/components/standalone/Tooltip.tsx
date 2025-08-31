import { useState } from "react";
import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  content: string;
  position: "top" | "bottom" | "left" | "right";
};

const Tooltip = ({ content, position, children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const getPositionClasses = (position: "top" | "bottom" | "left" | "right") => {
    const positions = {
      top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
      left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
      right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    };

    return positions[position];
  };

  const getArrowClasses = (position: "top" | "bottom" | "left" | "right") => {
    const baseClasses = "absolute w-0 h-0";

    const arrows = {
      top: `${baseClasses} top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800`,
      bottom: `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800`,
      left: `${baseClasses} left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-800`,
      right: `${baseClasses} right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800`,
    };

    return arrows[position] || arrows.top;
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative inline">
      {children}

      {isVisible && (
        <div
          className={clsx(
            "absolute px-3 py-2 rounded-lg shadow-lg pointer-events-none",
            "bg-sub-alt",
            "text-sm font-medium text-white whitespace-nowrap",
            "transition-all duration-300 ease-out",
            getPositionClasses(position),
          )}
        >
          {content}

          <div className={getArrowClasses(position)}></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
