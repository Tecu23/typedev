import { useMemo } from "react";

import Footer from "./navigation/Footer";
import Header from "./navigation/Header";

import Results from "./Results";
import TestConfig from "./TestConfig";
import TypingTest from "./TypingTest";

import { useTypingStore } from "../store/typingStore";
import { useVisualEngine } from "../hooks/useVisualEngine";

function App() {
  const status = useTypingStore((state) => state.status);

  const engineOptions = useMemo(
    () => ({
      enabled: true,
      onTestComplete: () => console.log("Test completed"),
      onError: (error: Error) => console.error("Error:", error),
    }),
    [],
  );
  const visualEngine = useVisualEngine(engineOptions);

  return (
    <div className="content-grid min-h-screen w-full py-8 bg-bg grid-rows-[auto_1fr_auto] overflow-hidden gap-y-8">
      <Header />
      <main className="col-[full-width] relative content-grid h-full">
        <div className="col-[full-width] content-grid relative h-full grid grid-rows-[1fr_auto_1fr]">
          <TestConfig status={status} />
          {status == "finished" || true ? (
            <Results resetEngine={visualEngine.reset} />
          ) : (
            <TypingTest
              initializeEngine={visualEngine.initialize}
              resetEngine={visualEngine.reset}
              isEngineEnabled={visualEngine.isEnabled}
              registerCharacter={visualEngine.registerCharacter}
              registerWord={visualEngine.registerWord}
              getCurrentPosition={visualEngine.getCurrentPosition}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
