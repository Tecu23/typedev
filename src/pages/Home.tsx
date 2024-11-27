import Game from "../component/sections/home/Game";
import GameSettings from "../component/sections/home/GameSettings";
import Keybinds from "../component/sections/home/Keybinds";
import { GameSettingsProvider } from "../context/GameSettingsContext";

function Home() {
  return (
    <GameSettingsProvider>
      <main className="grid relative place-items-center w-full tracking-wider h-[calc(100vh-160px)] min-h-[400px]">
        <Game />
        <Keybinds />
        <GameSettings />
      </main>
    </GameSettingsProvider>
  );
}

export default Home;
