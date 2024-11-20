import { motion } from "framer-motion";
import { State } from "../utilities/hooks/useEngine";
import { formatPercentage } from "../utilities/helpers";

type Props = {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
};

const Result = ({
  state,
  errors,
  accuracyPercentage,
  total,
  className,
}: Props) => {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul
      className={`flex flex-col items-center text-yellow-400 space-y-3 ${className}`}
    >
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="text-xl font-semibold"
      >
        Results
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="text-red-500"
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Result;
