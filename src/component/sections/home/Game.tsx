import { useRef, useState } from "react";
import DevWordsContainer from "./DevWordsContainer";
import { isKeyboardCodeAllowed } from "../../../utilities/helpers";

type Game = "waiting for input" | "in progress" | "game over";
type Word = string;

const Game = () => {
  const [gameState, setGameState] = useState<Game>("waiting for input");
  const [typedLetters, setTypedLetters] = useState("");

  const words: Word = "The quick brown fox jumps over the lazy dog";

  const gameRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function startGame() {
    setGameState("in progress");
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

  return (
    <div id="game" ref={gameRef}>
      {/* <CountdownTimer timeLeft={timeLeft} /> */}
      <DevWordsContainer ref={wordsRef} text={words} typed={typedLetters} />
      <input
        ref={inputRef}
        type="text"
        value={typedLetters}
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
