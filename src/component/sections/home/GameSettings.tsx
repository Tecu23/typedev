import { useGameSettings } from "../../../context/GameSettingsContext";

const GameSettings = () => {
  const { gameType, setGameType, gameSettings, updateSettings } =
    useGameSettings();

  return (
    <div className="flex absolute top-0 left-1/2 gap-2 justify-between items-center px-4 w-full max-w-xl h-10 text-lg text-gray-500 rounded-md transform -translate-x-1/2 border-[3px] border-icon-dark bg-background-dark">
      <div className="flex gap-4 justify-center items-center px-2 min-w-40">
        <button
          className="hover:text-foreground"
          onClick={() => {
            setGameType("normal");
          }}
        >
          <p className={`${gameType == "normal" ? "text-foreground" : ""}`}>
            Normal
          </p>
        </button>
        <button
          className="hover:text-foreground"
          onClick={() => {
            setGameType("dev");
          }}
        >
          <p className={`${gameType == "dev" ? "text-foreground" : ""}`}>Dev</p>
        </button>
      </div>

      <div className="w-1 h-5 bg-background-keybind"></div>

      <div className="flex gap-4 justify-center items-center px-2 min-w-40">
        <button
          className="hover:text-foreground"
          onClick={() => {
            updateSettings("mode", "time");
          }}
        >
          <p
            className={`${gameSettings.mode == "time" ? "text-foreground" : ""}`}
          >
            Time
          </p>
        </button>
        <button
          className="hover:text-foreground"
          onClick={() => {
            updateSettings("mode", "words");
          }}
        >
          <p
            className={`${gameSettings.mode == "words" ? "text-foreground" : ""}`}
          >
            Words
          </p>
        </button>
      </div>

      <div className="w-1 h-5 bg-background-keybind"></div>

      {gameSettings.mode === "time" && (
        <div className="flex gap-4 items-center px-2">
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("time", 30);
            }}
          >
            <p
              className={`${gameSettings.time == 30 ? "text-foreground" : ""}`}
            >
              30
            </p>
          </button>
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("time", 60);
            }}
          >
            <p
              className={`${gameSettings.time == 60 ? "text-foreground" : ""}`}
            >
              60
            </p>
          </button>
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("time", 90);
            }}
          >
            <p
              className={`${gameSettings.time == 90 ? "text-foreground" : ""}`}
            >
              90
            </p>
          </button>
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("time", 120);
            }}
          >
            <p
              className={`${gameSettings.time == 120 ? "text-foreground" : ""}`}
            >
              120
            </p>
          </button>
        </div>
      )}
      {gameSettings.mode === "words" && (
        <div className="flex gap-4 justify-center items-center px-2 min-w-[150px]">
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("count", 100);
            }}
          >
            <p
              className={`${gameSettings.count == 100 ? "text-foreground" : ""}`}
            >
              100
            </p>
          </button>
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("count", 200);
            }}
          >
            <p
              className={`${gameSettings.count == 200 ? "text-foreground" : ""}`}
            >
              200
            </p>
          </button>
          <button
            className="hover:text-foreground"
            onClick={() => {
              updateSettings("count", 300);
            }}
          >
            <p
              className={`${gameSettings.count == 300 ? "text-foreground" : ""}`}
            >
              300
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

export default GameSettings;
