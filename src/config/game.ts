export const gameConfig: IGameConfig = {
  cellSize: 100,
  levels: [
    {
      name: "Demo Level",
      minBurnGroup: 2,
      mixingAttempts: 3,
      board: {
        columns: 6,
        rows: 8,
      },
      tiles: ["red", "blue", "green", "purple", "yellow"],
      boosters: ["bomb"],
      goal: {
        steps: 10,
        score: 100,
      },
    },
  ],
  tiles: [
    { name: "red", color: "ff0000", type: "basic", score: 1 },
    { name: "blue", color: "0000ff", type: "basic", score: 2 },
    { name: "green", color: "00ff00", type: "basic", score: 3 },
    { name: "purple", color: "00ffff", type: "basic", score: 4 },
    { name: "yellow", color: "ffff00", type: "basic", score: 5 },
  ],
  boosters: [
    { name: "bomb", type: "collector", params: { activeWhen: 5, radius: 2 } },
  ],
};
