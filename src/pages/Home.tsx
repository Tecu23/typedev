import Game from "../component/sections/home/Game";
import Keybinds from "../component/sections/home/Keybinds";

function Home() {
  return (
    <main className="grid relative place-items-center w-full tracking-wider h-[calc(100vh-160px)] min-h-[400px]">
      <Game />
      <Keybinds />
    </main>
  );
}

export default Home;
