import Footer from "./navigation/Footer";
import Header from "./navigation/Header";
import TypingTest from "./TypingTest";

function App() {
  return (
    <div className="container mx-auto min-h-screen w-full px-4 2xl:px-8 py-8">
      <Header />
      <main className="relative grid grid-rows-[1fr_auto_1fr] px-4 2xl:px-8">
        <div id="testConfig"></div>
        <TypingTest />
      </main>
      <Footer />
    </div>
  );
}

export default App;
