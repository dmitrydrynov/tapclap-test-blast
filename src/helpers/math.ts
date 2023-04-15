export const randomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const coordToPosition = (
  coord: { col: number; row: number },
  cellSize: number
) => {
  return {
    x: coord.col * cellSize + cellSize / 2,
    y: coord.row * cellSize + cellSize / 2,
  };
};
