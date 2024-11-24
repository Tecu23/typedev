import { useRef, useState } from "react";
import DevWordsContainer from "./DevWordsContainer";
import { isKeyboardCodeAllowed } from "../../../utilities/helpers";
import Result from "../../Result";
import useCountdownTimer from "../../../utilities/hooks/useCountdownTimer";
import RestartButton from "../../ui/RestartButton";

type Game = "waiting for input" | "in progress" | "game over";

const Game = () => {
  const [gameState, setGameState] = useState<Game>("waiting for input");
  const [typedLetters, setTypedLetters] = useState("");

  const words = "The quick brown fox jumps over the lazy dog";

  const gameRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(30);

  function startGame() {
    setGameState("in progress");

    startCountdown();
  }

  function restartGame() {
    resetCountdown();
    setTypedLetters("");
    setGameState("waiting for input");
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (gameState === "game over" || !isKeyboardCodeAllowed(e.code)) {
      return;
    }

    if (e.ctrlKey && e.code === "Space") {
      e.preventDefault();
      restartGame();
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

  return (
    <div id="game" ref={gameRef}>
      {gameState !== "game over" ? (
        <>
          <CountdownTimer timeLeft={timeLeft} />
          <DevWordsContainer ref={wordsRef} text={words} typed={typedLetters} />
          <input
            ref={inputRef}
            type="text"
            value={typedLetters}
            onKeyDown={handleKeydown}
            className=""
          />
          {/* <WordsContainer words={words} typed={typed} /> */}
        </>
      ) : (
        <Result
          className="mt-10"
          errors={10}
          accuracyPercentage={10}
          total={20}
        />
      )}

      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => restartGame()}
      />
    </div>
  );
};

export default Game;

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="font-medium text-cursor">Time: {timeLeft}</h2>;
};
