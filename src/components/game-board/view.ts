import { Texture, Container, Graphics, Spritesheet, Sprite } from "pixi.js";
import * as math from "mathjs";
import { BoardTile } from "@/components/tile/component";
import { gameConfig } from "@/config/game";
import { GameBoard } from "./component";
import { BoosterTile } from "../booster-tile/component";

export class GameBoardView extends Container {
  tilesMap: math.Matrix;
  tiles: math.Matrix;
  component: GameBoard;
  boardWidth: number;
  boardHeight: number;

  constructor(component: GameBoard) {
    super();

    this.component = component;
    this.component.sortableChildren = true;

    const {
      board: { columns, rows },
    } = component.options.levelConfig;

    /** Create tiles map */
    this.tilesMap = math
      .zeros(rows, columns)
      .map(() => this.component.getRandomIndex()) as math.Matrix;

    const cellSize = gameConfig.cellSize;
    this.boardWidth = columns * cellSize + 100;
    this.boardHeight = rows * cellSize + 100;

    this.drawBoard();
    this.tiles = this.drawTiles();
    // this.drawTestGrid();
  }

  async drawBoard() {
    const sheet = new Spritesheet(Texture.from("board"), {
      frames: {
        leftTop: {
          frame: { x: 0, y: 0, w: 100, h: 100 },
        },
        rightTop: {
          frame: { x: 156, y: 0, w: 100, h: 100 },
        },
        leftBottom: {
          frame: { x: 0, y: 156, w: 100, h: 100 },
        },
        rightBottom: {
          frame: { x: 156, y: 156, w: 100, h: 100 },
        },
        top: {
          frame: { x: 100, y: 0, w: 40, h: 100 },
        },
        left: {
          frame: { x: 0, y: 100, w: 100, h: 40 },
        },
        right: {
          frame: { x: 156, y: 100, w: 100, h: 40 },
        },
        bottom: {
          frame: { x: 100, y: 156, w: 40, h: 100 },
        },
      },
      meta: { scale: "1" },
    });

    const textures = await sheet.parse();

    /** Createe board */
    const boardContainer = new Container();
    const board = new Graphics();
    /** background */
    board.beginFill("001E3B");
    board.drawRect(100, 100, this.boardWidth - 200, this.boardHeight - 200);
    board.endFill();
    boardContainer.addChild(board);

    const leftTop = new Sprite(textures.leftTop);
    boardContainer.addChild(leftTop);
    leftTop.position.set(0, 0);

    const rightTop = new Sprite(textures.rightTop);
    boardContainer.addChild(rightTop);
    rightTop.position.set(this.boardWidth - rightTop.width, 0);

    const leftBottom = new Sprite(textures.leftBottom);
    boardContainer.addChild(leftBottom);
    leftBottom.position.set(0, this.boardHeight - leftBottom.height);

    const rightBottom = new Sprite(textures.rightBottom);
    boardContainer.addChild(rightBottom);
    rightBottom.position.set(
      this.boardWidth - rightTop.width,
      this.boardHeight - leftBottom.height
    );

    const top = new Sprite(textures.top);
    boardContainer.addChild(top);
    top.position.set(leftTop.width, 0);
    top.width = this.boardWidth - leftTop.width - rightTop.width;

    const bottom = new Sprite(textures.bottom);
    boardContainer.addChild(bottom);
    bottom.position.set(leftBottom.width, this.boardHeight - leftBottom.height);
    bottom.width = this.boardWidth - leftBottom.width - rightBottom.width;

    const left = new Sprite(textures.left);
    boardContainer.addChild(left);
    left.position.set(0, leftTop.height);
    left.height = this.boardHeight - leftTop.height - leftBottom.height;

    const right = new Sprite(textures.right);
    boardContainer.addChild(right);
    right.position.set(rightTop.x, rightTop.height);
    right.height = this.boardHeight - rightTop.height - rightBottom.height;

    this.component.addChild(boardContainer);
    boardContainer.zIndex = 0;
    boardContainer.position.x -= 50;
    boardContainer.position.y -= 50;
  }

  drawTestGrid() {
    const {
      board: { columns, rows },
    } = this.component.options.levelConfig;

    const cellSize = gameConfig.cellSize;
    const borderSize = 10;
    this.boardWidth = columns * cellSize;
    this.boardHeight = rows * cellSize;

    /** Createe board */
    const board = new Graphics();
    /** background */
    board.beginFill(0xffffff);
    board.drawRect(0, 0, this.boardWidth, this.boardHeight);
    board.endFill();
    /** grid */
    board.lineStyle(3, "00000020");
    for (let r = 1; r < rows; r++) {
      board.moveTo(0, r * cellSize);
      board.lineTo(this.boardWidth, r * cellSize);
    }
    for (let c = 1; c < columns; c++) {
      board.moveTo(c * cellSize, 0);
      board.lineTo(c * cellSize, this.boardHeight);
    }
    /** border */
    board.lineStyle(borderSize, 0x000000);
    board.drawRect(
      -borderSize / 2,
      -borderSize / 2,
      this.boardWidth + borderSize / 2,
      this.boardHeight + borderSize / 2
    );

    this.component.addChild(board);
  }

  drawTiles() {
    /** Draw tiles */
    const tiles = this.tilesMap.map((tileIndex, [row, col]) => {
      const newTile = new BoardTile(tileIndex, { col, row });
      this.component.addChild(newTile);
      newTile.zIndex = 1;

      newTile.eventMode = "dynamic";
      newTile.on("pointertap", () => this.component.onTileClick(newTile));

      return newTile;
    });

    return tiles;
  }

  addBoosterTile(config: IBoardBoosterConfig, coord: TCoord) {
    const booster = new BoosterTile({
      config,
      coord,
    });

    this.component.addChild(booster);
    this.tiles.set([coord.row, coord.col], booster);
    booster.zIndex = 1;
    booster.eventMode = "dynamic";
    booster.on("pointertap", () => this.component.onBoosterTileClick(booster));
  }
}
