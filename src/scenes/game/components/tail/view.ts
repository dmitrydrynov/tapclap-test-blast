import { gameConfig } from "@/config/game";
import { Container, Graphics } from "pixi.js";

export class BoardTailView extends Container {
  constructor(boardTail: IBoardTail) {
    super();

    const cellSize = gameConfig.cellSize;

    const rect = new Graphics();

    rect.beginFill(boardTail.tailConfig.color);
    rect.lineStyle(3, "00000020");
    rect.drawRect(0, 0, cellSize, cellSize);
    rect.endFill();

    rect.position.x = boardTail.coord[0];
    rect.position.y = boardTail.coord[1];

    boardTail.addChild(rect);
  }
}
