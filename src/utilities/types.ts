export type GameType = "dev" | "normal";

export type Words = string;

export type GameConfig = { type: "dev" } | { type: "normal"; count: number };
