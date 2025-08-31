import { useEffect, useState } from "react";
import { useTypingStore } from "../store/typingStore";

type Props = {
  className?: string;
};

const Timer = ({ className }: Props) => {
  const config = useTypingStore((state) => state.config);
  const status = useTypingStore((state) => state.status);
  const getTimeRemaining = useTypingStore((state) => state.getTimeRemaining);
  const finishTest = useTypingStore((state) => state.finishTest);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (status === "typing") {
      interval = setInterval(() => {
        const remaining = getTimeRemaining();
        setTimeLeft(Math.ceil(remaining));

        // Auto-finish test when time runs out
        if (remaining <= 0 && config.mode === "time") {
          finishTest();
        }
      }, 100); // Update every 100ms for smooth countdown
    } else if (status === "idle") {
      // Show initial time when test is idle
      setTimeLeft(config.timeLimit);
    } else if (status === "paused") {
      setTimeLeft(Math.ceil(getTimeRemaining()));
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status, config.mode, config.timeLimit, getTimeRemaining, finishTest]);

  if (config.mode !== "time") {
    return null;
  }

  return (
    <div
      id="liveStatsMini"
      className={`col-[full-width] flex justify-start -mt-5 ml-1 text-main text-[2rem] ${className}`}
    >
      <div className="time">{timeLeft}</div>
      <div className="speed hidden">0</div>
      <div className="acc hidden">100%</div>
      <div className="burst hidden">0</div>
    </div>
  );
};

export default Timer;
