import Result from "../component/Result";
import UserTyping from "../component/UserTyping";
import RestartButton from "../component/RestartButton";

import useEngine from "../utilities/hooks/useEngine";
import { calculateAccuracyPercentage } from "../utilities/helpers";

function Home() {
  const { state, words, timeLeft, typed, errors, restart, totalTyped } =
    useEngine();

  return (
    <main className="grid place-items-center w-full tracking-wider h-[calc(100vh-162px)] bg-slate-900">
      <div>
        <CountdownTimer timeLeft={timeLeft} />
        <WordsContainer>
          <GeneratedWords words={words} />
          <UserTyping
            className="absolute inset-0"
            words={words}
            userInput={typed}
          />
        </WordsContainer>
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

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mt-3 max-w-xl text-3xl leading-relaxed break-all">
      {children}
    </div>
  );
};

const GeneratedWords = ({ words }: { words: string }) => {
  return <p className="text-slate-500">{words}</p>;
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="font-medium text-yellow-400">Time: {timeLeft}</h2>;
};

export default Home;
