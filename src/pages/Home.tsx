import Result from "../component/Result";
import RestartButton from "../component/RestartButton";

import useEngine from "../utilities/hooks/useEngine";
import { calculateAccuracyPercentage } from "../utilities/helpers";
import WordsContainer from "../component/sections/home/WordsContainer";

function Home() {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <main className="grid place-items-center w-full tracking-wider h-[calc(100vh-160px)]">
      <div>
        <CountdownTimer timeLeft={timeLeft} />
        <WordsContainer words={words} typed={typed} />
        <RestartButton
          className="mx-auto mt-10 text-slate-500"
          onRestart={() => restart()}
        />
        <Result
          state={state}
          className="mt-10"
          errors={errors}
          accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
          total={totalTyped}
        />
      </div>
    </main>
  );
}

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="font-medium text-cursor">Time: {timeLeft}</h2>;
};

export default Home;
