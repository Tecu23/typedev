import { faker } from "@faker-js/faker";
import RestartButton from "./component/RestartButton";
function App() {
  const words = faker.word.words(10);

  return (
    <main className="grid place-items-center min-h-screen bg-slate-900">
      <CountdownTimer timeLeft={30} />
      <GeneratedWords words={words} />
      <RestartButton
        className="mx-auto mt-10 text-slate-500"
        onRestart={() => null}
      />
    </main>
  );
}

const GeneratedWords = ({ words }: { words: string }) => {
  return (
    <p className="font-mono text-4xl tracking-wider text-center text-yellow-500">
      {words}
    </p>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="font-medium text-yellow-400">Time: {timeLeft}</h2>;
};

export default App;
