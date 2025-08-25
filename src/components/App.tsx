import Footer from "./navigation/Footer";
import Header from "./navigation/Header";
import TypingTest from "./TypingTest";

function App() {
  return (
    <div className="content-grid min-h-screen w-full py-8 bg-bg">
      <Header />
      <main className="col-[full_width] relative grid grid-rows-[1fr_auto_1fr] px-4 2xl:px-8">
        <div id="testConfig"></div>
        {/* <TypingTest /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
