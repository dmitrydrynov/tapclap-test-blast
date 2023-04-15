export const gameConfig: IGameConfig = {
  cellSize: 100,
  levels: [
    {
      name: "Demo Level",
      minBurnGroup: 2,
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
