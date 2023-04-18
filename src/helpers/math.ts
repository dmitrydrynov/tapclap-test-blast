import { gameConfig } from "@/config/game";

export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const coordToPosition = (coord: TCoord) => {
  const { cellSize } = gameConfig;

  return {
    x: coord.col * cellSize + cellSize / 2,
    y: coord.row * cellSize + cellSize / 2,
  };
};
