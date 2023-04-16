import { Container } from "pixi.js";
import { BoardTileView } from "./view";
import { gameConfig } from "@/config/game";

export class BoardTile extends Container {
  index: number;
  renderView: BoardTileView;
  coord: TCoord;
  config: IBoardTileConfig;

  constructor(index: number, coord: TCoord) {
    super();

    this.index = index;
    this.coord = coord;
    this.config = gameConfig.tiles[this.index];
    this.renderView = new BoardTileView(this);
  }
}
