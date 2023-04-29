import { Container, Ticker } from "pixi.js";
import { BoosterTileView } from "./view";
import { coordToPosition } from "@/helpers/math";
import { Easing, Group, Tween } from "tweedle.js";

export class BoosterTile extends Container {
  index = -1;
  renderView: BoosterTileView;
  coord: TCoord;
  config: IBoardBoosterConfig;

  constructor({
    config,
    coord,
  }: {
    config: IBoardBoosterConfig;
    coord: TCoord;
  }) {
    super();

    this.coord = coord;
    this.config = config;
    this.renderView = new BoosterTileView(this);

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

  birthAnimation(callback = () => {}) {
    this.scale.set(0.5);
    this.alpha = 0;

    new Tween(this)
      .to({ scale: { x: 1, y: 1 }, alpha: 1 }, 250)
      .easing(Easing.Sinusoidal.Out)
      .start()
      .onComplete(() => {
        callback();
      });
  }

  private update(): void {
    Group.shared.update();
  }
}
