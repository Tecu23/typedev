export type Words = string;

export type Game = "waiting for input" | "in progress" | "game over";

export type GameType = "dev" | "normal";

export type GameConfig = { type: "dev" } | { type: "normal"; count: number };

export type GameSettings = {
  mode: "words" | "time";
  time: 30 | 60 | 90 | 120;
  count: 100 | 200;
};

export type UpdateSettingsFunction = <T extends keyof GameSettings>(
  key: T,
  value: GameSettings[T],
) => void;

export type GameSettingsContextValue = {
  gameType: GameType;
  setGameType: React.Dispatch<GameType>;
  gameSettings: GameSettings;
  updateSettings: UpdateSettingsFunction;
};
