import Game from "../component/sections/home/Game";

function Home() {
  return (
    <main className="grid place-items-center w-full tracking-wider h-[calc(100vh-160px)]">
      <Game />
      {/* <Result */}
      {/*   state={state} */}
      {/*   className="mt-10" */}
      {/*   errors={errors} */}
      {/*   accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)} */}
      {/*   total={totalTyped} */}
      {/* /> */}
    </main>
  );
}

export default Home;
