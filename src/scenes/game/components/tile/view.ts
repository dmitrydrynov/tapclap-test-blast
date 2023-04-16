import { gameConfig } from "@/config/game";
import { coordToPosition } from "@/helpers/math";
import { Container, Sprite, Text } from "pixi.js";
import { BoardTile } from ".";

export class BoardTileView extends Container {
  sprite: Sprite;

  constructor(boardTile: BoardTile) {
    super();

    const cellSize = gameConfig.cellSize;

    this.sprite = Sprite.from("tile-" + boardTile.config.name);

    const ratioX = cellSize / this.sprite.width;
    const ratioY = cellSize / this.sprite.height;
    this.sprite.scale.set(ratioX * 0.95, ratioY * 0.95);

    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.sprite.position = coordToPosition(boardTile.coord, cellSize);

    boardTile.addChild(this.sprite);

    const idx = gameConfig.tiles.findIndex(
      (t) => t.name == boardTile.config.name
    );
    const indexText = new Text(idx, { fontSize: 42 });
    this.sprite.addChild(indexText);
  }
}