import React from "react";

import { motion } from "framer-motion";

const Cursor = React.forwardRef<HTMLDivElement | null>((_, ref) => {
  return (
    <motion.div
      key={`${"cursor"}`}
      ref={ref}
      aria-hidden={true}
      className="inline-block relative inset-y-0 -mb-1 w-0.5 h-8 bg-cursor"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    ></motion.div>
  );
});

export default Cursor;
