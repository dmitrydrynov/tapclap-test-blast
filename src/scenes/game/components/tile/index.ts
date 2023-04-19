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

  remove(callback = () => {}) {
    new Tween(this)
      .to({ scale: { x: 0.5, y: 0.5 }, alpha: 0 }, 250)
      .easing(Easing.Back.In)
      .start()
      .onComplete(() => {
        callback();

        setTimeout(() => this.destroy(), 250);
      });
  }

  moveTo(newCoord: TCoord, callback = () => {}) {
    const newPosition = coordToPosition(newCoord);
    this.coord = newCoord;

    new Tween(this)
      .to(newPosition, 250)
      .easing(Easing.Sinusoidal.In)
      .start()
      .onComplete(() => {
        callback();
      });
  }

  moveToWithAlpha(newCoord: TCoord, callback = () => {}) {
    const newPosition = coordToPosition(newCoord);
    this.coord = newCoord;

    new Tween(this)
      .to({ ...newPosition, alpha: 1 }, 250)
      .easing(Easing.Sinusoidal.In)
      .start()
      .onComplete(() => {
        callback();
      });
  }

  private update(): void {
    Group.shared.update();
  }
}
