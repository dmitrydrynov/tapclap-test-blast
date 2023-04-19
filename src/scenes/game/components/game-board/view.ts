import { Container, Graphics } from "pixi.js";
import * as math from "mathjs";
import { randomInteger } from "@/helpers/math";
import { BoardTile } from "../tile";
import { gameConfig } from "@/config/game";
import { GameBoard } from ".";

export class GameBoardView extends Container {
  tilesMap: math.Matrix;
  tiles: math.Matrix;
  scene: GameBoard;

  constructor(scene: GameBoard) {
    super();

    this.scene = scene;

    const {
      board: { columns, rows },
    } = scene.levelConfig;

    const cellSize = gameConfig.cellSize;
    const borderSize = 10;
    const width = columns * cellSize;
    const height = rows * cellSize;

    /** Createe board */
    const board = new Graphics();
    /** background */
    board.beginFill(0xffffff);
    board.drawRect(0, 0, width, height);
    board.endFill();
    /** grid */
    board.lineStyle(3, "00000020");
    for (let r = 1; r < rows; r++) {
      board.moveTo(0, r * cellSize);
      board.lineTo(width, r * cellSize);
    }
    for (let c = 1; c < columns; c++) {
      board.moveTo(c * cellSize, 0);
      board.lineTo(c * cellSize, height);
    }
    /** border */
    board.lineStyle(borderSize, 0x000000);
    board.drawRect(
      -borderSize / 2,
      -borderSize / 2,
      width + borderSize / 2,
      height + borderSize / 2
    );

    scene.addChild(board);

    /** Create tiles map */
    this.tilesMap = math
      .zeros(columns, rows)
      .map(() => this.getRandomIndex()) as math.Matrix;

    /** Draw tiles */
    this.tiles = this.tilesMap.map((tileIndex, [row, col]) => {
      const newTile = new BoardTile(tileIndex, { col, row });
      scene.addChild(newTile);

      newTile.eventMode = "dynamic";
      newTile.on("pointertap", () => scene.onTileClick(newTile));

      return newTile;
    });

    console.log(this.tilesMap.toString());
  }

  getRandomIndex() {
    const { tiles } = this.scene.levelConfig;

    return randomInteger(0, tiles.length - 1);
  }

  addRandomTile(coord: TCoord) {
    const newTile = new BoardTile(this.getRandomIndex(), coord);
    newTile.eventMode = "dynamic";
    newTile.on("pointertap", () => this.scene.onTileClick(newTile));
    newTile.position.y -= gameConfig.cellSize;
    this.scene.addChild(newTile);

    return newTile;
  }
}
