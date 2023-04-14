import { Container } from "pixi.js";
import { BoardTailView } from "./view";
import { gameConfig } from "@/config/game";

export class BoardTail extends Container implements IBoardTail {
  renderView: BoardTailView;
  coord: number[];
  tailConfig: IBoardTailConfig;

  constructor(tailIndex: number, coord: number[]) {
    super();

    this.coord = coord;
    this.tailConfig = gameConfig.tails[tailIndex];
    this.renderView = new BoardTailView(this);
  }
}
