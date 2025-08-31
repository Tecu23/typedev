import { useTypingStore } from "../store/typingStore";
import Footer from "./navigation/Footer";
import Header from "./navigation/Header";
import Results from "./Results";
import TestConfig from "./TestConfig";
import TypingTest from "./TypingTest";

function App() {
  const status = useTypingStore((state) => state.status);

  console.log(status);

  return (
    <div className="content-grid min-h-screen w-full py-8 bg-bg grid-rows-[auto_1fr_auto] overflow-hidden gap-y-8">
      <Header />
      <main className="col-[full-width] relative content-grid h-full">
        <div className="col-[full-width] content-grid relative h-full grid grid-rows-[1fr_auto_1fr]">
          <TestConfig status={status} />
          {status == "finished" ? <Results /> : <TypingTest />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
