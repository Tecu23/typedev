import { useEffect, useRef, useState } from "react";
import DevWordsContainer from "./DevWordsContainer";
import { isKeyboardCodeAllowed } from "../../../utilities/helpers";
import Result from "../../Result";
import useCountdownTimer from "../../../utilities/hooks/useCountdownTimer";
import RestartButton from "../../ui/RestartButton";
import useWords from "../../../utilities/hooks/useWords";
import { GameConfig, GameType } from "../../../utilities/types";

type Game = "waiting for input" | "in progress" | "game over";

const Game = () => {
  const [gameState, setGameState] = useState<Game>("waiting for input");
  const [gameType, _] = useState<GameType>("dev");
  const [typedLetters, setTypedLetters] = useState("");

  const gameRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState(true);

  const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(30);
  const { words, updateWords } = useWords({ type: gameType } as GameConfig);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Automatically focus the input when a key is pressed
  useEffect(() => {
    const handleKeydownFocus = (e: KeyboardEvent) => {
      if (!isFocused) {
        if (e.code == "Tab") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeydownFocus);
    return () => {
      window.removeEventListener("keydown", handleKeydownFocus);
    };
  }, [isFocused]);

  function startGame() {
    setGameState("in progress");
    startCountdown();
  }

  function restartGame() {
    resetCountdown();
    setTypedLetters("");
    updateWords();
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
    <div id="game" ref={gameRef} className={`relative`}>
      {gameState !== "game over" ? (
        <>
          <CountdownTimer timeLeft={timeLeft} />
          <DevWordsContainer ref={wordsRef} text={words} typed={typedLetters} />
          <input
            ref={inputRef}
            type="text"
            value={typedLetters}
            onKeyDown={handleKeydown}
            className="absolute opacity-0"
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          {!isFocused && (
            <div className="absolute top-1/2 left-1/2 z-10 text-lg font-semibold transform -translate-x-1/2 -translate-y-1/2 h-[70vh] w-[90vw] flex-center text-foreground backdrop-blur-[8px]">
              Press{" "}
              <span className="py-1 px-2 mx-2 rounded bg-background-keybind">
                Tab
              </span>
              to refocus
            </div>
          )}
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
  return <h2 className={`font-medium text-cursor`}>Time: {timeLeft}</h2>;
};
