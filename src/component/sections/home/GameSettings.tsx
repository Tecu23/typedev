import { useGameSettings } from "../../../context/GameSettingsContext";

const GameSettings = () => {
  const { gameType, setGameType, gameSettings, updateSettings } =
    useGameSettings();

  console.log(gameType, gameSettings);

  return (
    <div className="absolute top-0 left-1/2 w-20 h-20 transform -translate-x-1/2"></div>
  );
};

export default GameSettings;
