import { Container } from "pixi.js";
import { BoardTileView } from "./view";
import { gameConfig } from "@/config/game";

export class BoardTile extends Container {
  index: number;
  renderView: BoardTileView;
  coord: {
    col: number;
    row: number;
  };
  config: IBoardTileConfig;

  constructor(index: number, coord: number[]) {
    super();

    this.index = index;
    this.coord = {
      col: coord[0],
      row: coord[1],
    };
    this.config = gameConfig.tiles[this.index];
    this.renderView = new BoardTileView(this);
  }
}
