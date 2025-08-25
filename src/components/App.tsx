import Footer from "./navigation/Footer";
import Header from "./navigation/Header";
import TestConfig from "./TestConfig";
import TypingTest from "./TypingTest";

function App() {
  return (
    <div className="content-grid min-h-screen w-full py-8 bg-bg grid-rows-[top-start_auto_content-start_1fr_content-end_auto_top-end] overflow-hidden gap-y-8">
      <Header />
      <main className="col-[full-width] relative content-grid h-full">
        <div className="col-[full-width] content-grid relative h-full grid grid-rows-[1fr_auto_1fr]">
          <TestConfig />
          <TypingTest />
          <div id="result" className=""></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
