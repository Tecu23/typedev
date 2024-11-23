import { useEffect, useRef, useState } from "react";
import DevWordsContainer from "./DevWordsContainer";
import { isKeyboardCodeAllowed } from "../../../utilities/helpers";

type Game = "waiting for input" | "in progress" | "game over";
type Word = string;

const Game = () => {
  const [gameState, setGameState] = useState<Game>("waiting for input");
  const [typedLetters, setTypedLetters] = useState("");

  const [timeLeft, setTimeLeft] = useState(30);

  const words: Word = "The quick brown fox jumps over the lazy dog";

  const gameRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startGame() {
    setGameState("in progress");

    startCountdown();
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (gameState === "game over" || !isKeyboardCodeAllowed(e.code)) {
      return;
    }
    switch (e.key) {
      case "Tab":
        e.preventDefault();
        setTypedLetters((prev) => prev.concat("\t"));
        break;
      case "Enter":
        e.preventDefault();
        setTypedLetters((prev) => prev.concat("\n"));
        break;
      case "Backspace":
        setTypedLetters((prev) => prev.slice(0, -1));
        break;
      default:
        setTypedLetters((prev) => prev.concat(e.key));
    }

    if (gameState === "waiting for input") {
      startGame();
    }
  }

  const startCountdown = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
  };

  // const resetCountdown = useCallback(() => {
  //   clearInterval(intervalRef.current!);
  //   intervalRef.current = null;
  //   setTimeLeft(seconds);
  // }, [seconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameState("game over");
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <div id="game" ref={gameRef}>
      <CountdownTimer timeLeft={timeLeft} />
      <DevWordsContainer ref={wordsRef} text={words} typed={typedLetters} />
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeydown}
        className=""
      />
      {/* <WordsContainer words={words} typed={typed} /> */}
      {/* <RestartButton */}
      {/*   className="mx-auto mt-10 text-slate-500" */}
      {/*   onRestart={() => restart()} */}
      {/* /> */}
    </div>
  );
};

export default Game;

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="font-medium text-cursor">Time: {timeLeft}</h2>;
};
