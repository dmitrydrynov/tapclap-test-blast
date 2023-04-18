import { Container, Ticker } from "pixi.js";
import { BoardTileView } from "./view";
import { gameConfig } from "@/config/game";
import { coordToPosition } from "@/helpers/math";
import { Easing, Group, Tween } from "tweedle.js";

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

    this.position = coordToPosition(this.coord);
    this.eventMode = "dynamic";

    Ticker.shared.add(this.update, this);
  }

  moveTo(newCoord: TCoord, callback = () => {}) {
    const newPosition = coordToPosition(newCoord);
    this.coord = newCoord;

    new Tween(this.position)
      .to(newPosition, 600)
      .easing(Easing.Bounce.Out)
      .start()
      .onComplete(() => {
        callback();
      });
  }

  private update(): void {
    Group.shared.update();
  }
}
