import { gameConfig } from "@/config/game";
import { Container, Sprite } from "pixi.js";
import { BoosterTile } from "./component";

export class BoosterTileView extends Container {
  sprite: Sprite;

  constructor(boardTile: BoosterTile) {
    super();

    const cellSize = gameConfig.cellSize;

    this.sprite = Sprite.from("tile-" + boardTile.config.name);

    const ratioX = cellSize / this.sprite.width;
    const ratioY = cellSize / this.sprite.height;
    this.sprite.scale.set(ratioX * 0.95, ratioY * 0.95);

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    boardTile.addChild(this.sprite);
  }
}
