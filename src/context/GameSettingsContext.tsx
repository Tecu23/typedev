import { createContext, useContext, useState } from "react";
import type {
  GameSettingsContextValue,
  GameType,
  GameSettings,
  UpdateSettingsFunction,
} from "../utilities/types";
import { ReactNode } from "@tanstack/react-router";

export const GameSettingsContext = createContext<
  GameSettingsContextValue | undefined
>(undefined);

const useGameSettings = () => {
  const context = useContext(GameSettingsContext);

  if (!context) {
    throw Error("game settings context not loaded");
  }

  return context;
};

type Props = {
  children?: ReactNode;
};

const GameSettingsProvider = ({ children }: Props) => {
  const [gameType, setGameType] = useState<GameType>("normal");

  const [gameSettings, setGameSettings] = useState<GameSettings>({
    mode: "time",
    time: 30,
    count: 100,
  });

  const updateSettings: UpdateSettingsFunction = (key, value) => {
    setGameSettings({
      ...gameSettings,
      [key]: value,
    });
  };

  return (
    <GameSettingsContext.Provider
      value={{
        gameType,
        setGameType,
        gameSettings,
        updateSettings,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export { GameSettingsProvider, useGameSettings };
