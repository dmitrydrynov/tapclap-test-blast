import { TextStyle } from "pixi.js";

export const gameConfig: IGameConfig = {
  cellSize: 100,
  textStyle: {
    title: new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 42,
      fontFamily: "Marvin",
    }),
    text: new TextStyle({
      align: "center",
      fill: "#000000",
      fontSize: 36,
      fontFamily: "Marvin",
    }),
  },
  levels: [
    {
      name: "Demo Level",
      minBurnGroup: 6,
      mixingAttempts: 3,
      board: {
        columns: 8,
        rows: 8,
      },
      tiles: ["red", "blue", "green", "purple", "yellow"],
      goal: {
        steps: 25,
        score: 100,
      },
    },
  ],
  tiles: [
    { name: "red", color: "ff0000", type: "basic" },
    { name: "blue", color: "0000ff", type: "basic" },
    { name: "green", color: "00ff00", type: "basic" },
    { name: "purple", color: "00ffff", type: "basic" },
    { name: "yellow", color: "ffff00", type: "basic" },
  ],
};
